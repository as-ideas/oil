import { renderOil, oilWrapper } from './scripts/modal.js';
import { checkOptIn, fireConfiguredMessageEvent } from './scripts/optin.js';
import { registerOptOutListener } from './scripts/optout.js';
import { initOilFrame } from './scripts/iframe.listener.js';
import { logInfo, logPreviewInfo } from './scripts/log.js';
import { getConfiguration, isPreviewMode, gaTrackEvent } from './scripts/config.js';
import { OIL_CONFIG } from './scripts/constants.js';
import { isBrowserCookieEnabled, hasGALoaded } from './scripts/utils.js';
import { hasOptedLater, hasOptedIgnore, isPreviewCookieSet } from './scripts/cookies.js';


/**
 * Config Object
 * We store and cache our config in this object, later on...
 */
let config = null;


/**
 * Initialize Oil on Host Site
 * This functions gets called directly after Oil has loaded
 */
export function initOilLayer() {
  logInfo('Init OilLayer');

  // Fill config object with configuration data once and for all
  if (config === null) {
    config = getConfiguration();
  }

  if (isPreviewMode() && !isPreviewCookieSet()) {
    logPreviewInfo('Preview mode not correctly set, please see the documentation on how to set the cookie.');
  }

  /**
   * We show OIL depending on the following conditions:
   * With Dev Mode turned on, we only show Oil if a developer cookie is set
   */
  if (!isPreviewMode() || isPreviewCookieSet()) {

    /**
     * Cookies are not enabled
     */
    if (!isBrowserCookieEnabled()) {
      logInfo('This browser doesn\'t allow cookies.');
      renderOil(oilWrapper, {noCookie: true});
      gaTrackEvent('Loaded/No cookies', 1);
      return;
    }

    /**
     * We read our cookie and get an optin value, true or false
     */
    checkOptIn().then((optin) => {
      registerOptOutListener();
      /**
       * User has opted in
       */
      if (optin) {
        fireConfiguredMessageEvent(OIL_CONFIG.ATTR_HAS_OPTED_IN_EVENT_NAME);
      }
      /**
       * User has opted ignore
       */
      else if (hasOptedIgnore()) {
        fireConfiguredMessageEvent(OIL_CONFIG.ATTR_HAS_OPTED_IGNORE_EVENT_NAME);
        gaTrackEvent('Loaded/Ignored', 1);
      }
      /**
       * User has opted later
       */
      else if (hasOptedLater()) {
        renderOil(oilWrapper, {optLater: true});
        fireConfiguredMessageEvent(OIL_CONFIG.ATTR_HAS_OPTED_LATER_EVENT_NAME);
        gaTrackEvent('Loaded/Later', 1);
      }
      /**
       * Any other case
       */
      else {
        renderOil(oilWrapper, {optLater: false});
        hasGALoaded()
          .then(() => gaTrackEvent('Loaded/Initial', 1))
          .catch((e) => logInfo(e))
      }
    });
  }
}

export function initOilHub() {
  initOilFrame();
}
