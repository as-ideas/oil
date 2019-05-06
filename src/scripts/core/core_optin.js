import { verifyPowerOptIn } from './core_poi';
import { logPreviewInfo } from './core_log';
import { isSubscriberSetCookieActive } from './core_config';
import { getSoiCookie, setSoiCookieWithPoiCookieData } from './core_cookies';

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
  return new Promise((resolve, reject) => {
    let soiOptIn = getSoiCookie().opt_in;
    let resultOptIn = soiOptIn;

    // Verify Power Opt In (will return immediately if not activated), it will overwrite the SOI result only if its positive
    verifyPowerOptIn().then((powerOptIn) => {
      logPreviewOptInInfo(soiOptIn, powerOptIn.power_opt_in);
      if (powerOptIn.power_opt_in) {
        resultOptIn = powerOptIn.power_opt_in;
        if (!soiOptIn) {
          setSoiCookieWithPoiCookieData(powerOptIn)
            .then(() => resolve(resultOptIn))
            .catch(error => reject(error));
        }
      }
      resolve(resultOptIn);
    });
  });
}

