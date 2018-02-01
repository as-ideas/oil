import {getOilHubDomainCookieConfig, getOilDomainCookieConfig, setSoiOptIn, setPoiOptIn, OilVersion} from '../../src/scripts/cookies.js';

fdescribe('cookies', () => {
  beforeEach(() => {
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

  fit('should fill the single opt-in cookie with the correct values', () => {

    spyOn(OilVersion, 'getOilVersion').and.returnValues('test-version1', 'test-version2', 'test-version3', 'test-version4', 'test-version5', 'test-version6');

    let startTimestamp = Date.now();

    setSoiOptIn('privacy-test1');
    let resultCookie = JSON.parse(getCookie('oil_data'));

    console.info('info1: ' + resultCookie.version);

    //ToDo: comment on after karma re config
    //expect(resultCookie.version).toBe('test-version1');
    expect(resultCookie.opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test1');
    expect(resultCookie.timestamp).toBeGreaterThan(startTimestamp - 1);
    expect(resultCookie.timestamp).toBeLessThan(Date.now() + 1);

    setSoiOptIn('privacy-test2');
    resultCookie = JSON.parse(getCookie('oil_data'));

    console.info('info2: ' + getCookie('oil_data'));

    //
    // expect(resultCookie2.version).toBe('test-version2');

  });

  it('should fill the power opt-in cookie with the correct values', () => {
    let startTimestamp = Date.now();
    setPoiOptIn('group-test', 'privacy-test');
    let resultCookie = JSON.parse(getCookie('group-test_oil_data'));

    expect(resultCookie.version).toBe('test-version');
    expect(resultCookie.power_opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test');
    expect(resultCookie.timestamp).toBeGreaterThan(startTimestamp - 1);
    expect(resultCookie.timestamp).toBeLessThan(Date.now() + 1);
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
  if (!sKey) { return null; }
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
}
