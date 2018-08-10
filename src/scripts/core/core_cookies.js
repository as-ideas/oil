import Cookie from 'js-cookie';
import { logInfo } from './core_log';
import { getCookieExpireInDays, getCustomPurposes, getDefaultToOptin, getLanguage, getLanguageFromLocale, getLocaleVariantName } from './core_config';
import { getLocaleVariantVersion } from './core_utils.js';
import { OIL_SPEC } from './core_constants';
import { getLimitedVendorIds, getPurposes, getVendorList, loadVendorList } from './core_vendor_information';
import { OilVersion } from './core_utils';

const {ConsentString} = require('consent-string');

const COOKIE_PREVIEW_NAME = 'oil_preview';
const COOKIE_VERBOSE_NAME = 'oil_verbose';

const OIL_DOMAIN_COOKIE_NAME = 'oil_data';
const OIL_SESSION_COOKIE_NAME = 'oil_data_session';

export function setSessionCookie(name, value) {
  Cookie.set(name, value);
}

export function setDomainCookie(name, value, expires_in_days) {
  // decoded consent data must not be written to the cookie
  delete value.consentData;
  Cookie.set(name, value, {expires: expires_in_days});
}

export function getOilCookie(cookieConfig) {
  if (isCookieValid(cookieConfig.name, Object.keys(cookieConfig.defaultCookieContent))) {
    let cookieJson = Cookie.getJSON(cookieConfig.name);
    cookieJson.consentData = new ConsentString(cookieJson.consentString);
    return cookieJson;
  }
  return cookieConfig.defaultCookieContent;
}

export function hasOutdatedOilCookie(cookieConfig) {
  return isCookieValid(cookieConfig.name, cookieConfig.outdated_cookie_content_keys);
}

export function getSoiCookie() {
  let cookieConfig = getOilCookieConfig();
  let cookie = hasOutdatedOilCookie(cookieConfig) ? transformOutdatedOilCookie(cookieConfig) : getOilCookie(cookieConfig);
  logInfo('Current Oil data from domain cookie: ', cookie);
  return cookie;
}

export function setSoiCookieWithPoiCookieData(poiCookieJson) {
  return new Promise((resolve, reject) => {
    loadVendorList().then(() => {
      let cookieConfig = getOilCookieConfig();
      let consentString;

      if (poiCookieJson.consentString) {
        consentString = poiCookieJson.consentString;
      } else {
        let consentData = cookieConfig.defaultCookieContent.consentData;
        consentData.setPurposesAllowed(poiCookieJson.consentData.allowedPurposeIds);
        consentData.setVendorsAllowed(poiCookieJson.consentData.allowedVendorIds);
        consentData.setConsentLanguage(poiCookieJson.consentData.consentLanguage);
        consentString = consentData.getConsentString();
      }
      let cookie = {
        opt_in: true,
        version: cookieConfig.defaultCookieContent.version,
        localeVariantName: cookieConfig.defaultCookieContent.localeVariantName,
        localeVariantVersion: cookieConfig.defaultCookieContent.localeVariantVersion,
        customPurposes: poiCookieJson.customPurposes,
        consentString: consentString
      };
      setDomainCookie(cookieConfig.name, cookie, cookieConfig.expires);
      resolve(cookie);
    }).catch(error => reject(error));
  });
}

export function buildSoiCookie(privacySettings) {
  return new Promise((resolve, reject) => {
    loadVendorList().then(() => {
      let cookieConfig = getOilCookieConfig();
      let consentData = cookieConfig.defaultCookieContent.consentData;
      consentData.setGlobalVendorList(getVendorList());
      consentData.setPurposesAllowed(getStandardPurposesWithConsent(privacySettings));
      consentData.setVendorsAllowed(getLimitedVendorIds());
      resolve({
        opt_in: true,
        version: cookieConfig.defaultCookieContent.version,
        localeVariantName: cookieConfig.defaultCookieContent.localeVariantName,
        localeVariantVersion: cookieConfig.defaultCookieContent.localeVariantVersion,
        customPurposes: getCustomPurposesWithConsent(privacySettings),
        consentString: consentData.getConsentString()
      });
    }).catch(error => reject(error));
  });
}

export function setSoiCookie(privacySettings) {
  return new Promise((resolve, reject) => {
    buildSoiCookie(privacySettings).then((cookie) => {
      setDomainCookie(OIL_DOMAIN_COOKIE_NAME, cookie, getCookieExpireInDays());
      resolve(cookie);
    }).catch(error => reject(error));
  });
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

export function removeHubCookie(poiGroup) {
  removeSubscriberCookies();
  if (poiGroup) {
    Cookie.remove(`${poiGroup}_${OIL_DOMAIN_COOKIE_NAME}`);
  }
}

/**
 * Checks weather the browser is able to store cookies
 * @return boolean
 */
export function isBrowserCookieEnabled() {
  Cookie.set('oil_cookie_exp', 'cookiedata');
  let result = isCookie('oil_cookie_exp');
  Cookie.remove('oil_cookie_exp');
  return result;
}

export function getStandardPurposesWithConsent(privacySettings) {
  if (typeof privacySettings === 'object') {
    return getPurposes().map(({id}) => id).filter(purposeId => privacySettings[purposeId]);
  } else {
    return privacySettings === 1 ? getPurposes().map(({id}) => id) : [];
  }
}

export function getCustomPurposesWithConsent(privacySettings, allCustomPurposes) {
  if (!allCustomPurposes) {
    allCustomPurposes = getCustomPurposes();
  }
  if (typeof privacySettings === 'object') {
    return allCustomPurposes.map(({id}) => id).filter(purposeId => privacySettings[purposeId]);
  } else {
    return privacySettings === 1 ? allCustomPurposes.map(({id}) => id) : [];
  }
}

function getAllowedStandardPurposesDefault() {
  return getDefaultToOptin() ? getPurposes().map(({id}) => id) : [];
}

function getAllowedCustomPurposesDefault() {
  return getCustomPurposesWithConsent(getDefaultToOptin() ? 1 : 0);
}

function getAllowedVendorsDefault() {
  return getDefaultToOptin() ? getLimitedVendorIds() : [];
}

/**
 * Checks weather a cookie exists
 * @param name {string} Name of cookie
 * @return boolean
 */
function isCookie(name) {
  return typeof (Cookie.get(name)) !== 'undefined';
}

/**
 * Checks if a cookie contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of data object
 * @returns boolean
 */
function cookieDataHasKeys(name, data) {
  if (typeof (name) === 'string' && Array.isArray(data)) {
    if (isCookie(name)) {
      const cookieData = Cookie.getJSON(name);
      return data.every(item => item === 'consentData' || cookieData.hasOwnProperty(item))
    }
  }
  return false;
}

/**
 * Checks if a cookie is valid and contains a data object with given keys
 * @param name {string} Name of cookie
 * @param data {array}  Keys of data object
 * @returns boolean
 */
function isCookieValid(name, data) {
  return cookieDataHasKeys(name, data)
}

function getOilCookieConfig() {
  let consentData = new ConsentString();
  consentData.setCmpId(OIL_SPEC.CMP_ID);
  consentData.setCmpVersion(OIL_SPEC.CMP_VERSION);
  consentData.setConsentScreen(1);

  consentData.setConsentLanguage(getLanguage());
  consentData.setPurposesAllowed(getAllowedStandardPurposesDefault());
  consentData.setVendorsAllowed(getAllowedVendorsDefault());
  consentData.setGlobalVendorList(getVendorList());
  return {
    name: OIL_DOMAIN_COOKIE_NAME,
    expires: getCookieExpireInDays(),
    defaultCookieContent: {
      opt_in: false,
      version: OilVersion.get(),
      localeVariantName: getLocaleVariantName(),
      localeVariantVersion: getLocaleVariantVersion(),
      customPurposes: getAllowedCustomPurposesDefault(),
      consentData: consentData,
      consentString: consentData.getConsentString()
    },
    outdated_cookie_content_keys: ['opt_in', 'timestamp', 'version', 'localeVariantName', 'localeVariantVersion', 'privacy']
  };
}

function transformOutdatedOilCookie(cookieConfig) {
  let cookieJson = Cookie.getJSON(OIL_DOMAIN_COOKIE_NAME);

  let cookie = cookieConfig.defaultCookieContent;
  cookie.opt_in = cookieJson.opt_in;
  cookie.version = cookieJson.version;
  cookie.localeVariantName = cookieJson.localeVariantName;
  cookie.localeVariantVersion = cookieJson.localeVariantVersion;
  cookie.customPurposes = getCustomPurposesWithConsent(cookieJson.privacy);
  cookie.consentData.setConsentLanguage(getLanguageFromLocale(cookieJson.localeVariantName));
  cookie.consentData.setPurposesAllowed(getStandardPurposesWithConsent(cookieJson.privacy));
  cookie.consentData.setVendorsAllowed(getLimitedVendorIds());
  cookie.consentData.setGlobalVendorList(getVendorList());
  cookie.consentString = cookie.consentData.getConsentString();
  return cookie;
}
