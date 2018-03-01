import { doSetTealiumVariables } from '../../src/scripts/core/core_tealium_loading_rules';
import { setSoiOptIn } from '../../src/scripts/core/core_cookies';
import { EVENT_NAME_OPT_IN, PRIVACY_SETTINGS_FULL_TRACKING } from '../../src/scripts/core/core_constants';
import { getOrigin } from '../../src/scripts/core/core_utils';

describe('the tealium loading rules', () => {
  beforeEach(() => {
    deleteAllCookies();
    window.utag = undefined;
    window.utag_data = undefined;
    window.oilEventListenerForLoadingRules = undefined;
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
    givenUtagExists();

    doSetTealiumVariables();

    expect(window.utag_data).toBeDefined();
  });

  it('should not override utag_data when it is already defined', () => {
    givenUtagExists();
    givenUtagDataAlreadyExists();

    doSetTealiumVariables();

    expect(window.utag_data.hello).toBe('World');
  });

  it('should attach the event handler only once', () => {
    givenUtagExists();

    doSetTealiumVariables();
    // doSetTealiumVariables();

    expect(window.oilEventListenerForLoadingRules).toBeDefined();
  });

  it('should have every loading rule false if there is no pricacy details in cookie', () => {
    givenUtagExists();

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(0);
    expect(window.utag_data._dip_oil_consent_essential).toBe(0);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(0);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(0);
  });

  it('should have all loading rules true, when all privacy details in cookie are set', () => {
    givenUtagExists();
    givenPrivacySettings(PRIVACY_SETTINGS_FULL_TRACKING);

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(1);
    expect(window.utag_data._dip_oil_consent_essential).toBe(1);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(1);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(1);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(1);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(1);
  });

  it('should have only ESSENTIAL, when only ESSENTIAL is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      [PRIVACY_SETTING_ESSENTIAL]: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(0);
    expect(window.utag_data._dip_oil_consent_essential).toBe(1);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(0);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(0);
  });

  it('should have only ANALYTICS, when only ANALYTICS is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      [PRIVACY_SETTING_ANALYTICS]: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(0);
    expect(window.utag_data._dip_oil_consent_essential).toBe(0);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(1);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(0);
  });

  it('should have only SOCIAL_CONNECT, when only SOCIAL_CONNECT is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      [PRIVACY_SETTING_SOCIAL_CONNECT]: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(0);
    expect(window.utag_data._dip_oil_consent_essential).toBe(0);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(0);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(1);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(0);
  });

  it('should have only ADS_BASE, when only ADS_BASE is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      [PRIVACY_SETTING_ADS_BASE]: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(0);
    expect(window.utag_data._dip_oil_consent_essential).toBe(0);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(0);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(1);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(0);
  });

  it('should have only ADS_BEHAVIOUR, when only ADS_BEHAVIOUR is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      [PRIVACY_SETTING_ADS_BEHAVIOUR]: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_consent_all).toBe(0);
    expect(window.utag_data._dip_oil_consent_essential).toBe(0);
    expect(window.utag_data._dip_oil_consent_analytics).toBe(0);
    expect(window.utag_data._dip_oil_consent_social_connect).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_base).toBe(0);
    expect(window.utag_data._dip_oil_consent_ads_behaviour).toBe(1);
  });

  it('should reEvaluate tealium if there is an opt-in event and there was no consent', (done) => {
    givenUtagExists();
    window.utag.view = (payload) => {
      expect(payload).toEqual({
        _dip_oil_consent_all: 0,
        _dip_oil_consent_essential: 0,
        _dip_oil_consent_analytics: 0,
        _dip_oil_consent_social_connect: 0,
        _dip_oil_consent_ads_base: 0,
        _dip_oil_consent_ads_behaviour: 0
      });
      window.utag.view = () => {};
      done();
    };


    doSetTealiumVariables();
    window.postMessage(EVENT_NAME_OPT_IN, getOrigin());
  });

  it('should reEvaluate tealium if there is an opt-in event and all consents are set', (done) => {
    givenUtagExists();
    givenPrivacySettings(PRIVACY_SETTINGS_FULL_TRACKING);
    window.utag.view = (payload) => {
      expect(payload).toEqual({
        _dip_oil_consent_all: 1,
        _dip_oil_consent_essential: 1,
        _dip_oil_consent_analytics: 1,
        _dip_oil_consent_social_connect: 1,
        _dip_oil_consent_ads_base: 1,
        _dip_oil_consent_ads_behaviour: 1
      });
      window.utag.view = () => {};
      done();
    };


    doSetTealiumVariables();
    window.postMessage(EVENT_NAME_OPT_IN, getOrigin());
  });

  function givenUtagDataAlreadyExists() {
    window.utag_data = {hello: 'World'};

  }

  function givenUtagExists() {
    window.utag = {
      view: () => {
      }
    };
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
