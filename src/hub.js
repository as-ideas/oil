import { initOilHub } from './scripts/hub/hub_oil.js';

(function () {
  let locationString = '';
  if (location && location.search && location.search.substr(1)) {
    locationString = location.search.substr(1);
  }
  initOilHub(locationString);
}());
