import {POI_FALLBACK_NAME, POI_FALLBACK_GROUP_NAME, POI_PAYLOAD} from '../core/core_constants.js';
import {getHubLocation, getPoiGroupName, isPoiActive} from '../core/core_config.js';
import {init, sendEventToFrame} from '../core/core_poi.js';
import {getOrigin} from '../core/core_utils.js';

/**
 * Activate Power Opt IN with the use of an iframe
 * @function
 * @return Promise when done
 */
export function activatePowerOptInWithIFrame(payload) {

  if (!isPoiActive()) {
    return new Promise((resolve) => {
      resolve();
    });
  }

  // init iFrame first
  return new Promise((resolve) => init().then(() => {
    // then activate
    sendEventToFrame('oil-poi-activate', getOrigin(), payload);
    // defer answer to next tick
    setTimeout(resolve);
  }));
}

export function redirectToLocation(location) {
  window.location.replace(location);
}

/**
 * Activate Power Opt IN with the use of an redirect
 * @function
 * @return
 */
export function activatePowerOptInWithRedirect(payload) {
  if (!isPoiActive()) {
    return;
  }

  let payloadString = JSON.stringify(payload),
    payloadUriParam = encodeURIComponent(payloadString);

  let hubLocation = getHubLocation(),
    groupName = getPoiGroupName();
  if (hubLocation) {
    let targetLocation = hubLocation + '?' + POI_FALLBACK_NAME + '=1';

    if (groupName) {
      targetLocation = targetLocation + '&' + POI_FALLBACK_GROUP_NAME + '=' + groupName;
    }

    if (payload) {
      targetLocation = targetLocation + '&' + POI_PAYLOAD + '=' + payloadUriParam;
    }

    exports.redirectToLocation(targetLocation);
  }
}




