import {initOilLayer} from '../../../src/scripts/core/core_oil.js';
import * as CoreUtils from '../../../src/scripts/core/core_utils.js';
import * as CoreCommandCollection from '../../../src/scripts/core/core_command_collection.js';
import * as CoreOptIn from '../../../src/scripts/core/core_optin.js';
import {waitsForAndRuns} from '../../utils';

describe('core_oil', () => {

  beforeEach(() => {
  });

  afterEach(() => {
  });

  it('should attach utility functions to window object', () => {

    function verifyThatGlobalOilObjectIsSet(invocationIndex, expectedKey, expectedValue) {
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(invocationIndex)[0]).toEqual(expectedKey);
      expect(CoreUtils.setGlobalOilObject.calls.argsFor(invocationIndex)[1].toString()).toContain(expectedValue);
    }

    spyOn(CoreUtils, 'setGlobalOilObject');

    initOilLayer();

    expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledTimes(11);

    verifyThatGlobalOilObjectIsSet(0, 'previewModeOn', "setPreviewCookie");

    verifyThatGlobalOilObjectIsSet(1, 'previewModeOff', 'removePreviewCookie');

    verifyThatGlobalOilObjectIsSet(2, 'verboseModeOn', 'setVerboseCookie');

    verifyThatGlobalOilObjectIsSet(3, 'verboseModeOff', 'removeVerboseCookie');

    verifyThatGlobalOilObjectIsSet(4, 'reload', 'resetConfiguration');
    verifyThatGlobalOilObjectIsSet(4, 'reload', 'initOilLayer');

    verifyThatGlobalOilObjectIsSet(5, 'status', 'getSoiCookie');

    verifyThatGlobalOilObjectIsSet(6, 'showPreferenceCenter', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(6, 'showPreferenceCenter', 'oilShowPreferenceCenter');

    verifyThatGlobalOilObjectIsSet(7, 'triggerOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(7, 'triggerOptIn', 'handleOptIn');

    verifyThatGlobalOilObjectIsSet(8, 'triggerSoiOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(8, 'triggerSoiOptIn', 'handleSoiOptIn');

    verifyThatGlobalOilObjectIsSet(9, 'triggerPoiOptIn', 'loadLocale');
    verifyThatGlobalOilObjectIsSet(9, 'triggerPoiOptIn', 'handlePoiOptIn');

    verifyThatGlobalOilObjectIsSet(10, 'triggerOptOut', 'handleOptOut');
  });

  it('should execute command collection and attach command collection execution to window object if optin is provided', (done) => {
    let executeCommandCollectionSpy = spyOn(CoreCommandCollection, 'executeCommandCollection').and.callThrough();
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(true));
    spyOn(CoreUtils, 'setGlobalOilObject');

    initOilLayer();

    waitsForAndRuns(() => {
      return CoreCommandCollection.executeCommandCollection.calls.count() > 0;
    }, () => {
      expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledWith('commandCollectionExecutor', executeCommandCollectionSpy);
      done();
    }, 2000);
  });

  // FIXME @alex can't fix it, pls help
  xit('should not execute command collection and attach command collection execution to window object if optin is not provided', (done) => {
    let executeCommandCollectionSpy = spyOn(CoreCommandCollection, 'executeCommandCollection').and.callThrough();
    spyOn(CoreOptIn, 'checkOptIn').and.returnValue(Promise.resolve(false));
    spyOn(CoreUtils, 'setGlobalOilObject');
    spyOn(CoreUtils, 'sendEventToHostSite');

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
});
