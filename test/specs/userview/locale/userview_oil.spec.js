import * as UserViewOil from '../../../../src/scripts/userview/locale/userview_oil';
import * as CoreUtils from '../../../../src/scripts/core/core_utils';
import * as CoreConfig from '../../../../src/scripts/core/core_config';
import * as CoreLog from '../../../../src/scripts/core/core_log';
import { OIL_LABELS } from '../../../../src/scripts/userview/userview_constants';
import DEFAULT_LOCALE from '../../../../src/scripts/userview/locale/userview_default_locale';
import { resetOil } from '../../../test-utils/utils_reset';

describe('the locale fetcher for user view modal', () => {

  const COMPLETE_LOCALE = {
    'localeId': 'enEN_23',
    'version': 42,
    'texts': {
      [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Intro Heading',
      [OIL_LABELS.ATTR_LABEL_INTRO]: 'Intro',
      [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'Yes Button',
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Back Button',
      [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'Advanced Settings Button',
      [OIL_LABELS.ATTR_LABEL_CPC_HEADING]: 'CPC Heading:',
      [OIL_LABELS.ATTR_LABEL_CPC_TEXT]: 'CPC Text',
      [OIL_LABELS.ATTR_LABEL_CPC_ACTIVATE_ALL]: 'CPC Activate All',
      [OIL_LABELS.ATTR_LABEL_CPC_DEACTIVATE_ALL]: 'CPC Deactivate All',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY]: 'Third parties Headline',
      [OIL_LABELS.ATTR_LABEL_CUSTOM_THIRD_PARTY_HEADING]: 'Custom third parties Headline',
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]: 'Purpose Description',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'POI Group List Heading',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'POI Group List Text',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: '3rd Party List Heading',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '3rd Party List Text',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'No Cookies Heading',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'No Cookies Text',
    }
  };

  const BACKEND_LOCALE = {
    'localeId': 'enEN_42',
    'version': 45,
    'texts': {
      [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: 'Intro Heading 45',
      [OIL_LABELS.ATTR_LABEL_INTRO]: 'Intro 45',
      [OIL_LABELS.ATTR_LABEL_BUTTON_YES]: 'Yes Button 45',
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: 'Back Button 45',
      [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: 'Advanced Settings Button 45',
      [OIL_LABELS.ATTR_LABEL_CPC_HEADING]: 'CPC Heading: 45',
      [OIL_LABELS.ATTR_LABEL_CPC_TEXT]: 'CPC Text 45',
      [OIL_LABELS.ATTR_LABEL_CPC_ACTIVATE_ALL]: 'CPC Activate All 45',
      [OIL_LABELS.ATTR_LABEL_CPC_DEACTIVATE_ALL]: 'CPC Deactivate All 45',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY]: 'Third parties Headline 45',
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]: 'Purpose Description 45',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING]: 'POI Group List Heading 45',
      [OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT]: 'POI Group List Text 45',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING]: '3rd Party List Heading 45',
      [OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT]: '3rd Party List Text 45',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING]: 'No Cookies Heading 45',
      [OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT]: 'No Cookies Text 45',
    }
  };

  const LOCALE_URL = 'https://url.for.locales.retrieval';

  beforeEach(() => {
    resetOil();
    spyOn(CoreConfig, 'setLocale');
  });

  it('should leave locale in configuration untouched if it exists and is complete', (done) => {
    givenThatConfigurationContainsLocale(COMPLETE_LOCALE);

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreConfig.setLocale).not.toHaveBeenCalled();
      done();
    });
  });

  it('should update existing but incomplete locale from configuration by locale loaded from backend', (done) => {
    const configuredLocale = removeKeysFromLocale(COMPLETE_LOCALE, [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS, OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]);
    const expectedLocale = addValuesToLocaleCopy(configuredLocale, {
      [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]: BACKEND_LOCALE.texts[OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]: BACKEND_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC],

    });
    givenThatConfigurationContainsLocale(configuredLocale);
    givenThatBackendProvidesLocale(BACKEND_LOCALE);

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).toHaveBeenCalledWith(LOCALE_URL);
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(expectedLocale);
      done();
    });
  });

  it('should update existing but incomplete locale from configuration by locale loaded from backend with warning about missing labels', (done) => {
    const configuredLocale = removeKeysFromLocale(COMPLETE_LOCALE, [
      OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS,
      OIL_LABELS.ATTR_LABEL_BUTTON_BACK
    ]);
    const backendLocale = removeKeysFromLocale(BACKEND_LOCALE, [OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS]);
    const expectedLocale = addValuesToLocaleCopy(configuredLocale, {
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: BACKEND_LOCALE.texts[OIL_LABELS.ATTR_LABEL_BUTTON_BACK],
    });
    givenThatConfigurationContainsLocale(configuredLocale);
    givenThatBackendProvidesLocale(backendLocale);
    spyOn(CoreLog, 'logWarn');

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).toHaveBeenCalledWith(LOCALE_URL);
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(expectedLocale);
      expect(CoreLog.logWarn).toHaveBeenCalledWith(`${OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS} missing from locale config.`);
      done();
    });
  });

  it('should update existing but incomplete locale from configuration by default locale in case of an error while retrieving locale from backend', (done) => {
    const configuredLocale = removeKeysFromLocale(COMPLETE_LOCALE, [OIL_LABELS.ATTR_LABEL_INTRO_HEADING, OIL_LABELS.ATTR_LABEL_BUTTON_BACK, OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]);
    const expectedLocale = addValuesToLocaleCopy(configuredLocale, {
      [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_INTRO_HEADING],
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_BUTTON_BACK],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_HEADING]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_HEADING],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_TEXT]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_TEXT],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_PROCEED]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_PROCEED],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL]
    });
    givenThatConfigurationContainsLocale(configuredLocale);
    givenThatLocaleRetrievalFromBackendFails();

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).toHaveBeenCalledWith(LOCALE_URL);
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(expectedLocale);
      done();
    });
  });

  it('should update existing but incomplete locale from configuration by default locale in case of non-existing locale url', (done) => {
    const configuredLocale = removeKeysFromLocale(COMPLETE_LOCALE, [OIL_LABELS.ATTR_LABEL_INTRO_HEADING, OIL_LABELS.ATTR_LABEL_BUTTON_BACK, OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]);
    const expectedLocale = addValuesToLocaleCopy(configuredLocale, {
      [OIL_LABELS.ATTR_LABEL_INTRO_HEADING]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_INTRO_HEADING],
      [OIL_LABELS.ATTR_LABEL_BUTTON_BACK]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_BUTTON_BACK],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_HEADING]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_HEADING],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_TEXT]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_TEXT],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_PROCEED]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_PROCEED],
      [OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL]: DEFAULT_LOCALE.texts[OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL]
    });
    givenThatConfigurationContainsLocale(configuredLocale);
    givenThatLocaleRetrievalIsDeactivated();

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).not.toHaveBeenCalled();
      expect(CoreConfig.setLocale).toHaveBeenCalledTimes(1);
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(expectedLocale);
      done();
    });
  });

  it('should set locale loaded from backend to configuration if there is no configured locale yet', (done) => {
    givenThatConfigurationDoesNotContainAnyLocale();
    givenThatBackendProvidesLocale(BACKEND_LOCALE);

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).toHaveBeenCalledWith(LOCALE_URL);
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(BACKEND_LOCALE);
      done();
    });
  });

  it('should set default locale to configuration if there is no configured locale yet and an error while retrieving locale from backend occurred', (done) => {
    givenThatConfigurationDoesNotContainAnyLocale();
    givenThatLocaleRetrievalFromBackendFails();

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).toHaveBeenCalledWith(LOCALE_URL);
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(DEFAULT_LOCALE);
      done();
    });
  });

  it('should set default locale to configuration if there is no configured locale yet and locale url does not exist', (done) => {
    givenThatConfigurationDoesNotContainAnyLocale();
    givenThatLocaleRetrievalIsDeactivated();

    UserViewOil.locale(userViewOil => {
      expect(userViewOil).toBeDefined();
      expect(CoreUtils.fetchJsonData).not.toHaveBeenCalled();
      expect(CoreConfig.setLocale).toHaveBeenCalledWith(DEFAULT_LOCALE);
      done();
    });
  });

  function givenThatConfigurationContainsLocale(locale) {
    spyOn(CoreConfig, 'getLocale').and.returnValue(locale);
  }

  function givenThatConfigurationDoesNotContainAnyLocale() {
    spyOn(CoreConfig, 'getLocale').and.returnValue(undefined);
  }

  function removeKeysFromLocale(locale, keysToBeMissed) {
    return {
      'localeId': locale.localeId,
      'version': locale.version,
      'texts': Object.keys(locale.texts).reduce((accumulator, key) => {
        if (keysToBeMissed.indexOf(key) === -1) {
          accumulator[key] = locale.texts[key];
        }
        return accumulator;
      }, {})
    };
  }

  function addValuesToLocaleCopy(locale, valuesToAdd) {
    let result = {
      'localeId': locale.localeId,
      'version': locale.version,
      'texts': {}
    };
    Object.keys(locale.texts).forEach(key => result.texts[key] = locale.texts[key]);
    Object.keys(valuesToAdd).forEach(key => result.texts[key] = valuesToAdd[key]);
    return result;
  }

  function givenThatBackendProvidesLocale(locale) {
    spyOn(CoreConfig, 'getLocaleUrl').and.returnValue(LOCALE_URL);
    spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => {
      resolve(locale);
    }));
  }

  function givenThatLocaleRetrievalFromBackendFails() {
    spyOn(CoreConfig, 'getLocaleUrl').and.returnValue(LOCALE_URL);
    spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve, reject) => reject(new Error('something went wrong'))));
  }

  function givenThatLocaleRetrievalIsDeactivated() {
    spyOn(CoreConfig, 'getLocaleUrl').and.returnValue(undefined);
    spyOn(CoreUtils, 'fetchJsonData');
  }
});

