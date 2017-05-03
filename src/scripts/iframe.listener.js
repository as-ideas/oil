import Cookie from 'js-cookie';
import { OIL_COOKIE } from '../scripts/constants.js';
import { logDebug } from '../scripts/log.js';

export function initOilFrame() {
  window.addEventListener('message', (message) => {
    let data = message.data,
      origin = data.origin,
      config = null;
    // save parent url
    logDebug('mypass - Got following parent data:', data);
    // only react on our data
    // FIXME check origin !!!
    if (data && data.event && data.event.indexOf('oil-') !== -1) {
      let event = data.event;
      switch (event) {
        case 'oil-poi-activate':
          logDebug('OIL Hub - activating POI ');
          Cookie.set(OIL_COOKIE.NAME, { [OIL_COOKIE.ATTR_POI]: true }, { expires: 31 });
          break;
        case 'oil-config-read':
          config = Cookie.getJSON(OIL_COOKIE.NAME) || {};
          logDebug('OIL Hub - read the following config', config);
          parent.postMessage(config[OIL_COOKIE.ATTR_POI] || false, origin);
          break;
        default:
          break;
      }
    }
  }, false);
}
