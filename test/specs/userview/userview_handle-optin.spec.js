import { handleOptIn, } from '../../../src/scripts/userview/userview_modal';
import { loadFixture } from '../../test-utils/utils_fixtures';
import * as UserviewConfig from '../../../src/scripts/userview/userview_config';
import * as UserViewPrivacy from '../../../src/scripts/userview/userview_privacy';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as UserviewOptIn from '../../../src/scripts/userview/userview_optin'
import * as CorePoi from '../../../src/scripts/core/core_poi';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreTagManagement from '../../../src/scripts/core/core_tag_management';
import { EVENT_NAME_POI_OPT_IN, EVENT_NAME_SOI_OPT_IN, PRIVACY_FULL_TRACKING, PRIVACY_MINIMUM_TRACKING } from '../../../src/scripts/core/core_constants';
import { resetOil } from '../../test-utils/utils_reset';
import { waitsForAndRuns } from '../../test-utils/utils_wait';

describe('the user view modal handles opt-in clicks on', () => {

  beforeEach(() => {
    resetOil();
    spyOn(CoreTagManagement, 'manageDomElementActivation');
  });

  describe('SOI', () => {
    it('should do opt-in with full tracking and send one event', (done) => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_FULL_TRACKING);

      handleOptIn();
      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
          expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_SOI_OPT_IN);
          expect(UserviewOptIn.oilOptIn).toHaveBeenCalledWith(PRIVACY_FULL_TRACKING);
          thenOilLayerIsHidden();
          done();
        },
        2000);
    });

    it('should do opt-in with minimal tracking and send one event ', (done) => {
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(true);
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);

      handleOptIn();

      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
          expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_SOI_OPT_IN);
          expect(UserviewOptIn.oilOptIn).toHaveBeenCalledWith(PRIVACY_MINIMUM_TRACKING);
          thenOilLayerIsHidden();
          done();
        },
        2000);
    });

    it('should not do opt-in with minimal tracking and not persist minimal tracking', (done) => {
      mockPowerOptInAndSingleOptIn();
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);
      spyOn(CoreCookies, 'removeSubscriberCookies');

      handleOptIn();

      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(UserviewOptIn.oilOptIn).toHaveBeenCalledTimes(0);
          expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
          done();
        },
        2000);
    });

    it('should execute command collection executor', (done) => {
      spyOn(CoreUtils, 'getGlobalOilObject').and.callThrough();

      CoreUtils.setGlobalOilObject('commandCollectionExecutor', () => {
        expect(CoreUtils.getGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor');
        done();
      });
      handleOptIn();
    });

    it('should activate dom elements with consent', (done) => {
      handleOptIn();
      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(CoreTagManagement.manageDomElementActivation).toHaveBeenCalled();
          done();
        },
        2000);
    });
  });

  describe('POI', () => {

    it('should do power opt-in with full tracking and send one event', (done) => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();

      handleOptIn();

      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
          expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_POI_OPT_IN);
          expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledWith(PRIVACY_FULL_TRACKING, false);
          thenOilLayerIsHidden();
          done();
        },
        2000);
    });

    it('should do power opt-in with minimal tracking and send one event ', (done) => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);

      handleOptIn();

      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(1);
          expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual(EVENT_NAME_POI_OPT_IN);
          expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledWith(PRIVACY_MINIMUM_TRACKING, false);
          thenOilLayerIsHidden();
          done();
        },
        2000);
    });

    it('should not do power opt-in with minimal tracking and not persist minimal tracking', (done) => {
      loadFixture('poi/poi.default.html');
      spyOn(CoreUtils, 'sendEventToHostSite');
      mockPowerOptInAndSingleOptIn();
      spyOn(UserViewPrivacy, 'getPrivacySettings').and.callFake(() => PRIVACY_MINIMUM_TRACKING);
      spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
      spyOn(CoreCookies, 'removeSubscriberCookies');
      spyOn(CorePoi, 'deActivatePowerOptIn').and.returnValue(new Promise(resolve => resolve()));

      handleOptIn();

      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledTimes(0);
          expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
          expect(CorePoi.deActivatePowerOptIn).toHaveBeenCalled();
          done();
        },
        2000);
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

    it('should activate dom elements with consent', (done) => {
      loadFixture('poi/poi.default.html');
      handleOptIn();
      waitsForAndRuns(
        () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
        () => {
          expect(CoreTagManagement.manageDomElementActivation).toHaveBeenCalled();
          done();
        },
        2000);
    });
  });

  function mockPowerOptInAndSingleOptIn() {
    spyOn(UserviewOptIn, 'oilOptIn').and.returnValue(new Promise((resolve) => resolve()));
    spyOn(UserviewOptIn, 'oilPowerOptIn').and.returnValue(new Promise((resolve) => resolve()));
  }

  function thenOilLayerIsHidden() {
    expect(document.querySelector('.as-oil')).toBeNull();
  }
});
