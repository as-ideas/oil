import Cookie from 'js-cookie';
import { initOilHub } from '../../src/hub';
import { OIL_COOKIE } from '../../src/scripts/constants.js';
import { deleteAllCookies } from '../utils';
import { resetConfiguration } from '../../src/scripts/config';

describe('iframe.listener', () => {

  beforeEach(() => {
    resetConfiguration();
    initOilHub();
    deleteAllCookies();
  });

  it('should write cookie', (done) => {
    postMessage({event: 'oil-poi-activate', origin: 'origin', hostconfig: {'cookie_expires_in_days': 31}}, '*');
    setTimeout(() => {
      let cookie = Cookie.getJSON(OIL_COOKIE.NAME);
      expect(cookie).toBeDefined();
      done();
    });
  });

  it('should write cookie with groupname', (done) => {
    postMessage({event: 'oil-poi-activate', origin: 'origin', group_name: 'lisasimpson', hostconfig: {'cookie_expires_in_days': 31}}, '*');
    setTimeout(() => {
      let cookie = Cookie.getJSON('lisasimpson_' + OIL_COOKIE.NAME);
      expect(cookie).toBeDefined();
      done();
    });
  });

});
