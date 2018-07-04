import {initOilLayer} from '../../../src/scripts/core/core_oil';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as UserView from '../../../src/scripts/userview/locale/userview_oil';
import * as CoreCommandCollection from '../../../src/scripts/core/core_command_collection';
import * as CoreOptIn from '../../../src/scripts/core/core_optin';
import * as CoreTagManagement from '../../../src/scripts/core/core_tag_management';
import {waitsForAndRuns} from '../../test-utils/utils_wait';
import {resetOil} from '../../test-utils/utils_reset';

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

    verifyThatGlobalOilObjectIsSet(13, 'setGdprApplies', 'setGdprApplies');
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
    spyOn(CoreTagManagement, 'manageDomElementActivation').and.callThrough();

    initOilLayer();
    setTimeout(() => {
      expect(CoreTagManagement.manageDomElementActivation).toHaveBeenCalledTimes(1);
      done();
    }, 2000);
  });

  it('should not activate dom elements with consent if opt-in is not provided', (done) => {
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(false));
    spyOn(CoreTagManagement, 'manageDomElementActivation').and.callThrough();

    initOilLayer();
    setTimeout(() => {
      expect(CoreTagManagement.manageDomElementActivation).not.toHaveBeenCalled();
      done();
    }, 2000);
  });
});
