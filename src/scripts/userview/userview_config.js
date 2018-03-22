import { OIL_CONFIG } from '../core/core_constants.js';
import { getConfigValue } from '../core/core_config.js';
import { getGlobalOilObject } from '../core/core_utils.js';

export function isPersistMinimumTracking() {
  return getConfigValue(OIL_CONFIG.ATTR_PERSIST_MINIMUM_TRACKING, true);
}

export function isAdvancedSettings() {
  return getConfigValue(OIL_CONFIG.ATTR_ADVANCED_SETTINGS, false);
}

export function getTimeOutValue() {
  return getConfigValue(OIL_CONFIG.ATTR_TIMEOUT, 60);
}

export function getTheme() {
  return getConfigValue(OIL_CONFIG.ATTR_THEME, 'light');
}

export function getLabel(configName) {
  let defaultLocale = getGlobalOilObject('LOCALE');
  let defaultLabel = (defaultLocale && defaultLocale[configName]) ? defaultLocale[configName] : '';
  return getConfigValue(configName, defaultLabel);
}
