import { logInfo } from './scripts/log.js';
import { POI_FALLBACK_NAME, POI_FALLBACK_GROUP_NAME, POI_PAYLOAD } from './scripts/constants.js';
import { setPoiOptIn, getPoiCookie, removeSubscriberCookies } from './scripts/cookies.js';
import { registerMessageListener, removeMessageListener, getStringParam } from './scripts/utils.js';

let initComplete = false;

(function () {
  let locationString = '';
  if (location && location.search && location.search.substr(1)) {
    locationString = location.search.substr(1);
  }

  initOilHub(locationString);
}());

export function initOilHub(locationString) {
  logInfo(`Init OilHub (version ${process.env.OIL_VERSION})`);
  if (isPoiFallbackMode(locationString)) {
    logInfo('Fallback mode, doing round trip...', 'a', 'b', {c: 'c'});

    let groupName = '';
    if (hasGroupName(locationString)) {
      groupName = getStringParam(locationString, POI_FALLBACK_GROUP_NAME);
      logInfo('Using group name:', groupName);
    }

    let payload = {};
    if (hasPayload(locationString)) {
      let payloadString = decodeURIComponent(getStringParam(locationString, POI_PAYLOAD));
      payload = JSON.parse(payloadString);
      logInfo('Using payload:', payload);
    }

    setPoiOptIn(groupName, payload);
    exports.redirectBack();

  } else {
    if (!initComplete) {
      removeMessageListener(handlerFunction);
      registerMessageListener(handlerFunction);
    }
  }
}

function handlerFunction(message) {
  let parsedMessage = parseJson(message.data),
    poiOptin = null;

  logInfo('OIL Hub - Got following parent data:', parsedMessage);
  // only react on our data
  // tag::hub-listener[]
  if (parsedMessage) {
    if (parsedMessage.event && parsedMessage.event.indexOf('oil-') !== -1) {

      let event = parsedMessage.event,
        origin = parsedMessage.origin,
        payload = parsedMessage.payload,
        groupName = parsedMessage.group_name;

      switch (event) {
        case 'oil-poi-activate':
          logInfo('OIL Hub - activating POI ');
          logInfo('Using groupName:', groupName);
          logInfo('Using payload:', payload);
          setPoiOptIn(groupName, payload);
          break;
        case 'oil-status-read':
          poiOptin = getPoiCookie(groupName);
          logInfo('OIL Hub - read the following poi status:', poiOptin.power_opt_in);
          parent.postMessage(JSON.stringify(poiOptin) || false, origin);
          break;
        case 'oil-poi-delete':
          logInfo('OIL Hub - remove POI cookie.');
          removeSubscriberCookies();
          break;
        default:
          break;
      }
    }
    // end::hub-listener[]
    initComplete = true;
  }
}

function isPoiFallbackMode(locationString) {
  return locationString.indexOf(POI_FALLBACK_NAME) !== -1;
}

function hasGroupName(locationString) {
  return locationString.indexOf(POI_FALLBACK_GROUP_NAME) !== -1;
}

function hasPayload(locationString) {
  return locationString.indexOf(POI_PAYLOAD) !== -1;
}

function parseJson(data) {
  try {
    return (typeof data !== 'object' ? JSON.parse(data) : data);
  } catch (err) {
    logInfo('OIL Hub - couldnt parse following data:', data);
    return false;
  }
}

export function redirectBack() {
  // To make it visible: setTimeout(function(){ window.location.replace(document.referrer); }, 2000);
  window.location.replace(document.referrer);
}
