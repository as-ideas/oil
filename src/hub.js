import { initOilHub } from './oil.js';
import { POI_FALLBACK_NAME } from './scripts/constants.js';
import { setPoiOptIn } from './scripts/cookies.js';

(function () {
  if (location.search && location.search.substr(1) && location.search.substr(1).indexOf(POI_FALLBACK_NAME) !== -1) {
    setPoiOptIn(true);

    // To make it visible: setTimeout(function(){ window.location.replace(document.referrer); }, 2000);
    window.location.replace(document.referrer);
  } else {
    initOilHub();
  }
}());
