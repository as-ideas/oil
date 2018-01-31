import Cookie from 'js-cookie';
import { isCookie, isCookieValid, getClientTimestamp } from './utils.js';
import { OIL_CONFIG, PRIVACY_MINIMUM_TRACKING, PRIVACY_FUNCTIONAL_TRACKING, PRIVACY_FULL_TRACKING, PRIVACY_SETTINGS_FULL_TRACKING, PRIVACY_SETTINGS_FUNCTIONAL_TRACKING, PRIVACY_SETTINGS_MINIMUM_TRACKING } from './constants.js';
import { getConfiguration } from './config.js';
import { logInfo } from './log.js';


/**
 * Internal Methods
 */

const OIL_DOMAIN_COOKIE = {
  NAME: 'oil_data',
  ATTR_OPTIN: 'opt_in',
  ATTR_TIMESTAMP: 'timestamp',
  ATTR_VERSION: 'version',
  ATTR_PRIVACY: 'privacy'
};


const OIL_SESSION_COOKIE = {
  NAME: 'oil_data_session',
  ATTR_OPTLATER: 'opt_later'
};


const OIL_HUB_DOMAIN_COOKIE = {
  NAME: 'oil_data',
  ATTR_POI: 'power_opt_in',
  ATTR_TIMESTAMP: 'timestamp',
  ATTR_VERSION: 'version',
  ATTR_PRIVACY: 'privacy'
};

const COOKIE_PREVIEW_NAME = 'oil_preview';


const COOKIE_VERBOSE_NAME = 'oil_verbose';


export function getOilSessionCookieConfig() {
  return {
    name: OIL_SESSION_COOKIE.NAME,
    default_content: {
      [OIL_SESSION_COOKIE.ATTR_OPTLATER]: false
    }
  };
}


export function getOilDomainCookieConfig() {
  let config = getConfiguration();

  return {
    name: OIL_DOMAIN_COOKIE.NAME,
    expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS],
    default_content: {
      [OIL_DOMAIN_COOKIE.ATTR_OPTIN]: false,
      [OIL_DOMAIN_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp(),
      [OIL_DOMAIN_COOKIE.ATTR_VERSION]: `${process.env.OIL_VERSION}`,
      [OIL_DOMAIN_COOKIE.ATTR_PRIVACY]: PRIVACY_MINIMUM_TRACKING
    }
  };
}

function getOilHubCookieName(groupName) {
  if (groupName) {
    return groupName + '_' + OIL_HUB_DOMAIN_COOKIE.NAME;
  }
  return OIL_HUB_DOMAIN_COOKIE.NAME;
}

export function getOilHubDomainCookieConfig(groupName) {
  let config = getConfiguration();

  return {
    name: getOilHubCookieName(groupName),
    expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS],
    default_content: {
      [OIL_HUB_DOMAIN_COOKIE.ATTR_POI]: false,
      [OIL_HUB_DOMAIN_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp(),
      [OIL_HUB_DOMAIN_COOKIE.ATTR_VERSION]: `${process.env.OIL_VERSION}`,
      [OIL_HUB_DOMAIN_COOKIE.ATTR_PRIVACY]: PRIVACY_MINIMUM_TRACKING
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


function getOilHubDomainCookie(groupName) {
  if (!isCookie(getOilHubDomainCookieConfig(groupName).name)) {
    return getOilHubDomainCookieConfig(groupName).default_content;
  }

  if (!isCookieValid(getOilHubDomainCookieConfig(groupName).name, Object.keys(getOilHubDomainCookieConfig(groupName).default_content))) {
    return getOilHubDomainCookieConfig(groupName).default_content;
  }

  return Cookie.getJSON(getOilHubDomainCookieConfig(groupName).name);
}


/**
 * Public Interface
 */
export function setSoiOptIn(privacySettings) {
  let cookie = getOilDomainCookie();
  cookie.opt_in = true;
  cookie.privacy = privacySettings;
  cookie.timestamp = getClientTimestamp();
  setDomainCookie(getOilDomainCookieConfig().name, cookie, getOilDomainCookieConfig().expires);
}


export function setOptLater(value) {
  let cookie = getOilSessionCookie();
  if (value !== cookie.opt_later) {
    cookie.opt_later = value;
    setSessionCookie(getOilSessionCookieConfig().name, cookie);
  }
}


export function setPoiOptIn(groupName, privacySettings) {
  let cookie = getOilHubDomainCookie(groupName);
  cookie.power_opt_in = true;
  cookie.privacy = privacySettings;
  cookie.timestamp = getClientTimestamp();
  setDomainCookie(getOilHubDomainCookieConfig(groupName).name, cookie, getOilHubDomainCookieConfig(groupName).expires);
}


export function setOilOptIgnore(value) {
  let cookie = getOilSessionCookie();
  if (value !== cookie.opt_ignore) {
    cookie.opt_ignore = value;
    setSessionCookie(getOilSessionCookieConfig().name, cookie);
  }
}


export function getSoiCookie() {
  let cookie = getOilDomainCookie();
  logInfo('Current Oil Domain Cookie: ', cookie);
  return cookie;
}

export function getSoiPrivacy() {
  let cookie = getOilDomainCookie();
  logInfo('Current Oil Domain Cookie: ', cookie);
  return cookie.privacy;
}


export function hasOptedLater() {
  let cookie = getOilSessionCookie();
  logInfo('Current Oil Session Cookie: ', cookie);
  return cookie.opt_later;
}


export function hasOptedIgnore() {
  let cookie = getOilSessionCookie();
  logInfo('Current Oil Session Cookie: ', cookie);
  return cookie.opt_ignore;
}


export function getPoiCookie(groupName) {
  let cookie = getOilHubDomainCookie(groupName);
  logInfo('Current Oil Hub Domain Cookie: ', cookie);
  return cookie;
}

export function getPoiPrivacy(groupName) {
  let cookie = getOilHubDomainCookie(groupName);
  logInfo('Current Oil Hub Domain Cookie: ', cookie);
  return cookie.privacy;
}


export function removeSubscriberCookies() {
  Cookie.remove(OIL_DOMAIN_COOKIE.NAME);
  Cookie.remove(OIL_SESSION_COOKIE.NAME);
}


export function removeHubCookies() {
  Cookie.remove(OIL_HUB_DOMAIN_COOKIE.NAME);
}

export function setPreviewCookie() {
  setSessionCookie(COOKIE_PREVIEW_NAME, 'true');
}


export function setVerboseCookie() {
  setSessionCookie(COOKIE_VERBOSE_NAME, 'true');
}


export function removePreviewCookie() {
  Cookie.remove(COOKIE_PREVIEW_NAME);
}


export function removeVerboseCookie() {
  Cookie.remove(COOKIE_VERBOSE_NAME);
}


export function isPreviewCookieSet() {
  return Cookie.get(COOKIE_PREVIEW_NAME) === 'true';
}


export function isVerboseCookieSet() {
  return Cookie.get(COOKIE_VERBOSE_NAME) === 'true';
}

export function convertPrivacySettingsToCookieValue(value) {
  switch (value) {
    default:
    case PRIVACY_MINIMUM_TRACKING:
      return PRIVACY_SETTINGS_MINIMUM_TRACKING;
    case PRIVACY_FUNCTIONAL_TRACKING:
      return PRIVACY_SETTINGS_FUNCTIONAL_TRACKING;
    case PRIVACY_FULL_TRACKING:
      return PRIVACY_SETTINGS_FULL_TRACKING;
  }
}

