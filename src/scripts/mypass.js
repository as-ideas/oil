import Cookie from 'js-cookie';
import { OIL_COOKIE } from '../scripts/constants.js';
import { logDebug } from '../scripts/log.js';

const COOKIE_NAME = 'MY_PASS';

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
        case 'oil-goi-activate':
          logDebug('mypass - activating GOI ');
          Cookie.set(COOKIE_NAME, { [OIL_COOKIE.ATTR_GOI]: true });
          break;
        case 'oil-config-read':
          config = Cookie.getJSON(COOKIE_NAME);
          logDebug('mypass - read the following config', config);
          parent.postMessage(config[OIL_COOKIE.ATTR_GOI] || false, origin);
          break;
        default:
          break;
      }
    }
  }, false);
}
