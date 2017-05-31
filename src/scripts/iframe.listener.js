import { logDebug } from '../scripts/log.js';
import { registerMessageListener, removeMessageListener } from './utils.js';
import { setPoiOptIn, getPoiOptIn } from './cookies.js';
let initComplete = false;

function parseJson(data) {
  try {
    return (typeof data !== 'object' ? JSON.parse(data) : data);
  } catch(err) {
    logDebug('OIL Hub - couldnt parse following data:', data);
    return false;
  }
}

function handler(message) {
  let parsedMessage = parseJson(message.data),
    poiOptin = null;

  // save parent url
  logDebug('OIL Hub - Got following parent data:', parsedMessage);
  // only react on our data
  // tag::hub-listener[]
  if (parsedMessage) {
    if (parsedMessage.event && parsedMessage.event.indexOf('oil-') !== -1) {
      let event = parsedMessage.event,
          origin = parsedMessage.origin;
      switch (event) {
        case 'oil-poi-activate':
          logDebug('OIL Hub - activating POI ');
          setPoiOptIn(true);
          // Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true, [OIL_COOKIE.ATTR_TIMESTAMP]: getClientTimestamp() }, { expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS] });
          break;
        case 'oil-status-read':
          poiOptin = getPoiOptIn();
          // status = Cookie.getJSON(OIL_COOKIE.NAME) || {};
          logDebug('OIL Hub - read the following poi status:', poiOptin);
          parent.postMessage(JSON.stringify(poiOptin) || false, origin);
          break;
        default:
          break;
      }
    }
    // end::hub-listener[]
    initComplete = true;
  }
}

export function initOilFrame() {
  if (!initComplete) {
    removeMessageListener(handler);
    registerMessageListener(handler);
  }
}
