import {OIL_CONFIG} from '../core/core_constants.js';
import {getConfigValue} from '../core/core_config.js';
import {getGlobalOilObject} from '../core/core_utils.js';

// tag::config-timeout[]
const defaultTimeoutInSeconds = 60;
// end::config-timeout[]

export function isPersistMinimumTracking() {
  return getConfigValue(OIL_CONFIG.ATTR_PERSIST_MINIMUM_TRACKING, true);
}

export function isAdvancedSettings() {
  return getConfigValue(OIL_CONFIG.ATTR_ADVANCED_SETTINGS, false);
}

export function getTimeOutValue() {
  return getConfigValue(OIL_CONFIG.ATTR_TIMEOUT, defaultTimeoutInSeconds);
}

export function getTheme() {
  return getConfigValue(OIL_CONFIG.ATTR_THEME, 'light');
}

export function getLabel(configName) {
  let defaultLocale = getGlobalOilObject('LOCALE');
  let defaultLabel = (defaultLocale && defaultLocale.texts[configName]) ? defaultLocale.texts[configName] : '';
  return getConfigValue(configName, defaultLabel);
}
