import Cookie from 'js-cookie';
import { OIL_COOKIE } from '../scripts/constants.js';
import { logDebug } from '../scripts/log.js';
import { registerMessageListener, removeMessageListener } from './utils.js';

let initComplete = false;

function handler(message) {
  let data = message.data,
    config = null;
  // save parent url
  logDebug('OIL Hub - Got following parent data:', data);
  // only react on our data
  // tag::hub-listener[]
  if (data) {
    // MSIE needs Strings in postMessage
    let message = typeof data !== 'object' ? JSON.parse(data) : data;
    // FIXME check origin !!!
    if (message.event && message.event.indexOf('oil-') !== -1) {
      let event = message.event,
        origin = message.origin;
      switch (event) {
        case 'oil-poi-activate':
          logDebug('OIL Hub - activating POI ');
          Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true }, { expires: 31 });
          break;
        case 'oil-config-read':
          config = Cookie.getJSON(OIL_COOKIE.NAME) || {};
          logDebug('OIL Hub - read the following poi status:', config);
          parent.postMessage(JSON.stringify(config[OIL_COOKIE.ATTR_POI]) || false, origin);
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
