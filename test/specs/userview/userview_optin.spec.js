import {checkOptIn, oilOptIn, oilPowerOptIn} from '../../../src/scripts/userview/userview_optin';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CorePoi from '../../../src/scripts/core/core_poi';
import * as UserViewPoi from '../../../src/scripts/userview/userview_poi';
import {
  EVENT_NAME_OPT_IN,
  OIL_PAYLOAD_LOCALE_VARIANT_NAME,
  OIL_PAYLOAD_LOCALE_VARIANT_VERSION,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION
} from '../../../src/scripts/core/core_constants';

describe('userview optin handler', () => {

  let privacySettings = {
    'key': 'value'
  };

  describe('opt in checker', () => {
    beforeEach(() => {
      spyOn(CoreCookies, 'setSoiOptIn').and.callFake(() => {
      });
    });

    it('should set use the power optin for the single optin if single optin is not defined and power optin can be verified', (done) => {
      let singleOptIn = false;
      let powerOptIn = true;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({opt_in: singleOptIn});
      spyOn(CoreConfig, 'isSubscriberSetCookieActive').and.returnValue(true);
      spyOn(CorePoi, 'verifyPowerOptIn').and.returnValue(new Promise(resolve => {
        resolve({power_opt_in: powerOptIn, privacy: privacySettings});
      }));

      checkOptIn().then(resultOptIn => {
        expect(resultOptIn).toBe(powerOptIn);
        expect(CorePoi.verifyPowerOptIn).toHaveBeenCalled();
        expect(CoreCookies.setSoiOptIn).toHaveBeenCalledWith(privacySettings);
        done();
      });
    });

    it('should not try to set single optin if power optin cannot be verified', (done) => {
      let singleOptIn = false;
      let powerOptIn = false;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({opt_in: singleOptIn});
      spyOn(CorePoi, 'verifyPowerOptIn').and.returnValue(new Promise(resolve => {
        resolve({power_opt_in: powerOptIn, privacy: privacySettings});
      }));

      checkOptIn().then(resultOptIn => {
        expect(resultOptIn).toBe(singleOptIn);
        expect(CorePoi.verifyPowerOptIn).toHaveBeenCalled();
        expect(CoreCookies.setSoiOptIn).not.toHaveBeenCalled();
        done();
      });
    });

    it('should not try to set single optin if power optin can be verified but subscriperSetCookie is not active', (done) => {
      let singleOptIn = false;
      let powerOptIn = true;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({opt_in: singleOptIn});
      spyOn(CoreConfig, 'isSubscriberSetCookieActive').and.returnValue(false);
      spyOn(CorePoi, 'verifyPowerOptIn').and.returnValue(new Promise(resolve => {
        resolve({power_opt_in: powerOptIn, privacy: privacySettings});
      }));

      checkOptIn().then(resultOptIn => {
        expect(resultOptIn).toBe(powerOptIn);
        expect(CorePoi.verifyPowerOptIn).toHaveBeenCalled();
        expect(CoreCookies.setSoiOptIn).not.toHaveBeenCalled();
        done();
      });
    });

    it('should not try to set single optin if power optin can be verified but single optin is already set', (done) => {
      let singleOptIn = true;
      let powerOptIn = true;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({opt_in: singleOptIn});
      spyOn(CoreConfig, 'isSubscriberSetCookieActive').and.returnValue(true);
      spyOn(CorePoi, 'verifyPowerOptIn').and.returnValue(new Promise(resolve => {
        resolve({power_opt_in: powerOptIn, privacy: privacySettings});
      }));

      checkOptIn().then(resultOptIn => {
        expect(resultOptIn).toBe(powerOptIn);
        expect(CorePoi.verifyPowerOptIn).toHaveBeenCalled();
        expect(CoreCookies.setSoiOptIn).not.toHaveBeenCalled();
        done();
      });
    });

  });

  describe('power optin handler', () => {
    let expectedLocaleVariantName = 'enEN_01';
    let expectedLocaleVariantVersion = 17;

    beforeEach(() => {
      spyOn(UserViewPoi, 'activatePowerOptInWithIFrame');
      spyOn(UserViewPoi, 'activatePowerOptInWithRedirect');
      spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue(expectedLocaleVariantName);
      spyOn(CoreCookies, 'setSoiOptIn').and.callFake(() => {
      });
      spyOn(CoreUtils, 'getLocaleVariantVersion').and.returnValue(expectedLocaleVariantVersion);
      spyOn(CoreUtils, 'sendEventToHostSite');
    });

    function verifyThatPayloadForPowerOptInActivationIsCorrect(payload) {
      expect(payload).toBeDefined();
      expect(payload[OIL_PAYLOAD_PRIVACY]).toEqual(privacySettings);
      expect(payload[OIL_PAYLOAD_VERSION]).toEqual(CoreUtils.OilVersion.get());
      expect(payload[OIL_PAYLOAD_LOCALE_VARIANT_NAME]).toEqual(expectedLocaleVariantName);
      expect(payload[OIL_PAYLOAD_LOCALE_VARIANT_VERSION]).toEqual(expectedLocaleVariantVersion);
    }

    it('should set single optin too if it is not prohibited', (done) => {
      oilPowerOptIn(privacySettings, false).then(() => {
        expect(CoreCookies.setSoiOptIn).toHaveBeenCalledWith(privacySettings);
        done();
      });
    });

    it('should not set single optin too if it is prohibited', (done) => {
      oilPowerOptIn(privacySettings, true).then(() => {
        expect(CoreCookies.setSoiOptIn).not.toHaveBeenCalled();
        done();
      });
    });

    it('should activate power optin with iframe', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);

      oilPowerOptIn(privacySettings).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).toHaveBeenCalled();

        let payload = UserViewPoi.activatePowerOptInWithIFrame.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payload);

        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    it('should activate power optin with redirect if activation with iframe fails', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
      spyOn(CorePoi, 'verifyPowerOptIn').and.returnValue(new Promise(resolve => {
        resolve({power_opt_in: false});
      }));

      oilPowerOptIn(privacySettings).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).toHaveBeenCalled();

        let payloadForIFrame = UserViewPoi.activatePowerOptInWithIFrame.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payloadForIFrame);

        let payloadForRedirect = UserViewPoi.activatePowerOptInWithRedirect.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payloadForRedirect);

        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    it('should not activate power optin if power option is not activated', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(false);
      spyOn(CorePoi, 'verifyPowerOptIn');

      oilPowerOptIn(privacySettings).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).not.toHaveBeenCalled();
        expect(UserViewPoi.activatePowerOptInWithRedirect).not.toHaveBeenCalled();
        expect(CorePoi.verifyPowerOptIn).not.toHaveBeenCalled();
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });
  });

  describe('single optin handler', () => {

    beforeEach(() => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      spyOn(CoreCookies, 'setSoiOptIn').and.callFake(() => {
      });
    });

    it('should set single optin', (done) => {
      oilOptIn(privacySettings).then(() => {
        expect(CoreCookies.setSoiOptIn).toHaveBeenCalledWith(privacySettings);
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });
  });
});
