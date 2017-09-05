import Cookie from 'js-cookie';
import { isCookie, isCookieValid, getClientTimestamp } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration } from './config.js';
import { logInfo } from './log.js';


/**
 * Internal Methods
 */

const OIL_DOMAIN_COOKIE = {
  NAME: 'oil_data',
  ATTR_OPTIN: 'opt_in',
  ATTR_TIMESTAMP: 'timestamp'
};


const OIL_SESSION_COOKIE = {
  NAME: 'oil_data_session',
  ATTR_OPTLATER: 'opt_later'
};


const OIL_HUB_DOMAIN_COOKIE = {
  NAME: 'oil_data',
  ATTR_POI: 'power_opt_in',
  ATTR_TIMESTAMP: 'timestamp'
};


function getOilSessionCookieConfig() {
  return {
    name: OIL_SESSION_COOKIE.NAME,
    default_content: {
      [OIL_SESSION_COOKIE.ATTR_OPTLATER]: false
    }
  };
}


function getOilDomainCookieConfig() {
  let config = getConfiguration();

  return {
    name: OIL_DOMAIN_COOKIE.NAME,
    expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS],
    default_content: {
      [OIL_DOMAIN_COOKIE.ATTR_OPTIN]: false,
      [OIL_DOMAIN_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp()
    }
  };
}


function getOilHubDomainCookieConfig() {
  let config = getConfiguration();

  return {
    name: OIL_HUB_DOMAIN_COOKIE.NAME,
    expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS],
    default_content: {
      [OIL_HUB_DOMAIN_COOKIE.ATTR_POI]: false,
      [OIL_HUB_DOMAIN_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp()
    }
  };
}


function setSessionCookie(name, value) {
  Cookie.set(name, value);
}


function setDomainCookie(name, value, expires_in_days) {
  Cookie.set(name, value, {expires: expires_in_days});
}


function getOilDomainCookie() {
  if (!isCookie(getOilDomainCookieConfig().name)) {
    return getOilDomainCookieConfig().default_content;
  }

  if (!isCookieValid(getOilDomainCookieConfig().name, Object.keys(getOilDomainCookieConfig().default_content))) {
    return getOilDomainCookieConfig().default_content;
  }

  return Cookie.getJSON(getOilDomainCookieConfig().name);
}


function getOilSessionCookie() {
  if (!isCookie(getOilSessionCookieConfig().name)) {
    return getOilSessionCookieConfig().default_content;
  }

  if (!isCookieValid(getOilSessionCookieConfig().name, Object.keys(getOilSessionCookieConfig().default_content))) {
    return getOilSessionCookieConfig().default_content;
  }

  return Cookie.getJSON(getOilSessionCookieConfig().name);
}


function getOilHubDomainCookie() {
  if (!isCookie(getOilHubDomainCookieConfig().name)) {
    return getOilHubDomainCookieConfig().default_content;
  }

  if (!isCookieValid(getOilHubDomainCookieConfig().name, Object.keys(getOilHubDomainCookieConfig().default_content))) {
    return getOilHubDomainCookieConfig().default_content;
  }

  return Cookie.getJSON(getOilDomainCookieConfig().name);
}


/**
 * Public Interface
 *
 */

export function setSoiOptIn(value) {
  let cookie = getOilDomainCookie();
  if (value !== cookie.opt_in) {
    cookie.opt_in = value;
    cookie.timestamp = getClientTimestamp();
    setDomainCookie(getOilDomainCookieConfig().name, cookie, getOilDomainCookieConfig().expires);
  }
}


export function setOptLater(value) {
  let cookie = getOilSessionCookie();
  if (value !== cookie.opt_later) {
    cookie.opt_later = value;
    setSessionCookie(getOilSessionCookieConfig().name, cookie);
  }
}


export function setPoiOptIn(value) {
  let cookie = getOilHubDomainCookie();
  if (value !== cookie.power_opt_in) {
    cookie.power_opt_in = value;
    cookie.timestamp = getClientTimestamp();
    setDomainCookie(getOilHubDomainCookieConfig().name, cookie, getOilHubDomainCookieConfig().expires);
  }
}


export function setOilOptIgnore(value) {
  let cookie = getOilSessionCookie();
  if (value !== cookie.opt_ignore) {
    cookie.opt_ignore = value;
    setSessionCookie(getOilSessionCookieConfig().name, cookie);
  }
}


export function getSoiOptIn() {
  let cookie = getOilDomainCookie();
  logInfo(cookie);
  logInfo(cookie.opt_in);
  return cookie.opt_in;
}


export function hasOptedLater() {
  let cookie = getOilSessionCookie();
  logInfo(cookie);
  logInfo(cookie.opt_later);
  return cookie.opt_later;
}


export function hasOptedIgnore() {
  let cookie = getOilSessionCookie();
  logInfo(cookie);
  logInfo(cookie.opt_ignore);
  return cookie.opt_ignore;
}


export function getPoiOptIn() {
  let cookie = getOilHubDomainCookie();
  logInfo(cookie);
  logInfo(cookie.power_opt_in);
  return cookie.power_opt_in;
}


export function removeSubscriberCookies() {
  Cookie.remove(OIL_DOMAIN_COOKIE.NAME);
  Cookie.remove(OIL_SESSION_COOKIE.NAME);
}


export function removeHubCookies() {
  Cookie.remove(OIL_HUB_DOMAIN_COOKIE.NAME);
}


export function isDeveloperCookieSet() {
  return Cookie.get('oil_developer') === 'true';
}

