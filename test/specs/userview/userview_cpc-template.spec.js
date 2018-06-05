import { hasRunningTimeout, oilShowPreferenceCenter, renderOil, stopTimeOut } from '../../../src/scripts/userview/userview_modal';
import { deleteAllCookies, initCustomYasmineMatchers, loadFixture, readFixture, removeOilLayerAndConfig, waitForElementToDisplay, waitsForAndRuns } from '../../utils.js';
import * as OilList from '../../../src/scripts/poi-list/oil.list';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import { setSoiCookie } from '../../../src/scripts/core/core_cookies';
import VENDOR_LIST from '../../fixtures/vendorlist/simple_vendor_list';
import LOCALE from '../../fixtures/config/deDE_01_locale';

describe('the user view modal aka the oil layer wrapper with CPC', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
    initCustomYasmineMatchers();
  });

  it('should renderOil with ADVANCED-SETTINGS as CPC template with purpose texts from configuration and vendors from vendor list', (done) => {
    givenThatVendorListIsAvailable();
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

  it('should renderOil with ADVANCED-SETTINGS as CPC template with purpose texts and vendors from vendor list', (done) => {
    givenThatVendorListIsAvailable();
    spyOn(OilList, 'listSnippet').and.callThrough();
    loadFixture('config/given.config.html');
    renderOil({optIn: false, advancedSettings: true});

    waitsForAndRuns(function () {
      return OilList.listSnippet.calls.count() > 0;
    }, function () {
      expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/cpc.texts.from.vendorlist.html'));
      expectTimeoutNotStarted();
      done();
    }, 2000);

  });

  it('should renderOil with ADVANCED-SETTINGS as CPC template if vendors and purposes are not available', (done) => {
    spyOn(CoreVendorInformation, 'getVendorList').and.returnValue({isDefault: true});
    spyOn(CoreVendorInformation, 'getPurposes').and.returnValue([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
    spyOn(CoreVendorInformation, 'getVendors').and.returnValue([{id: 12}, {id: 24}]);
    spyOn(OilList, 'listSnippet').and.callThrough();
    loadFixture('config/given.config.with.locale.html');
    renderOil({optIn: false, advancedSettings: true});

    waitsForAndRuns(function () {
      return OilList.listSnippet.calls.count() > 0;
    }, function () {
      expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/cpc.vendorlist.error.html'));
      expectTimeoutNotStarted();
      done();
    }, 2000);

  });

  it('should insert CPC into host site with GIVEN PRIVACY SETTING', (done) => {
    givenThatVendorListIsAvailable();
    loadFixture('html/integrated-cpc.html');

    setSoiCookie({
      '1': false,
      '2': true,
      '3': true,
      '4': true,
      '5': true
    }).then(() => {
      oilShowPreferenceCenter();

      waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc', () => {
        expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
        expect(document.querySelector('#as-js-purpose-slider-1').checked).toBeFalsy();
        expect(document.querySelector('#as-js-purpose-slider-2').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-3').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-4').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-5').checked).toBeTruthy();
        done();
      }, 10);
    });
  });

  it('should insert CPC into host site with STORED PRIVACY SETTING (from cookie)', (done) => {
    givenThatVendorListIsAvailable();
    spyOn(CoreUtils, 'getGlobalOilObject').withArgs('LOCALE').and.returnValue(LOCALE).withArgs('CONFIG').and.callThrough();
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
        expect(document.querySelector('#as-js-purpose-slider-1').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-2').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-3').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-4').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-5').checked).toBeFalsy();
        done();
      });
    });
  });

  it('should show CPC in layer with DEFAULT PRIVACY SETTING', (done) => {
    givenThatVendorListIsAvailable();
    loadFixture('html/integrated-cpc.html');

    oilShowPreferenceCenter();

    waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc  #as-js-purpose-slider-1', () => {
      expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
      expect(document.querySelector('#as-js-purpose-slider-1').checked).toBeFalsy();
      expect(document.querySelector('#as-js-purpose-slider-2').checked).toBeFalsy();
      expect(document.querySelector('#as-js-purpose-slider-3').checked).toBeFalsy();
      expect(document.querySelector('#as-js-purpose-slider-4').checked).toBeFalsy();
      expect(document.querySelector('#as-js-purpose-slider-5').checked).toBeFalsy();
      done();
    });

  });

  it('should show CPC in layer with PRIVACY SETTING from config', (done) => {
    givenThatVendorListIsAvailable();
    spyOn(CoreUtils, 'getGlobalOilObject').withArgs('LOCALE').and.returnValue(LOCALE).withArgs('CONFIG').and.callThrough();
    renderOil({optIn: false});

    spyOn(CoreConfig, 'getAdvancedSettingsPurposesDefault').and.returnValue(true);

    oilShowPreferenceCenter();

    waitForElementToDisplay('.qa-find-cpc-in-div .as-oil-cpc #as-js-purpose-slider-1', () => {
      expect(document.querySelector('.qa-find-cpc-in-div .as-oil-cpc')).toBeDefined();
      expect(document.querySelector('#as-js-purpose-slider-1').checked).toBeTruthy();
      expect(document.querySelector('#as-js-purpose-slider-2').checked).toBeTruthy();
      expect(document.querySelector('#as-js-purpose-slider-3').checked).toBeTruthy();
      expect(document.querySelector('#as-js-purpose-slider-4').checked).toBeTruthy();
      expect(document.querySelector('#as-js-purpose-slider-5').checked).toBeTruthy();
      done();
    });
  });

  it('should show CPC in layer with STORED PRIVACY SETTING (from cookie)', (done) => {
    givenThatVendorListIsAvailable();
    spyOn(CoreUtils, 'getGlobalOilObject').withArgs('LOCALE').and.returnValue(LOCALE).withArgs('CONFIG').and.callThrough();
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
        expect(document.querySelector('#as-js-purpose-slider-1').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-2').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-3').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-4').checked).toBeTruthy();
        expect(document.querySelector('#as-js-purpose-slider-5').checked).toBeFalsy();
        done();
      });
    });
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }

  function givenThatVendorListIsAvailable() {
    spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
    spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
    spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
  }
});
