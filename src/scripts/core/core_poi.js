import {OIL_CONFIG} from './core_constants.js';
import {isPoiActive, getHubLocation, getHubOrigin, getPoiGroupName} from './core_config.js';
import {getOrigin, registerMessageListener, removeMessageListener} from './core_utils.js';
import {logError, logInfo} from './core_log.js';

// Timeout after which promises should return
const TIMEOUT = 500;

// TODO really necessary?
let frameListenerRegistered = false;

// INTERNAL FUNCTIONS
export function addFrame(iframeUrl) {
  let iframe = document.getElementById('oil-frame');
  if (!iframe) {
    logInfo('Creating iframe...');
    iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'oil-frame');
    iframe.setAttribute('src', iframeUrl);
    iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-top-navigation');
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);
  } else {
    logInfo('Found iframe');
  }
  return iframe;
}

/**
 * Initializes the OIL iFrame
 * @function
 * @return promise as object {iframe:Element,config:{}}when iFrame is loaded
 */
export function init() {
  return new Promise((resolve) => setTimeout(() => {
    logInfo('Initializing Frame...');

    if (isPoiActive()) {
      let hubLocation = getHubLocation();
      if (hubLocation) {
        // setup iframe
        let iframe = addFrame(hubLocation);
        if (iframe && !iframe.onload) {
          // Listen to message from child window after iFrame load
          iframe.onload = () => resolve({iframe: iframe});
        } else {
          // if already loaded directly invoke
          resolve({iframe: iframe});
        }
      } else {
        logError(`Config for ${OIL_CONFIG.ATTR_HUB_ORIGIN} and ${OIL_CONFIG.ATTR_HUB_PATH} isnt set. No POI possible.`);
        resolve(false);
      }
    } else {
      logInfo('POI not active. Frame not initialized.');
      resolve(false);
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
export function sendEventToFrame(eventName, origin, payload = {}) {
  logInfo('Send to Frame:', eventName, origin);

  if (!isPoiActive()) {
    return;
  }

  init().then((result) => {
    let iframe = result.iframe;
    let hubDomain = getHubOrigin(),
      groupName = getPoiGroupName();
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
      let hubOrigin = getHubOrigin();
      if (hubOrigin && hubOrigin.indexOf(event.origin) !== -1) {
        let message = typeof event.data !== 'object' ? JSON.parse(event.data) : event.data;
        logInfo('Message from hub received...', event.origin, message);
        removeMessageListener(handler);
        frameListenerRegistered = false;
        resolve(message);
      }
      // end::subscriber-receiveMessage[]
    }

    // TODO why do we remove the listener, why do we use setTimeout? cant this be simpler?

    // defer post to next tick
    setTimeout(() => sendEventToFrame('oil-status-read', origin));
    if (!frameListenerRegistered) {
      // Listen to message from child window
      registerMessageListener(handler);
      frameListenerRegistered = true;
    }

    // add timeout for hub answer read
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
    } else {
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
    }
  });
}

/**
 * DeActivate Power Opt IN
 * @function
 * @return Promise when done
 */
// FIXME needs testing
export function deActivatePowerOptIn() {
  logInfo('deActivatePowerOptIn');

  if (!isPoiActive()) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // init iFrame first
  return new Promise((resolve) => init().then(() => {
    // then deactivate
    sendEventToFrame('oil-poi-delete', getOrigin(), {});
    // defer answer to next tick
    setTimeout(resolve);
  }));
}

