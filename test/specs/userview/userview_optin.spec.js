import { oilOptIn, oilPowerOptIn } from '../../../src/scripts/userview/userview_optin';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CorePoi from '../../../src/scripts/core/core_poi';
import * as UserViewPoi from '../../../src/scripts/userview/userview_poi';
import {
  EVENT_NAME_OPT_IN, OIL_PAYLOAD_CONFIG_VERSION,
  OIL_PAYLOAD_CUSTOM_PURPOSES, OIL_PAYLOAD_CUSTOM_VENDORLIST_VERSION,
  OIL_PAYLOAD_LOCALE_VARIANT_NAME,
  OIL_PAYLOAD_LOCALE_VARIANT_VERSION,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION
} from '../../../src/scripts/core/core_constants';
import { resetOil } from '../../test-utils/utils_reset';
import { setupVendorListSpies } from '../../test-utils/utils_vendorlist';

describe('user view opt-in handler', () => {

  const CONFIG_VERSION = 17;

  const EXPECTED_COOKIE = {
    opt_in: true,
    version: '1.0.0',
    localeVariantName: 'enEN_01',
    localeVariantVersion: 17,
    customPurposes: [25],
    customVendorListVersion: 135,
    configVersion: CONFIG_VERSION,
    consentString: 'BOOqZJ1OOqZJ1BQABBENARAAAAABgACACA'
  };

  const PRIVACY_SETTINGS = {
    'key': 'value'
  };

  beforeEach(() => resetOil());

  describe('power opt-in handler', () => {
    let expectedLocaleVariantName = 'enEN_01';
    let expectedLocaleVariantVersion = 17;

    beforeEach(() => {
      spyOn(UserViewPoi, 'activatePowerOptInWithIFrame');
      spyOn(UserViewPoi, 'activatePowerOptInWithRedirect');
      spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue(expectedLocaleVariantName);
      spyOn(CoreCookies, 'setSoiCookie').and.returnValue(new Promise((resolve) => resolve(EXPECTED_COOKIE)));
      spyOn(CoreCookies, 'buildSoiCookie').and.returnValue(new Promise((resolve) => resolve(EXPECTED_COOKIE)));
      spyOn(CoreUtils, 'getLocaleVariantVersion').and.returnValue(expectedLocaleVariantVersion);
      spyOn(CoreUtils, 'sendEventToHostSite');
      setupVendorListSpies();
    });

    it('should set single opt-in too if it is not prohibited', (done) => {
      oilPowerOptIn(PRIVACY_SETTINGS).then(() => {
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(PRIVACY_SETTINGS);
        done();
      });
    });

    it('should activate power opt-in with iframe', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);

      oilPowerOptIn(PRIVACY_SETTINGS).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).toHaveBeenCalled();
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(PRIVACY_SETTINGS);

        let payload = UserViewPoi.activatePowerOptInWithIFrame.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payload, EXPECTED_COOKIE);

        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    it('should activate power opt-in with iframe without consent string for info_banner_only', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
      spyOn(CoreConfig, 'getInfoBannerOnly').and.returnValue(true);

      const EXPECTED_COOKIE = {
        opt_in: true,
        version: '1.0.0',
        localeVariantName: 'enEN_01',
        localeVariantVersion: 17,
        customPurposes: [25],
        customVendorListVersion: 135,
        configVersion: CONFIG_VERSION,
        consentString: ''
      };

      oilPowerOptIn(PRIVACY_SETTINGS).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).toHaveBeenCalled();
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(PRIVACY_SETTINGS);

        let payload = UserViewPoi.activatePowerOptInWithIFrame.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payload, EXPECTED_COOKIE);

        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    it('should activate power opt-in with redirect if activation with iframe fails', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
      spyOn(CorePoi, 'verifyPowerOptIn').and.returnValue(new Promise(resolve => {
        resolve({power_opt_in: false});
      }));

      oilPowerOptIn(PRIVACY_SETTINGS).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).toHaveBeenCalled();
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(PRIVACY_SETTINGS);

        let payload = UserViewPoi.activatePowerOptInWithIFrame.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payload, EXPECTED_COOKIE);

        let payloadForRedirect = UserViewPoi.activatePowerOptInWithRedirect.calls.argsFor(0)[0];
        verifyThatPayloadForPowerOptInActivationIsCorrect(payloadForRedirect, EXPECTED_COOKIE);

        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    it('should not activate power opt-in if power option is not activated', (done) => {
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(false);
      spyOn(CorePoi, 'verifyPowerOptIn');

      oilPowerOptIn(PRIVACY_SETTINGS).then(() => {
        expect(UserViewPoi.activatePowerOptInWithIFrame).not.toHaveBeenCalled();
        expect(UserViewPoi.activatePowerOptInWithRedirect).not.toHaveBeenCalled();
        expect(CorePoi.verifyPowerOptIn).not.toHaveBeenCalled();
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });

    function verifyThatPayloadForPowerOptInActivationIsCorrect(payload, expectations) {
      expect(payload).toBeDefined();
      expect(payload[OIL_PAYLOAD_PRIVACY]).toEqual(expectations.consentString);
      expect(payload[OIL_PAYLOAD_VERSION]).toEqual(expectations.version);
      expect(payload[OIL_PAYLOAD_LOCALE_VARIANT_NAME]).toEqual(expectations.localeVariantName);
      expect(payload[OIL_PAYLOAD_LOCALE_VARIANT_VERSION]).toEqual(expectations.localeVariantVersion);
      expect(payload[OIL_PAYLOAD_CUSTOM_PURPOSES]).toEqual(expectations.customPurposes);
      expect(payload[OIL_PAYLOAD_CUSTOM_VENDORLIST_VERSION]).toEqual(expectations.customVendorListVersion);
      expect(payload[OIL_PAYLOAD_CONFIG_VERSION]).toEqual(expectations.configVersion);
    }

  });

  describe('single opt-in handler', () => {

    beforeEach(() => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      spyOn(CoreCookies, 'setSoiCookie').and.returnValue(new Promise((resolve) => resolve(EXPECTED_COOKIE)));
    });

    it('should set single opt-in', (done) => {
      oilOptIn(PRIVACY_SETTINGS).then(() => {
        expect(CoreCookies.setSoiCookie).toHaveBeenCalledWith(PRIVACY_SETTINGS);
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_IN);
        done();
      });
    });
  });
});
