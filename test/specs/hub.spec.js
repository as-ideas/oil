import Cookie from 'js-cookie';
import * as HubAPI from '../../src/scripts/hub/hub_oil.js';
import {deleteAllCookies} from '../utils.js';
import {resetConfiguration} from '../../src/scripts/core/core_config.js';
import {waitsForAndRuns} from '../utils';
import VENDOR_LIST from '../fixtures/vendorlist/simple_vendor_list';
import * as CoreVendorInformation from '../../src/scripts/core/core_vendor_information';

describe('the hub.js', () => {

  let OIL_COOKIE = {
    NAME: 'oil_data'
  };

  describe('in event mode', function () {

    let cookieSetSpy;

    beforeEach(() => {
      resetConfiguration();
      HubAPI.initOilHub('');
      deleteAllCookies();
      cookieSetSpy = spyOn(Cookie, 'set').and.callThrough();
      spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
      spyOn(CoreVendorInformation, 'getLimitedVendorIds').and.returnValue(VENDOR_LIST.vendors.map(({id}) => id));
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    });

    it('should write a cookie', (done) => {
      postMessage({event: 'oil-poi-activate', origin: 'origin', hostconfig: {'cookie_expires_in_days': 31}}, '*');
      waitsForAndRuns(
        () => cookieSetSpy.calls.count() > 0,
        () => {
          let cookie = Cookie.getJSON(OIL_COOKIE.NAME);
          expect(cookie).toBeDefined();
          done();
        }, 2000);
    });

    it('should write a cookie with group_name', (done) => {
      postMessage({
        event: 'oil-poi-activate',
        origin: 'origin',
        group_name: 'lisasimpson',
        hostconfig: {'cookie_expires_in_days': 31}
      }, '*');
      waitsForAndRuns(
        () => cookieSetSpy.calls.count() > 0,
        () => {
          let cookie = Cookie.getJSON('lisasimpson_' + OIL_COOKIE.NAME);
          expect(cookie).toBeDefined();
          done();
        }, 2000);
    });

  });

  describe('in redirect mode', function () {
    let cookieSetSpy;

    beforeEach(() => {
      spyOn(HubAPI, 'redirectBack').and.callFake(function () {
      });
      resetConfiguration();
      deleteAllCookies();
      cookieSetSpy = spyOn(Cookie, 'set').and.callThrough();
      spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
      spyOn(CoreVendorInformation, 'getLimitedVendorIds').and.returnValue(VENDOR_LIST.vendors.map(({id}) => id));
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    });

    it('should write a cookie with group name', function (done) {
      HubAPI.initOilHub('hub.html?fallback=1&group_name=bartsimpson');

      waitsForAndRuns(
        () => cookieSetSpy.calls.count() > 0,
        () => {
          let cookie = Cookie.getJSON('bartsimpson_' + OIL_COOKIE.NAME);
          expect(cookie).toBeDefined();
          expect(HubAPI.redirectBack).toHaveBeenCalled();
          done();
        }, 2000);
    });

    it('should write a cookie with default name', function (done) {
      HubAPI.initOilHub('hub.html?fallback=1');

      waitsForAndRuns(
        () => cookieSetSpy.calls.count() > 0,
        () => {
          let cookie = Cookie.getJSON(OIL_COOKIE.NAME);
          expect(cookie).toBeDefined();
          expect(HubAPI.redirectBack).toHaveBeenCalled();
          done();
        }, 2000);
    });
  });

});
