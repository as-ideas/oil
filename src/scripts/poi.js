import { OIL_CONFIG, POI_FALLBACK_NAME, POI_FALLBACK_GROUP_NAME, POI_PAYLOAD } from './constants.js';
import { getConfiguration, isPoiActive } from './config.js';
import { addFrame } from './iframe.js';
import { getOrigin, registerMessageListener, removeMessageListener } from './utils.js';
import { logError, logInfo } from './log.js';

// Timeout after which promises should return
const TIMEOUT = 500;
let frameListenerRegistered = false;

// INTERNAL FUNCTIONS

/**
 * Initializes the OIL iFrame
 * @function
 * @return promise as object {iframe:Element,config:{}}when iFrame is loaded
 */
function init() {
  return new Promise((resolve) => setTimeout(() => {
    logInfo('Initializing Frame...');
    let config = getConfiguration();

    if (isPoiActive()) {
      let hubLocation = config[OIL_CONFIG.ATTR_HUB_LOCATION];
      if (hubLocation) {
        // setup iframe
        let iframe = addFrame(hubLocation);
        if (iframe && !iframe.onload) {
          // Listen to message from child window after iFrame load
          iframe.onload = () => resolve({iframe: iframe, config: config});
        } else {
          // if already loaded directly invoke
          resolve({iframe: iframe, config: config});
        }
      } else {
        logError(`Config for ${OIL_CONFIG.ATTR_HUB_ORIGIN} and ${OIL_CONFIG.ATTR_HUB_PATH} isnt set. No POI possible.`);
        resolve({config: config});
      }
    } else {
      logInfo('POI not active. Frame not initialized.');
      resolve({config: config});
    }
  }));
}

/**
 * Sent given event to hidden iframe
 * @param eventName - event to sent
 * @param origin - orgin url (aka parent)
 * @param payload - payload to send
 * @function
 */
function sendEventToFrame(eventName, origin, payload = {}) {
  logInfo('Send to Frame:', eventName, origin);

  if (!isPoiActive()) {
    return;
  }

  init().then((result) => {
    let iframe = result.iframe,
      config = result.config;
    let hubDomain = config[OIL_CONFIG.ATTR_HUB_ORIGIN],
      groupName = config[OIL_CONFIG.ATTR_OIL_POI_GROUP_NAME];
    if (iframe && hubDomain) {
      // tag::subscriber-postMessage[]
      // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Syntax
      // MSIE needs Strings in postMessage
      let message = JSON.stringify({event: eventName, origin: origin, group_name: groupName, payload: payload});
      iframe.contentWindow.postMessage(message, hubDomain);
      // end::subscriber-postMessage[]
    }
  });
}

/**
 * Read configuration from hidden iframe
 * @param origin - origin url (aka parent)
 * @function
 * @return promise with result of the
 */
function readConfigFromFrame(origin) {
  return new Promise((resolve) => {

    if (!isPoiActive()) {
      resolve(false);
    }

    function handler(event) {
      // tag::subscriber-receiveMessage[]
      // only listen to our hub
      let hubOrigin = config[OIL_CONFIG.ATTR_HUB_ORIGIN];
      if (config && hubOrigin && hubOrigin.indexOf(event.origin) !== -1) {
        let message = typeof event.data !== 'object' ? JSON.parse(event.data) : event.data;
        logInfo('Message from hub received...', event.origin, message);
        removeMessageListener(handler);
        frameListenerRegistered = false;
        resolve(message);
      }
      // end::subscriber-receiveMessage[]
    }

    // defer post to next tick
    setTimeout(() => sendEventToFrame('oil-status-read', origin));
    if (!frameListenerRegistered) {
      // Listen to message from child window
      registerMessageListener(handler);
      frameListenerRegistered = true;
    }
    // add timeout for config read
    setTimeout(() => {
      removeMessageListener(handler);
      frameListenerRegistered = false;
      resolve(false);
    }, TIMEOUT);
  });
}

// PUBLIC API

/**
 * Read config for Power Opt IN from hidden iframe
 * @function
 * @return promise with result (is true if POI ist set, otherwise false)
 */
export function verifyPowerOptIn() {
  return new Promise((resolve) => {
    if (!isPoiActive()) {
      resolve({power_opt_in: false});
    }

    init().then((result) => {
      let iframe = result.iframe;
      if (iframe) {
        if (!iframe.onload) {
          // Listen to message from child window after iFrame load
          iframe.onload = () => readConfigFromFrame(getOrigin()).then((data) => {
            if (!data) {
              resolve({power_opt_in: false});
            }
            resolve(data);
          });
        } else {
          // if already loaded directly invoke
          readConfigFromFrame(getOrigin()).then((data) => {
            if (!data) {
              resolve({power_opt_in: false});
            }
            resolve(data);
          });
        }
      } else {
        logInfo('Could not initialize POI. Fallback to POI false.');
        resolve({power_opt_in: false});
      }
    });
  });
}

/**
 * Activate Power Opt IN with the use of an iframe
 * @function
 * @return Promise when done
 */
export function activatePowerOptInWithIFrame(payload) {
  logInfo('activatePowerOptIn');

  if (!isPoiActive()) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // reset config
  config = null;
  // init iFrame first
  return new Promise((resolve) => init().then(() => {
    // then activate
    sendEventToFrame('oil-poi-activate', getOrigin(), payload);
    // defer answer to next tick
    setTimeout(resolve);
  }));
}

/**
 * DeActivate Power Opt IN
 * @function
 * @return Promise when done
 */
export function deActivatePowerOptIn() {
  logInfo('deActivatePowerOptIn');

  if (!isPoiActive()) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // reset config
  config = null;
  // init iFrame first
  return new Promise((resolve) => init().then(() => {
    // then deactivate
    sendEventToFrame('oil-poi-delete', getOrigin(), {});
    // defer answer to next tick
    setTimeout(resolve);
  }));
}

export function redirectToLocation(location) {
  window.location.replace(location);
}

/**
 * Activate Power Opt IN with the use of an redirect
 * @function
 * @return
 */
export function activatePowerOptInWithRedirect(payload) {
  if (!isPoiActive()) {
    return;
  }

  if (!config) {
    config = getConfiguration();
  }

  if (config) {
    let payloadString = JSON.stringify(payload),
      payloadUriParam = encodeURIComponent(payloadString);

    let hubLocation = config[OIL_CONFIG.ATTR_HUB_LOCATION],
      groupName = config[OIL_CONFIG.ATTR_OIL_POI_GROUP_NAME];
    if (hubLocation) {
      let targetLocation = hubLocation + '?' + POI_FALLBACK_NAME + '=1';
      if (groupName) {
        targetLocation = targetLocation + '&' + POI_FALLBACK_GROUP_NAME + '=' + groupName;
      }
      if (payload) {
        targetLocation = targetLocation + '&' + POI_PAYLOAD + '=' + payloadUriParam;
      }
      exports.redirectToLocation(targetLocation);
    }
  }
}

