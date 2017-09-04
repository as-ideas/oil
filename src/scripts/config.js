import { OIL_CONFIG } from './constants.js';
import { extend } from "./utils";
import { logInfo, logError } from './log';

const defaultConfig = {
  'opt_in_event_name': 'oil_optin_done',
  'opt_out_event_name': 'oil_optout_trigger',
  'opt_later_event_name': 'oil_optlater_trigger',
  'opt_ignore_event_name': 'oil_optignore_trigger',
  'has_opted_in_event_name': 'oil_has_optedin',
  'has_opted_later_event_name': 'oil_has_optedlater',
  'has_opted_ignore_event_name': 'oil_has_optedignore',
  'developer_mode': 'true',
  'cookie_expires_in_days' : 31,
  'privacy_page_url': undefined,
  'ga_tracking': 0,
  'productionDebugMode': false,
  "label_intro_heading": "Um euch die besten Inhalte präsentieren zu können, brauchen wir euer Einverständnis",
  "label_later_heading": "Um euch die besten Inhalte präsentieren zu können, brauchen wir euer Einverständnis",
  "label_intro_start": "Wir verwenden Cookies, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch dem Datenschutz entsprechend bestimmte Informationen zu erheben und ggf. auch an Partner zu übertragen.",
  "label_intro_end": "Jetzt Einverständnis erklären:",
  "label_later_start": "Wir verwenden Cookies, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch dem Datenschutz entsprechend bestimmte Informationen zu erheben und ggf. auch an Partner zu übertragen. In unseren Datenschutzbestimmungen erfahren Sie, wie Sie Cookies deaktivieren können",
  "label_later_end": "Jetzt Einverständnis erklären:",
  "label_button_yes_soi": "Jetzt zustimmen",
  "label_button_yes_poi": "Global zustimmen",
  "label_button_no": "Nein, jetzt nicht",
  "label_button_privacy": "Mehr erfahren",
  'poi_activate_poi': false,
  'poi_hub_origin': '',
  'poi_hub_path': '',
  'poi_subscriber_set_cookie': true,
  'oil_ignore': false
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
 * Get OIL configuration from HTML document
 * @returns Object parsed config
 */
export function getConfiguration() {
  if(!cachedConfig) {
    let configurationElement = document.querySelector('script[type="application/configuration"]#oil-configuration');
    if (configurationElement === null) {
      logInfo('No configuration script found, using default values');
    }
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
 * Track OIL Events in Google Analytics
 * eventAction = Text label, for identifying the event
 * nonInteraction = a boolean value to send an event as a non-interaction event for GA
 */
export function gaTrackEvent(eventAction, nonInteraction) {
  cachedConfig = getConfiguration();
  let gaTracking = cachedConfig[OIL_CONFIG.ATTR_GA_TRACKING];

  logInfo("OIL gaTrackEvent config=" + gaTracking + " eventAction=" + eventAction + " nonInteraction=" + nonInteraction);

  if(gaTracking && window.ga && (typeof window.ga !== "undefined" && window.ga.loaded)) { 
      // the following line throws a 'ga is not defined' warning, because ga is a method provided by the Google Analytics script
      window.ga('send', 'event', 'OIL', eventAction, {'nonInteraction': nonInteraction});
  }
}

// Make gaTrackEvents globally available, ie. for onClick events in HTML
window.gaTrackEvent = gaTrackEvent;


/**
 * Allow Console Logging Output in Production Environments
 * @return boolean
 */
export const allowProductionDebugMode = () => {
  return defaultConfig.productionDebugMode;
}