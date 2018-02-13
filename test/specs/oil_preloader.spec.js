import { initPreloader } from '../../src/oil_preloader';
import { deleteAllCookies } from '../utils';
import { OIL_COOKIE as OIL_DOMAIN_COOKIE } from '../../src/scripts/constants';
import Cookie from 'js-cookie';
import { OilVersion } from '../../src/scripts/utils.js';

describe('oil_preloader.js', () => {

  beforeEach(() => {
    deleteAllCookies();
    let head = document.getElementsByTagName('head')[0];
    head.removeChild(document.getElementById('oil-script'));
  });

  it('should load oil script only once', () => {
    givenNoCookie();
    whenInitPreloaderIsInvoked();
    whenInitPreloaderIsInvoked();
    thenOilIsLoadedOnlyOnce();
  });

  it('should load oil script if cookie is undefined', () => {
    givenNoCookie();
    whenInitPreloaderIsInvoked();
    thenOilIsLoaded();
  });

  it('should load oil script if cookie is defined but opt-in is false', () => {
    givenCookieWithoutOptIn();
    whenInitPreloaderIsInvoked();
    thenOilIsLoaded();
  });

  it('should not load oil script if cookie is defined and opt-in is true', () => {
    givenCookieWithOptIn();
    whenInitPreloaderIsInvoked();
    thenOilIsNotLoaded();
  });


  function givenNoCookie() {
  }

  function givenCookieWithoutOptIn() {
    Cookie.set(OIL_DOMAIN_COOKIE.NAME, {opt_in: false});
  }

  function givenCookieWithOptIn() {
    Cookie.set(OIL_DOMAIN_COOKIE.NAME, {opt_in: true});
  }

  function whenInitPreloaderIsInvoked() {
    initPreloader();
  }

  function thenOilIsLoaded() {
    expect(document.getElementById('oil-script')).toBeDefined();
  }

  function thenOilIsNotLoaded() {
    expect(document.getElementById('oil-script')).toBeNull();
  }

  function thenOilIsLoadedOnlyOnce() {
    expect(document.querySelectorAll('#oil-script').length).toBe(1);
  }
});
