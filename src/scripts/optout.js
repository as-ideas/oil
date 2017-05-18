import { OIL_CONFIG } from './constants.js';
import { registerMessageListener } from './utils.js';
import { getConfiguration } from './config.js';
import { logDebug } from './log.js';
import { oilCookie } from './optin.js';
import Cookie from 'js-cookie';

let config = null;

/**
 * Opt-Out Handler
 * @param event
 * @return none
 */
function receiveOptOutMessage(event)
{
  if (!config) {
    config = getConfiguration();
  }

  if (config) {
    let optOutEventName = config[OIL_CONFIG.ATTR_OPT_OUT_EVENT_NAME];
    if (event && event.data && typeof(event.data.indexOf) !== "undefined") {
      if (event.data.indexOf(optOutEventName) !== -1) {
        logDebug("OptOut Received.");
        // Update Oil cookie
        Cookie.remove(oilCookie.name);
      }
    }
  }
}

/**
 * Registers the optout event listener
 * @function
 * @return
 */
export function registerOptOutListener() {
  logDebug('registerOptOutListener');
  registerMessageListener(receiveOptOutMessage);
}
