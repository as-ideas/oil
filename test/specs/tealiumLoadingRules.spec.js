import { doSetTealiumVariables } from '../../src/scripts/tealiumLoadingRules';

describe('the tealium loading rules', () => {
  beforeEach(() => {
    deleteAllCookies();
    window.utag = undefined;

  });

  afterEach(() => {
  });

  it('should do nothing when utag is not defined', () => {
    // givenNothing

    doSetTealiumVariables();

    expect(window.utag_data).toBeUndefined();
  });

  it('should define utag_data when it is not defined', () => {
    givenNothingUtag();

    doSetTealiumVariables();

    expect(window.utag_data).toBeDefined();
  });

  it('should have every loading rule false if there is no optin and no pricacy settings', () => {
    givenNothingUtag();

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(false);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(false);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(false);
  });

  function givenNothingUtag() {
    window.utag = {};
  }
});


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
