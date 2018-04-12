import {
  renderOil,
  oilShowPreferenceCenter,
  handleOptIn,
  stopTimeOut,
  forEach
} from '../../../src/scripts/userview/userview_modal.js';
import { formatHtml, loadFixture, readFixture, removeOilLayerAndConfig, deleteAllCookies } from '../../utils.js';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import * as UserviewConfig from '../../../src/scripts/userview/userview_config.js';
import {
  PRIVACY_FULL_TRACKING,
} from '../../../src/scripts/core/core_constants.js';
import * as CoreUtils from '../../../src/scripts/core/core_utils.js';
import * as UserviewOptIn from '../../../src/scripts/userview/userview_optin.js'
import * as CorePoi from '../../../src/scripts/core/core_poi.js';
import * as CoreCookies from '../../../src/scripts/core/core_cookies.js';
import { hasRunningTimeout } from '../../../src/scripts/userview/userview_modal';

// FIXME
xdescribe('the userview modal aka the oil layer wrapper with CPC', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
  });

  it('should have an functioning forEach replacement', () => {
    let array = [2, 1, 0];
    let result = [];
    forEach(array, function (value) {
      result.push(value)
    });
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(0);
  });


  it('should renderOil with ADVANCED-SETTINGS as CPC template', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false, advancedSettings: true});

    expect(formatHtml(document.querySelector('.as-oil'))).toEqual(formatHtml(readFixture('gold-master/cpc.html')));
    expectTimeoutNotStarted();
  });

  it('should insert Preference Center into host site with default min_tracking', () => {
    loadFixture('html/integrated-cpc.html');
    oilShowPreferenceCenter();
    expect(document.querySelector('#oil-preference-center')).toBeDefined();
    expect(document.querySelector('#as-slider-essential-title').className).toEqual('as-slider-active');
    expect(document.querySelector('#as-slider-functional-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-advertising-title').className).toEqual('as-slider-inactive');
  });

  it('should insert Preference Center into host site with default min_tracking', () => {
    loadFixture('html/integrated-cpc.html');
    oilShowPreferenceCenter(PRIVACY_FUNCTIONAL_TRACKING);
    expect(document.querySelector('#oil-preference-center')).toBeDefined();
    expect(document.querySelector('#as-slider-essential-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-functional-title').className).toEqual('as-slider-active');
    expect(document.querySelector('#as-slider-advertising-title').className).toEqual('as-slider-inactive');
  });

  it('should insert Preference Center into host site with default min_tracking', () => {
    loadFixture('html/integrated-cpc.html');
    oilShowPreferenceCenter(PRIVACY_FULL_TRACKING);
    expect(document.querySelector('#oil-preference-center')).toBeDefined();
    expect(document.querySelector('#as-slider-essential-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-functional-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-advertising-title').className).toEqual('as-slider-active');
  });

  it('should insert Preference Center into layer with default min_tracking', () => {
    renderOil({optIn: false});
    expect(document.querySelector('.as-oil')).toBeDefined();
    oilShowPreferenceCenter();
    expect(document.querySelector('#oil-preference-center')).toBeDefined();
    expect(document.querySelector('#as-slider-essential-title').className).toEqual('as-slider-active');
    expect(document.querySelector('#as-slider-functional-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-advertising-title').className).toEqual('as-slider-inactive');
  });

  it('should insert Preference Center into layer with default min_tracking', () => {
    renderOil({optIn: false});
    oilShowPreferenceCenter(PRIVACY_FUNCTIONAL_TRACKING);
    expect(document.querySelector('#oil-preference-center')).toBeDefined();
    expect(document.querySelector('#as-slider-essential-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-functional-title').className).toEqual('as-slider-active');
    expect(document.querySelector('#as-slider-advertising-title').className).toEqual('as-slider-inactive');
  });

  it('should insert Preference Center into layer with default min_tracking', () => {
    renderOil({optIn: false});
    oilShowPreferenceCenter(PRIVACY_FULL_TRACKING);
    expect(document.querySelector('#oil-preference-center')).toBeDefined();
    expect(document.querySelector('#as-slider-essential-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-functional-title').className).toEqual('as-slider-inactive');
    expect(document.querySelector('#as-slider-advertising-title').className).toEqual('as-slider-active');
  });

  it('should delegate default min tracking to handleOptIn and do POI optin', () => {
    loadFixture('poi/poi.default.html');

    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(document, 'getElementById').and.callFake(function () {
      return {
        noUiSlider: {
          get: function () {
            return '0.00';
          }
        }
      }
    });
    spyOn(UserviewOptIn, 'oilPowerOptIn').and.callFake(function () {
      return {
        then: function (func) {
          func();
        }
      };
    });

    handleOptIn();

    expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual('oil_as_selected_minimum');
    expect(CoreUtils.sendEventToHostSite.calls.argsFor(1)[0]).toEqual('oil_poi_optin_done');
    expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledWith(PRIVACY_SETTINGS_MINIMUM_TRACKING, false);
    expect(document.querySelector('.as-oil')).toBeNull();
  });

  it('should delegate default min tracking to handleOptIn remove all cookies', () => {
    loadFixture('poi/poi.default.html');

    spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(CoreCookies, 'removeSubscriberCookies');
    spyOn(CorePoi, 'deActivatePowerOptIn');
    spyOn(document, 'getElementById').and.callFake(function () {
      return {
        noUiSlider: {
          get: function () {
            return '0.00';
          }
        }
      }
    });
    spyOn(UserviewOptIn, 'oilPowerOptIn');

    handleOptIn();

    expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual('oil_as_selected_minimum');
    expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledTimes(0);
    expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
    expect(CorePoi.deActivatePowerOptIn).toHaveBeenCalled();
  });

  it('should delegate full tracking to handleOptIn and do POI optin', () => {
    loadFixture('poi/poi.default.html');

    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(document, 'getElementById').and.callFake(function () {
      return {
        noUiSlider: {
          get: function () {
            return '2.00';
          }
        }
      }
    });

    spyOn(UserviewOptIn, 'oilPowerOptIn').and.callFake(function () {
      return {
        then: function (func) {
          func();
        }
      };
    });

    handleOptIn();

    expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual('oil_as_selected_full');
    expect(CoreUtils.sendEventToHostSite.calls.argsFor(1)[0]).toEqual('oil_poi_optin_done');
    expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledWith(PRIVACY_SETTINGS_FULL_TRACKING, false);
    expect(document.querySelector('.as-oil')).toBeNull();
  });

  it('should delegate default min tracking to handleOptIn and do SOI optin', () => {
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(document, 'getElementById').and.callFake(function (id) {
      if (id === 'as-slider-range') {
        return {
          noUiSlider: {
            get: function () {
              return '0.00';
            }
          }
        }
      }
    });
    spyOn(UserviewOptIn, 'oilOptIn').and.callFake(function () {
      return {
        then: function (func) {
          func(true);
        }
      };
    });

    handleOptIn();

    expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual('oil_as_selected_minimum');
    expect(CoreUtils.sendEventToHostSite.calls.argsFor(1)[0]).toEqual('oil_soi_optin_done');
    expect(UserviewOptIn.oilOptIn).toHaveBeenCalledWith(PRIVACY_SETTINGS_MINIMUM_TRACKING);
    expect(document.querySelector('.as-oil')).toBeNull();
  });

  it('should delegate default min tracking to handleOptIn remove all cookies while POI being disabled', () => {
    spyOn(UserviewConfig, 'isPersistMinimumTracking').and.returnValue(false);
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(CoreCookies, 'removeSubscriberCookies');
    spyOn(CorePoi, 'deActivatePowerOptIn');
    spyOn(document, 'getElementById').and.callFake(function () {
      return {
        noUiSlider: {
          get: function () {
            return '0.00';
          }
        }
      }
    });
    spyOn(UserviewOptIn, 'oilPowerOptIn');

    handleOptIn();

    expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual('oil_as_selected_minimum');
    expect(UserviewOptIn.oilPowerOptIn).toHaveBeenCalledTimes(0);
    expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
    expect(CorePoi.deActivatePowerOptIn).toHaveBeenCalledTimes(0);
  });

  it('should delegate full tracking to handleOptIn and do SOI optin', () => {
    spyOn(CoreUtils, 'sendEventToHostSite');
    spyOn(document, 'getElementById').and.callFake(function (id) {
      if (id === 'as-slider-range') {
        return {
          noUiSlider: {
            get: function () {
              return '2.00';
            }
          }
        }
      }
    });
    spyOn(UserviewOptIn, 'oilOptIn').and.callFake(function () {
      return {
        then: function (func) {
          func(true);
        }
      };
    });

    handleOptIn();

    expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toEqual('oil_as_selected_full');
    expect(CoreUtils.sendEventToHostSite.calls.argsFor(1)[0]).toEqual('oil_soi_optin_done');
    expect(UserviewOptIn.oilOptIn).toHaveBeenCalledWith(PRIVACY_SETTINGS_FULL_TRACKING);
    expect(document.querySelector('.as-oil')).toBeNull();
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }
});
