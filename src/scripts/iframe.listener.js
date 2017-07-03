import { logInfo } from '../scripts/log.js';
import { registerMessageListener, removeMessageListener } from './utils.js';
import { setPoiOptIn, getPoiOptIn } from './cookies.js';

let initComplete = false;

function parseJson(data) {
  try {
    return (typeof data !== 'object' ? JSON.parse(data) : data);
  } catch(err) {
    logInfo('OIL Hub - couldnt parse following data:', data);
    return false;
  }
}

function handler(message) {
  let parsedMessage = parseJson(message.data),
      poiOptin = null;

  logInfo('OIL Hub - Got following parent data:', parsedMessage);
  // only react on our data
  // tag::hub-listener[]
  if (parsedMessage) {
    if (parsedMessage.event && parsedMessage.event.indexOf('oil-') !== -1) {
      
      let event = parsedMessage.event,
          origin = parsedMessage.origin;
      
      switch (event) {
        case 'oil-poi-activate':
          logInfo('OIL Hub - activating POI ');
          setPoiOptIn(true);
          break;
        case 'oil-status-read':
          poiOptin = getPoiOptIn();
          logInfo('OIL Hub - read the following poi status:', poiOptin);
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
