import { renderOil, oilWrapper, oilShowPreferenceCenter, handleSoiOptIn, handlePoiOptIn, handleOilIgnore } from './scripts/modal.js';
import { checkOptIn } from './scripts/optin.js';
import { sendEventToHostSite } from './scripts/utils.js';
import { registerOptOutListener } from './scripts/optout.js';
import { logInfo, logPreviewInfo } from './scripts/log.js';
import { resetConfiguration, isPreviewMode } from './scripts/config.js';
import {
  EVENT_NAME_HAS_OPTED_IGNORE,
  EVENT_NAME_HAS_OPTED_LATER,
  EVENT_NAME_HAS_OPTED_IN,
  EVENT_NAME_NO_COOKIES_ALLOWED,
  EVENT_NAME_OIL_SHOWN
} from './scripts/constants.js';
import { isBrowserCookieEnabled } from './scripts/utils.js';
import {
  hasOptedLater,
  hasOptedIgnore,
  isPreviewCookieSet,
  setPreviewCookie,
  setVerboseCookie,
  removePreviewCookie,
  removeVerboseCookie
} from './scripts/cookies.js';
import { getSoiCookie } from './scripts/cookies';

(function () {
  initOilLayer();
}());

/**
 * Config Object
 * We store and cache our config in this object, later on...
 */

function attachUtilityFunctionsToWindowObject() {
  window.oilPreviewModeOn = () => {
    setPreviewCookie();
    return 'preview mode on';
  };
  window.oilPreviewModeOff = () => {
    removePreviewCookie();
    return 'preview mode off';
  };
  window.oilVerboseModeOn = () => {
    setVerboseCookie();
    return 'verbose mode on';
  };
  window.oilVerboseModeOff = () => {
    removeVerboseCookie();
    return 'verbose mode off';
  };
  window.oilReload = () => {
    resetConfiguration();
    initOilLayer();
    return 'OIL reloaded';
  };
  window.oilStatus = () => {
    return getSoiCookie();
  };

  window.oilShowPreferenceCenter = oilShowPreferenceCenter;
  window.oilTriggerSoiOptIn = handleSoiOptIn;
  window.oilTriggerPoiOptin = handlePoiOptIn;
  window.oilTriggerIgnore = handleOilIgnore;
}

/**
 * Initialize Oil on Host Site
 * This functions gets called directly after Oil has loaded
 */
export function initOilLayer() {
  logInfo(`Init OilLayer (version ${process.env.OIL_VERSION})`);

  attachUtilityFunctionsToWindowObject();

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
      sendEventToHostSite(EVENT_NAME_NO_COOKIES_ALLOWED);
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
        sendEventToHostSite(EVENT_NAME_HAS_OPTED_IN);
      }
      /**
       * User has opted ignore
       */
      else if (hasOptedIgnore()) {
        sendEventToHostSite(EVENT_NAME_HAS_OPTED_IGNORE);
      }
      /**
       * User has opted later
       */
      else if (hasOptedLater()) {
        renderOil(oilWrapper, {optLater: true});
        sendEventToHostSite(EVENT_NAME_HAS_OPTED_LATER);
        sendEventToHostSite(EVENT_NAME_OIL_SHOWN);
      }
      /**
       * Any other case, when the user didnt decide before and oil needs to be shown:
       */
      else {
        renderOil(oilWrapper, {optLater: false});
        sendEventToHostSite(EVENT_NAME_OIL_SHOWN);
      }
    });
  }
}
