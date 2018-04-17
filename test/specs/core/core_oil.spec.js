import {initOilLayer} from '../../../src/scripts/core/core_oil.js';
import * as CoreUtils from '../../../src/scripts/core/core_utils.js';

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

    verifyThatGlobalOilObjectIsSet(5, 'status', 'getRawSoiCookie');

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

});
