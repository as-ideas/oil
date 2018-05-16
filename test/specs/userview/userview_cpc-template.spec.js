import {
  renderOil,
  oilShowPreferenceCenter,
  stopTimeOut,
} from '../../../src/scripts/userview/userview_modal.js';
import {loadFixture, readFixture, removeOilLayerAndConfig, deleteAllCookies, initCustomYasmineMatchers, waitsForAndRuns} from '../../utils.js';
import * as OilList from '../../../src/scripts/poi-list/oil.list';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import {hasRunningTimeout} from '../../../src/scripts/userview/userview_modal';
import {setSoiOptIn} from '../../../src/scripts/core/core_cookies';

describe('the userview modal aka the oil layer wrapper with CPC', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
    initCustomYasmineMatchers();
  });

  // FIXME how to handle with custom vendorlist?!
  xit('should renderOil with ADVANCED-SETTINGS as CPC template', (done) => {

    spyOn(OilList, 'listSnippet').and.callThrough();
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false, advancedSettings: true});

    waitsForAndRuns(function () {
      return OilList.listSnippet.calls.count() > 0;
    }, function () {
      expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/cpc.html'));
      expectTimeoutNotStarted();
      done();
    }, 2000);


  });

  // FIXME how to handle with custom vendorlist?!
  xit('should insert CPC into host site with DEFAULT PRIVACY SETTING', () => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-6').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-7').checked).toBe(false);
  });

  it('should insert CPC into host site with GIVEN PRIVACY SETTING', () => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter({
      '1': false,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': true
    });

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-6').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-7').checked).toBe(true);
  });

  it('should insert CPC into host site with STORED PRIVACY SETTING (from cookie)', () => {
    renderOil({optIn: false});
    setSoiOptIn({
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': false
    });

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-6').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-7').checked).toBe(false);
  });

  it('should show CPC in layer with DEFAULT PRIVACY SETTING', () => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-6').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-7').checked).toBe(false);
  });

  it('should show CPC in layer with GIVEN PRIVACY SETTING', () => {
    renderOil({optIn: false});

    oilShowPreferenceCenter({
      '1': false,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': true
    });

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(false);
    expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-6').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-7').checked).toBe(true);
  });

  it('should show CPC in layer with STORED PRIVACY SETTING (from cookie)', () => {
    renderOil({optIn: false});
    setSoiOptIn({
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': false
    });

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-6').checked).toBe(true);
    expect(document.querySelector('#as-js-purpose-slider-7').checked).toBe(false);
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }
});
