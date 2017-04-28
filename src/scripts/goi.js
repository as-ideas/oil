import { getConfiguration } from './config.js';
import { addFrame } from './iframe.js';
import { eventer, messageEvent } from './utils.js';
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
  if (config && config.sso_iframe_src) {
    // setup iframe
    let iframeUrl = config.sso_iframe_src;
    return addFrame(iframeUrl);
  } else {
    logDebug('Config for sso_iframe_src isnt set. No GOI possible.');
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
    // FIXME Add cross origin here !!
    // see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#Syntax
    iframe.contentWindow.postMessage({ event: eventName, origin: origin }, '*');
  }
}
/**
 * Read configuration from hidden iframe
 * @param origin - orgin url (aka parent)
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
      if (config && config.sso_iframe_src && config.sso_iframe_src.indexOf(event.origin) !== -1) {
        resolve(event.data);
      }
    }, false);
    // add timeout for config read
    setTimeout(() => {
      logDebug('Read config timed out');
      resolve(false);
    }, TIMEOUT);
  });
}

// PUBLIC API

/**
 * Read config for Global Opt IN from hidden iframe
 * @function
 * @return promise with result (is true if GOI ist set, otherwise false)
 */
export function verifyGlobalOptIn() {
  return new Promise((resolve) => {
    let iframe = init();
    if (iframe) {
      if (!iframe.onload) {
        // Listen to message from child window after iFrame load
        iframe.onload = () => readConfigFromFrame(location.origin).then((data) => resolve(data));
      } else {
        // if already loaded directly invoke
        readConfigFromFrame(location.origin).then((data) => resolve(data));
      }
    } else {
      logDebug('Couldnt initialize GOI. Fallback to goi false.');
      resolve(false);
    }
  });
}
/**
 * Activate Global Opt IN
 * @function
 * @return promise when done
 */
export function activateGlobalOptIn() {
  init();
  return new Promise((resolve) => setTimeout(() => { // defer post to next tick
    sendEventToFrame('oil-goi-activate', location.origin);
    setTimeout(() => readConfigFromFrame(location.origin).then(resolve));  // defer until read works
  }, TIMEOUT / 3));
}
