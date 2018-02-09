import {initPreloader} from '../../src/oil_preloader';
import {deleteAllCookies} from '../utils';
import {OIL_COOKIE as OIL_DOMAIN_COOKIE} from '../../src/scripts/constants';
import Cookie from 'js-cookie';
import {OilVersion} from '../../src/scripts/utils.js';

fdescribe('oil_preloader.js', () => {

  beforeEach(() => {
    console.info('beforeEach');
      deleteAllCookies();
    // console.info('querzAll',document.querySelectorAll('#oil-script'));
    //
    //    let head = document.getElementsByTagName('head')[0];
    //     head.removeChild(document.getElementById('oil-script'));
    //   let oil = document.getElementById('oil-script');
    //   oil.parentNode.removeChild(oil);
    //
    //   console.info('script is: ', document.getElementById('oil-script'));
    spyOn(OilVersion, 'get').and.callFake(function() {
      return '1.0.18';
    });
  });

  afterEach(() => {
    console.info('afterEach');
    deleteAllCookies();
    let oil = document.getElementById('oil-script');
    oil.parentNode.removeChild(oil);
  });

  // it('should load oil script if cookie is undefined', () => {
  //   givenNoCookie();
  //   whenInitPreloaderIsInvoked();
  //   thenOilIsLoaded();
  // });
  //
  // it('should load oil script if cookie is defined but opt-in is false', () => {
  //   givenCookieWithoutOptIn();
  //   whenInitPreloaderIsInvoked();
  //   thenOilIsLoaded();
  // });

  fit('should not load oil script if cookie is defined and opt-in is true', () => {
    console.info(document);
    // givenCookieWithOptIn();
    // whenInitPreloaderIsInvoked();
    // thenOilIsNotLoaded();
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
    // console.info('querzAll',document.querySelectorAll('#oil-script'));
    console.info('####', oil);
    expect(oil).toBeUndefined(oil);
  }

});
