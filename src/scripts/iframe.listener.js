import Cookie from 'js-cookie';
import { OIL_COOKIE } from '../scripts/constants.js';
import { logDebug } from '../scripts/log.js';
import { registerMessageListener, removeMessageListener, getClientTimestamp } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration } from './config.js';
import { setPoiOptIn, getPoiOptin } from './cookies.js';
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
    status = null,
    config = getConfiguration();

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
          let poiOptin = getPoiOptin();
          // status = Cookie.getJSON(OIL_COOKIE.NAME) || {};
          logDebug('OIL Hub - read the following poi status:', status);
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
