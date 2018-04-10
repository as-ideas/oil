import {OIL_LABELS} from '../userview_constants';
import {fetchJsonData, setGlobalOilObject} from '../../core/core_utils.js';
import {getLocaleVariantName, getOilBackendUrl} from '../../core/core_config.js';
import {logError} from '../../core/core_log';

export {
  renderOil,
  oilShowPreferenceCenter,
  handleOptIn,
  handleSoiOptIn,
  handlePoiOptIn,
  oilWrapper
} from '../userview_modal.js';

export function locale(callback) {
  fetchJsonData(getOilBackendUrl() + '/api/userViewLocales/' + getLocaleVariantName()).then(response => {
    setGlobalOilObject('LOCALE', response);
    callback();
  }).catch(error => {
    let defaultLocale = getDefaultLocale();
    setGlobalOilObject('LOCALE', defaultLocale);
    logError(`OIL backend returned error: ${error}. Falling back to default locale '${defaultLocale.localeId}', version ${defaultLocale.version}!`);
    callback();
  });
}

function getDefaultLocale() {
  return {
    'localeId': 'deDE_01',
    'version': 0,
    'texts': {
      [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Nutzung von Cookies und anderen Technologien',
      [OIL_LABELS.ATTR_LABEL_INTRO]: 'Die Website verwendet Cookies, Web Beacons, JavaScript und ähnliche Technologien. Ich willige ein, dass <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-companyList">Unternehmen der Axel Springer SE sowie deren Partner</a> für die bedarfsgerechte Gestaltung, Werbung oder für Marktforschung Nutzungsprofile bei Verwendung von Pseudonymen erstellen und diese an <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-thirdPartyList">Dritte</a> weitergeben dürfen. Diese Nutzungsprofile dürfen nicht mit Daten über den Träger des Pseudonyms zusammengeführt werden. Detaillierte Informationen und Hinweise zu Ihrem Widerspruchsrecht finden Sie in der Datenschutzerklärung.',
      [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'OK',
      [OIL_LABELS.ATTR_LABEL_BUTTON_NO]: 'Nein, jetzt nicht',
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Zurück',
      [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'Mehr Informationen',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_HEADING]: 'Bitte wähle eine Datenschutzeinstellung aus:',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_TEXT]: '',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_TEXT]: 'Nur erforderliche Cookies',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_VERBOSE]: 'Diese Cookies sind für die grundlegenden Funktionen der Website erforderlich.',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_TEXT]: 'Funktionelle Cookies',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_VERBOSE]: 'Diese Cookies ermöglichen uns die Analyse der Website-Nutzung, damit wir deren Leistung messen und verbessern können.',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_TEXT]: 'Marketing-Cookies',
      [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_VERBOSE]: 'Diese Cookies werden von Werbeagenturen verwendet, um Ihnen Werbung zu unterbreiten, die für Ihre Interessen relevant ist.',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'Ihre Einwilligung für Konzerngesellschaften',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'Hier ist eine Liste von Konzerngesellschaften:',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: 'Ihre Einwilligung für die Software von Dritten',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'Um unsere Services bestmöglich erbringen zu können, müssen in deinem Browser Cookies aktiviert sein.',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Bitte aktiviere Cookies in den Einstellungen deines Browsers. So kannst du in <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank">Google Chrome</a> oder <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank">Firefox</a> Cookies aktivieren.'
    }
  };

}
