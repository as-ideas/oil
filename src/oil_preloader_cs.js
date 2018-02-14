import Cookie from 'js-cookie';

(function () {
  initPreloader();
}());

export function initPreloader() {
  if (!hasFirstPartyOilCookie()){
    System.import('./oil.js');
  }
}

function hasFirstPartyOilCookie() {
  let cookieJSON = Cookie.getJSON('oil_data');
  let isCookieDefined = typeof (cookieJSON) !== 'undefined';
  return isCookieDefined && cookieJSON.opt_in;
}
