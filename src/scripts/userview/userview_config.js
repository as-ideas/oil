import { OIL_CONFIG } from '../core/core_constants.js';
import { getConfigValue } from '../core/core_config.js';

export function isOilIgnore() {
  return getConfigValue(OIL_CONFIG.ATTR_OIL_IGNORE, false);
}

export function isPersistMinimumTracking() {
  return getConfigValue(OIL_CONFIG.ATTR_PERSIST_MINIMUM_TRACKING, true);
}

export function isAdvancedSettings() {
  return getConfigValue(OIL_CONFIG.ATTR_ADVANCED_SETTINGS, false);
}

export function getLabel(configName) {
  let defaultLabel = (window.AS_OIL_LOCALE && window.AS_OIL_LOCALE[configName]) ? window.AS_OIL_LOCALE[configName] : '';
  return getConfigValue(configName, defaultLabel);
}
