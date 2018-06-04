import {getPoiCookie, setPoiCookie} from '../../src/scripts/hub/hub_cookies.js';
import {deleteAllCookies} from '../utils.js';

describe('cookies', () => {
  beforeEach(() => {
    deleteAllCookies();
  });

  it('shouldn\'t return the version of oil in the hub domain cookie, when never set', () => {
    let resultCookie = getPoiCookie();
    expect(resultCookie.version).toBe('unknown');
  });

  it('should create the correct hub domain default cookie with empty group name', () => {
    setPoiCookie();
    let resultCookie = JSON.parse(getCookie('oil_data'));
    expect(resultCookie.power_opt_in).toBe(true);
  });

  it('should create the correct hub domain default cookie with undefined group name', () => {
    setPoiCookie(undefined);
    let resultCookie = JSON.parse(getCookie('oil_data'));
    expect(resultCookie.power_opt_in).toBe(true);
  });

  it('should create the correct hub domain default cookie with given group name', () => {
    setPoiCookie('lisasimpson');
    let resultCookie = JSON.parse(getCookie('lisasimpson_oil_data'));
    expect(resultCookie.power_opt_in).toBe(true);
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
