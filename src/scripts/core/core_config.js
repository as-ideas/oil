import { OIL_CONFIG, OIL_CONFIG_DEFAULT_VERSION } from './core_constants';
import { logError, logInfo } from './core_log.js';
import { getGlobalOilObject, isObject, OilVersion, setGlobalOilObject } from './core_utils';

/**
 * Read configuration of component from JSON script block
 * @param configurationElement - DOM config element
 * @returns {{}} extracted configuration as JSON
 * @function
 */
function readConfiguration(configurationElement) {
  let parsedConfig = {};
  try {
    if (configurationElement && configurationElement.text) {
      parsedConfig = JSON.parse(configurationElement.text);
      logInfo('Parsed config', parsedConfig);
    }
  } catch (errorDetails) {
    logError('Error config', errorDetails);
  }
  return parsedConfig;
}

/**
 * Get OIL configuration from HTML document
 * @returns Object parsed config
 */
function getConfiguration() {
  if (!getGlobalOilObject('CONFIG')) {
    let configurationElement = document.querySelector('script[type="application/configuration"]#oil-configuration');
    if (configurationElement === null) {
      logInfo('Using default config');
    }
    setGlobalOilObject('CONFIG', readConfiguration(configurationElement));
    setGlobalOilObject('CONFIG_ATTRIBUTES', OIL_CONFIG);

    verifyConfiguration();
    verifyLocaleObject();

    if (getPublicPath()) {
      __webpack_public_path__ = getPublicPath();
    }
  }
  return getGlobalOilObject('CONFIG');
}

/**
 * Verify that configuration has a version.
 */
function verifyConfiguration() {
  if (!getConfigValue(OIL_CONFIG.ATTR_CONFIG_VERSION, undefined)) {
    logError('Your configuration is faulty - it must contain a "config_version" property. See the oil.js documentation for details.');
  }
}

/**
 * Verify that locale object does not lack any required properties.
 *
 * The locale can be a
 * a) string to use with the language backend or
 * b) it can be an object containing all labels
 *
 * If both is missing a default will be used.
 */
function verifyLocaleObject() {
  let locale = getLocale();

  if ((!locale || (typeof locale) === 'string') && getLocaleUrl() === undefined) {
    logError('Incorrect or missing locale parameter found. Please review documentation on how to set the locale object in your configuration. Using default locale.');
  } else if (locale && isObject(locale)) {
    if (!locale.localeId) {
      logError('Your configuration is faulty - "locale" object misses "localeId" property. See the oil.js documentation for details.');
    }
    if (!locale.version) {
      logError('Your configuration is faulty - "locale" object misses "version" property. See the oil.js documentation for details.');
    }
  }
}

function setConfigValue(name, value) {
  getConfiguration()[name] = value;
}

/**
 * Returns a config value or its given default value if not existing in users configuration.
 *
 * @param {string} name in form of the key of the config value
 * @param {object} defaultValue as fallback if there is no value found for the key (name)
 * @returns {*}
 */
export function getConfigValue(name, defaultValue) {
  const config = getConfiguration();
  return (config && typeof config[name] !== 'undefined') ? config[name] : defaultValue;
}

// **
//  Public Interface
// **

export function getConfigVersion() {
  return getConfigValue(OIL_CONFIG.ATTR_CONFIG_VERSION, OIL_CONFIG_DEFAULT_VERSION);
}

export function isPreviewMode() {
  return getConfigValue(OIL_CONFIG.ATTR_PREVIEW_MODE, false);
}

export function isPoiActive() {
  return getConfigValue(OIL_CONFIG.ATTR_ACTIVATE_POI, false);
}

/**
 * Get the hub iFrame domain with protocol prefix for the current location
 * @returns {string, null} domain iframe orgin
 */
export function getHubOrigin() {
  let origin = getConfigValue(OIL_CONFIG.ATTR_HUB_ORIGIN, 'https://unpkg.com');
  if (origin) {
    return origin === '/' || origin.indexOf('http') !== -1 ? origin : location.protocol + origin;
  }
  return null;
}

export function getHubPath() {
  return getConfigValue(OIL_CONFIG.ATTR_HUB_PATH, `/@ideasio/oil.js@${OilVersion.getLatestReleaseVersion()}/release/current/hub.html`);
}

/**
 * The server path from which all chunks and ressources will be loaded.
 * @returns {string}
 */
export function getPublicPath() {
  let publicPath = getConfigValue(OIL_CONFIG.ATTR_PUBLIC_PATH, undefined);
  if (publicPath && publicPath.substr(-1) !== '/') {
    publicPath += '/'
  }
  return publicPath;
}

export function getLocaleUrl() {
  return getConfigValue(OIL_CONFIG.ATTR_LOCALE_URL, undefined);
}

export function getIabVendorListUrl() {
  return getConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_LIST_URL, 'https://vendorlist.consensu.org/vendorlist.json');
}

export function getIabVendorBlacklist() {
  return getConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_BLACKLIST, undefined);
}

export function getCustomVendorListUrl() {
  return getConfigValue(OIL_CONFIG.ATTR_CUSTOM_VENDOR_LIST_URL, undefined);
}

export function getIabVendorWhitelist() {
  return getConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_WHITELIST, undefined);
}

export function setIabVendorBlacklist(value) {
  setConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_BLACKLIST, value);
}

export function setIabVendorWhitelist(value) {
  setConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_WHITELIST, value);
}

export function getPoiGroupName() {
  return getConfigValue(OIL_CONFIG.ATTR_POI_GROUP_NAME, 'default');
}

export function getCookieExpireInDays() {
  return getConfigValue(OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS, 31);
}

export function getCookieDomain() {
  return getConfigValue(OIL_CONFIG.ATTR_COOKIE_DOMAIN, '');
}

export function getLocaleVariantName() {
  const defaultLocaleId = 'enEN_01';
  let localeVariantName = getLocale();

  if (!localeVariantName) {
    localeVariantName = defaultLocaleId;
  }
  if (localeVariantName && isObject(localeVariantName)) {
    return localeVariantName.localeId ? localeVariantName.localeId : defaultLocaleId;
  }
  return localeVariantName;
}

export function getLanguage() {
  return getLanguageFromLocale(getLocaleVariantName());
}

export function getLanguageFromLocale(localeVariantName = 'en') {
  return localeVariantName.substring(0, 2);
}

/**
 * Get the hub iFrame URL with protocol prefix for the current location
 * @returns {string, null} complete iframe orgin
 */
export function getHubLocation() {
  return getHubOrigin() + getHubPath();
}

export function getPoiListDirectory() {
  let hubOrigin = getHubOrigin();
  return endsWith(hubOrigin,'/') ? hubOrigin.replace(/\/$/, '/poi-lists') : hubOrigin + '/poi-lists';
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * Reset configuration, reread from HTML.
 */
export function resetConfiguration() {
  setGlobalOilObject('CONFIG', null);
}

export function getCustomPurposes() {
  return getConfigValue(OIL_CONFIG.ATTR_CUSTOM_PURPOSES, []);
}

export function getCustomPurposeIds() {
  return getCustomPurposes().map(({id}) => id);
}

/**
 * Define whether in the advanced settings window checkboxes
 * should be activated by default, even when no consent was given
 * @return {bool, false}
 */
export function getAdvancedSettingsPurposesDefault() {
  return getConfigValue(OIL_CONFIG.ATTR_ADVANCED_SETTINGS_PURPOSES_DEFAULT, false);
}

export function getDefaultToOptin() {
  return getConfigValue(OIL_CONFIG.ATTR_DEFAULT_TO_OPTIN, false);
}

export function getLocale() {
  return getConfigValue(OIL_CONFIG.ATTR_LOCALE, undefined);
}

export function setLocale(localeObject) {
  setConfigValue(OIL_CONFIG.ATTR_LOCALE, localeObject);
}

export function gdprApplies() {
  return getConfigValue(OIL_CONFIG.ATTR_GDPR_APPLIES_GLOBALLY, true) || getConfigValue(OIL_CONFIG.ATTR_GDPR_APPLIES, false);
}

export function setGdprApplies(value = true) {
  setConfigValue(OIL_CONFIG.ATTR_GDPR_APPLIES, value);
}

export function getShowLimitedVendors() {
  return getConfigValue(OIL_CONFIG.ATTR_SHOW_LIMITED_VENDORS_ONLY, false);
}

