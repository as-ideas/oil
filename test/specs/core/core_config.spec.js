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
import { loadFixture, deleteAllCookies } from '../../utils.js';
import * as CoreLog from '../../../src/scripts/core/core_log';

describe('core_config', () => {

  const DEFAULT_FALLBACK_BACKEND_URL = 'https://oil-backend.herokuapp.com/oil/api/userViewLocales/enEN_01';

  beforeEach(() => {
    resetConfiguration();
  });

  afterEach(() => deleteAllCookies());

  describe('getConfigValue', () => {

    it('returns default when value not found', function () {
      const result = CoreConfig.getConfigValue('foo', 'bar');
      expect(result).toEqual('bar');
    });

  });

  describe('setLocale', function() {

    it('should store locale value', function() {
      CoreConfig.setLocale('baz');
      const result = CoreConfig.getLocale();

      expect(result).toEqual('baz');
    });

  });

  describe('parseServerUrls', function() {

    const DEFAULT_FALLBACK_BACKEND_URL_WITH_LOCALE_STRING  = 'https://oil-backend.herokuapp.com/oil/api/userViewLocales/foo';
    const EXPECTED_PUBLIC_PATH = '//www';

    it('should set __webpack_public_path__', function() {
      loadFixture('config/given.config.with.publicPath.html');
      
      expect(CoreConfig.getPublicPath()).toEqual(EXPECTED_PUBLIC_PATH);
      expect(__webpack_public_path__).toEqual(EXPECTED_PUBLIC_PATH);
    });
    
    it('Backwards compatibility: creates locale_url property if locale is string and locale_url empty', function(){
      loadFixture('config/given.config.with.locale.string.html');
      const result = CoreConfig.getLocaleUrl();
      expect(result).toEqual(DEFAULT_FALLBACK_BACKEND_URL_WITH_LOCALE_STRING);
    });
    
    it('Backwards compatibility: creates locale_url property if locale and locale_url empty', function(){
      loadFixture('config/empty.config.html');
      const result = CoreConfig.getLocaleUrl();
      expect(result).toEqual(DEFAULT_FALLBACK_BACKEND_URL);
    });

    it('should warn about deprecated locale string', function() {
      loadFixture('config/given.config.with.locale.string.html');

      spyOn(CoreLog, 'logError');
      const result = CoreConfig.getLocale();
      expect(CoreLog.logError).toHaveBeenCalled();
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
    const DEFAULT_ADVANCED_SETTINGS_PURPOSES_DEFAULT  = false;
    const DEFAULT_DEFAULT_TO_OPTIN  = false;
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
      expect(getDefaultToOptin()).toEqual(DEFAULT_DEFAULT_TO_OPTIN);
      expect(getAdvancedSettingsPurposesDefault()).toEqual(DEFAULT_ADVANCED_SETTINGS_PURPOSES_DEFAULT);
      expect(getCustomPurposes()).toEqual(DEFAULT_CUSTOM_PURPOSES);
      expect(getLocaleUrl()).toEqual(DEFAULT_FALLBACK_BACKEND_URL);
      expect(getCookieExpireInDays()).toEqual(DEFAULT_COOKIE_EXPIRES_IN);
      expect(getPoiGroupName()).toEqual(DEFAULT_POI_GROUP);
    });

  });

});
