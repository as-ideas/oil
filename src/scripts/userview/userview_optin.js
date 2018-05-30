import {verifyPowerOptIn} from '../core/core_poi.js';
import {logInfo} from '../core/core_log.js';
import {activatePowerOptInWithIFrame, activatePowerOptInWithRedirect} from './userview_poi.js';
import {getLocaleVariantVersion, OilVersion, sendEventToHostSite} from '../core/core_utils.js';
import {
  EVENT_NAME_OPT_IN,
  OIL_PAYLOAD_LOCALE_VARIANT_NAME,
  OIL_PAYLOAD_LOCALE_VARIANT_VERSION,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION,
  PRIVACY_FULL_TRACKING
} from '../core/core_constants.js';
import {setSoiCookie} from '../core/core_cookies.js';
import {getLocaleVariantName, isPoiActive} from '../core/core_config.js';

/**
 * Oil optIn power
 * @param privacySettings privacy settings (to be propagated to the hub)
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return Promise with updated cookie value
 */
export function oilPowerOptIn(privacySettings, powerOnly = false) {
  if (!powerOnly) {
    // Update Oil cookie (site - SOI)
    setSoiCookie(privacySettings);
  }

  return new Promise((resolve) => {
    let payload = {
      [OIL_PAYLOAD_PRIVACY]: privacySettings,
      [OIL_PAYLOAD_VERSION]: OilVersion.get(),
      [OIL_PAYLOAD_LOCALE_VARIANT_NAME]: getLocaleVariantName(),
      [OIL_PAYLOAD_LOCALE_VARIANT_VERSION]: getLocaleVariantVersion()
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
  });
}


/**
 * Oil SOI optIn
 *
 * @param privacySettings - defaults to '1' for FULL TRACKING
 * @return {Promise} promise with updated cookie value
 */
export function oilOptIn(privacySettings = PRIVACY_FULL_TRACKING) {
  setSoiCookie(privacySettings);
  sendEventToHostSite(EVENT_NAME_OPT_IN);

  return new Promise((resolve) => {
    resolve(true);
  });
}

