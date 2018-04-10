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
  locale_enEN_01();
}());

export function locale_enEN_01() {
  let locale = {
    [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'We use cookies and other technologies',
    [OIL_LABELS.ATTR_LABEL_INTRO]: 'The website uses cookies, web beacons, JavaScript and similar technologies. I agree that <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-companyList">companies belonging to Axel Springer SE</a> and <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-thirdPartyList">trusted partners</a> generate pseudonymous user profiles for adapting the website to the user, for market research and for advertising. The generated data can also be shared with third parties while the user profiles cannot be combined with personal data. Detailed information, also on the right to withdraw consent, can be found in the website\'s privacy policy.',
    [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'OK',
    [OIL_LABELS.ATTR_LABEL_BUTTON_NO]: 'NO, ',
    [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Back',
    [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'More information',
    [OIL_LABELS.ATTR_LABEL_CPC_HEADING]: 'Please select a privacy setting:',
    [OIL_LABELS.ATTR_LABEL_CPC_TEXT]: '',
    [OIL_LABELS.ATTR_LABEL_CPC_01_TEXT]: 'Accessing a Device',
    [OIL_LABELS.ATTR_LABEL_CPC_01_DESC]: 'allow storing or accessing information on a user’s device.',
    [OIL_LABELS.ATTR_LABEL_CPC_02_TEXT]: 'Advertising Personalisation',
    [OIL_LABELS.ATTR_LABEL_CPC_02_DESC]: 'allow processing of a user’s data to provide and inform personalised advertising (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.',
    [OIL_LABELS.ATTR_LABEL_CPC_03_TEXT]: 'Analytics',
    [OIL_LABELS.ATTR_LABEL_CPC_03_DESC]: 'allow processing of a user’s data to deliver content or advertisements and measure the delivery of such content or advertisements, extract insights and generate reports to understand service usage; and/or accessing or storing information on devices for that purpose.',
    [OIL_LABELS.ATTR_LABEL_CPC_04_TEXT]: 'Content Personalisation',
    [OIL_LABELS.ATTR_LABEL_CPC_04_DESC]: 'allow processing of a user’s data to provide and inform personalised content (including delivery, measurement, and reporting) based on a user’s preferences or interests known or inferred from data collected across multiple sites, apps, or devices; and/or accessing or storing information on devices for that purpose.',
    [OIL_LABELS.ATTR_LABEL_CPC_05_TEXT]: 'Matching Data to Offline Sources',
    [OIL_LABELS.ATTR_LABEL_CPC_05_DESC]: 'combining data from offline sources that were initially collected in other contexts',
    [OIL_LABELS.ATTR_LABEL_CPC_06_TEXT]: 'Linking Devices',
    [OIL_LABELS.ATTR_LABEL_CPC_06_DESC]: 'allow processing of a user’s data to connect such user across multiple devices.',
    [OIL_LABELS.ATTR_LABEL_CPC_07_TEXT]: 'Precise Geographic Location data',
    [OIL_LABELS.ATTR_LABEL_CPC_07_DESC]: 'allow processing of a user’s precise geographic location data in support of a purpose for which that certain third party has consent',

    [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'Your consent for companies of the group',
    [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'Here is a list of companies of the group:',
    [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: 'Your consent for third party software',
    [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'In order to be able to provide our services in the best possible way, cookies must be activated in your browser.',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Please activate Cookies in the properties of your Browsers. So you can do it in <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank" > Google Chrome </a>or <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank" > Firefox </a>.'
  };

  setGlobalOilObject('LOCALE', locale);
}

