import { OIL_CONFIG } from './constants.js';
import { getConfiguration, getHubOrigin } from './config.js';
import { addFrame } from './iframe.js';
import { getOrigin, eventer, messageEvent } from './utils.js';
import { logDebug } from './log.js';

// Timeout after which promises should return
const TIMEOUT = 500;
let config = null;

// INTERNAL FUNCTIONS


/**
 * Initializes the OIL iFrame
 * @function
 * @return promise as object {iframe:Element,config:{}}when iFrame is loaded
 */
function init() {
  return new Promise((resolve) => {
    // read config data if not already set
    if (!config) {
      config = getConfiguration();
    }
    let hubOrigin = getHubOrigin();
    if (config && hubOrigin) {
      // setup iframe
      let iframeUrl = hubOrigin;
      let iframe = addFrame(iframeUrl);
      if (!iframe.onload) {
        // Listen to message from child window after iFrame load
        iframe.onload = () => readConfigFromFrame(getOrigin()).then((data) => resolve({ iframe: iframe, config: data }));
      } else {
        // if already loaded directly invoke
        readConfigFromFrame(getOrigin()).then((data) => resolve({ iframe: iframe, config: data }));
      }
    } else {
      logDebug(`Config for ${OIL_CONFIG.ATTR_HUB_ORIGIN} and ${OIL_CONFIG.ATTR_HUB_PATH} isnt set. No POI possible.`);
      resolve({});
    }
  });
}
/**
 * Sent given event to hidden iframe
 * @param eventName - event to sent
 * @param origin - orgin url (aka parent)
 * @function
 */
function sendEventToFrame(eventName, origin) {
  init().then((result) => {
    let iframe = result.iframe;
    if (iframe) {
      // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Syntax
      iframe.contentWindow.postMessage({ event: eventName, origin: origin }, getHubOrigin());
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
    // defer post to next tick
    setTimeout(() => sendEventToFrame('oil-config-read', origin));
    // Listen to message from child window
    eventer(messageEvent, (event) => {
      // only listen to our hub
      let hubOrigin = getHubOrigin();
      if (config && hubOrigin && hubOrigin.indexOf(event.origin) !== -1) {
        logDebug('Message from hub received...');
        resolve(event.data);
      }
    }, false);
    // add timeout for config read
    setTimeout(() => {
      // logDebug('Read config timed out');
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
    init().then((result) => {
      let iframe = result.iframe;
      if (iframe) {
        if (!iframe.onload) {
          // Listen to message from child window after iFrame load
          iframe.onload = () => readConfigFromFrame(getOrigin()).then((data) => resolve(data));
        } else {
          // if already loaded directly invoke
          readConfigFromFrame(getOrigin()).then((data) => resolve(data));
        }
      } else {
        logDebug('Couldnt initialize POI. Fallback to POI false.');
        resolve(false);
      }
    });
  });
}
/**
 * Activate Power Opt IN
 * @function
 * @return promise when done
 */
// FIXME settimeout / 3
export function activatePowerOptIn() {
  init().then((result) => {
    let iframe = result.iframe;
    return new Promise((resolve) => setTimeout(() => { // defer post to next tick
      sendEventToFrame('oil-poi-activate', getOrigin());
      setTimeout(() => readConfigFromFrame(getOrigin()).then(resolve));  // defer until read works
    }, TIMEOUT / 3));
  });
}
