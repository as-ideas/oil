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
    [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Polityka cookie',
    [OIL_LABELS.ATTR_LABEL_INTRO]: 'Na naszej stronie używamy technologii takich jak pliki cookie do zbierania i przetwarzania danych osobowych w celu personalizowania treści i reklam oraz analizowania ruchu na stronach. Dostęp do informacji o korzystaniu przez użytkowników z naszej strony mają także <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-companyList">podmioty powiązane</a> oraz <a href="javascript:void(0)" class="as-oil__intro-txt--link as-js-thirdPartyList">nasi zaufani partnerzy</a>, którzy również wykorzystują technologie takie jak pliki cookie do zbierania i przetwarzania danych osobowych w celu personalizowania treści i reklam, oraz analizowania ruchu na naszych stronach i w Internecie. Zobacz informacje o naszych zaufanych partnerach i zbieraniu przez nich tych danych.',
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
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'Um unsere Services bestmöglich erbringen zu können, müssen in deinem Browser Cookies aktiviert sein.',
    [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Bitte aktiviere Cookies in den Einstellungen deines Browsers. So kannst du in  <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank" > Google Chrome </a>oder <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank" > Firefox </a>Cookies aktivieren.'
  };

  setGlobalOilObject('LOCALE', locale);
}
