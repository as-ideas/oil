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

// PUBLIC API
/**
 * Initialize the Oil Layer on Host Site side.
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
        gaTrackEvent('Loaded/No cookies');
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
          gaTrackEvent('Loaded/Later');
        }
        else {
          renderOil(oilWrapper, {optLater: false});
          // Defer to try to track event even if Google Analytics is loaded later than Oil.js
          window.setTimeout(() => {gaTrackEvent('Loaded/Initial')}, 1000);
        }
      });
    }
  }
}

export function initOilHub() {
  initOilFrame();
}