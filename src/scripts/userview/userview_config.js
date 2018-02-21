import { USERVIEW_OIL_CONFIG } from './userview_constants.js';
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

export function getPrivacyPageUrl() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_PRIVACY_PAGE_URL, undefined);
}

export function getLabelIntroHeading() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_INTRO_HEADING, 'Um euch die besten Inhalte präsentieren zu können, brauchen wir euer Einverständnis');
}

export function getLabelLaterHeading() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_LATER_HEADING, 'Um euch die besten Inhalte präsentieren zu können, brauchen wir euer Einverständnis');
}

export function getLabelIntro() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_INTRO, undefined);
}

export function getLabelIntroStart() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_INTRO_START, 'Wir verwenden <a href="//oil.asideas.de/legal/thirdparties.html" target="_blank">Cookies</a>, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch dem Datenschutz entsprechend bestimmte Informationen zu erheben und ggf. auch an <a href="//oil.asideas.de/legal/companies.html" target="_blank">Partner</a> zu übertragen.');
}

export function getLabelIntroEnd() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_INTRO_END, 'Jetzt Einverständnis erklären:');
}

export function getLabelLater() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_LATER, undefined);
}

export function getLabelLaterStart() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_LATER_START, 'Wir verwenden Cookies, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch dem Datenschutz entsprechend bestimmte Informationen zu erheben und ggf. auch an Partner zu übertragen. In unseren Datenschutzbestimmungen erfahren Sie, wie Sie Cookies deaktivieren können');
}

export function getLabelLaterEnd() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_LATER_END, 'Jetzt Einverständnis erklären:');
}

export function getLabelButtonYesSoi() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_BUTTON_YES_SOI, 'Jetzt zustimmen');
}

export function getLabelButtonYesPoi() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_BUTTON_YES_POI, 'Global zustimmen');
}

export function getLabelButtonNo() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_BUTTON_NO, 'Nein, jetzt nicht');
}

export function getLabelButtonBack() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_BUTTON_BACK, 'Zurück');
}

export function getLabelButtonPrivacy() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_BUTTON_PRIVACY, 'Mehr erfahren');
}

export function getLabelButtonAdvancedSettings() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS, 'Mehr Informationen');
}

export function getLabelAdvancedSettingsHeading() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_HEADING, 'Bitte wähle eine Datenschutzeinstellung aus:');
}

export function getLabelAdvancedSettingsText() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_TEXT, '');
}

export function getLabelAdvancedSettingsEssentialTitle() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_TITLE, 'Nur erforderliche Cookies');
}

export function getLabelAdvancedSettingsEssentialVerbose() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_VERBOSE, 'Diese Cookies sind für die grundlegenden Funktionen der Website erforderlich.');
}

export function getLabelAdvancedSettingsFunctionalText() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_TEXT, 'Funktionelle Cookies');
}

export function getLabelAdvancedSettingsFunctionalVerbose() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_VERBOSE, 'Diese Cookies ermöglichen uns die Analyse der Website-Nutzung, damit wir deren Leistung messen und verbessern können.');
}

export function getLabelAdvancedSettingsAdvertisingText() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_TEXT, 'Marketing-Cookies');
}

export function getLabelAdvancedSettingsAdvertisingVerbose() {
  return getConfigValue(USERVIEW_OIL_CONFIG.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_VERBOSE, 'Diese Cookies werden von Werbeagenturen verwendet, um Ihnen Werbung zu unterbreiten, die für Ihre Interessen relevant ist.');
}
