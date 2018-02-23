import { doSetTealiumVariables } from '../../src/scripts/core/core_tealium_loading_rules';
import { setSoiOptIn } from '../../src/scripts/core/core_cookies';
import { PRIVACY_SETTINGS_FULL_TRACKING } from '../../src/scripts/core/core_constants';

describe('the tealium loading rules', () => {
  beforeEach(() => {
    deleteAllCookies();
    window.utag = undefined;

  });

  const PRIVACY_SETTING_ESSENTIAL = 'esse';
  const PRIVACY_SETTING_ANALYTICS = 'analy';
  const PRIVACY_SETTING_SOCIAL_CONNECT = 'soci';
  const PRIVACY_SETTING_ADS_BASE = 'adsbase';
  const PRIVACY_SETTING_ADS_BEHAVIOUR = 'adsbehav';

  afterEach(() => {
  });

  it('should have the same constants for privacy settings', () => {
    let privacy = PRIVACY_SETTINGS_FULL_TRACKING;
    expect(privacy[PRIVACY_SETTING_ESSENTIAL]).toBe(1);
    expect(privacy[PRIVACY_SETTING_ANALYTICS]).toBe(1);
    expect(privacy[PRIVACY_SETTING_SOCIAL_CONNECT]).toBe(1);
    expect(privacy[PRIVACY_SETTING_ADS_BASE]).toBe(1);
    expect(privacy[PRIVACY_SETTING_ADS_BEHAVIOUR]).toBe(1);
    expect(JSON.stringify(privacy)).toBe('{"oiid":2,"esse":1,"analy":1,"soci":1,"adsbase":1,"adsbehav":1}');
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

  it('should have every loading rule false if there is no pricacy details in cookie', () => {
    givenNothingUtag();
    givenPrivacySettings();

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(false);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(false);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(false);
  });

  it('should have all loading rules true, when all privacy details in cookie are set', () => {
    givenNothingUtag();
    givenPrivacySettings(PRIVACY_SETTINGS_FULL_TRACKING);

    doSetTealiumVariables(true);

    expect(window.utag_data._dip_oil_consent_all).toBe(true);
    expect(window.utag_data._dip_oil_consent_essential).toBe(true);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(true);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(true);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(true);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(true);
  });

  it('should have only ESSENTIAL, when only ESSENTIAL is set in cookie', () => {
    givenNothingUtag();
    givenPrivacySettings({
      [PRIVACY_SETTING_ESSENTIAL]: 1
    });

    doSetTealiumVariables(true);

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(true);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(false);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(false);
  });

  it('should have only ANALYTICS, when only ANALYTICS is set in cookie', () => {
    givenNothingUtag();
    givenPrivacySettings({
      [PRIVACY_SETTING_ANALYTICS]: 1
    });

    doSetTealiumVariables(true);

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(false);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(true);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(false);
  });

  it('should have only SOCIAL_CONNECT, when only SOCIAL_CONNECT is set in cookie', () => {
    givenNothingUtag();
    givenPrivacySettings({
      [PRIVACY_SETTING_SOCIAL_CONNECT]: 1
    });

    doSetTealiumVariables(true);

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(false);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(false);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(true);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(false);
  });

  it('should have only ADS_BASE, when only ADS_BASE is set in cookie', () => {
    givenNothingUtag();
    givenPrivacySettings({
      [PRIVACY_SETTING_ADS_BASE]: 1
    });

    doSetTealiumVariables(true);

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(false);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(false);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(true);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(false);
  });

  it('should have only ADS_BEHAVIOUR, when only ADS_BEHAVIOUR is set in cookie', () => {
    givenNothingUtag();
    givenPrivacySettings({
      [PRIVACY_SETTING_ADS_BEHAVIOUR]: 1
    });

    doSetTealiumVariables(true);

    expect(window.utag_data._dip_oil_consent_all).toBe(false);
    expect(window.utag_data._dip_oil_consent_essential).toBe(false);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(false);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(false);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(true);
  });

  function givenNothingUtag() {
    window.utag = {};
  }

  function givenPrivacySettings(privacySettings) {
    setSoiOptIn(privacySettings);
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
