import Cookie from 'js-cookie';
import { OIL_COOKIE } from '../scripts/constants.js';
import { logDebug } from '../scripts/log.js';
import { registerMessageListener, removeMessageListener } from './utils.js';

let initComplete = false;

function handler(message) {
  let data = message.data,
    origin = data.origin,
    config = null;
  // save parent url
  logDebug('OIL Hub - Got following parent data:', data);
  // only react on our data
  // FIXME check origin !!!
  if (data && data.event && data.event.indexOf('oil-') !== -1) {
    let event = data.event;
    switch (event) {
      case 'oil-poi-activate':
        // logDebug('OIL Hub - activating POI ');
        Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true }, { expires: 31 });
        break;
      case 'oil-config-read':
        config = Cookie.getJSON(OIL_COOKIE.NAME) || {};
        // logDebug('OIL Hub - read the following config:', config);
        parent.postMessage(config[OIL_COOKIE.ATTR_POI] || false, origin);
        break;
      default:
        break;
    }
    initComplete = true;
  }
}

export function initOilFrame() {
  if (!initComplete) {
    removeMessageListener(handler);
    registerMessageListener(handler);
  }
}
