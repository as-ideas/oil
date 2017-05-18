import Cookie from 'js-cookie';
import { activatePowerOptInWithIFrame, activatePowerOptInWithRedirect, verifyPowerOptIn } from './poi.js';
import { logDebug } from './log.js';
import { isCookie, isCookieValid, extend, sendEventToHostSite } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration } from './config.js';

let config = null;

// Our cookie default settings
export const oilCookie = {
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
 * Check Opt In
 * @return promise with updated cookie value
 */
export function checkOptIn() {
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  validateOilCookie();
  let cookieData = getOilCookie();

  return new Promise((resolve) => {
    // Verify Power Opt In
    verifyPowerOptIn().then((optIn) => {
      logDebug('Got following POI value', optIn);
      if (optIn) {
        cookieData.optin = optIn;
      }
      resolve(cookieData);
    });
  });
}


/**
 * Oil optIn power
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return promise with updated cookie value
 */
export function oilPowerOptIn(powerOnly = true) {
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  validateOilCookie();

  let cookieData = getOilCookie();
  let newCookieData = extend(true, {}, cookieData, { optin: true });

  if (!powerOnly) {
    // Update Oil cookie (site - SOI)
    Cookie.set(oilCookie.name, newCookieData, { expires: oilCookie.expires });
  }

  // Update Oil cookie (mypass - POI)
  activatePowerOptInWithIFrame();

  // Check if fallback is needed
  verifyPowerOptIn().then((result) => {
    if (result !== true) {
      logDebug("iFrame POI didnt work. Trying fallback now.");
      activatePowerOptInWithRedirect();
    }
  });

  fireOptInEvent();
  return new Promise((resolve) => {
    resolve(newCookieData);
  });
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
  Cookie.set(oilCookie.name, newCookieData, { expires: oilCookie.expires });

  fireOptInEvent();
  return new Promise((resolve) => {
    resolve(newCookieData);
  });
}

/**
 * Fires the opt-in event for the host site if wanted
 * @return
 */
export function fireOptInEvent() {
  if (!config) {
    config = getConfiguration();
  }
  if (config) {
    let eventName = config[OIL_CONFIG.ATTR_OPT_IN_EVENT_NAME];
    if (eventName) {
      logDebug('Fire OptIn Event ('+eventName+'), notifying host application...');
      sendEventToHostSite(eventName);
    } else {
      logDebug('Fire OptIn Event not configured. No host application notification.');
    }
  }
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
  Cookie.set(oilCookie.name, newCookieData, { expires: oilCookie.expires });

  return new Promise((resolve) => {
    resolve(newCookieData);
  });
}
