import {verifyPowerOptIn} from '../core/core_poi.js';
import {activatePowerOptInWithIFrame, activatePowerOptInWithRedirect} from './userview_poi.js';
import {logInfo, logPreviewInfo} from '../core/core_log.js';
import {getLocaleVariantVersion, OilVersion, sendEventToHostSite} from '../core/core_utils.js';
import {
  EVENT_NAME_OPT_IN,
  OIL_PAYLOAD_LOCALE_VARIANT_NAME,
  OIL_PAYLOAD_LOCALE_VARIANT_VERSION,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION,
  PRIVACY_SETTINGS_MINIMUM_TRACKING
} from '../core/core_constants.js';
import {getLocaleVariantName, isPoiActive, isSubscriberSetCookieActive} from '../core/core_config.js';
import {getSoiCookie, setSoiOptIn} from '../core/core_cookies.js';

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

/**
 * Oil optIn power
 * @param privacySettings privacy settings (to be propagated to the hub)
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return Promise with updated cookie value
 */
export function oilPowerOptIn(privacySettings, powerOnly = false) {
  if (!powerOnly) {
    // Update Oil cookie (site - SOI)
    setSoiOptIn(privacySettings);
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
      // TODO returned promise is ignored - correct?
      activatePowerOptInWithIFrame(payload);

      // Check if fallback is needed
      verifyPowerOptIn().then((result) => {
        if (result.power_opt_in === false) {
          logInfo('iFrame POI didnt work. Trying fallback now.');
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
 * @return promise with updated cookie value
 */
export function oilOptIn(privacySettings = PRIVACY_SETTINGS_MINIMUM_TRACKING) {
  setSoiOptIn(privacySettings);
  // Send event to notify host site
  sendEventToHostSite(EVENT_NAME_OPT_IN);

  return new Promise((resolve) => {
    resolve(true);
  });
}

