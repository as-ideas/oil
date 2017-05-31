import { activatePowerOptInWithIFrame, activatePowerOptInWithRedirect, verifyPowerOptIn } from './poi.js';
import { logDebug } from './log.js';
import { sendEventToHostSite } from './utils.js';
import { OIL_CONFIG } from './constants.js';
import { getConfiguration, isPoiActive } from './config.js';
import { getSoiOptIn, setSoiOptIn, setOptLater } from './cookies.js';

let config = null;

// export function getOilCookieConfig() {
//   if (!config) {
//     config = getConfiguration();
//   }
//
//   return {
//     name: 'oil_data',
//     expires: config[OIL_CONFIG.ATTR_COOKIE_EXPIRES_IN_DAYS],
//     config: {
//       optin: false,
//       optLater: false,
//       timestamp: getClientTimestamp()
//     }
//   };
// }
//
// export function validateOilCookie() {
//   // Set Oil cookie if no cookie exists
//   if (!isCookie(getOilCookieConfig().name)) {
//      setDefaultOilCookie();
//   }
//
//   // In case Oil cookie exists but is not valid, create new Oil cookie with default config
//   if (!isCookieValid(getOilCookieConfig().name, Object.keys(getOilCookieConfig().config))) {
//     setDefaultOilCookie();
//   }
// }

// export function getOilCookie() {
//   return Cookie.getJSON(getOilCookieConfig().name);
// }
//
// export function setDefaultOilCookie() {
//   Cookie.set(getOilCookieConfig().name, getOilCookieConfig().config, { expires: getOilCookieConfig().expires });
// }

/**
 * Check Opt In
 * @return promise with updated cookie value
 */
export function checkOptIn() {
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  // validateOilCookie();
  let cookieOptin = getSoiOptIn();

  return new Promise((resolve) => {
    // Verify Power Opt In (will return immediately if not activated)
    verifyPowerOptIn().then((optIn) => {
      logDebug('Got following POI value', optIn);
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
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  // validateOilCookie();

  // let cookieData = getOilCookie();
  // let newCookieData = extend(true, {}, cookieData, { optin: true, timestamp: getClientTimestamp() });

  if (!powerOnly) {
    // Update Oil cookie (site - SOI)
    setSoiOptIn(true);
    // Cookie.set(getOilCookieConfig().name, newCookieData, { expires: getOilCookieConfig().expires });
  }

  return new Promise((resolve) => {
    if(isPoiActive()) {
      // Update Oil cookie (mypass - POI)
      activatePowerOptInWithIFrame();

      // Check if fallback is needed
      verifyPowerOptIn().then((result) => {
        if (result !== true) {
          logDebug("iFrame POI didnt work. Trying fallback now.");
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
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  // validateOilCookie();

  // let cookieData = getOilCookie();
  // let newCookieData = extend(true, {}, cookieData, { optin: true, timestamp: getClientTimestamp() });

  // Update Oil cookie
  setSoiOptIn(true);
  // Cookie.set(getOilCookieConfig().name, newCookieData, { expires: getOilCookieConfig().expires });

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
  // Cookies could have been deleted after page loads, therefore we check and validate our cookie here again
  // validateOilCookie();
  //
  // let cookieData = getOilCookie();
  // let newCookieData = extend(true, {}, cookieData, { optLater: true, timestamp: getClientTimestamp() });

  // Update Oil cookie
  setOptLater(true);
  // Cookie.set(getOilCookieConfig().name, newCookieData, { expires: getOilCookieConfig().expires });

  // Send event to notify host site
  fireConfiguredMessageEvent(OIL_CONFIG.ATTR_OPT_LATER_EVENT_NAME);

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
      logDebug(`Fire ${configEventName} Event (${eventName}), notifying host application...`);
      sendEventToHostSite(eventName);
    } else {
      logDebug(`Fire ${configEventName} Event not configured. No host application notification.`);
    }
  }
}
