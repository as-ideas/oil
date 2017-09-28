import { getOilHubDomainCookieConfig } from '../../src/scripts/cookies.js';

describe('cookies', () => {
  beforeEach(() => {
  });

  afterEach(() => {
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
