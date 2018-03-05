import { EVENT_NAME_OPT_OUT_TRIGGER } from './core_constants.js';
import { deActivatePowerOptIn } from './core_poi.js';
import { registerMessageListener } from './core_utils.js';
import { logInfo } from './core_log.js';
import { removeSubscriberCookies } from './core_cookies.js';

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
      logInfo('deActivatePowerOptIn');
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
