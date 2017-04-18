import Cookie from 'js-cookie';

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
  if (String('<%= ENV %>') === 'prod' || String('<%= ENV %>') === 'production') {
    return true;
  } else {
    return false;
  }
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
    element.addEventListener('click', func);
  }
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
 * Checks if a cookie is valid and contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of dataobject
 * @returns true or false
 */
export function isCookieValid(name, data) {
  return cookieDataHasKeys(name, data)
}
