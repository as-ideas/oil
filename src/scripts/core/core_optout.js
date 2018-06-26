import { deActivatePowerOptIn } from './core_poi.js';
import { logInfo } from './core_log.js';
import { removeSubscriberCookies } from './core_cookies.js';
import { sendEventToHostSite } from './core_utils';
import { EVENT_NAME_OPT_OUT } from './core_constants';

/**
 * Opt-Out Handler
 *
 * @return none
 */
// FIXME write test
export function handleOptOut() {
  logInfo('OptOut Received.');
  // Update Oil cookie
  removeSubscriberCookies();
  // delete POI too if exists
  deActivatePowerOptIn().then(() => sendEventToHostSite(EVENT_NAME_OPT_OUT));
}
