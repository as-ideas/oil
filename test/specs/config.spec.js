import {getCookieExpireInDays, getHubLocation, getHubOrigin, getHubPath, getLocaleVariantName, resetConfiguration} from '../../src/scripts/core/core_config.js';
import {getSoiCookie} from '../../src/scripts/core/core_cookies.js';
import {getLabel} from '../../src/scripts/userview/userview_config.js';
import {OIL_LABELS} from '../../src/scripts/userview/userview_constants.js';
import {loadFixture} from '../utils.js';
import VENDOR_LIST from '../fixtures/vendorlist/simple_vendor_list'
import * as CoreVendorInformation from '../../src/scripts/core/core_vendor_information';


describe('configuration', () => {

  beforeEach(() => {
    resetConfiguration();
  });

  it('should work with empty config', () => {
    loadFixture('config/empty.config.html');
    expect(getCookieExpireInDays()).toBe(31);
  });

  it('should work with a given config', () => {
    loadFixture('config/given.config.html');
    expect(getCookieExpireInDays()).toBe(31);
    expect(getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)).toBe('lisa simpson');
  });

  it('should work with overwritten default values', () => {
    loadFixture('config/overwritten.config.html');
    expect(getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)).toBe('lisa simpson');
  });

  it('should work with invalid config', () => {
    loadFixture('config/invalid.config.html');
    expect(getCookieExpireInDays()).toBe(31);
  });

  it('should generate location', () => {
    loadFixture('config/location.config.html');
    expect(getHubOrigin()).toBe('http://oil-integration-cdn.herokuapp.com');
    expect(getHubPath()).toBe('/demos/complete-integration-mypass.html');
    expect(getHubLocation()).toBe('http://oil-integration-cdn.herokuapp.com/demos/complete-integration-mypass.html');
  });

  it('should be able to read the locale', () => {
    loadFixture('config/locale.config.html');
    expect(getLocaleVariantName()).toBe('absurdistan');
  });

  it('should set consent for all purposes when default_to_optin=true', function () {
    spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
    spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);

    loadFixture('config/given.config.with.default.to.optin.html');
    expect(getSoiCookie().consentData.getPurposesAllowed().sort()).toEqual([1, 2, 3, 4, 5]);
  });

});
