import {getCookieExpireInDays} from '../core/core_config.js'
import {OIL_PAYLOAD_LOCALE_VARIANT_NAME, OIL_PAYLOAD_LOCALE_VARIANT_VERSION, OIL_PAYLOAD_PRIVACY, OIL_PAYLOAD_VERSION, PRIVACY_MINIMUM_TRACKING} from '../core/core_constants.js';
import {setDomainCookie} from '../core/core_cookies.js';
import {logInfo} from '../core/core_log.js';
import {OIL_SPEC} from '../core/core_constants';
import {getLanguageFromLocale} from '../core/core_config';
import {getVendorList, isVendorListFetched, loadVendorList} from '../core/core_vendor_information';
import {getOilCookie, getPurposesWithConsent, hasOutdatedOilCookie} from '../core/core_cookies';
import {getLimitedVendorIds} from '../core/core_consents';
import Cookie from 'js-cookie';
import {logError} from '../core/core_log';

const {ConsentString} = require('consent-string');

const OIL_HUB_DOMAIN_COOKIE_NAME = 'oil_data';
const OIL_HUB_UNKNOWN_VALUE = 'unknown';

export function getPoiCookie(groupName = '') {
  let cookieConfig = getHubDomainCookieConfig(groupName);
  let cookie = hasOutdatedOilCookie(cookieConfig) ? transformOutdatedOilCookie(cookieConfig) : getOilCookie(cookieConfig);
  logInfo('Oil Hub Domain Cookie: ', cookie);
  return cookie;
}

export function setPoiCookie(groupName = '', payload) {
  return new Promise((resolve, reject) => {
    loadVendorList().then(() => {
      let cookieConfig = getHubDomainCookieConfig(groupName);
      let localeVariantName = getLocaleVariantNameFromPayload(payload);

      let cookie = getOilCookie(cookieConfig);
      updateCookieWithCurrentCmpConfiguration(cookie, cookieConfig);
      cookie.power_opt_in = true;
      cookie.version = getVersionFromPayload(payload);
      cookie.localeVariantName = localeVariantName;
      cookie.localeVariantVersion = getLocaleVariantVersionFromPayload(payload);
      cookie.consentData.setConsentLanguage(getLanguageFromLocale(localeVariantName));
      cookie.consentData.setPurposesAllowed(getPurposesWithConsent(getPrivacySettingsFromPayload(payload)));
      cookie.consentData.setVendorsAllowed(getLimitedVendorIds());
      cookie.consentString = cookie.consentData.getConsentString();
      setDomainCookie(cookieConfig.name, cookie, cookieConfig.expires);
      resolve();
    }).catch(error => {
      logError(error);
      reject(error);
    });
  });
}

function transformOutdatedOilCookie(cookieConfig) {
  let cookieJson = Cookie.getJSON(cookieConfig.name);

  let cookie = cookieConfig.defaultCookieContent;
  cookie.power_opt_in = cookieJson.power_opt_in;
  cookie.version = cookieJson.version;
  cookie.localeVariantName = cookieJson.localeVariantName;
  cookie.localeVariantVersion = cookieJson.localeVariantVersion;
  cookie.consentData.setConsentLanguage(getLanguageFromLocale(cookieJson.localeVariantName));
  cookie.consentData.setPurposesAllowed(getPurposesWithConsent(cookieJson.privacy));
  cookie.consentData.setVendorsAllowed(getLimitedVendorIds());
  return cookie;
}

function getOilHubCookieName(groupName) {
  if (groupName) {
    return groupName + '_' + OIL_HUB_DOMAIN_COOKIE_NAME;
  }
  return OIL_HUB_DOMAIN_COOKIE_NAME;
}

function getHubDomainCookieConfig(groupName) {
  let consentData = new ConsentString();
  consentData.setCmpId(OIL_SPEC.CMP_ID);
  consentData.setCmpVersion(OIL_SPEC.CMP_VERSION);
  consentData.setConsentScreen(1);

  consentData.setConsentLanguage('en'); // this value can't be figured out
  consentData.setPurposesAllowed([]);
  consentData.setVendorsAllowed([]);
  if (isVendorListFetched()) {
    consentData.setGlobalVendorList(getVendorList());
  }

  return {
    name: getOilHubCookieName(groupName),
    expires: getCookieExpireInDays(),
    defaultCookieContent: {
      power_opt_in: false,
      version: OIL_HUB_UNKNOWN_VALUE, // this value can't be figured out
      localeVariantName: OIL_HUB_UNKNOWN_VALUE, // this value can't be figured out
      localeVariantVersion: 0, // this value can't be figured out
      consentData: consentData,
      consentString: '' // consent string is not computed because global vendor list may be missing here
    },
    outdated_cookie_content_keys: ['power_opt_in', 'timestamp', 'version', 'localeVariantName', 'localeVariantVersion', 'privacy']
  };
}

function updateCookieWithCurrentCmpConfiguration(cookie, cookieConfig) {
  cookie.consentData.setGlobalVendorList(getVendorList());
  cookie.consentData.setCmpVersion(cookieConfig.defaultCookieContent.consentData.getCmpVersion());
}

function getPrivacySettingsFromPayload(payload) {
  if (payload) {
    if (payload[OIL_PAYLOAD_PRIVACY]) {
      return payload[OIL_PAYLOAD_PRIVACY];
    } else { // backwards compatibility, when the payload was only the privacySettings
      return payload;
    }
  }
  return PRIVACY_MINIMUM_TRACKING;
}

function getVersionFromPayload(payload) {
  if (payload && payload[OIL_PAYLOAD_VERSION]) {
    return payload[OIL_PAYLOAD_VERSION];
  }
  return OIL_HUB_UNKNOWN_VALUE;
}

function getLocaleVariantNameFromPayload(payload) {
  if (payload && payload[OIL_PAYLOAD_LOCALE_VARIANT_NAME]) {
    return payload[OIL_PAYLOAD_LOCALE_VARIANT_NAME];
  }
  return OIL_HUB_UNKNOWN_VALUE;
}

function getLocaleVariantVersionFromPayload(payload) {
  if (payload && payload[OIL_PAYLOAD_LOCALE_VARIANT_VERSION]) {
    return payload[OIL_PAYLOAD_LOCALE_VARIANT_VERSION];
  }
  return OIL_HUB_UNKNOWN_VALUE;
}
