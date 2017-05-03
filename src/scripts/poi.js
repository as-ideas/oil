import { OIL_CONFIG } from './constants.js';
import { getConfiguration } from './config.js';
import { addFrame } from './iframe.js';
import { getOrigin, eventer, messageEvent } from './utils.js';
import { logDebug } from './log.js';

// Timeout after which promises should return
const TIMEOUT = 500;
let config = null;

// INTERNAL FUNCTIONS

function init() {
  // read config data if not already set
  if (!config) {
    config = getConfiguration();
  }
  if (config && config[OIL_CONFIG.ATTR_HUB_PATH] && config[OIL_CONFIG.ATTR_HUB_ORIGIN]) {
    // setup iframe
    let iframeUrl = config[OIL_CONFIG.ATTR_HUB_ORIGIN] + config[OIL_CONFIG.ATTR_HUB_PATH];
    return addFrame(iframeUrl);
  } else {
    logDebug(`Config for ${OIL_CONFIG.ATTR_HUB_ORIGIN} and ${OIL_CONFIG.ATTR_HUB_PATH} isnt set. No POI possible.`);
    return null;
  }
}
/**
 * Sent given event to hidden iframe
 * @param eventName - event to sent
 * @param origin - orgin url (aka parent)
 * @function
 */
function sendEventToFrame(eventName, origin) {
  let iframe = init();
  if (iframe) {
    // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Syntax
    iframe.contentWindow.postMessage({ event: eventName, origin: origin }, config[OIL_CONFIG.ATTR_HUB_ORIGIN]);
  }
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
      if (config && config[OIL_CONFIG.ATTR_HUB_ORIGIN] && config[OIL_CONFIG.ATTR_HUB_ORIGIN].indexOf(event.origin) !== -1) {
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
    let iframe = init();
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
}
/**
 * Activate Power Opt IN
 * @function
 * @return promise when done
 */
export function activatePowerOptIn() {
  init();
  return new Promise((resolve) => setTimeout(() => { // defer post to next tick
    sendEventToFrame('oil-poi-activate', getOrigin());
    setTimeout(() => readConfigFromFrame(getOrigin()).then(resolve));  // defer until read works
  }, TIMEOUT / 3));
}
