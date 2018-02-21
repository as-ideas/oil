import Cookie from 'js-cookie';
import { oilOptIn, oilOptLater } from '../../src/scripts/userview/userview_optin.js';
import { deleteAllCookies } from '../utils.js';
import { getSoiCookie } from '../../src/scripts/core/core_cookies.js';
import { hasOptedLater } from '../../src/scripts/core/core_optin.js';

describe('optin', () => {

  beforeEach(() => {
    deleteAllCookies();
  });

  describe('without changes', () => {
    it('it should define default cookie', () => {
      expect(getSoiCookie().opt_in).toBe(false);
      expect(hasOptedLater()).toBe(false);
    });

    it('should reset to default cookie if cookie name is not set to oil_data', () => {
      Cookie.set('oil_data2', {opt_in: false, optLater: false}, {expires: 31});
      expect(getSoiCookie().opt_in).toBe(false);
      expect(hasOptedLater()).toBe(false);
    });

    it('should reset to default cookie if cookie keys are not matching', () => {
      Cookie.set('oil_data', {optin2: false, optLater2: false}, {expires: 31});
      expect(getSoiCookie().opt_in).toBe(false);
      expect(hasOptedLater()).toBe(false);
    });
  });

  describe('oilOptIn', () => {
    it('should persist optin', (done) => {
      oilOptIn().then((optin) => {
        expect(optin).toBe(true);
        expect(getSoiCookie().opt_in).toBe(true);
        expect(hasOptedLater()).toBe(false);
        done();
      });
    });
  });

  describe('oilOptLater', () => {
    it('should persist optlater', (done) => {
      oilOptLater().then((optlater) => {
        expect(optlater).toBe(true);
        expect(getSoiCookie().opt_in).toBe(false);
        expect(hasOptedLater()).toBe(true);
        done();
      });
    });
  });
});
