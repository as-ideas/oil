import Cookie from 'js-cookie';
import { logInfo } from './core_log';
import { getConfigVersion, getCookieExpireInDays, getCookieDomain, getCustomPurposes, getDefaultToOptin, getLanguage, getLanguageFromLocale, getLocaleVariantName } from './core_config';
import { getLocaleVariantVersion } from './core_utils';
import { OIL_CONFIG_DEFAULT_VERSION, OIL_SPEC } from './core_constants';
import { getCustomVendorListVersion, getLimitedVendorIds, getPurposes, getVendorList, loadVendorListAndCustomVendorList } from './core_vendor_lists';
import { OilVersion } from './core_utils';

const {ConsentString} = require('consent-string');

const COOKIE_PREVIEW_NAME = 'oil_preview';
const COOKIE_VERBOSE_NAME = 'oil_verbose';

const OIL_DOMAIN_COOKIE_NAME = 'oil_data';
const OIL_SESSION_COOKIE_NAME = 'oil_data_session';

export function setSessionCookie(name, value) {
  Cookie.set(name, value);
}

export function setDomainCookie(name, value, expires_in_days, domain) {
  // decoded consent data must not be written to the cookie
  delete value.consentData;
  Cookie.set(name, value, {expires: expires_in_days, domain: domain});
}

export function getOilCookie(cookieConfig) {
  let cookieJson = Cookie.getJSON(cookieConfig.name);
  cookieJson.consentData = new ConsentString(cookieJson.consentString);
  return cookieJson;
}

export function hasOutdatedOilCookie(cookieConfig) {
  return isCookieValid(cookieConfig.name, cookieConfig.outdated_cookie_content_keys);
}

export function findCookieConsideringCookieVersions(cookieConfig, outdatedCookieTransformer) {
  let cookie;

  if (hasCurrentOilCookie(cookieConfig)) {
    cookie = getOilCookie(cookieConfig);
  } else if (hasOilCookieWithoutVersion(cookieConfig)) {
    cookie = getOilCookie(cookieConfig);
    cookie.configVersion = OIL_CONFIG_DEFAULT_VERSION;
  } else if (hasOutdatedOilCookie(cookieConfig)) {
    cookie = outdatedCookieTransformer(cookieConfig);
  } else {
    cookie = cookieConfig.defaultCookieContent;
  }
  return cookie;
}

export function getSoiCookie() {
  let cookieConfig = getOilCookieConfig();
  let cookie = findCookieConsideringCookieVersions(cookieConfig, transformOutdatedOilCookie);

  logInfo('Current Oil data from domain cookie: ', cookie);
  return cookie;
}

export function setSoiCookieWithPoiCookieData(poiCookieJson) {
  return new Promise((resolve, reject) => {
    loadVendorListAndCustomVendorList().then(() => {
      let cookieConfig = getOilCookieConfig();
      let consentString;
      let configVersion = poiCookieJson.configVersion || cookieConfig.configVersion;

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
        customVendorListVersion: poiCookieJson.customVendorListVersion,
        customPurposes: poiCookieJson.customPurposes,
        consentString: consentString,
        configVersion: configVersion
      };
      setDomainCookie(cookieConfig.name, cookie, cookieConfig.expires, cookieConfig.domain);
      resolve(cookie);
    }).catch(error => reject(error));
  });
}

export function buildSoiCookie(privacySettings) {
  return new Promise((resolve, reject) => {
    loadVendorListAndCustomVendorList().then(() => {
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
        customVendorListVersion: getCustomVendorListVersion(),
        customPurposes: getCustomPurposesWithConsent(privacySettings),
        consentString: consentData.getConsentString(),
        configVersion: cookieConfig.defaultCookieContent.configVersion
      });
    }).catch(error => reject(error));
  });
}

export function setSoiCookie(privacySettings) {
  return new Promise((resolve, reject) => {
    buildSoiCookie(privacySettings).then((cookie) => {
      setDomainCookie(OIL_DOMAIN_COOKIE_NAME, cookie, getCookieExpireInDays(), getCookieDomain());
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

function hasOilCookieWithoutVersion(cookieConfig) {
  let expectedKeys = Object.keys(cookieConfig.defaultCookieContent);
  expectedKeys.splice(expectedKeys.indexOf('configVersion'), 1);
  return isCookieValid(cookieConfig.name, expectedKeys);
}

function hasCurrentOilCookie(cookieConfig) {
  return isCookieValid(cookieConfig.name, Object.keys(cookieConfig.defaultCookieContent));
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
    domain: getCookieDomain(),
    defaultCookieContent: {
      opt_in: false,
      version: OilVersion.get(),
      localeVariantName: getLocaleVariantName(),
      localeVariantVersion: getLocaleVariantVersion(),
      customPurposes: getAllowedCustomPurposesDefault(),
      consentData: consentData,
      consentString: consentData.getConsentString(),
      configVersion: getConfigVersion()
    },
    outdated_cookie_content_keys: ['opt_in', 'timestamp', 'version', 'localeVariantName', 'localeVariantVersion', 'privacy']
  };
}

function transformOutdatedOilCookie(cookieConfig) {
  let cookieJson = Cookie.getJSON(cookieConfig.name);

  let cookie = cookieConfig.defaultCookieContent;
  cookie.opt_in = cookieJson.opt_in;
  cookie.version = cookieJson.version;
  cookie.localeVariantName = cookieJson.localeVariantName;
  cookie.localeVariantVersion = cookieJson.localeVariantVersion;
  cookie.configVersion = OIL_CONFIG_DEFAULT_VERSION;
  cookie.customPurposes = getCustomPurposesWithConsent(cookieJson.privacy);
  cookie.consentData.setConsentLanguage(getLanguageFromLocale(cookieJson.localeVariantName));
  cookie.consentData.setPurposesAllowed(getStandardPurposesWithConsent(cookieJson.privacy));
  cookie.consentData.setVendorsAllowed(getLimitedVendorIds());
  cookie.consentData.setGlobalVendorList(getVendorList());
  cookie.consentString = cookie.consentData.getConsentString();
  return cookie;
}
