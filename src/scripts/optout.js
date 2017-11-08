import { EVENT_NAME_OPT_OUT_TRIGGER } from './constants.js';
import { deActivatePowerOptIn } from './poi.js';
import { registerMessageListener } from './utils.js';
import { logInfo } from './log.js';
import { removeSubscriberCookies } from './cookies.js';

/**
 * Opt-Out Handler
 * ATTENTION: THIS WORKS FOR SOI ONLY RIGHT NOW. THERE IS NO OPT-OUT FOR POI YET, NEW STORY!
 *
 * @param event
 * @return none
 */
function receiveOptOutMessage(event) {
    if (event && event.data && typeof(event.data.indexOf) !== 'undefined') {
      if (event.data.indexOf(EVENT_NAME_OPT_OUT_TRIGGER) !== -1) {
        logInfo('OptOut Received.');
        // Update Oil cookie
        removeSubscriberCookies();
        // delete POI too if exists
        deActivatePowerOptIn();
      }
    }
}

/**
 * Registers the optout event listener
 * @function
 * @return
 */
export function registerOptOutListener() {
  logInfo('registerOptOutListener');
  registerMessageListener(receiveOptOutMessage);
}
