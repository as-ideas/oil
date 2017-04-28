import { injectOil, addOilClickHandler } from "./scripts/modal.js";
import { checkOptIn } from "./scripts/optin.js";
import { initOilFrame } from "./scripts/iframe.listener.js";
import { logDebug } from './scripts/log.js';
import { initLogging } from './scripts/log.js';

// PUBLIC API
export function initOilLayer() {
  initLogging();
  logDebug('Init OilLayer');
  checkOptIn().then((cookie) => {
    if (!cookie.optin) {
      // Inject Oil overlay depending on cookie data
      injectOil(document.body);
      addOilClickHandler();
    }
  });
}

export function initOilHub() {
  initOilFrame();
}
