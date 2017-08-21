import { activatePowerOptInWithIFrame, activatePowerOptInWithRedirect, verifyPowerOptIn } from './poi.js';
import { logInfo } from './log.js';
import { sendEventToHostSite } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration, isPoiActive } from './config.js';
import { getSoiOptIn, setSoiOptIn, setOptLater, setOilOptClose } from './cookies.js';

let config = null;


/**
 * Check Opt In
 * @return promise with updated cookie value
 */
export function checkOptIn() {
  let cookieOptin = getSoiOptIn();

  return new Promise((resolve) => {
    // Verify Power Opt In (will return immediately if not activated)
    verifyPowerOptIn().then((optIn) => {
      logInfo('Got following POI value', optIn);
      if (optIn) {
        cookieOptin = optIn;
      }
      resolve(cookieOptin);
    });
  });
}


/**
 * Oil optIn power
 * @param powerOnly - only set Power Opt In (POI), no local site cookie (SOI)
 * @return Promise with updated cookie value
 */
export function oilPowerOptIn(powerOnly = true) {
  if (!powerOnly) {
    // Update Oil cookie (site - SOI)
    setSoiOptIn(true);
  }

  return new Promise((resolve) => {
    if(isPoiActive()) {
      // Update Oil cookie (mypass - POI)
      activatePowerOptInWithIFrame();

      // Check if fallback is needed
      verifyPowerOptIn().then((result) => {
        if (result !== true) {
          logInfo("iFrame POI didnt work. Trying fallback now.");
          activatePowerOptInWithRedirect();
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
export function oilOptIn() {
  setSoiOptIn(true);
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
export function oilOptClose() {
  setOilOptClose(true);
  // Send event to notify host site
  fireConfiguredMessageEvent(OIL_CONFIG.ATTR_OPT_CLOSE_EVENT_NAME);

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
