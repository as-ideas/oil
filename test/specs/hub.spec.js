import Cookie from 'js-cookie';
import * as HubAPI from '../../src/scripts/hub/hub_oil.js';
import {deleteAllCookies} from '../utils.js';
import {resetConfiguration} from '../../src/scripts/core/core_config.js';

describe('the hub.js', () => {

  let OIL_COOKIE = {
    NAME: 'oil_data'
  };

  describe('in event mode', function () {
    beforeEach(() => {
      resetConfiguration();
      HubAPI.initOilHub('');
      deleteAllCookies();
    });

    it('should write a cookie', (done) => {
      postMessage({event: 'oil-poi-activate', origin: 'origin', hostconfig: {'cookie_expires_in_days': 31}}, '*');
      setTimeout(() => {
        let cookie = Cookie.getJSON(OIL_COOKIE.NAME);
        expect(cookie).toBeDefined();
        done();
      });
    });

    it('should write a cookie with group_name', (done) => {
      postMessage({
        event: 'oil-poi-activate',
        origin: 'origin',
        group_name: 'lisasimpson',
        hostconfig: {'cookie_expires_in_days': 31}
      }, '*');
      setTimeout(() => {
        let cookie = Cookie.getJSON('lisasimpson_' + OIL_COOKIE.NAME);
        expect(cookie).toBeDefined();
        done();
      });
    });

  });

  describe('in redirect mode', function () {
    beforeEach(() => {
      spyOn(HubAPI, 'redirectBack').and.callFake(function () {
      });
      resetConfiguration();
      deleteAllCookies();
    });

    it('should write a cookie with group name', function (done) {
      HubAPI.initOilHub('hub.html?fallback=1&group_name=bartsimpson');

      setTimeout(() => {
        let cookie = Cookie.getJSON('bartsimpson_' + OIL_COOKIE.NAME);
        expect(cookie).toBeDefined();
        expect(HubAPI.redirectBack).toHaveBeenCalled();
        done();
      });
    });

    it('should write a cookie with default name', function (done) {
      HubAPI.initOilHub('hub.html?fallback=1');

      setTimeout(() => {
        let cookie = Cookie.getJSON(OIL_COOKIE.NAME);
        expect(cookie).toBeDefined();
        expect(HubAPI.redirectBack).toHaveBeenCalled();
        done();
      });
    });
  });

});
