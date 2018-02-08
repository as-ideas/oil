import {initPreloader} from '../../src/oil_preloader';
import {deleteAllCookies} from '../utils';
import {OIL_COOKIE as OIL_DOMAIN_COOKIE} from '../../src/scripts/constants';
import Cookie from 'js-cookie';

describe('oil_preloader.js', () => {

  beforeEach(() => {
      deleteAllCookies();
    console.info('querzAll',document.querySelectorAll('#oil-script'));

       let head = document.getElementsByTagName('head')[0];
        head.removeChild(document.getElementById('oil-script'));
      let oil = document.getElementById('oil-script');
      oil.parentNode.removeChild(oil);

      console.info('script is: ', document.getElementById('oil-script'));
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

  function  whenInitPreloaderIsInvoked() {
    initPreloader();
  }

  function thenOilIsLoaded() {
    expect(document.getElementById('oil-script')).toBeDefined();
  }

  function thenOilIsNotLoaded() {
    let oil = document.getElementById('oil-script');
    console.info('querzAll',document.querySelectorAll('#oil-script'));
    expect(oil).toBeUndefined(oil);
  }

});
