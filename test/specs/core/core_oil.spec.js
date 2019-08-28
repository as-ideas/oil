import { initOilLayer } from '../../../src/scripts/core/core_oil';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as UserView from '../../../src/scripts/userview/locale/userview_oil';
import * as CoreCommandCollection from '../../../src/scripts/core/core_command_collection';
import * as CoreOptIn from '../../../src/scripts/core/core_optin';
import * as CoreTagManagement from '../../../src/scripts/core/core_tag_management';
import * as CoreCustomVendors from '../../../src/scripts/core/core_custom_vendors';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import { waitsForAndRuns } from '../../test-utils/utils_wait';
import { resetOil } from '../../test-utils/utils_reset';
import { triggerEvent } from '../../test-utils/utils_events';
import { EVENT_NAME_NO_COOKIES_ALLOWED } from '../../../src/scripts/core/core_constants';

describe('core_oil', () => {

  beforeEach(() => resetOil());

  it('should attach utility functions to window object', () => {

    function verifyThatGlobalOilObjectIsSet(invocationIndex, expectedKey, expectedValue) {
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(invocationIndex)[0]).toEqual(expectedKey);
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(invocationIndex)[1].toString()).toContain(expectedValue);
    }

    spyOn(CoreUtils, 'setGlobalOilObject').and.callThrough();

    initOilLayer();

    // we expect 11 invocations for registered functions and THREE for CONFIG object itself
    expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledTimes(14);

    verifyThatGlobalOilObjectIsSet(2, 'previewModeOn', "setPreviewCookie");

    verifyThatGlobalOilObjectIsSet(3, 'previewModeOff', 'removePreviewCookie');

    verifyThatGlobalOilObjectIsSet(4, 'verboseModeOn', 'setVerboseCookie');

    verifyThatGlobalOilObjectIsSet(5, 'verboseModeOff', 'removeVerboseCookie');

    verifyThatGlobalOilObjectIsSet(6, 'reload', 'resetConfiguration');
    verifyThatGlobalOilObjectIsSet(6, 'reload', 'initOilLayer');

    verifyThatGlobalOilObjectIsSet(7, 'status', 'getSoiCookie');

    verifyThatGlobalOilObjectIsSet(8, 'showPreferenceCenter', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(8, 'showPreferenceCenter', 'oilShowPreferenceCenter');

    verifyThatGlobalOilObjectIsSet(9, 'triggerOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(9, 'triggerOptIn', 'handleOptIn');

    verifyThatGlobalOilObjectIsSet(10, 'triggerSoiOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(10, 'triggerSoiOptIn', 'handleSoiOptIn');

    verifyThatGlobalOilObjectIsSet(11, 'triggerPoiOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(11, 'triggerPoiOptIn', 'handlePoiOptIn');

    verifyThatGlobalOilObjectIsSet(12, 'triggerOptOut', 'handleOptOut');

    verifyThatGlobalOilObjectIsSet(13, 'applyGDPR', 'setGdprApplies');
    verifyThatGlobalOilObjectIsSet(13, 'applyGDPR', 'initOilLayer');
  });

  it('should execute command collection and attach command collection execution to window object if opt-in is provided', (done) => {
    let executeCommandCollectionSpy = spyOn(CoreCommandCollection, 'executeCommandCollection').and.callThrough();
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(true));
    spyOn(CoreUtils, 'setGlobalOilObject').and.callThrough();

    initOilLayer();

    waitsForAndRuns(
      () => CoreCommandCollection.executeCommandCollection.calls.count() > 0,
      () => {
        expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor', executeCommandCollectionSpy);
        done();
      },
      2000);
  });

  it('should not execute command collection and attach command collection execution to window object if opt-in is not provided', (done) => {
    let executeCommandCollectionSpy = spyOn(CoreCommandCollection, 'executeCommandCollection').and.callThrough();
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(false));
    spyOn(CoreUtils, 'setGlobalOilObject').and.callThrough();
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(UserView, 'locale');

    initOilLayer();

    waitsForAndRuns(() => {
        let calls = CoreUtils.setGlobalOilObject.calls;
        for (let i = 0; i < calls.count(); i++) {
          if (calls.argsFor(i)[0] === 'commandCollectionExecutor') return true;
        }
        return false;
      }, () => {
        expect(CoreCommandCollection.executeCommandCollection).not.toHaveBeenCalled();
        expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor', executeCommandCollectionSpy);
        done();
      },
      2000);
  });

  it('should send consent information to custom vendors if opt-in is provided', (done) => {
    spyOn(CoreCustomVendors, 'sendConsentInformationToCustomVendors').and.returnValue(Promise.resolve());
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(true));

    initOilLayer();

    waitsForAndRuns(
      () => CoreCustomVendors.sendConsentInformationToCustomVendors.calls.count() > 0,
      () => {
        expect(CoreCustomVendors.sendConsentInformationToCustomVendors).toHaveBeenCalled();
        done();
      },
      2000);
  });

  it('should send consent information to custom vendors if opt-in is not provided', (done) => {
    spyOn(CoreCustomVendors, 'sendConsentInformationToCustomVendors').and.returnValue(Promise.resolve());
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(false));

    initOilLayer();

    waitsForAndRuns(
      () => CoreCustomVendors.sendConsentInformationToCustomVendors.calls.count() > 0,
      () => {
        expect(CoreCustomVendors.sendConsentInformationToCustomVendors).toHaveBeenCalled();
        done();
      },
      2000);
  });

  it('should manage dom elements if oil is initialized and page has been loaded', (done) => {
    spyOn(CoreTagManagement, 'manageDomElementActivation').and.callThrough();

    initOilLayer();
    triggerEvent('DOMContentLoaded');
    waitsForAndRuns(
      () => CoreTagManagement.manageDomElementActivation.calls.count() > 0,
      () => {
        expect(CoreTagManagement.manageDomElementActivation).toHaveBeenCalledTimes(1);
        done();
      },
      2000);
  });

  it('should perform successful cookie check if amp mode is deactivated and cookies are enabled', (done) => {
    spyOn(CoreCookies, 'isBrowserCookieEnabled').and.returnValue(true);
    spyOn(CoreConfig, 'isAmpModeActivated').and.returnValue(false);
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(UserView, 'locale');

    initOilLayer();
    waitsForAndRuns(
      () => CoreCookies.isBrowserCookieEnabled.calls.count() > 0,
      () => {
        expect(CoreCookies.isBrowserCookieEnabled).toHaveBeenCalled();
        expect(CoreUtils.sendEventToHostSite).not.toHaveBeenCalledWith(EVENT_NAME_NO_COOKIES_ALLOWED);
        done();
      },
      2000);
  });

  it('should perform unsuccessful cookie check if amp mode is deactivated and cookies are disabled', (done) => {
    spyOn(CoreCookies, 'isBrowserCookieEnabled').and.returnValue(false);
    spyOn(CoreConfig, 'isAmpModeActivated').and.returnValue(false);
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(UserView, 'locale');

    initOilLayer();
    waitsForAndRuns(
      () => CoreCookies.isBrowserCookieEnabled.calls.count() > 0,
      () => {
        expect(CoreCookies.isBrowserCookieEnabled).toHaveBeenCalled();
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_NO_COOKIES_ALLOWED);
        done();
      },
      2000);
  });

  it('should not perform cookie check if amp mode is activated', (done) => {
    spyOn(CoreCookies, 'isBrowserCookieEnabled');
    spyOn(CoreConfig, 'isAmpModeActivated').and.returnValue(true);
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(UserView, 'locale');

    initOilLayer();
    waitsForAndRuns(
      () => CoreConfig.isAmpModeActivated.calls.count() > 0,
      () => {
        expect(CoreCookies.isBrowserCookieEnabled).not.toHaveBeenCalled();
        expect(CoreUtils.sendEventToHostSite).not.toHaveBeenCalledWith(EVENT_NAME_NO_COOKIES_ALLOWED);
        done();
      },
      2000);
  });
});
