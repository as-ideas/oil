import { doSetTealiumVariables } from '../../src/scripts/core/core_tealium_loading_rules';
import { setSoiOptIn } from '../../src/scripts/core/core_cookies';
import { EVENT_NAME_OPT_IN, PRIVACY_FULL_TRACKING } from '../../src/scripts/core/core_constants';
import { getOrigin } from '../../src/scripts/core/core_utils';

describe('the tealium loading rules', () => {
  beforeEach(() => {
    deleteAllCookies();
    window.utag = undefined;
    window.utag_data = undefined;
    window.oilEventListenerForLoadingRules = undefined;
  });

  afterEach(() => {
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

    expect(window.utag_data._dip_oil_purpose_all).toBe(0);
    expect(window.utag_data._dip_oil_purpose_01).toBe(0);
    expect(window.utag_data._dip_oil_purpose_02).toBe(0);
    expect(window.utag_data._dip_oil_purpose_03).toBe(0);
    expect(window.utag_data._dip_oil_purpose_04).toBe(0);
    expect(window.utag_data._dip_oil_purpose_05).toBe(0);
  });

  it('should have all loading rules true, when all privacy details in cookie are set', () => {
    givenUtagExists();
    givenPrivacySettings(PRIVACY_FULL_TRACKING);

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_purpose_all).toBe(1);
    expect(window.utag_data._dip_oil_purpose_01).toBeFalsy();
    expect(window.utag_data._dip_oil_purpose_02).toBeFalsy();
    expect(window.utag_data._dip_oil_purpose_03).toBeFalsy();
    expect(window.utag_data._dip_oil_purpose_04).toBeFalsy();
    expect(window.utag_data._dip_oil_purpose_05).toBeFalsy();
  });

  it('should have only PURPOSE 1, when only PURPOSE 1 is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      ['1']: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_purpose_all).toBe(0);
    expect(window.utag_data._dip_oil_purpose_01).toBe(1);
    expect(window.utag_data._dip_oil_purpose_02).toBe(0);
    expect(window.utag_data._dip_oil_purpose_03).toBe(0);
    expect(window.utag_data._dip_oil_purpose_04).toBe(0);
    expect(window.utag_data._dip_oil_purpose_05).toBe(0);
  });

  it('should have only PURPOSE 2, when only PURPOSE 2 is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      ['2']: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_purpose_all).toBe(0);
    expect(window.utag_data._dip_oil_purpose_01).toBe(0);
    expect(window.utag_data._dip_oil_purpose_02).toBe(1);
    expect(window.utag_data._dip_oil_purpose_03).toBe(0);
    expect(window.utag_data._dip_oil_purpose_04).toBe(0);
    expect(window.utag_data._dip_oil_purpose_05).toBe(0);
  });

  it('should have only PURPOSE 3, when only PURPOSE 3 is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      ['3']: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_purpose_all).toBe(0);
    expect(window.utag_data._dip_oil_purpose_01).toBe(0);
    expect(window.utag_data._dip_oil_purpose_02).toBe(0);
    expect(window.utag_data._dip_oil_purpose_03).toBe(1);
    expect(window.utag_data._dip_oil_purpose_04).toBe(0);
    expect(window.utag_data._dip_oil_purpose_05).toBe(0);
  });

  it('should have only PURPOSE 4, when only PURPOSE 4 is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      ['4']: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_purpose_all).toBe(0);
    expect(window.utag_data._dip_oil_purpose_01).toBe(0);
    expect(window.utag_data._dip_oil_purpose_02).toBe(0);
    expect(window.utag_data._dip_oil_purpose_03).toBe(0);
    expect(window.utag_data._dip_oil_purpose_04).toBe(1);
    expect(window.utag_data._dip_oil_purpose_05).toBe(0);
  });

  it('should have only PURPOSE 5, when only PURPOSE 5 is set in cookie', () => {
    givenUtagExists();
    givenPrivacySettings({
      ['5']: 1
    });

    doSetTealiumVariables();

    expect(window.utag_data._dip_oil_purpose_all).toBe(0);
    expect(window.utag_data._dip_oil_purpose_01).toBe(0);
    expect(window.utag_data._dip_oil_purpose_02).toBe(0);
    expect(window.utag_data._dip_oil_purpose_03).toBe(0);
    expect(window.utag_data._dip_oil_purpose_04).toBe(0);
    expect(window.utag_data._dip_oil_purpose_05).toBe(1);
  });

  it('should reEvaluate tealium if there is an opt-in event and there was no consent', (done) => {
    givenUtagExists();
    window.utag.view = (payload) => {
      expect(payload).toEqual({
        _dip_oil_purpose_all: 0,
        _dip_oil_purpose_01: 0,
        _dip_oil_purpose_02: 0,
        _dip_oil_purpose_03: 0,
        _dip_oil_purpose_04: 0,
        _dip_oil_purpose_05: 0
      });
      window.utag.view = () => {
      };
      done();
    };


    doSetTealiumVariables();
    window.postMessage(EVENT_NAME_OPT_IN, getOrigin());
  });

  it('should reEvaluate tealium if there is an opt-in event and all consents are set', (done) => {
    givenUtagExists();
    givenPrivacySettings(PRIVACY_FULL_TRACKING);

    window.utag.view = (payload) => {
      expect(payload).toEqual({
        _dip_oil_purpose_all: 1,
        _dip_oil_purpose_01: undefined,
        _dip_oil_purpose_02: undefined,
        _dip_oil_purpose_03: undefined,
        _dip_oil_purpose_04: undefined,
        _dip_oil_purpose_05: undefined

      });
      window.utag.view = () => {
      };
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
