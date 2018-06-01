import {verifyPowerOptIn} from '../core/core_poi.js';
import {logInfo} from '../core/core_log.js';
import {activatePowerOptInWithIFrame, activatePowerOptInWithRedirect} from './userview_poi.js';
import {sendEventToHostSite} from '../core/core_utils.js';
import {
  EVENT_NAME_OPT_IN,
  OIL_PAYLOAD_LOCALE_VARIANT_NAME,
  OIL_PAYLOAD_LOCALE_VARIANT_VERSION,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION,
  PRIVACY_FULL_TRACKING
} from '../core/core_constants.js';
import {setSoiCookie} from '../core/core_cookies.js';
import {isPoiActive} from '../core/core_config.js';
import {buildSoiCookie} from '../core/core_cookies';
import {OIL_PAYLOAD_CUSTOM_PURPOSES} from '../core/core_constants';

/**
 * Oil optIn power
 * @param privacySettings privacy settings (to be propagated to the hub)
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return Promise with updated cookie value
 */
export function oilPowerOptIn(privacySettings, powerOnly = false) {
  return new Promise((resolve, reject) => {
    let soiCookiePromise;
    if (!powerOnly) {
      // Update Oil cookie (site - SOI)
      soiCookiePromise = setSoiCookie(privacySettings)
    } else {
      soiCookiePromise = buildSoiCookie(privacySettings);
    }
    soiCookiePromise.then((cookie) => {
      let payload = {
        [OIL_PAYLOAD_PRIVACY]: cookie.consentString,
        [OIL_PAYLOAD_VERSION]: cookie.version,
        [OIL_PAYLOAD_LOCALE_VARIANT_NAME]: cookie.localeVariantName,
        [OIL_PAYLOAD_LOCALE_VARIANT_VERSION]: cookie.localeVariantVersion,
        [OIL_PAYLOAD_CUSTOM_PURPOSES]: cookie.customPurposes
      };
      if (isPoiActive()) {
        // Update Oil cookie (mypass - POI)
        // noinspection JSIgnoredPromiseFromCall
        activatePowerOptInWithIFrame(payload);

        // Check if fallback is needed
        verifyPowerOptIn().then((result) => {
          if (result.power_opt_in === false) {
            logInfo('iFrame POI didn\'t work. Trying fallback now.');
            activatePowerOptInWithRedirect(payload);
          }
        });
      }

      // Send event to notify host site
      sendEventToHostSite(EVENT_NAME_OPT_IN);
      resolve(true);
    }).catch(error => reject(error));
  });
}


/**
 * Oil SOI optIn
 *
 * @param privacySettings - defaults to '1' for FULL TRACKING
 * @return {Promise} promise with updated cookie value
 */
export function oilOptIn(privacySettings = PRIVACY_FULL_TRACKING) {
  return new Promise((resolve, reject) => {
    setSoiCookie(privacySettings).then(() => {
      sendEventToHostSite(EVENT_NAME_OPT_IN);
      resolve(true);
    }).catch((error) => reject(error));
  });
}

