import { sendEventToHostSite, OilVersion } from './core_utils.js';
import { registerOptOutListener } from './core_optout.js';
import { logInfo, logPreviewInfo } from './core_log.js';
import { checkOptIn, hasOptedIgnore, hasOptedLater } from './core_optin.js';
import { resetConfiguration, isPreviewMode } from './core_config.js';
import {
  EVENT_NAME_HAS_OPTED_IGNORE,
  EVENT_NAME_HAS_OPTED_LATER,
  EVENT_NAME_HAS_OPTED_IN,
  EVENT_NAME_NO_COOKIES_ALLOWED,
  EVENT_NAME_OIL_SHOWN
} from './core_constants.js';
import {
  isPreviewCookieSet,
  setPreviewCookie,
  setVerboseCookie,
  removePreviewCookie,
  removeVerboseCookie,
  isBrowserCookieEnabled,
  getRawSoiCookie
} from './core_cookies.js';

/**
 * Initialize Oil on Host Site
 * This functions gets called directly after Oil has loaded
 */
export function initOilLayer() {
  logInfo(`Init OilLayer (version ${OilVersion.get()})`);

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
      System.import('../userview/userview_modal.js')
        .then(core_modal => {
          core_modal.renderOil(core_modal.oilWrapper, {noCookie: true});
        });
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
        // TODO load core and render oil
        // renderOil(oilWrapper, {optLater: true});
        sendEventToHostSite(EVENT_NAME_HAS_OPTED_LATER);
        sendEventToHostSite(EVENT_NAME_OIL_SHOWN);
      }
      /**
       * Any other case, when the user didnt decide before and oil needs to be shown:
       */
      else {
        // TODO load core and render oil
        // renderOil(oilWrapper, {optLater: false});
        sendEventToHostSite(EVENT_NAME_OIL_SHOWN);
      }
    });
  }
}

/**
 * Attach Utility Functions to window Object, so users of oil can use it.
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
    return getRawSoiCookie();
  };
  // TODO load core and execute
  // window.oilShowPreferenceCenter = oilShowPreferenceCenter;
  // window.oilTriggerSoiOptIn = handleSoiOptIn;
  // window.oilTriggerPoiOptin = handlePoiOptIn;
  // window.oilTriggerIgnore = handleOilIgnore;
}


