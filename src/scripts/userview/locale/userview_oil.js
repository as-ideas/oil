import { OIL_LABELS, OPTIONAL_LABEL_PREFIX } from '../userview_constants';
import { logError, logWarn } from '../../core/core_log';
import { fetchJsonData } from '../../core/core_utils';
import { getLocaleUrl, getConfigValue, setLocale } from '../../core/core_config';
import { OIL_CONFIG } from '../../core/core_constants';

export {
  renderOil,
  oilShowPreferenceCenter,
  handleOptIn,
  handleSoiOptIn,
  handlePoiOptIn,
  oilWrapper
} from '../userview_modal.js';

export function locale(callback) {
  // FIXME write test for this
  let localeObject = getConfigValue(OIL_CONFIG.ATTR_LOCALE, undefined);
  const missingLabels = (localeObject && localeObject.texts) ? findMissingLabels(localeObject.texts) : [];
  if (localeObject && localeObject.texts && missingLabels.length === 0) {
    return callback(this);
  } else {
    fetchJsonData(getLocaleUrl())
      .then(response => {
        fillAndSetLocaleObject(response, localeObject, missingLabels);
        callback(this);
      })
      .catch(error => {
        const defaultLocale = getDefaultLocale();
        logError(`OIL backend returned error: ${error}. Falling back to default locale '${defaultLocale.localeId}', version ${defaultLocale.version}!`);
        fillAndSetLocaleObject(defaultLocale, localeObject, missingLabels);
        callback(this);
      });
  }
}

function fillAndSetLocaleObject(sourceObject, targetObject, missingLabels) {
  if (!targetObject || !targetObject.texts) {
    setLocale(sourceObject);
    return;
  }

  missingLabels.forEach((label) => {
    if(!sourceObject.texts[label]){
      logWarn(`${label} missing from locale config.`);
    } else {
      targetObject.texts[label] = sourceObject.texts[label];
    }
  });

  setLocale(targetObject);
}

function findMissingLabels(locale) {
  const requiredLabels = Object.keys(OIL_LABELS).filter(key => !key.startsWith(OPTIONAL_LABEL_PREFIX));
  return requiredLabels.filter(key => !locale[key]);
}

function getDefaultLocale() {
  return {
    'localeId': 'deDE_01',
    'version': 0,
    'texts': {
      [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Nutzung von Cookies und anderen Technologien',
      [OIL_LABELS.ATTR_LABEL_INTRO]: 'Die Website verwendet Cookies, Web Beacons, JavaScript und ähnliche Technologien. Ich willige ein, dass <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-companyList">Unternehmen der Axel Springer SE sowie deren Partner</a> für die bedarfsgerechte Gestaltung, Werbung oder für Marktforschung Nutzungsprofile bei Verwendung von Pseudonymen erstellen und diese an <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-thirdPartyList">Dritte</a> weitergeben dürfen. Diese Nutzungsprofile dürfen nicht mit Daten über den Träger des Pseudonyms zusammengeführt werden. Detaillierte Informationen und Hinweise zu Ihrem Widerspruchsrecht finden Sie in der Datenschutzerklärung.',
      [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'OK',
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Zurück',
      [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'Mehr Informationen',
      [OIL_LABELS.ATTR_LABEL_CPC_HEADING]: 'Ihre Einstellungen für die Verwendung von Cookies und anderen Technologien:',
      [OIL_LABELS.ATTR_LABEL_CPC_TEXT]: 'Bitte wählen Sie, welche Verwendungszweck und Funktionen für Sie aktiviert sind',
      [OIL_LABELS.ATTR_LABEL_CPC_ACTIVATE_ALL]: 'Alle aktivieren',
      [OIL_LABELS.ATTR_LABEL_CPC_DEACTIVATE_ALL]: 'Alle deaktivieren',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY]: 'Drittanbieter',
      [OIL_LABELS.ATTR_LABEL_CPC_01_TEXT]: 'Gerätezugriff',
      [OIL_LABELS.ATTR_LABEL_CPC_01_DESC]: 'Speichern von und Zugriff auf Informationen eines Endnutzergeräts.',
      [OIL_LABELS.ATTR_LABEL_CPC_02_TEXT]: 'Personalisierte Werbung',
      [OIL_LABELS.ATTR_LABEL_CPC_02_DESC]: 'Verarbeitung von Nutzerdaten für personalisierte Werbung erlauben (einschließlich Übertragung, Tracking und Sammlung von Daten), basierend auf den Einstellungen des Nutzers und seinen bekannten oder aus den über verschiedene Seiten, Apps und Geräte gesammelten Daten abgeleiteten Interessen; desweiteren zu diesem Zweck Zugriff auf und Speicherung von Informationen auf Geräten erlauben',
      [OIL_LABELS.ATTR_LABEL_CPC_03_TEXT]: 'Analyse',
      [OIL_LABELS.ATTR_LABEL_CPC_03_DESC]: 'Verarbeitung von Nutzerdaten zur Auslieferung von Inhalten oder Werbung, Messung dieser Auslieferung sowie Analyse der Daten und Erstellung von Reports für das Verständnis der Nutzung unserer Dienste erlauben; desweiteren zu diesem Zweck Zugriff auf und Speicherung von Informationen auf Geräten erlauben.',
      [OIL_LABELS.ATTR_LABEL_CPC_04_TEXT]: 'Personalisierte Inhalte',
      [OIL_LABELS.ATTR_LABEL_CPC_04_DESC]: 'Verarbeitung von Nutzerdaten zur Auslieferung personalisierter Inhalte erlauben (einschließlich Übertragung, Tracking und Sammlung von Daten), basierend auf den Einstellungen des Nutzers und seinen bekannten oder aus den über verschiedene Seiten, Apps und Geräte abgeleiteten Interessen; desweiteren zu diesem Zweck Zugriff auf und Speicherung von Informationen auf Geräten erlauben',
      [OIL_LABELS.ATTR_LABEL_CPC_05_TEXT]: 'Datenabgleich mit Offline-Quellen',
      [OIL_LABELS.ATTR_LABEL_CPC_05_DESC]: 'Abgleich von Daten aus Offline-Quellen, die ursprünglich in anderen Kontexten gesammelt wurden, erlauben.',
      [OIL_LABELS.ATTR_LABEL_CPC_06_TEXT]: 'Geräte verbinden',
      [OIL_LABELS.ATTR_LABEL_CPC_06_DESC]: 'Verarbeitung von Nutzerdaten erlauben, um den Nutzer über mehrere Geräte zu erkennen.',
      [OIL_LABELS.ATTR_LABEL_CPC_07_TEXT]: 'Präzise Standortdaten',
      [OIL_LABELS.ATTR_LABEL_CPC_07_DESC]: 'Verarbeitung von präzisen Standortdaten des Nutzers erlauben, um Funktionen zu ermöglichen, für die die jeweiligen Third-Party-Dienste die Zustimmung erhalten haben.',
      [OIL_LABELS.ATTR_LABEL_PURPOSE_DESC]: 'Verwendungszweck',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'Ihre Einwilligung für Konzerngesellschaften',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'Hier ist eine Liste von Konzerngesellschaften:',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: 'Ihre Einwilligung für die Software von Dritten',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'Um unsere Services bestmöglich erbringen zu können, müssen in deinem Browser Cookies aktiviert sein.',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Bitte aktiviere Cookies in den Einstellungen deines Browsers. So kannst du in  <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank" > Google Chrome </a>oder <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank" > Firefox </a>Cookies aktivieren.'
    }
  };

}
