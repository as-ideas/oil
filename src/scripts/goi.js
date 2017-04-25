import { getConfiguration } from './config.js';
import { addFrame } from './iframe.js';
import { eventer, messageEvent } from './utils.js';

// INTERNAL FUNCTIONS

function init() {
  // read config data
  const config = getConfiguration();
  // setup iframe
  let iframeUrl = config.sso_iframe_src;
  return addFrame(iframeUrl);
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
    iframe.contentWindow.postMessage({
      event: eventName,
      origin: origin
    }, '*');
  }
}
/**
 * Read configuration from hidden iframe
 * @param origin - orgin url (aka parent)
 * @function
 * @return promise with result of the
 */
function readConfigFromFrame(origin) {
  let iframe = init();
  if (iframe) {
    iframe.contentWindow.postMessage({
      event: 'oil-config-read',
      origin: origin
    }, '*');
    // Listen to message from child window
  }
  return new Promise((resolve) => {
    eventer(messageEvent, (event) => resolve(event.data), false);
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
    // Listen to message from child window
    iframe.onload = () => readConfigFromFrame(location.origin).then((data) => resolve(data));
  });
}
/**
 * Activate Global Opt IN
 * @function
 */
export function activateGlobalOptIn() {
  init();
  sendEventToFrame('oil-goi-activate', location.origin);
}
