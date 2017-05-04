import { OIL_CONFIG } from './constants.js';
import { extend } from "./utils";
import { logInfo, logError } from './log';

// TODO move to config
const defaultConfig = {
  opt_in_event_name: 'oil_optin_done',
  hub_origin: '',
  hub_path: '',
  subscriber_set_cookie: false,
  hub_src_url: null
};

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
  logInfo('Got the following merged config', merged);
  return merged;
}
/**
 *
 * Get the hub iFrame domain with protocol prefix for the current location
 * @returns {string, null} domain iframe orgin
 */
export function getHubDomain() {
  let config = getConfiguration();
  if (config[OIL_CONFIG.ATTR_HUB_ORIGIN]) {
    return config[OIL_CONFIG.ATTR_HUB_ORIGIN].indexOf('http') !== -1 ? config[OIL_CONFIG.ATTR_HUB_ORIGIN] : location.protocol + config[OIL_CONFIG.ATTR_HUB_ORIGIN];
  }
  return null;
}
/**
 *
 * Get the hub iFrame URL with protocol prefix for the current location
 * @returns {string, null} complete iframe orgin
 */
export function getHubOrigin() {
  let config = getConfiguration();
  if (config[OIL_CONFIG.ATTR_HUB_ORIGIN] && config[OIL_CONFIG.ATTR_HUB_PATH]) {
    return getHubDomain() + config[OIL_CONFIG.ATTR_HUB_PATH];
  }
  return null;
}

/**
 * Read configuration of component from JSON script block
 * @param {Element} - DOM config element
 * @returns {{}} extracted configuration as JSON
 * @function
 */
export function readConfiguration(configuration) {
  let parsedConfig = null;
  try {
    if (configuration.text) {
      parsedConfig = JSON.parse(configuration.text);
      logInfo('Got the following parsed config', parsedConfig);
    }
  } catch (errorDetails) {
    logError('Error during passing configuration', errorDetails);
  }
  return mergeOptions(parsedConfig, defaultConfig);
}

/**
 * Search HTML document for configuration and reads it in
 * @returns parsed config
 */
export function getConfiguration() {
  let configurationElement = document.querySelector('script[type="application/configuration"]'),
    config = null;
  if (configurationElement) {
    config = readConfiguration(configurationElement);
  }
  return config;
}
