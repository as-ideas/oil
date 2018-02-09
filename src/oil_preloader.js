import {OIL_COOKIE as OIL_DOMAIN_COOKIE} from './scripts/constants';
import {OilVersion} from './scripts/utils';
import Cookie from 'js-cookie';

(function () {
  console.info('preloader');
  initPreloader();
}());

export function initPreloader() {
  if (!hasFirstPartyOilCookie()){
    console.info('load oil');
    loadOil();
  }
}

function hasFirstPartyOilCookie() {
  let cookieJSON = Cookie.getJSON(OIL_DOMAIN_COOKIE.NAME);
  let isCookieDefined = typeof (cookieJSON) !== 'undefined';
  console.info('####', isCookieDefined, cookieJSON);
  console.info('#### hasFirstPartyOilCookie', (isCookieDefined && cookieJSON.opt_in));
  return isCookieDefined && cookieJSON.opt_in;
}

function loadOil() {
  let head = document.getElementsByTagName('head')[0];
  let script = document.createElement('script');
  script.id = 'oil-script';
  script.type = 'text/javascript';
  script.src = `https://oil-integration-cdn.herokuapp.com/oil.${OilVersion.get()}.min.js`;
  head.appendChild(script);
}
