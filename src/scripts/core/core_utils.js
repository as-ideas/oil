import { logInfo } from './core_log.js';

/**
 * Check if environment is set to production
 * @returns {boolean} true if environment is production, otherwise false
 * @function
 */
export function isProd() {
  switch (process.env.NODE_ENV) {
    case 'production':
    case 'prod':
      return true;
    default:
      return false;
  }
}

/**
 * Check if environment is set to development
 * @returns {boolean} true if environment is development, otherwise false
 * @function
 */
export function isDev() {
  switch (process.env.NODE_ENV) {
    case 'development':
    case 'dev':
      return true;
    default:
      return false;
  }
}

/**
 * Robust util function to get the origin of the current window, even if window.location.origin is undefined
 * @returns string origin of current window
 */
export function getOrigin() {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }
  return window.location.origin
}

/**
 * Sent event to host site
 * @param eventName - event payload to sent
 * @function
 */
export function sendEventToHostSite(eventName) {
  window.postMessage(eventName, getOrigin());
  logInfo(`Sent postmessage event: ${eventName}`);
}

// Create IE + others compatible event handler
let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
let eventRemoveMethod = window.removeEventListener ? 'removeEventListener' : 'removeEvent';
let eventer = window[eventMethod];
let eventerRemove = window[eventRemoveMethod];
let messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
let messageRemoveEvent = eventRemoveMethod === 'removeEvent' ? 'onmessage' : 'message';

/**
 * Remove Message Listener
 * @param {*} callback
 */
export function removeMessageListener(callback) {
  eventerRemove(messageRemoveEvent, callback, false);
}

/**
 * Register Message Listener
 * @param {*} callback
 */
export function registerMessageListener(callback) {
  eventer(messageEvent, callback, false);
}

/**
 * Mockable OilVersion Object for getting the current software version in code, set at compile time
 * @type {{get: (())}}
 */
export let OilVersion = {
  get: () => {
    return `${process.env.OIL_VERSION}`;
  }
};

/**
 * Returns the current client timestamp
 * @returns {number}
 */
export function getClientTimestamp() {
  if (!Date.now) {
    Date.now = function () {
      return new Date().getTime();
    }
  }
  return Date.now();
}
