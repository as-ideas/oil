import { injectOil, addOilClickHandler } from "./scripts/modal.js";
import { checkOptIn, fireOptInEvent } from "./scripts/optin.js";
import { registerOptOutListener } from "./scripts/optout.js";
import { initOilFrame } from "./scripts/iframe.listener.js";
import { logDebug, logInfo } from './scripts/log.js';
import { getConfiguration } from './scripts/config.js';
import { OIL_CONFIG } from './scripts/constants.js';
import Cookie from 'js-cookie';
import { isBrowserCookieEnabled } from './scripts/utils.js';

let config = null;

function isDeveloperCookieSet() {
  return Cookie.get('oil_developer');
}

// PUBLIC API
export function initOilLayer() {
  logDebug('Init OilLayer');
  if (!isBrowserCookieEnabled()) {
    logInfo('This browser doesn\'t allow cookies.');
    // TODO create layer to help users understand the need of cookies.
    return;
  }

  if (!config) {
    config = getConfiguration();
  }

  if (config) {
    if (!config[OIL_CONFIG.ATTR_DEVELOPER_MODE] || isDeveloperCookieSet()) {
      checkOptIn().then((cookie) => {
        registerOptOutListener();
        if (!cookie.optin) {
          // Inject Oil overlay depending on cookie data
          injectOil(document.body);
          addOilClickHandler();
        } else {
          fireOptInEvent();
        }
      });
    }
  }
}

export function initOilHub() {
  initOilFrame();
}
