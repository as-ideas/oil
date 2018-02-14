import Cookie from 'js-cookie';

(function () {
  initPreloader();
}());

export function initPreloader() {
  if (needsOptIn()){
    System.import('./oil.js');
  }
}

export function needsOptIn() {
  let cookieJSON = Cookie.getJSON('oil_data');
  let isCookieDefined = typeof (cookieJSON) !== 'undefined';
  return !(isCookieDefined && cookieJSON.opt_in);
}
