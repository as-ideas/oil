import {getOilHubDomainCookieConfig, getOilDomainCookieConfig, setSoiOptIn, setPoiOptIn} from '../../src/scripts/cookies.js';
import {OilVersion} from '../../src/scripts/utils.js';

describe('cookies', () => {
  beforeEach(() => {
    deleteAllCookies();
  });

  afterEach(() => {
  });

  it('should store the version of oil in the hub domain cookie', () => {
    let resultCookie = getOilHubDomainCookieConfig();
    expect(resultCookie.default_content.version).toBe('test-version');

  });

  it('should store the version of oil in the domain cookie', () => {
    let resultCookie = getOilDomainCookieConfig();
    expect(resultCookie.default_content.version).toBe('test-version');

  });

  it('should fill the single opt-in cookie with the correct values and overwrite', () => {
    let currentFakeTime = 1;
    let testVersion = 'test-version1';

    spyOn(Date, 'now').and.callFake(function() {
      return currentFakeTime;
    });

    spyOn(OilVersion, 'get').and.callFake(function() {
      return testVersion;
    });

    setSoiOptIn('privacy-test1');

    let resultCookie = JSON.parse(getCookie('oil_data'));

    expect(resultCookie.version).toBe('test-version1');
    expect(resultCookie.opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test1');
    expect(resultCookie.timestamp).toBe(1);

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

    spyOn(Date, 'now').and.callFake(function() {
      return currentFakeTime;
    });

    spyOn(OilVersion, 'get').and.callFake(function() {
      return testVersion;
    });

    setPoiOptIn('group-test', 'privacy-test');

    let resultCookie = JSON.parse(getCookie('group-test_oil_data'));

    expect(resultCookie.version).toBe('test-version1');
    expect(resultCookie.power_opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test');
    expect(resultCookie.timestamp).toBe(1);


    // set again and check if the values got updated
    currentFakeTime = 2;
    testVersion = 'test-version2';
    setPoiOptIn('group-test2', 'privacy-test2');
    resultCookie = JSON.parse(getCookie('group-test2_oil_data'));

    expect(resultCookie.version).toBe('test-version2');
    expect(resultCookie.power_opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test2');
    expect(resultCookie.timestamp).toBe(2);
  });

  it('should create the correct hub domain default cookie with groupname empty', () => {
    let resultCookie = getOilHubDomainCookieConfig('');
    expect(resultCookie.name).toBe('oil_data');
  });

  it('should create the correct hub domain default cookie with groupname undefined', () => {
    let resultCookie = getOilHubDomainCookieConfig();
    expect(resultCookie.name).toBe('oil_data');
  });

  it('should create the correct hub domain default cookie with groupname', () => {
    let resultCookie = getOilHubDomainCookieConfig('lisasimpson');
    expect(resultCookie.name).toBe('lisasimpson_oil_data');
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

/**
 * Remove all cookies
 *
 * @returns void
 */
function deleteAllCookies() {
  let cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf('=');
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}
