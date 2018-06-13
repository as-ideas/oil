import { getCookieExpireInDays, getHubLocation, getHubOrigin, getHubPath, getLocaleVariantName } from '../../src/scripts/core/core_config';
import { getSoiCookie } from '../../src/scripts/core/core_cookies';
import { getLabel } from '../../src/scripts/userview/userview_config';
import { OIL_LABELS } from '../../src/scripts/userview/userview_constants';
import { loadFixture } from '../test-utils/utils_fixtures';
import { resetOil } from '../test-utils/utils_reset';
import { setupVendorListSpies } from '../test-utils/utils_vendorlist';

describe('configuration', () => {

  beforeEach(() => resetOil());

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
    setupVendorListSpies();

    loadFixture('config/given.config.with.default.to.optin.html');
    expect(getSoiCookie().consentData.getPurposesAllowed().sort()).toEqual([1, 2, 3, 4, 5]);
  });

});
