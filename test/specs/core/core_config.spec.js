import { getHubPath,
  setLocale,
  getLocaleVariantName,
  resetConfiguration,
  getIabVendorListUrl,
  getIabVendorBlacklist,
  getIabVendorWhitelist,
  getPoiGroupName,
  getCookieExpireInDays,
  getLocaleUrl,
  getCustomPurposes,
  getAdvancedSettingsPurposesDefault,
  getDefaultToOptin } from '../../../src/scripts/core/core_config';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import { loadFixture } from '../../utils.js';

describe('core config', () => {

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
      loadFixture('config/given.config.with.locale.string.html');
      expect(getLocaleVariantName()).toEqual('foo');
    });

    it('returns localeId if config.locale is object', function() {
      AS_OIL.CONFIG = {};
      AS_OIL.CONFIG.locale = {};
      AS_OIL.CONFIG.locale.localeId = 'floo';

      expect(getLocaleVariantName()).toEqual('floo');
    });

  });

  describe('setLocale', function() {

    it('should update locale property of config object', function() {
      setLocale('bra');
      expect(CoreConfig.getConfigValue('locale')).toEqual('bra');
    });

  });

  describe('get config parameters', function() {

    const DEFAULT_COOKIE_EXPIRES_IN = 31;
    const DEFAULT_POI_GROUP         = 'default'; 
    const DEFAULT_CUSTOM_PURPOSES   = []; 
    const DEFAULT_HUB_PATH          = '/release/undefined/hub.html'; 

    it('should call getConfigValue with their respective attribute', function() {
      loadFixture('config/full.config.html');

      expect(getHubPath()).toEqual(true);
      expect(getIabVendorWhitelist()).toEqual(true);
      expect(getIabVendorBlacklist()).toEqual(true);
      expect(getDefaultToOptin()).toEqual(true);
      expect(getAdvancedSettingsPurposesDefault()).toEqual(true);
      expect(getCustomPurposes()).toEqual(true);
      expect(getLocaleUrl()).toEqual(true);
      expect(getCookieExpireInDays()).toEqual(true);
      expect(getPoiGroupName()).toEqual(true);
    });

    it('should return correct default values', function(){
      expect(getHubPath()).toEqual(DEFAULT_HUB_PATH);
      expect(getIabVendorWhitelist()).toBeFalsy();
      expect(getIabVendorBlacklist()).toBeFalsy();
      expect(getDefaultToOptin()).toEqual(false);
      expect(getAdvancedSettingsPurposesDefault()).toEqual(false);
      expect(getCustomPurposes()).toEqual(DEFAULT_CUSTOM_PURPOSES);
      expect(getLocaleUrl()).toBeFalsy();
      expect(getCookieExpireInDays()).toEqual(DEFAULT_COOKIE_EXPIRES_IN);
      expect(getPoiGroupName()).toEqual(DEFAULT_POI_GROUP);
    });

  });

});
