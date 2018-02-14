import {OIL_COOKIE as OIL_DOMAIN_COOKIE} from './scripts/constants';
import Cookie from 'js-cookie';

(function () {
  console.info('preloader');
  initPreloader();
}());

export function initPreloader() {
  if (!hasFirstPartyOilCookie()){
    console.info('load oil');
    System.import('./oil.js');
  }
}

function hasFirstPartyOilCookie() {
  let cookieJSON = Cookie.getJSON(OIL_DOMAIN_COOKIE.NAME);
  let isCookieDefined = typeof (cookieJSON) !== 'undefined';
  console.info('####', isCookieDefined, cookieJSON);
  console.info('#### hasFirstPartyOilCookie', (isCookieDefined && cookieJSON.opt_in));
  return isCookieDefined && cookieJSON.opt_in;
}
