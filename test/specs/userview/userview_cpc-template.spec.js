import {oilShowPreferenceCenter, renderOil, stopTimeOut,} from '../../../src/scripts/userview/userview_modal.js';
import {deleteAllCookies, initCustomYasmineMatchers, loadFixture, readFixture, removeOilLayerAndConfig, waitsForAndRuns} from '../../utils.js';
import * as OilList from '../../../src/scripts/poi-list/oil.list';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import {hasRunningTimeout} from '../../../src/scripts/userview/userview_modal';
import {setSoiCookie} from '../../../src/scripts/core/core_cookies';
import {waitForElementToDisplay} from '../../utils';
import VENDOR_LIST from '../../fixtures/vendorlist/simple_vendor_list'

describe('the user view modal aka the oil layer wrapper with CPC', () => {

  beforeEach(() => {
    spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
    spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
    spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
    initCustomYasmineMatchers();
  });

  it('should renderOil with ADVANCED-SETTINGS as CPC template', (done) => {

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

  it('should insert CPC into host site with DEFAULT PRIVACY SETTING', (done) => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc', () => {
      expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
      expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(false);
      done();
    });
  });

  it('should insert CPC into host site with STORED PRIVACY SETTING (from cookie)', (done) => {
    renderOil({optIn: false});
    setSoiCookie({
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': false
    }).then(() => {
      oilShowPreferenceCenter();

      waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc', () => {
        expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
        expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(false);
        done();
      });
    });
  });

  it('should show CPC in layer with DEFAULT PRIVACY SETTING', (done) => {
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc', () => {
      expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
      expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(false);
      expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(false);
      done();
    });

  });

  it('should show CPC in layer with STORED PRIVACY SETTING (from cookie)', (done) => {
    renderOil({optIn: false});
    setSoiCookie({
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': false
    }).then(() => {
      oilShowPreferenceCenter();

      waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc', () => {
        expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
        expect(document.querySelector('#as-js-purpose-slider-1').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-2').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-3').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-4').checked).toBe(true);
        expect(document.querySelector('#as-js-purpose-slider-5').checked).toBe(false);
        done();
      });
    });
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }
});
