import Cookie from 'js-cookie';
import { getCookieExpireInDays, getLocale } from './core_config.js';
import { PRIVACY_MINIMUM_TRACKING } from './core_constants.js';
import { OilVersion, getClientTimestamp } from './core_utils.js';
import { logInfo } from './core_log.js';

const COOKIE_PREVIEW_NAME = 'oil_preview';
const COOKIE_VERBOSE_NAME = 'oil_verbose';

const OIL_DOMAIN_COOKIE_NAME = 'oil_data';
const OIL_SESSION_COOKIE_NAME = 'oil_data_session';

export function setSessionCookie(name, value) {
  Cookie.set(name, value);
}

export function setDomainCookie(name, value, expires_in_days) {
  Cookie.set(name, value, {expires: expires_in_days});
}

/**
 * Checks weather a cookie exists
 * @param name {string} Name of cookie
 * @return true or false
 */
function isCookie(name) {
  return typeof (Cookie.get(name)) !== 'undefined';
}

/**
 * Checks if a cookie contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of dataobject
 * @returns boolean
 */
function cookieDataHasKeys(name, data) {
  if (typeof (name) === 'string' && Array.isArray(data)) {
    if (isCookie(name)) {
      const cookieData = Cookie.getJSON(name);
      return data.every((item) => {
        return cookieData.hasOwnProperty(item);
      })
    }
  }
  return false;
}

/**
 * Checks if a cookie is valid and contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of dataobject
 * @returns boolean
 */
function isCookieValid(name, data) {
  return cookieDataHasKeys(name, data)
}

function getDomainCookieConfig() {
  return {
    name: OIL_DOMAIN_COOKIE_NAME,
    expires: getCookieExpireInDays(),
    default_content: {
      'opt_in': false,
      'timestamp': getClientTimestamp(),
      'version': OilVersion.get(),
      'locale' : getLocale(),
      'privacy': PRIVACY_MINIMUM_TRACKING
    }
  };
}

function getOilDomainCookie() {
  return getOilCookie(getDomainCookieConfig());
}

// PUBLIC INTERFACE
export function getOilCookie(cookieConfig) {
  if( isCookie(cookieConfig.name) &&
    isCookieValid(cookieConfig.name, Object.keys(cookieConfig.default_content))) {
    return Cookie.getJSON(cookieConfig.name);
  }

  return cookieConfig.default_content;
}

export function setSoiOptIn(privacySettings) {
  let cookie = getOilDomainCookie();
  cookie.opt_in = true;
  cookie.privacy = privacySettings;
  cookie.timestamp = getClientTimestamp();
  cookie.version = OilVersion.get();
  cookie.locale = getLocale();
  setDomainCookie(getDomainCookieConfig().name, cookie, getDomainCookieConfig().expires);
}

export function getSoiCookie() {
  let cookie = getOilDomainCookie();
  logInfo('Current Oil Domain Cookie: ', cookie);
  return cookie;
}

export function getRawSoiCookie() {
  return Cookie.getJSON('oil_data');
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

export function removeSubscriberCookies() {
  Cookie.remove(OIL_DOMAIN_COOKIE_NAME);
  Cookie.remove(OIL_SESSION_COOKIE_NAME);
}

/**
 * Checks weather the browser is able to store cookies
 * @return true or false
 */
export function isBrowserCookieEnabled() {
  Cookie.set('oil_cookie_exp', 'cookiedata');
  let result = isCookie('oil_cookie_exp');
  Cookie.remove('oil_cookie_exp');
  return result;
}


