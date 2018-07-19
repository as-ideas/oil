import { OIL_CONFIG } from '../core/core_constants.js';
import { OIL_LABELS } from '../userview/userview_constants.js';
import { getConfigValue, getLocale } from '../core/core_config';
import { OIL_CONFIG_CPC_TYPES } from '../core/core_constants';

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

export function getCpcType() {
  return getConfigValue(OIL_CONFIG.ATTR_CPC_TYPE, OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD);
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

export function requiresOptoutConfirmation() {
  return (
    getLabelWithDefault(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_HEADING, false) &&
    getLabelWithDefault(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_TEXT, false) &&
    getLabelWithDefault(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_YES, false) &&
    getLabelWithDefault(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL, false)
  );
}
