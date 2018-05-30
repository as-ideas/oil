import {getPoiCookie, setPoiCookie} from '../../src/scripts/hub/hub_cookies.js';
import {deleteAllCookies} from '../utils.js';
import * as CoreVendorInformation from '../../src/scripts/core/core_vendor_information.js';
import VENDOR_LIST from '../fixtures/vendorlist/simple_vendor_list'

describe('cookies', () => {
  beforeEach(() => {
    spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
    spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
    deleteAllCookies();
  });

  afterEach(() => {
  });

  it('shouldn\'t return the version of oil in the hub domain cookie, when never set', () => {
    let resultCookie = getPoiCookie();
    expect(resultCookie.version).toBe('unknown');
  });

  it('should create the correct hub domain default cookie with empty group name', (done) => {
    setPoiCookie().then(() => {
      let resultCookie = JSON.parse(getCookie('oil_data'));
      expect(resultCookie.power_opt_in).toBe(true);
      done();
    });
  });

  it('should create the correct hub domain default cookie with undefined group name', (done) => {
    setPoiCookie(undefined).then(() => {
      let resultCookie = JSON.parse(getCookie('oil_data'));
      expect(resultCookie.power_opt_in).toBe(true);
      done();
    });
  });

  it('should create the correct hub domain default cookie with given group name', (done) => {
    setPoiCookie('lisasimpson').then(() => {
      let resultCookie = JSON.parse(getCookie('lisasimpson_oil_data'));
      expect(resultCookie.power_opt_in).toBe(true);
      done();
    });
  });

});

/**
 * Reads a set cookie as a low level value
 *
 * @param sKey
 * @returns {*}
 */
function getCookie(sKey) {
  if (!sKey) {
    return null;
  }
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
}
