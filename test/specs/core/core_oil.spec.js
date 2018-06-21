import { initOilLayer } from '../../../src/scripts/core/core_oil';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as UserView from '../../../src/scripts/userview/locale/userview_oil';
import * as CoreCommandCollection from '../../../src/scripts/core/core_command_collection';
import * as CoreOptIn from '../../../src/scripts/core/core_optin';
import * as CoreTagManagement from '../../../src/scripts/core/core_tag_management';
import { waitsForAndRuns } from '../../test-utils/utils_wait';
import { resetOil } from '../../test-utils/utils_reset';

describe('core_oil', () => {

  beforeEach(() => resetOil());

  it('should attach utility functions to window object', () => {

    function verifyThatGlobalOilObjectIsSet(invocationIndex, expectedKey, expectedValue) {
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(invocationIndex)[0]).toEqual(expectedKey);
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(invocationIndex)[1].toString()).toContain(expectedValue);
    }

    spyOn(CoreUtils, 'setGlobalOilObject').and.callThrough();

    initOilLayer();

    // we expect 11 invocations for registered functions and one for CONFIG object itself
    expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledTimes(12);

    verifyThatGlobalOilObjectIsSet(1, 'previewModeOn', "setPreviewCookie");

    verifyThatGlobalOilObjectIsSet(2, 'previewModeOff', 'removePreviewCookie');

    verifyThatGlobalOilObjectIsSet(3, 'verboseModeOn', 'setVerboseCookie');

    verifyThatGlobalOilObjectIsSet(4, 'verboseModeOff', 'removeVerboseCookie');

    verifyThatGlobalOilObjectIsSet(5, 'reload', 'resetConfiguration');
    verifyThatGlobalOilObjectIsSet(5, 'reload', 'initOilLayer');

    verifyThatGlobalOilObjectIsSet(6, 'status', 'getSoiCookie');

    verifyThatGlobalOilObjectIsSet(7, 'showPreferenceCenter', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(7, 'showPreferenceCenter', 'oilShowPreferenceCenter');

    verifyThatGlobalOilObjectIsSet(8, 'triggerOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(8, 'triggerOptIn', 'handleOptIn');

    verifyThatGlobalOilObjectIsSet(9, 'triggerSoiOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(9, 'triggerSoiOptIn', 'handleSoiOptIn');

    verifyThatGlobalOilObjectIsSet(10, 'triggerPoiOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(10, 'triggerPoiOptIn', 'handlePoiOptIn');

    verifyThatGlobalOilObjectIsSet(11, 'triggerOptOut', 'handleOptOut');
  });

  it('should execute command collection and attach command collection execution to window object if opt-in is provided', (done) => {
    let executeCommandCollectionSpy = spyOn(CoreCommandCollection, 'executeCommandCollection').and.callThrough();
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(true));
    spyOn(CoreUtils, 'setGlobalOilObject').and.callThrough();

    initOilLayer();

    waitsForAndRuns(() => {
      return CoreCommandCollection.executeCommandCollection.calls.count() > 0;
    }, () => {
      expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor', executeCommandCollectionSpy);
      done();
    }, 2000);
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
    }, 2000);
  });

  it('should activate dom elements with consent if opt-in is provided', (done) => {
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(true));
    spyOn(CoreTagManagement, 'activateDomElementsWithConsent').and.callThrough();

    initOilLayer();
    waitsForAndRuns(() => {
      return CoreTagManagement.activateDomElementsWithConsent.calls.count() > 0;
    }, () => {
      expect(CoreTagManagement.activateDomElementsWithConsent).toHaveBeenCalled();
      done();
    }, 2000);
  });

  it('should not activate dom elements with consent if opt-in is not provided', (done) => {
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(false));
    spyOn(CoreTagManagement, 'activateDomElementsWithConsent').and.callThrough();

    initOilLayer();
    waitsForAndRuns(() => {
      // we expect that the method is not invoked - but if it does we don't need to wait any longer...
      return CoreTagManagement.activateDomElementsWithConsent.calls.count() > 0;
    }, () => {
      expect(CoreTagManagement.activateDomElementsWithConsent).not.toHaveBeenCalled();
      done();
    }, 2000);
  });
});
