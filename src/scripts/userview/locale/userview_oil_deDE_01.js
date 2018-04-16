export {
  renderOil,
  oilShowPreferenceCenter,
  handleOptIn,
  handleSoiOptIn,
  handlePoiOptIn,
  oilWrapper
} from '../userview_modal.js';
import { OIL_LABELS } from '../userview_constants.js';
import { setGlobalOilObject } from '../../core/core_utils.js';

(function () {
  locale_deDE_01();
}());

export function locale_deDE_01() {
  let locale = {
    [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Nutzung von Cookies und anderen Technologien',
    [OIL_LABELS.ATTR_LABEL_INTRO]: 'Die Website verwendet Cookies, Web Beacons, JavaScript und ähnliche Technologien. Ich willige ein, dass <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-companyList">Unternehmen der Axel Springer SE sowie deren Partner</a> für die bedarfsgerechte Gestaltung, Werbung oder für Marktforschung Nutzungsprofile bei Verwendung von Pseudonymen erstellen und diese an <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-thirdPartyList">Dritte</a> weitergeben dürfen. Diese Nutzungsprofile dürfen nicht mit Daten über den Träger des Pseudonyms zusammengeführt werden. Detaillierte Informationen und Hinweise zu Ihrem Widerspruchsrecht finden Sie in der Datenschutzerklärung.',
    [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'OK',
    [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Zurück',
    [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'Mehr Informationen',
    [OIL_LABELS.ATTR_LABEL_CPC_HEADING]: 'Please select a privacy setting:',
    [OIL_LABELS.ATTR_LABEL_CPC_TEXT]: 'cpc_text',
    [OIL_LABELS.ATTR_LABEL_CPC_ACTIVATE_ALL]: 'Activate all',
    [OIL_LABELS.ATTR_LABEL_CPC_DEACTIVATE_ALL]: 'Deactivate all',
    [OIL_LABELS.ATTR_LABEL_CPC_01_TEXT]: 'Accessing a Device',
    [OIL_LABELS.ATTR_LABEL_CPC_01_DESC]: 'Allow storing or accessing information on a user’s device.',
    [OIL_LABELS.ATTR_LABEL_CPC_02_TEXT]: 'Advertising Personalisation',
    [OIL_LABELS.ATTR_LABEL_CPC_02_DESC]: 'Allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.',
    [OIL_LABELS.ATTR_LABEL_CPC_03_TEXT]: 'Analytics',
    [OIL_LABELS.ATTR_LABEL_CPC_03_DESC]: 'Allow processing of a user’s data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.',
    [OIL_LABELS.ATTR_LABEL_CPC_04_TEXT]: 'Content Personalisation',
    [OIL_LABELS.ATTR_LABEL_CPC_04_DESC]: 'Allow processing of a user’s data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.',
    [OIL_LABELS.ATTR_LABEL_CPC_05_TEXT]: 'Matching Data to Offline Sources',
    [OIL_LABELS.ATTR_LABEL_CPC_05_DESC]: 'Combining data from offline sources that were initially collected in other contexts',
    [OIL_LABELS.ATTR_LABEL_CPC_06_TEXT]: 'Linking Devices',
    [OIL_LABELS.ATTR_LABEL_CPC_06_DESC]: 'Allow processing of a user’s data to connect such user across multiple devices.',
    [OIL_LABELS.ATTR_LABEL_CPC_07_TEXT]: 'Precise Geographic Location data',
    [OIL_LABELS.ATTR_LABEL_CPC_07_DESC]: 'Allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent',
    [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'Ihre Einwilligung für Konzerngesellschaften',
    [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'Hier ist eine Liste von Konzerngesellschaften:',
    [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: 'Ihre Einwilligung für die Software von Dritten',
    [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'Um unsere Services bestmöglich erbringen zu können, müssen in deinem Browser Cookies aktiviert sein.',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Bitte aktiviere Cookies in den Einstellungen deines Browsers. So kannst du in  <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank" > Google Chrome </a>oder <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank" > Firefox </a>Cookies aktivieren.'
  };

  setGlobalOilObject('LOCALE', locale);
}
