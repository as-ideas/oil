import Cookie from 'js-cookie';
import { logDebug } from './log.js';
import { isCookie, isCookieValid, getClientTimestamp } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration, isPoiActive } from './config.js';


// internal

const OIL_DOMAIN_COOKIE = {
  NAME: 'oil_data',
  ATTR_OPTIN: 'opt_in',
  ATTR_TIMESTAMP: 'timestamp'
};

const OIL_SESSION_COOKIE = {
  NAME: 'oil_data_session',
  ATTR_EXPANDED: 'expanded',
};

const OIL_HUB_DOMAIN_COOKIE = {
  NAME: 'oil_data',
  ATTR_POI: 'power_opt_in',
  ATTR_TIMESTAMP: 'timestamp'
};

function getOilSessionCookieConfig() {
  return {
    name: [OIL_SESSION_COOKIE.NAME],
    default_content: {
      [OIL_SESSION_COOKIE.ATTR_EXPANDED]: true
    }
  };
}

function getOilDomainCookieConfig() {
  let config = getConfiguration();

  return {
    name: [OIL_DOMAIN_COOKIE.NAME],
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
    name: [OIL_HUB_DOMAIN_COOKIE.NAME],
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
  Cookie.set(name, value, { expires: expires_in_days });
}

function getOilDomainCookie() {
  if (!isCookie(getOilDomainCookieConfig().name)) {
    return getOilDomainCookieConfig().default_content;
  }

  return Cookie.getJSON(getOilDomainCookieConfig().name);
}

function getOilSessionCookie() {
  if (!isCookie(getOilSessionCookieConfig().name)) {
    return getOilSessionCookieConfig().default_content;
  }

  return Cookie.getJSON(getOilSessionCookieConfig().name);
}

function getOilHubDomainCookie() {
  if (!isCookie(getOilHubDomainCookieConfig().name)) {
    return getOilHubDomainCookieConfig().default_content;
  }

  return Cookie.getJSON(getOilDomainCookieConfig().name);
}

// Publics

export function setSoiOptIn(value) {
  let cookie = getOilDomainCookie();
  cookie.optin = value;
  cookie.timestamp = getClientTimestamp();
  setDomainCookie(getOilDomainCookieConfig().name, cookie, getOilDomainCookieConfig().expires);
}

export function setExpanded(value) {
  let cookie = getOilSessionCookie();
  cookie.expanded = value;
  setSessionCookie(getOilSessionCookieConfig().name, cookie);
}

export function setPoiOptIn(value) {
  let cookie = getOilHubDomainCookie();
  cookie.power_opt_in = value;
  cookie.timestamp = getClientTimestamp();
  setDomainCookie(getOilHubDomainCookieConfig().name, cookie, getOilHubDomainCookieConfig().expires));
}

export function getSoiOptin() {
  let cookie = getOilDomainCookie();
  return cookie.optin;
}

export function getExpanded() {
  let cookie = getOilSessionCookie();
  return cookie.expanded;
}

export function getPoiOptin() {
  let cookie = getOilHubDomainCookie();
  return cookie.power_opt_in;
}

