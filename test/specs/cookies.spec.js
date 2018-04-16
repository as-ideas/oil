import {getSoiCookie, setSoiOptIn} from '../../src/scripts/core/core_cookies.js';
import {getPoiCookie, setPoiOptIn} from '../../src/scripts/hub/hub_cookies.js';
import {deleteAllCookies} from '../utils.js';
import {OIL_PAYLOAD_LOCALE_VARIANT_NAME, OIL_PAYLOAD_PRIVACY, OIL_PAYLOAD_VERSION} from '../../src/scripts/core/core_constants.js'
import * as CoreConfig from '../../src/scripts/core/core_config.js';
import * as CoreUtils from '../../src/scripts/core/core_utils.js';
import {OIL_PAYLOAD_LOCALE_VARIANT_VERSION} from '../../src/scripts/core/core_constants';

describe('cookies', () => {
  beforeEach(() => {
    deleteAllCookies();
  });

  afterEach(() => {
  });

  it('shouldnt return the version of oil in the hub domain cookie, when never set', () => {
    let resultCookie = getPoiCookie();
    expect(resultCookie.version).toBe('unknown');

  });

  it('should store the version of oil in the domain cookie', () => {
    spyOn(CoreUtils.OilVersion, 'get').and.returnValue('test-version');
    let resultCookie = getSoiCookie();
    expect(resultCookie.version).toBe('test-version');
  });

  it('should fill the single opt-in cookie with the correct values and overwrite', () => {
    let currentFakeTime = 1;
    let testVersion = 'test-version1';

    spyOn(Date, 'now').and.callFake(function () {
      return currentFakeTime;
    });

    spyOn(CoreUtils.OilVersion, 'get').and.callFake(function () {
      return testVersion;
    });

    let expectedLocaleVariantVersion = 17;
    let expectedLocaleVariantName = 'enEN_01';
    spyOn(CoreUtils, 'getLocaleVariantVersion').and.returnValue(expectedLocaleVariantVersion);
    spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue(expectedLocaleVariantName);

    setSoiOptIn('privacy-test1');

    let resultCookie = JSON.parse(getCookie('oil_data'));

    expect(resultCookie.version).toBe('test-version1');
    expect(resultCookie.opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test1');
    expect(resultCookie.timestamp).toBe(1);
    expect(resultCookie.localeVariantName).toBe(expectedLocaleVariantName);
    expect(resultCookie.localeVariantVersion).toBe(expectedLocaleVariantVersion);

    // set again and check if the values got updated
    currentFakeTime = 2;
    testVersion = 'test-version2';
    setSoiOptIn('privacy-test2');
    resultCookie = JSON.parse(getCookie('oil_data'));

    expect(resultCookie.version).toBe('test-version2');
    expect(resultCookie.opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test2');
    expect(resultCookie.timestamp).toBe(2);
  });

  it('should fill the power opt-in cookie with the correct values and overwrite', () => {
    let currentFakeTime = 1;
    let testVersion = 'test-version1';

    let payload1 = {
      [OIL_PAYLOAD_PRIVACY]: 'privacy-test1',
      [OIL_PAYLOAD_VERSION]: 'test-version1',
      [OIL_PAYLOAD_LOCALE_VARIANT_NAME]: 'test_locale1',
      [OIL_PAYLOAD_LOCALE_VARIANT_VERSION]: 17
    };

    spyOn(Date, 'now').and.callFake(function () {
      return currentFakeTime;
    });

    spyOn(CoreUtils.OilVersion, 'get').and.callFake(function () {
      return testVersion;
    });

    setPoiOptIn('group-test', payload1);

    let resultCookie = JSON.parse(getCookie('group-test_oil_data'));

    expect(resultCookie.version).toBe('test-version1');
    expect(resultCookie.power_opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test1');
    expect(resultCookie.localeVariantName).toBe('test_locale1');
    expect(resultCookie.localeVariantVersion).toBe(17);
    expect(resultCookie.timestamp).toBe(1);


    let payload2 = {
      [OIL_PAYLOAD_PRIVACY]: 'privacy-test2',
      [OIL_PAYLOAD_VERSION]: 'test-version2',
      [OIL_PAYLOAD_LOCALE_VARIANT_NAME]: 'test_locale2',
      [OIL_PAYLOAD_LOCALE_VARIANT_VERSION]: 23
    };

    // set again and check if the values got updated
    currentFakeTime = 2;
    testVersion = 'test-version2';
    setPoiOptIn('group-test2', payload2);
    resultCookie = JSON.parse(getCookie('group-test2_oil_data'));

    expect(resultCookie.version).toBe('test-version2');
    expect(resultCookie.power_opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test2');
    expect(resultCookie.localeVariantName).toBe('test_locale2');
    expect(resultCookie.localeVariantVersion).toBe(23);
    expect(resultCookie.timestamp).toBe(2);
  });

  it('should create the correct hub domain default cookie with groupname empty', () => {
    setPoiOptIn();
    let resultCookie = JSON.parse(getCookie('oil_data'));
    expect(resultCookie.power_opt_in).toBe(true);
  });

  it('should create the correct hub domain default cookie with groupname undefined', () => {
    setPoiOptIn(undefined);
    let resultCookie = JSON.parse(getCookie('oil_data'));
    expect(resultCookie.power_opt_in).toBe(true);
  });

  it('should create the correct hub domain default cookie with groupname', () => {
    setPoiOptIn('lisasimpson');
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
