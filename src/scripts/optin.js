import Cookie from 'js-cookie';
import { isCookie, isCookieValid, extend } from './utils.js';

// Our cookie default settings
const oilCookie = {
  name: 'oil_data',
  expires: 31,
  config: {
    optin: false,
    expanded: true
  }
}


export function validateOilCookie() {
  // Set Oil cookie if no cookie exists
  if (!isCookie(oilCookie.name)) {
    setDefaultOilCookie();
  }

  // In case Oil cookie exists but is not valid, create new Oil cookie with default config
  if (!isCookieValid(oilCookie.name, Object.keys(oilCookie.config))) {
    setDefaultOilCookie();
  }
}


export function getOilCookie() {
  return Cookie.getJSON(oilCookie.name);
}


export function setDefaultOilCookie() {
  Cookie.set(oilCookie.name, oilCookie.config, { expires: oilCookie.expires });
}


/**
 * Oil optIn
 * @return promise with updated cookie value
 */
export function oilOptIn() {
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  validateOilCookie();

  let cookieData = getOilCookie();
  let newCookieData = extend(true, {}, cookieData, { optin: true });

  // Update Oil cookie
  Cookie.set(oilCookie.name, newCookieData, {
    expires: oilCookie.expires
  });

  return new Promise((resolve) => {
    resolve(newCookieData);
  });
}


/**
 * Oil optLater
 * @return promise with updated cookie value
 */
export function oilOptLater() {
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  validateOilCookie();

  let cookieData = getOilCookie();
  let newCookieData = extend(true, {}, cookieData, { expanded: false });

  // Update Oil cookie
  Cookie.set(oilCookie.name, newCookieData, {
    expires: oilCookie.expires
  });

  return new Promise((resolve) => {
    resolve(newCookieData);
  });
}
