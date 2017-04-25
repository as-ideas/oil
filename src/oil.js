import { getConfiguration } from "./scripts/config.js";
import { injectOil, addOilClickHandler } from "./scripts/modal.js";
import { validateOilCookie } from "./scripts/optin.js";


/**
 * Init OIL
 */
(function () {
  validateOilCookie();

  // Inject Oil overlay depending on cookie data
  injectOil(document.body);
  addOilClickHandler();
  getConfiguration();
}());
