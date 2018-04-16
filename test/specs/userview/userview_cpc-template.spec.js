import {
  renderOil,
  oilShowPreferenceCenter,
  stopTimeOut,
} from '../../../src/scripts/userview/userview_modal.js';
import { loadFixture, readFixture, removeOilLayerAndConfig, deleteAllCookies } from '../../utils.js';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import { hasRunningTimeout } from '../../../src/scripts/userview/userview_modal';
import { initCustomYasmineMatchers } from '../../utils';
import { setSoiOptIn } from '../../../src/scripts/core/core_cookies';

describe('the userview modal aka the oil layer wrapper with CPC', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
    initCustomYasmineMatchers();
  });

  it('should renderOil with ADVANCED-SETTINGS as CPC template', () => {
    loadFixture('config/given.config.example.labels.html');

    renderOil({optIn: false, advancedSettings: true});

    expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/cpc.html'));
    expectTimeoutNotStarted();
  });

  it('should insert CPC into host site with DEFAULT PRIVACY SETTING', () => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.getElementById('as-js-purpose-slider-01').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-02').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-03').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-04').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-05').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-06').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-07').checked).toBe(false);
  });

  it('should insert CPC into host site with GIVEN PRIVACY SETTING', () => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter({
      '01': false,
      '02': true,
      '03': true,
      '04': true,
      '05': true,
      '06': true,
      '07': true
    });

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.getElementById('as-js-purpose-slider-01').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-02').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-03').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-04').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-05').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-06').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-07').checked).toBe(true);
  });

  it('should insert CPC into host site with STORED PRIVACY SETTING (from cookie)', () => {
    renderOil({optIn: false});
    setSoiOptIn({
      '01': true,
      '02': true,
      '03': true,
      '04': true,
      '05': true,
      '06': true,
      '07': false
    });

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.getElementById('as-js-purpose-slider-01').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-02').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-03').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-04').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-05').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-06').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-07').checked).toBe(false);
  });

  it('should show CPC in layer with DEFAULT PRIVACY SETTING', () => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.getElementById('as-js-purpose-slider-01').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-02').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-03').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-04').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-05').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-06').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-07').checked).toBe(false);
  });

  it('should show CPC in layer with GIVEN PRIVACY SETTING', () => {
    renderOil({optIn: false});

    oilShowPreferenceCenter({
      '01': false,
      '02': true,
      '03': true,
      '04': true,
      '05': true,
      '06': true,
      '07': true
    });

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.getElementById('as-js-purpose-slider-01').checked).toBe(false);
    expect(document.getElementById('as-js-purpose-slider-02').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-03').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-04').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-05').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-06').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-07').checked).toBe(true);
  });

  it('should show CPC in layer with STORED PRIVACY SETTING (from cookie)', () => {
    renderOil({optIn: false});
    setSoiOptIn({
      '01': true,
      '02': true,
      '03': true,
      '04': true,
      '05': true,
      '06': true,
      '07': false
    });

    oilShowPreferenceCenter();

    expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
    expect(document.getElementById('as-js-purpose-slider-01').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-02').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-03').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-04').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-05').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-06').checked).toBe(true);
    expect(document.getElementById('as-js-purpose-slider-07').checked).toBe(false);
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }
});
