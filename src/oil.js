import { renderOil, oilWrapper } from "./scripts/modal.js";
import { checkOptIn, fireConfiguredMessageEvent } from "./scripts/optin.js";
import { registerOptOutListener } from "./scripts/optout.js";
import { initOilFrame } from "./scripts/iframe.listener.js";
import { logInfo } from './scripts/log.js';
import { getConfiguration, isDevMode, gaTrackEvent } from './scripts/config.js';
import { OIL_CONFIG } from './scripts/constants.js';
import Cookie from 'js-cookie';
import { isBrowserCookieEnabled } from './scripts/utils.js';
import { getOptLater } from './scripts/cookies.js';

let config = null;

function isDeveloperCookieSet() {
  return Cookie.get('oil_developer') === 'true';
}


/**
 * Defer Google Analytics (GA) tracking event. This is needed because we have to wait
 * for GA to be loaded and initialized by the host site, which we don't control...
 * Old way: window.setTimeout(() => {gaTrackEvent('Loaded/Initial')}, 2000);
 */

// See https://stackoverflow.com/questions/1954910/javascript-detect-if-google-analytics-is-loaded-yet

const checkIfAnalyticsLoaded = () => {
  return new Promise((resolve, reject) => {
    let timeStart = Date.now();
    const TIMEOUT = 5000;

  const _isLoaded = () => {
    if (Date.now() - timeStart > TIMEOUT) {
      reject("Timeout: Google Analytics not found in page");
      return;
    }
    if (window.ga && window.ga.create) {
      resolve(window.ga);
      return;
    } else {
      setTimeout(_isLoaded, 500);
    }
  };

  _isLoaded();
  });
};


/**
 * Initialize the Oil Layer on Host Site side.
 * 
 */
export function initOilLayer() {
  logInfo('Init OilLayer');

  if (!config) {
    config = getConfiguration();
  }

  if (config) {
    if (!isDevMode() || isDeveloperCookieSet()) {
      if (!isBrowserCookieEnabled()) {
        logInfo('This browser doesn\'t allow cookies.');
        renderOil(oilWrapper, {noCookie: true});
        gaTrackEvent('Loaded/No cookies', 1);
        return;
      }

      checkOptIn().then((optin) => {
        registerOptOutListener();
        if (optin) {
          fireConfiguredMessageEvent(OIL_CONFIG.ATTR_HAS_OPTED_IN_EVENT_NAME);
        }
        else if (getOptLater()) {
          renderOil(oilWrapper, {optLater: true});
          fireConfiguredMessageEvent(OIL_CONFIG.ATTR_HAS_OPTED_LATER_EVENT_NAME);
          gaTrackEvent('Loaded/Later', 1);
        }
        else {
          renderOil(oilWrapper, {optLater: false});
          // Check for GA and send event 
          checkIfAnalyticsLoaded()
            .then(() => {
              gaTrackEvent('Loaded/Initial', 1);
            })
            .catch((e) => {
              logInfo(e)
            })
        }
      });
    }
  }
}

export function initOilHub() {
  initOilFrame();
}