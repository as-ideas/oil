import * as UserViewOil from '../../../src/scripts/userview/locale/userview_oil';
import * as CoreUtils from '../../../src/scripts/core/core_utils.js';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import { OIL_LABELS } from '../../../src/scripts/userview/userview_constants';

describe('the locale fetcher for userview modal', () => {

  let mockedLocale = {
    'key1': 'text1',
    'key2': 'text2'
  };

  beforeEach(() => {
    spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue('enEN_01');
    spyOn(CoreConfig, 'getLocaleUrl').and.returnValue('https://oil-backend.herokuapp.com/oil/api/userViewLocales/enEN_01');
    spyOn(CoreUtils, 'setGlobalOilObject');
    spyOn(CoreUtils, 'getGlobalOilObject').withArgs('LOCALE').and.returnValue(undefined);
  });

  it('should load requested locale from backend by default and set it as global oil object', (done) => {
    spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => {
      resolve(mockedLocale);
    }));

    UserViewOil.locale(userview_oil => {
      expect(userview_oil).toBeDefined();
      expect(CoreUtils.fetchJsonData.calls.argsFor(0)[0]).toEqual('https://oil-backend.herokuapp.com/oil/api/userViewLocales/enEN_01');
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(0)[0]).toEqual('LOCALE');
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(0)[1]).toEqual(mockedLocale);
      done();
    });
  });

  it('should use default locale and set it as global oil object in case of an error while retrieving locale from backend', (done) => {
    spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve, reject) => {
      reject(new Error("something went wrong"));
    }));

    UserViewOil.locale(userview_oil => {
      expect(userview_oil).toBeDefined();
      expect(CoreUtils.fetchJsonData.calls.argsFor(0)[0]).toEqual('https://oil-backend.herokuapp.com/oil/api/userViewLocales/enEN_01');
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(0)[0]).toEqual('LOCALE');

      let locale = CoreUtils.setGlobalOilObject.calls.argsFor(0)[1];
      expect(locale).toBeDefined();
      expect(locale.texts).toBeDefined();
      expect(Object.keys(locale.texts).length).toBeGreaterThan(10);
      expect(locale.texts[OIL_LABELS.ATTR_LABEL_BUTTON_BACK].length).toBeGreaterThan(0);
      expect(locale.texts[OIL_LABELS.ATTR_LABEL_INTRO_HEADING]).toEqual('Nutzung von Cookies und anderen Technologien');
      done();
    });
  });

});
