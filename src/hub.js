import { initOilHub } from './oil.js';
import { POI_FALLBACK_NAME } from './scripts/constants.js';
import { setPoiOptIn } from './scripts/cookies.js';

(function () {
  if (location.search && location.search.substr(1) && location.search.substr(1).indexOf(POI_FALLBACK_NAME) !== -1) {
    setPoiOptIn(true);

    // Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true, [OIL_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp() }, { expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS] });

    // To make it visible: setTimeout(function(){ window.location.replace(document.referrer); }, 2000);
    window.location.replace(document.referrer);
  } else {
    initOilHub();
  }
}());
