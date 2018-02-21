import { verifyPowerOptIn } from './core_poi.js';
import { logInfo, logPreviewInfo } from './core_log.js';
import { isSubscriberSetCookieActive } from './core_config.js';
import { getSoiCookie, setSoiOptIn, getOilSessionCookie } from './core_cookies.js';

/**
 * Log Helper function for checkOptIn
 * @param {*} singleOptIn
 * @param {*} powerOptIn
 */
function logPreviewOptInInfo(singleOptIn, powerOptIn) {
  if (powerOptIn) {
    logPreviewInfo('User has given POI permit, OIL not shown.');
  } else if (singleOptIn) {
    logPreviewInfo('User has given SOI permit, OIL not shown.');
  } else {
    logPreviewInfo('User has not opted in at all, OIL should be shown.');
  }
}

/**
 * Check Opt In
 * @return Promise with updated cookie value
 */
export function checkOptIn() {
  return new Promise((resolve) => {
    let soiOptIn = getSoiCookie().opt_in;
    let resultOptIn = soiOptIn;

    // Verify Power Opt In (will return immediately if not activated), it will overwrite the SOI result only if its positive
    verifyPowerOptIn().then((powerOptIn) => {
      logPreviewOptInInfo(soiOptIn, powerOptIn.power_opt_in);
      if (powerOptIn.power_opt_in) {
        resultOptIn = powerOptIn.power_opt_in;
        if (isSubscriberSetCookieActive() && !soiOptIn) {
          setSoiOptIn(powerOptIn.privacy);
        }
      }
      resolve(resultOptIn);
    });
  });
}

export function hasOptedLater( ) {
  let cookie = getOilSessionCookie();
  logInfo('Current Oil Session Cookie: ', cookie);
  return cookie.opt_later;
}


export function hasOptedIgnore() {
  let cookie = getOilSessionCookie();
  logInfo('Current Oil Session Cookie: ', cookie);
  return cookie.opt_ignore;
}

