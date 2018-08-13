import { OIL_CONFIG } from './core_constants.js';
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
    if(!getLocaleVariantName()) {
      logError('Your configuration is faulty: "locale" object misses "localeId" property. See the oil.js documentation for details.');
    }
    if(getLocale() && !getLocale().version) {
      logError('Your configuration is faulty: "locale" object misses "version" property.');
    }
    setGlobalOilObject('CONFIG_ATTRIBUTES', OIL_CONFIG);

    parseServerUrls();
  }
  return getGlobalOilObject('CONFIG');
}

/**
 * 1) Extracts the locale from the config. The locale can be a string to use with the language backend
 * or it can be an object containing all labels
 *
 * 2) Sets the publicPath for async loading from Webpack
 * cf. https://webpack.js.org/guides/public-path/
 *
 */
function parseServerUrls() {
  const localeValue = getLocale();

  if ((!localeValue || (typeof localeValue) === 'string') && getLocaleUrl() === undefined) {
    logError('Incorrect or missing locale parameter found. Please review documentation on how to set the locale object in your configuration.');
    setLocaleUrl('https://oil-backend.herokuapp.com/oil/api/userViewLocales/' + getLocaleVariantName());
  }

  if (getPublicPath()) {
    __webpack_public_path__ = getPublicPath();
  }
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

function setConfigValue(name, value) {
  getConfiguration()[name] = value;
}

// **
//  Public Interface
// **
/**
 * Checks if PreviewMode is activated.
 * @returns {*}
 */
export function isPreviewMode() {
  return getConfigValue(OIL_CONFIG.ATTR_PREVIEW_MODE, false);
}

/**
 * Checks if POI is activated.
 * @returns {*}
 */
export function isPoiActive() {
  return getConfigValue(OIL_CONFIG.ATTR_ACTIVATE_POI, false);
}

export function isSubscriberSetCookieActive() {
  return getConfigValue(OIL_CONFIG.ATTR_SUB_SET_COOKIE, true);
}

/**
 * Get the hub iFrame domain with protocol prefix for the current location
 * @returns {string, null} domain iframe orgin
 */
export function getHubOrigin() {
  let origin = getConfigValue(OIL_CONFIG.ATTR_HUB_ORIGIN, '//oil.axelspringer.com');
  if (origin) {
    return origin.indexOf('http') !== -1 ? origin : location.protocol + origin;
  }
  return null;
}

export function getHubPath() {
  return getConfigValue(OIL_CONFIG.ATTR_HUB_PATH, `/release/${OilVersion.getLatestReleaseVersion()}/hub.html`);
}

/**
 * The server path from which all chunks and ressources will be loaded.
 * @returns {string, '//oil.axelspringer.com'}
 */
export function getPublicPath() {
  let publicPath = getConfigValue(OIL_CONFIG.ATTR_PUBLIC_PATH, undefined);
  if(publicPath && publicPath.substr(-1) !== '/') {
    publicPath += '/'
  }
  return publicPath;
}

export function getLocaleUrl() {
  return getConfigValue(OIL_CONFIG.ATTR_LOCALE_URL, undefined);
}

function setLocaleUrl(value) {
  setConfigValue(OIL_CONFIG.ATTR_LOCALE_URL, value);
}

export function getIabVendorListUrl() {
  return getConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_LIST_URL, 'https://vendorlist.consensu.org/vendorlist.json');
}

export function getIabVendorBlacklist() {
  return getConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_BLACKLIST, undefined);
}

export function getIabVendorWhitelist() {
  return getConfigValue(OIL_CONFIG.ATTR_IAB_VENDOR_WHITELIST, undefined);
}

export function getPoiGroupName() {
  return getConfigValue(OIL_CONFIG.ATTR_POI_GROUP_NAME, 'default');
}

export function getCookieExpireInDays() {
  return getConfigValue(OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS, 31);
}

export function getLocaleVariantName() {
  let localeVariantName = getLocale();
  if (!localeVariantName) {
    localeVariantName = 'enEN_01';
  }
  if (localeVariantName && isObject(localeVariantName)) {
    return localeVariantName.localeId;
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
  if (getHubOrigin() && getHubPath()) {
    return getHubOrigin() + getHubPath();
  }
  return null;
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

