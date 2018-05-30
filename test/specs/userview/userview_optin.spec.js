import {oilOptIn, oilPowerOptIn} from '../../../src/scripts/userview/userview_optin';
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

describe('user view opt-in handler', () => {

  let privacySettings = {
    'key': 'value'
  };

  describe('power opt-in handler', () => {
    let expectedLocaleVariantName = 'enEN_01';
    let expectedLocaleVariantVersion = 17;

    beforeEach(() => {
      spyOn(UserViewPoi, 'activatePowerOptInWithIFrame');
      spyOn(UserViewPoi, 'activatePowerOptInWithRedirect');
      spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue(expectedLocaleVariantName);
      spyOn(CoreCookies, 'setSoiCookie');
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

    it('should set single opt-in too if it is not prohibited', (done) => {
      oilPowerOptIn(privacySettings, false).then(() => {
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(privacySettings);
        done();
      });
    });

    it('should not set single opt-in too if it is prohibited', (done) => {
      oilPowerOptIn(privacySettings, true).then(() => {
        expect(CoreCookies.setSoiCookie).not.toHaveBeenCalled();
        done();
      });
    });

    it('should activate power opt-in with iframe', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);

      oilPowerOptIn(privacySettings).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).toHaveBeenCalled();

        let payload = UserViewPoi.activatePowerOptInWithIFrame.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payload);

        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    it('should activate power opt-in with redirect if activation with iframe fails', (done) => {
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

    it('should not activate power opt-in if power option is not activated', (done) => {
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

  describe('single opt-in handler', () => {

    beforeEach(() => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      spyOn(CoreCookies, 'setSoiCookie');
    });

    it('should set single opt-in', (done) => {
      oilOptIn(privacySettings).then(() => {
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(privacySettings);
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });
  });
});
