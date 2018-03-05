import { sendEventToHostSite, OilVersion } from './core_utils.js';
import { registerOptOutListener } from './core_optout.js';
import { logInfo, logPreviewInfo, logError } from './core_log.js';
import { checkOptIn } from './core_optin.js';
import { resetConfiguration, isPreviewMode, getLocale } from './core_config.js';
import { isLocaleValid } from './core_locale.js'
import {
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
import { doSetTealiumVariables } from './core_tealium_loading_rules';

/**
 * Initialize Oil on Host Site
 * This functions gets called directly after Oil has loaded
 */
export function initOilLayer() {
  logInfo(`Init OilLayer (version ${OilVersion.get()})`);

  if (isPreviewMode() && !isPreviewCookieSet()) {
    logPreviewInfo('Preview mode not correctly set, please see the documentation on how to set the cookie.');
  }

  let locale = getLocale();

  /**
   * Early death if the locale is invalid.
   */
  if (!isLocaleValid(locale)) {
    logError(`The locale ${locale} is not available.`);
    return;
  }

  attachUtilityFunctionsToWindowObject(locale);
  doSetTealiumVariables();

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
      System.import(`../userview/locale/userview_oil_${locale}.js`)
        .then(userview_modal => {
          userview_modal.renderOil(userview_modal.oilWrapper(), {noCookie: true});
        })
        .catch(() => {
          logError(`${locale} could not be loaded.`);
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
       * Any other case, when the user didnt decide before and oil needs to be shown:
       */
      else {
        System.import(`../userview/locale/userview_oil_${locale}.js`)
          .then(userview_modal => {
            userview_modal.renderOil(userview_modal.oilWrapper(), {optIn: false});
          })
          .catch(() => {
            logError(`${locale} could not be loaded.`);
          });
        sendEventToHostSite(EVENT_NAME_OIL_SHOWN);
      }
    });
  }
}

/**
 * Attach Utility Functions to window Object, so users of oil can use it.
 */
// FIXME Needs to be tested and extracted!
function attachUtilityFunctionsToWindowObject(locale) {
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

  function loadLocale(callback) {
    System.import(`../userview/locale/userview_oil_${locale}.js`)
      .then(callback)
      .catch(() => {
        logError(`${locale} could not be loaded.`);
      });
  }

  window.oilShowPreferenceCenter = () => {
    loadLocale(userview_modal => {
      userview_modal.oilShowPreferenceCenter();
    });
  };

  window.oilTriggerOptIn = () => {
    loadLocale(userview_modal => {
      userview_modal.handleOptIn();
    });
  };

  window.oilTriggerSoiOptIn = () => {
    loadLocale(userview_modal => {
      userview_modal.handleSoiOptIn();
    });
  };

  window.oilTriggerPoiOptin = () => {
    loadLocale(userview_modal => {
      userview_modal.handlePoiOptIn();
    });
  };
}


