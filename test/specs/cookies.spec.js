import {getOilHubDomainCookieConfig, getOilDomainCookieConfig, setSoiOptIn, setPoiOptIn} from '../../src/scripts/cookies.js';

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

  it('tbd..1', () => {
    let startTimestamp = Date.now();
    setSoiOptIn('privacy-test');
    let resultCookie = JSON.parse(getCookie('oil_data'));

    expect(resultCookie.version).toBe('test-version');
    expect(resultCookie.opt_in).toBe(true);
    expect(resultCookie.privacy).toBe('privacy-test');
    expect(resultCookie.timestamp).toBeGreaterThan(startTimestamp - 1);
    expect(resultCookie.timestamp).toBeLessThan(Date.now() + 1);
  });

  fit('tbd..2', () => {
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


function getCookie(sKey) {
  if (!sKey) { return null; }
  return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
}
