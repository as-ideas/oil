import { OIL_CONFIG } from '../core/core_constants.js';
import { getConfigValue, getLocale } from '../core/core_config';

// tag::config-timeout[]
const defaultTimeoutInSeconds = 60;

// end::config-timeout[]

// FIXME bad name - isPersistOptOut or similiar
export function isPersistMinimumTracking() {
  return getConfigValue(OIL_CONFIG.ATTR_PERSIST_MINIMUM_TRACKING, true);
}

// FIXME bad name - isAdvancedSettingsEnabled
export function isAdvancedSettings() {
  return getConfigValue(OIL_CONFIG.ATTR_ADVANCED_SETTINGS, false);
}

export function getTimeOutValue() {
  return getConfigValue(OIL_CONFIG.ATTR_TIMEOUT, defaultTimeoutInSeconds);
}

export function getTheme() {
  return getConfigValue(OIL_CONFIG.ATTR_THEME, 'light');
}

export function getLabel(labelName) {
  return getLabelWithDefault(labelName, labelName);
}

/**
 * Returns the label or the given default value if it could not be found in configuration.
 *
 * At first, the label is searched directly in the configuration. This is deprecated behaviour.
 * If there is no label definition, it is searched within the 'locale.texts' configuration object.
 * If there is no label definition too, the given default value is returned.
 *
 * @param labelName label name
 * @param defaultLabel the default value.
 * @returns {*}
 */
export function getLabelWithDefault(labelName, defaultLabel) {
  let defaultLocale = getLocale();
  return getConfigValue(labelName, (defaultLocale && defaultLocale.texts[labelName]) ? defaultLocale.texts[labelName] : defaultLabel);
}
