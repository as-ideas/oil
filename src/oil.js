import { injectOil, addOilClickHandler } from "./scripts/modal.js";
import { checkOptIn } from "./scripts/optin.js";

// PUBLIC API
export function initOilLayer() {
  checkOptIn().then((cookie) => {
    if (!cookie.optin) {
      // Inject Oil overlay depending on cookie data
      injectOil(document.body);
      addOilClickHandler();
    }
  });
}
export { initOilFrame } from "./scripts/mypass.js";
