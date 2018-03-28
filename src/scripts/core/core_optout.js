import {deActivatePowerOptIn} from './core_poi.js';
import {logInfo} from './core_log.js';
import {removeSubscriberCookies} from './core_cookies.js';

/**
 * Opt-Out Handler
 *
 * @return none
 */
export function handleOptOut() {
  logInfo('OptOut Received.');
  // Update Oil cookie
  removeSubscriberCookies();
  // delete POI too if exists
  deActivatePowerOptIn();
}
