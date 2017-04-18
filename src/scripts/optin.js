import Cookie from 'js-cookie';
import { isCookie, isCookieValid } from './utils.js';

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
  return Cookie.set(oilCookie.name, oilCookie.config, {expires: oilCookie.expires});
}

/**
 * Oil optIn
 * @return promise with updated cookie value
 */
export function oilOptIn() {
  // Cookie should be there...
  const cookieData = Cookie.getJSON(oilCookie.name);
  const newCookieData = Object.assign({}, cookieData, {optin: true});

  // Update Oil cookie
  Cookie.set(oilCookie.name, newCookieData, {
    expires: oilCookie.expires
  });

  // Update classes on Oil overlay DOM element
  return new Promise((resolve) => {
    resolve(newCookieData);
    console.log("User opted in, cookie set");
  });
}


/**
 * Oil optLater
 * @return promise with updated cookie value
 */
export function oilOptLater() {
  // Cookie should be there...
  const cookieData = Cookie.getJSON(oilCookie.name)
  const newCookieData = Object.assign({}, cookieData, {expanded: false});

  // Update Oil cookie
  Cookie.set(oilCookie.name, newCookieData, {
    expires: oilCookie.expires
  });

  // Update classes on Oil overlay DOM element
  return new Promise((resolve) => {
    resolve(newCookieData);
    console.log("User opted later, cookie set");
  });
}
