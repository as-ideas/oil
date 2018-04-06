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
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_HEADING]: 'Please select a privacy setting:',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_TEXT]: '',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_TEXT]: 'Only required cookies',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_VERBOSE]: 'These cookies are required for the basic functions of the website.',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_TEXT]: 'Functional cookies',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_VERBOSE]: 'These cookies enable us to analyze website usage so that we can measure and improve its performance.',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_TEXT]: 'Marketing-Cookies',
    [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_VERBOSE]: 'These cookies are used by advertising agencies to provide you with advertising that is relevant to your interests.',
    [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'Your consent for companies of the group',
    [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'Here is a list of companies of the group:',
    [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: 'Your consent for third party software',
    [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'In order to be able to provide our services in the best possible way, cookies must be activated in your browser.',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Please activate Cookies in the properties of your Browsers. So you can do it in <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank" > Google Chrome </a>or <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank" > Firefox </a>.'
  };

  setGlobalOilObject('LOCALE', locale);
}

