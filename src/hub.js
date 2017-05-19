import Cookie from 'js-cookie';
import { initOilHub } from './oil.js';
import { OIL_COOKIE, POI_FALLBACK_NAME } from './scripts/constants.js';
import { OIL_CONFIG } from './scripts/constants.js';
import { getClientTimestamp } from './scripts/utils.js';
import { getConfiguration } from './scripts/config.js';

(function () {
  if (location.search && location.search.substr(1) && location.search.substr(1).indexOf(POI_FALLBACK_NAME) !== -1) {
    let config = getConfiguration();

    Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true, [OIL_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp() }, { expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS] });

    // To make it visible: setTimeout(function(){ window.location.replace(document.referrer); }, 2000);
    window.location.replace(document.referrer);
  } else {
    initOilHub();
  }
}());
