import { handleOptIn, } from '../../../src/scripts/userview/userview_modal.js';
import { loadFixture } from '../../test-utils/utils_fixtures.js';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import * as UserviewConfig from '../../../src/scripts/userview/userview_config.js';
import * as UserViewPrivacy from '../../../src/scripts/userview/userview_privacy.js';
import * as CoreUtils from '../../../src/scripts/core/core_utils.js';
import * as UserviewOptIn from '../../../src/scripts/userview/userview_optin.js'
import * as CorePoi from '../../../src/scripts/core/core_poi.js';
import * as CoreCookies from '../../../src/scripts/core/core_cookies.js';
import { EVENT_NAME_POI_OPT_IN, EVENT_NAME_SOI_OPT_IN, PRIVACY_FULL_TRACKING, PRIVACY_MINIMUM_TRACKING } from '../../../src/scripts/core/core_constants';
import { deleteAllCookies, removeOilLayerAndConfig } from '../../test-utils/utils_reset';

describe('the userview modal handles optin clicks on', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    CoreUtils.setGlobalOilObject('commandCollectionExecutor', undefined);
  });

  describe('SOI', () => {
    it('should do Opt-In with full tracking and send one event', () => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_FULL_TRACKING);

      handleOptIn();

      expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
      expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_SOI_OPT_IN);
      expect(UserviewOptIn.oilOptIn).toHaveBeenCalledWith(PRIVACY_FULL_TRACKING);
      thenOilLayerIsHidden();
    });


    it('should do Opt-In with minimal tracking and send one event ', () => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(true);
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);

      handleOptIn();

      expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
      expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_SOI_OPT_IN);
      expect(UserviewOptIn.oilOptIn).toHaveBeenCalledWith(PRIVACY_MINIMUM_TRACKING);
      thenOilLayerIsHidden();
    });

    it('should do NOT Opt-In with minimal tracking and do not persist minimal tracking', () => {
      mockPowerOptInAndSingleOptIn();
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);
      spyOn(CoreCookies, 'removeSubscriberCookies');

      handleOptIn();

      expect(UserviewOptIn.oilOptIn).toHaveBeenCalledTimes(0);
      expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
    });

    it('should execute command collection executor', (done) => {
      spyOn(CoreUtils, 'getGlobalOilObject').and.callThrough();

      CoreUtils.setGlobalOilObject('commandCollectionExecutor', () => {
        expect(CoreUtils.getGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor');
        done();
      });
      handleOptIn();
    });
  });

  describe('POI', () => {
    it('should do Power Opt-In with full tracking and send one event', () => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();

      handleOptIn();

      expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
      expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_POI_OPT_IN);
      expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledWith(PRIVACY_FULL_TRACKING, false);
      thenOilLayerIsHidden();
    });

    it('should do Power Opt-In with minimal tracking and send one event ', () => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);

      handleOptIn();

      expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
      expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_POI_OPT_IN);
      expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledWith(PRIVACY_MINIMUM_TRACKING, false);
      thenOilLayerIsHidden();
    });

    it('should do NOT Power Opt-In with minimal tracking and do not persist minimal tracking', () => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
      spyOn(CoreCookies, 'removeSubscriberCookies');
      spyOn(CorePoi, 'deActivatePowerOptIn');

      handleOptIn();

      expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledTimes(0);
      expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
      expect(CorePoi.deActivatePowerOptIn).toHaveBeenCalled();
    });

    it('should execute command collection executor', (done) => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'getGlobalOilObject').and.callThrough();

      CoreUtils.setGlobalOilObject('commandCollectionExecutor', () => {
        expect(CoreUtils.getGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor');
        done();
      });
      handleOptIn();
    });

  });

  function mockPowerOptInAndSingleOptIn() {
    spyOn(UserviewOptIn, 'oilOptIn').and.callFake(() => {
      return {
        then: (func) => {
          func();
        }
      };
    });

    spyOn(UserviewOptIn, 'oilPowerOptIn').and.callFake(() => {
      return {
        then: (func) => {
          func();
        }
      };
    });
  }

  function thenOilLayerIsHidden() {
    expect(document.querySelector('.as-oil')).toBeNull();
  }
});
