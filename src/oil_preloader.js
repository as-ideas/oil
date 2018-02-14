import Cookie from 'js-cookie';

(function () {
  initPreloader();
}());

export function initPreloader() {
  if (!hasFirstPartyOilCookie()) {
    loadOil();
  }
}

function hasFirstPartyOilCookie() {
  let cookieJSON = Cookie.getJSON('oil_data');
  let isCookieDefined = typeof (cookieJSON) !== 'undefined';
  return isCookieDefined && cookieJSON.opt_in;
}

function loadOil() {
  if (!document.getElementById('oil-script')) {
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.id = 'oil-script';
    script.type = 'text/javascript';
    script.src = `https://oil-integration-cdn.herokuapp.com/oil.${process.env.OIL_VERSION}.min.js`;
    head.appendChild(script);
  }
}
