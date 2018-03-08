export {
  renderOil,
  oilShowPreferenceCenter,
  handleOptIn,
  handleSoiOptIn,
  handlePoiOptIn,
  oilWrapper
} from '../userview_modal.js';
import { OIL_LABELS } from '../userview_constants.js';

window.AS_OIL_LOCALE = {
  [OIL_LABELS.ATTR_PRIVACY_PAGE_URL]: undefined,
  [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Um euch die besten Inhalte präsentieren zu können, brauchen wir euer Einverständnis',
  [OIL_LABELS.ATTR_LABEL_INTRO]: undefined,
  [OIL_LABELS.ATTR_LABEL_INTRO_START]: 'Wir verwenden <a href="//oil.asideas.de/legal/thirdparties.html" class="as-oil__intro-txt--link" target="_blank">Cookies</a>, um unser Angebot zu verbessern und euch maßgeschneiderte Inhalte zu präsentieren. Es ist dafür erforderlich, bei eurem Besuch dem Datenschutz entsprechend bestimmte Informationen zu erheben und ggf. auch an <a href="//oil.asideas.de/legal/companies.html" class="as-oil__intro-txt--link" target="_blank">Partner</a> zu übertragen.',
  [OIL_LABELS.ATTR_LABEL_INTRO_END]: 'Jetzt Einverständnis erklären:',
  [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'Jetzt zustimmen',
  [OIL_LABELS.ATTR_LABEL_BUTTON_NO]: 'Nein, jetzt nicht',
  [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Zurück',
  [OIL_LABELS.ATTR_LABEL_BUTTON_PRIVACY]: 'Mehr erfahren',
  [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'Mehr Informationen',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_HEADING]: 'Bitte wähle eine Datenschutzeinstellung aus:',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_TEXT]: '',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_TEXT]: 'Nur erforderliche Cookies',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_VERBOSE]: 'Diese Cookies sind für die grundlegenden Funktionen der Website erforderlich.',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_TEXT]: 'Funktionelle Cookies',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_VERBOSE]: 'Diese Cookies ermöglichen uns die Analyse der Website-Nutzung, damit wir deren Leistung messen und verbessern können.',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_TEXT]: 'Marketing-Cookies',
  [OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_VERBOSE]: 'Diese Cookies werden von Werbeagenturen verwendet, um Ihnen Werbung zu unterbreiten, die für Ihre Interessen relevant ist.',
  [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'Um unsere Services bestmöglich erbringen zu können, müssen in deinem Browser Cookies aktiviert sein.',
  [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'Bitte aktiviere Cookies in den Einstellungen deines Browsers. So kannst du in  <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" class="as-oil__intro-txt--link" target="_blank" > Google Chrome </a>oder <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" class="as-oil__intro-txt--link" target="_blank" > Firefox </a>Cookies aktivieren.'
};
