import Cookie from 'js-cookie';
import { initOilHub } from './oil.js';
import { OIL_COOKIE, POI_FALLBACK_NAME } from './scripts/constants.js';

(function () {
  if (location.search && location.search.substr(1) && location.search.substr(1).indexOf(POI_FALLBACK_NAME) !== -1) {
    Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true }, { expires: 31 });

    // To make it visible: setTimeout(function(){ window.location.replace(document.referrer); }, 2000);
    window.location.replace(document.referrer);
  } else {
    initOilHub();
  }
}());
