import {getHubPath, setLocale, getLocaleVariantName, resetConfiguration} from '../../../src/scripts/core/core_config';
import * as CoreConfig from '../../../src/scripts/core/core_config';

fdescribe('core config', () => {

  beforeEach(() => {
    resetConfiguration();
  });

  describe('getConfigValue', () => {

    it('returns default when value not found', function () {
      let result = CoreConfig.getConfigValue('foo', 'bar');
      expect(result).toEqual('bar');
    });

  });

  describe('getLocaleVariantName', function() {
    
    it('returns default enEN_01 when locale in config empty', function() {
      let result = getLocaleVariantName();
      expect(result).toEqual('enEN_01');
    });

    it('returns string if config.locale is string', function() {
      AS_OIL.CONFIG = {};
      AS_OIL.CONFIG.locale = 'foo';
      expect(getLocaleVariantName()).toEqual('foo');
    });

    it('returns localeId if config.locale is object', function() {
      AS_OIL.CONFIG = {};
      AS_OIL.CONFIG.locale = {};
      AS_OIL.CONFIG.locale.localeId = 'bar';

      expect(getLocaleVariantName()).toEqual('bar');
    });

  });

  describe('setLocale', function() {

    it('should update locale property of config object', function() {
      AS_OIL.CONFIG = {};
      AS_OIL.CONFIG.locale = 'foo';

      setLocale('bar');
      expect(CoreConfig.getConfigValue('locale')).toEqual('bar');
    });

  });

  describe('get config parameters', function() {

    it('should call getConfigValue with their respective attribute', function() {

      let ispy = spyOn(CoreConfig, 'getConfigValue');

      let functions_to_test = [
        'getHubPath',
        'getLocaleUrl',
        'getIabVendorListUrl',
        'getIabVendorBlacklist',
        'getIabVendorWhitelist',
        'getPoiGroupName',
        'getCookieExpireInDays',
        'getCustomPurposes',
        'getAdvancedSettingsPurposesDefault',
        'getDefaultToOptin'
      ];

      functions_to_test.forEach((func_name) => {
        let attr_name = func_name.replace(/(?:^|\.?)([A-Z])/g, (x,y) => {return "_" + y.toLowerCase()}).replace(/^_/, "").replace("get_", "");

        CoreConfig[func_name]();

        expect(ispy).toHaveBeenCalled();
        expect(ispy.calls.mostRecent().args[0]).toEqual('leco');
      });

    });

    it('should call something on something', function() {
      spyOn(CoreConfig, 'getConfigValue').and.returnValue('foo');

      expect(getHubPath()).toEqual('foo');
    });

  });

});
