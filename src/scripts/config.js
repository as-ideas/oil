import { OIL_CONFIG } from './constants.js';
import { extend } from "./utils";
import { logInfo, logError, logDebug } from './log';

const defaultConfig = {
  'hub_origin': '',
  'hub_path': '',
  'subscriber_set_cookie': true,
  'opt_in_event_name': 'oil_optin_done',
  'opt_out_event_name': 'oil_optout_trigger',
  'opt_later_event_name': 'oil_optlater_trigger',
  'developer_mode': 'true',
  'cookie_expires_in_days' : 31,
  'activate_poi': false,
  'privacy_page_url': "",
  'ga_tracking': 0
};

let cachedConfig = null;

/**
 *
 * Get the hub iFrame domain with protocol prefix for the current location
 * @param config - current config
 * @returns {string, null} domain iframe orgin
 */
function getHubDomain(config) {
  if (config[OIL_CONFIG.ATTR_HUB_ORIGIN]) {
    return config[OIL_CONFIG.ATTR_HUB_ORIGIN].indexOf('http') !== -1 ? config[OIL_CONFIG.ATTR_HUB_ORIGIN] : location.protocol + config[OIL_CONFIG.ATTR_HUB_ORIGIN];
  }
  return null;
}
/**
 *
 * Get the hub iFrame URL with protocol prefix for the current location
 * @param config - current config
 * @returns {string, null} complete iframe orgin
 */
function getHubLocation(config) {
  if (config[OIL_CONFIG.ATTR_HUB_ORIGIN] && config[OIL_CONFIG.ATTR_HUB_PATH]) {
    return getHubDomain(config) + config[OIL_CONFIG.ATTR_HUB_PATH];
  }
  return null;
}
/**
 * Merges options or the given element in the following order:
 * - the given defaults
 * - the given options
 * @param options - an object with specific options
 * @param defaults - an object with default options
 * @returns {{}} merged options
 * @function
 */
export function mergeOptions(options, defaults) {
  defaults = defaults || {};
  options = options || {};
  let merged = extend(true, {}, defaults, options);
  logInfo('Got the following merged config:', merged);
  return merged;
}

/**
 * Read configuration of component from JSON script block
 * @param configurationElement - DOM config element
 * @returns {{}} extracted configuration as JSON
 * @function
 */
export function readConfiguration(configurationElement) {
  let parsedConfig = null;
  try {
    if (configurationElement && configurationElement.text) {
      parsedConfig = JSON.parse(configurationElement.text);
      // normalize path and origin with protocol prefix
      parsedConfig[OIL_CONFIG.ATTR_HUB_ORIGIN]  = getHubDomain(parsedConfig);
      parsedConfig[OIL_CONFIG.ATTR_HUB_LOCATION]  = getHubLocation(parsedConfig);
      logInfo('Got the following parsed config', parsedConfig);
    }
  } catch (errorDetails) {
    logError('Error during passing configuration', errorDetails);
  }
  return mergeOptions(parsedConfig, defaultConfig);
}

/**
 * Search HTML document for configuration and read it in
 * @returns Object parsed config
 */
export function getConfiguration() {
  if(!cachedConfig) {
    let configurationElement = document.querySelector('script[type="application/configuration"]');
    cachedConfig = readConfiguration(configurationElement);
  }
  return cachedConfig;
}

/**
 * Checks if POI is activated.
 * @returns {*}
 */
export function isPoiActive() {
  cachedConfig = getConfiguration();
  return cachedConfig[OIL_CONFIG.ATTR_ACTIVATE_POI];
}

/**
 * Checks if devMode is activated.
 * @returns {*}
 */
export function isDevMode() {
  cachedConfig = getConfiguration();
  return cachedConfig[OIL_CONFIG.ATTR_DEVELOPER_MODE];
}

/**
 * Reset configuration, reread from HTML.
 */
export function resetConfiguration() {
  cachedConfig = null;
}

/**
 * Checks if Google Analytics Tracking is activated.
 * @returns {*}

export function isGAActive() {
  cachedConfig = getConfiguration();

  return cachedConfig[OIL_CONFIG.ATTR_GA_TRACKING];
}
 */

/**
 * Track OIL event in Google Analytics if GA is loaded
 */
export function gaTrackEvent(eventAction) {
  cachedConfig = getConfiguration();
  let gaTracking = cachedConfig[OIL_CONFIG.ATTR_GA_TRACKING];

  logDebug("OIL gaTrackEvent config="+ gaTracking +" eventAction="+ eventAction);

  if(gaTracking && window.ga && (typeof ga !== "undefined" && window.ga.loaded)) { 
      // the following line throws a 'ga is not defined' warning, because ga is a method provided by the Google Analytics script
      window.ga('send', 'event', 'OIL', eventAction);
  }
}

/* Making gaTrackEvent available for interace onClick calls */
window.gaTrackEvent = gaTrackEvent;