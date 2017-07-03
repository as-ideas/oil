import Cookie from 'js-cookie';
import { logInfo } from './log.js';

/**
 * Merge the objects,
 * For a deep extend, set the first argument to `true`.
 * @param arguments objects to merge as arguments.
 * @returns {{}} merged object
 * @function
 */
export function extend() {

  // Variables
  let extended = {},
    deep = false,
    i = 0,
    length = arguments.length;

  function merge(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        // If deep merge and property is an object, merge properties
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  }

  // Check if a deep merge
  if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
    deep = arguments[0];
    i++;
  }

  // Loop through each object and conduct a merge
  for (; i < length; i++) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
}


/**
 * Check if environment is set to production
 * @returns {boolean} true if environment is production, otherwise false
 * @function
 */
export function isProd() {
  switch (process.env.NODE_ENV) {
    case "production":
    case "prod":
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
    case "development":
    case "dev":
      return true;
    default: 
      return false;
  }
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


/**
 * Checks if given element is a DOM element
 * Source: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @param  a DOM element or any other value
 * @return {boolean} true if value is a DOM element, otherwise false
 */
export function isDOMElement(o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : // DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
}


/**
 * Simple add click handler util function
 * @param element: DOM element
 * @param func: callback function
 */
export function addClickHandler(element, func) {
  if (isDOMElement(element) && typeof (func) === 'function') {
    element.addEventListener('click', func, false);
  }
}


/**
 * Checks weather the cookie is able to store cookies
 * @return true or false
 */
export function isBrowserCookieEnabled() {
  Cookie.set('oil_cookie_exp', 'cookiedata');
  let result = isCookie('oil_cookie_exp');
  Cookie.remove('oil_cookie_exp');
  return result;
}


/**
 * Checks weather a cookie exists
 * @param name {string} Name of cookie
 * @return true or false
 */
export function isCookie(name) {
  if (typeof (Cookie.get(name)) === 'undefined') {
    return false
  }
  return true
}


/**
 * Checks if a cookie contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of dataobject
 * @returns true or false
 */
export function cookieDataHasKeys(name, data) {
  if (typeof (name) === 'string' && Array.isArray(data)) {
    if (isCookie(name)) {
      const cookieData = Cookie.getJSON(name)
      return data.every((item) => {
        return cookieData.hasOwnProperty(item)
      })
    }
    return false
  }
  return false
}


/**
 * Robust util function to get the origin of the current window, even if window.location.origin is undefined
 *
 * @returns string origin of current window
 */
export function getOrigin() {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  return window.location.origin
}


/**
 * Checks if a cookie is valid and contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of dataobject
 * @returns true or false
 */
export function isCookieValid(name, data) {
  return cookieDataHasKeys(name, data)
}


// Create IE + others compatible event handler
let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
let eventRemoveMethod = window.removeEventListener ? 'removeEventListener' : 'removeEvent';
let eventer = window[eventMethod];
let eventerRemove = window[eventRemoveMethod];
let messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
let messageRemoveEvent = eventRemoveMethod === 'removeEvent' ? 'onmessage' : 'message';


/**
 *
 * @param {*} callback
 */
export function removeMessageListener(callback) {
  eventerRemove(messageRemoveEvent, callback, false);
}


/**
 *
 * @param {*} callback
 */
export function registerMessageListener(callback) {
  eventer(messageEvent, callback, false);
}


/**
 * Returns the current client timestamp
 *
 * @returns {number}
 */
export function getClientTimestamp() {
  if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
  }

  return Date.now();
}
