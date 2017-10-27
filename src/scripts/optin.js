import { activatePowerOptInWithIFrame, activatePowerOptInWithRedirect, verifyPowerOptIn } from './poi.js';
import { logInfo, logPreviewInfo } from './log.js';
import { sendEventToHostSite } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration, isPoiActive } from './config.js';
import { getSoiOptIn, setSoiOptIn, setOptLater, setOilOptIgnore } from './cookies.js';

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
 * @return promise with updated cookie value
 */
export function checkOptIn() {
  return new Promise((resolve) => {
    let optIn = getSoiOptIn();

    // Verify Power Opt In (will return immediately if not activated), it will overwrite the SOI result only if its positive
    verifyPowerOptIn().then((powerOptIn) => {
      logPreviewOptInInfo(optIn, powerOptIn);
      if (powerOptIn) {
        optIn = powerOptIn;
      }
      resolve(optIn);
    });
  });
}

/**
 * Oil optIn power
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return Promise with updated cookie value
 */
export function oilPowerOptIn(privacySettings, powerOnly = true) {
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
        if (result !== true) {
          logInfo('iFrame POI didnt work. Trying fallback now.');
          activatePowerOptInWithRedirect(privacySettings);
        }
      });
    }

    // Send event to notify host site
    fireConfiguredMessageEvent(OIL_CONFIG.ATTR_OPT_IN_EVENT_NAME);
    resolve(true);
  });
}


/**
 * Oil SOI optIn
 * @return promise with updated cookie value
 */
export function oilOptIn(privacySettings) {
  setSoiOptIn(privacySettings);
  // Send event to notify host site
  fireConfiguredMessageEvent(OIL_CONFIG.ATTR_OPT_IN_EVENT_NAME);

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
  fireConfiguredMessageEvent(OIL_CONFIG.ATTR_OPT_LATER_EVENT_NAME);

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
  fireConfiguredMessageEvent(OIL_CONFIG.ATTR_OPT_IGNORE_EVENT_NAME);

  return new Promise((resolve) => {
    resolve(true);
  });
}


/**
 * Fire a postmessage event to host site to notify of e.g. optin or optlater
 * @param eventname defined in OIL config constants keys, e.g. OIL_CONFIG.ATTR_OPT_IN_EVENT_NAME
 */
export function fireConfiguredMessageEvent(configEventName) {
  if (!config) {
    config = getConfiguration();
  }

  if (config) {
    let eventName = config[configEventName];

    if (eventName) {
      sendEventToHostSite(eventName);
    }
    else {
      logInfo(`Event ${configEventName} has not been configured. We couldn't notify the host application.`);
    }
  }
}
