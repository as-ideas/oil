import { activatePowerOptInWithIFrame, activatePowerOptInWithRedirect, verifyPowerOptIn } from './poi.js';
import { logInfo, logPreviewInfo } from './log.js';
import { sendEventToHostSite } from './utils.js';
import { EVENT_NAME_OPT_LATER, EVENT_NAME_OPT_IN, PRIVACY_SETTINGS_MINIMUM_TRACKING, EVENT_NAME_OPT_IGNORE } from './constants.js';
import { getConfiguration, isPoiActive, isSubscriberSetCookieActive } from './config.js';
import { getSoiCookie, setSoiOptIn, setOptLater, setOilOptIgnore } from './cookies.js';

let config = null;

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
  if (!config) {
    config = getConfiguration();
  }

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
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return Promise with updated cookie value
 */
export function oilPowerOptIn(privacySettings, powerOnly = false  ) {
  if (!powerOnly) {
    // Update Oil cookie (site - SOI)
    setSoiOptIn(privacySettings);
  }

  return new Promise((resolve) => {
    if (isPoiActive()) {
      // Update Oil cookie (mypass - POI)
      activatePowerOptInWithIFrame(privacySettings);

      // Check if fallback is needed
      verifyPowerOptIn().then((result) => {
        if (result.power_opt_in === false) {
          logInfo('iFrame POI didnt work. Trying fallback now.');
          activatePowerOptInWithRedirect(privacySettings);
        }
      });
    }

    // Send event to notify host site
    fireConfiguredMessageEvent(EVENT_NAME_OPT_IN);
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
  fireConfiguredMessageEvent(EVENT_NAME_OPT_IN);

  return new Promise((resolve) => {
    resolve(true);
  });
}


/**
 * Oil optLater
 * @return promise with updated cookie value
 */
export function oilOptLater() {
  setOptLater(true);
  // Send event to notify host site
  fireConfiguredMessageEvent(EVENT_NAME_OPT_LATER);

  return new Promise((resolve) => {
    resolve(true);
  });
}


/**
 * Oil optClose
 * @return promise with updated cookie value
 */
export function oilOptIgnore() {
  setOilOptIgnore(true);
  // Send event to notify host site
  fireConfiguredMessageEvent(EVENT_NAME_OPT_IGNORE);

  return new Promise((resolve) => {
    resolve(true);
  });
}


/**
 * Fire a postmessage event to host site to notify of e.g. optin or optlater
 * @param eventname is the event name that will be used
 */
export function fireConfiguredMessageEvent(eventName) {
  sendEventToHostSite(eventName);
}
