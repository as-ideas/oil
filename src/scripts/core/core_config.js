import { OIL_CONFIG } from './core_constants.js';
import { logInfo, logError } from './core_log.js';

let cachedConfig = null;

/**
 * Read configuration of component from JSON script block
 * @param configurationElement - DOM config element
 * @returns {{}} extracted configuration as JSON
 * @function
 */
function readConfiguration(configurationElement) {
  let parsedConfig = null;
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
  if (!cachedConfig) {
    let configurationElement = document.querySelector('script[type="application/configuration"]#oil-configuration');
    if (configurationElement === null) {
      logInfo('Using default config');
    }
    cachedConfig = readConfiguration(configurationElement);
  }
  return cachedConfig;
}

/**
 * Returns a config value or its given default value if not existing in users configuration.
 *
 * @param name
 * @param defaultValue
 * @returns {*}
 */
export function getConfigValue(name, defaultValue) {
  let config = getConfiguration();
  return (config && config[name]) ? config[name] : defaultValue;
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
 *
 * Get the hub iFrame domain with protocol prefix for the current location
 * @returns {string, null} domain iframe orgin
 */
export function getHubOrigin() {
  let origin = getConfigValue(OIL_CONFIG.ATTR_HUB_ORIGIN, '');
  if (origin) {
    return origin.indexOf('http') !== -1 ? origin : location.protocol + origin;
  }
  return null;
}

export function getHubPath() {
  return getConfigValue(OIL_CONFIG.ATTR_HUB_PATH, '');
}

export function getPoiGroupName() {
  return getConfigValue(OIL_CONFIG.ATTR_OIL_POI_GROUP_NAME, 'axelSpringerSe_01');
}

export function getCookieExpireInDays() {
  return getConfigValue(OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS, 31);
}

export function getLocale() {
  return getConfigValue(OIL_CONFIG.ATTR_LOCALE, 'deDE_01');
}

export function getTheme() {
  return getConfigValue(OIL_CONFIG.ATTR_THEME, 'light');
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
  cachedConfig = null;
}
