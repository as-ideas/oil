import { EVENT_NAME_OPT_OUT_TRIGGER } from './headless_constants.js';
import { deActivatePowerOptIn } from './headless_poi.js';
import { registerMessageListener } from './headless_utils.js';
import { logInfo } from './headless_log.js';
import { removeSubscriberCookies } from './headless_cookies.js';

/**
 * Opt-Out Handler // Is this supposed to be an event or an api function like the others?
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
        // TODO deactivate PowerOptIn
        logInfo('deActivatePowerOptIn');
        // deActivatePowerOptIn();
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
