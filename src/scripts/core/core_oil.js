import {OilVersion, sendEventToHostSite, setGlobalOilObject} from './core_utils.js';
import {handleOptOut} from './core_optout.js';
import {logError, logInfo, logPreviewInfo} from './core_log.js';
import {checkOptIn} from './core_optin.js';
import {getSoiCookie, isBrowserCookieEnabled, isPreviewCookieSet, removePreviewCookie, removeVerboseCookie, setPreviewCookie, setVerboseCookie} from './core_cookies.js';
import {doSetTealiumVariables} from './core_tealium_loading_rules.js';
import {getLocaleVariantName, getConfigValue, isPreviewMode, resetConfiguration} from './core_config.js';
import {EVENT_NAME_HAS_OPTED_IN, EVENT_NAME_NO_COOKIES_ALLOWED, EVENT_NAME_OIL_SHOWN, OIL_CONFIG} from './core_constants.js';
import {executeCommandCollection} from './core_command_collection';

/**
 * Initialize Oil on Host Site
 * This functions gets called directly after Oil has loaded
 */
export function initOilLayer() {
  logInfo(`Init OilLayer (version ${OilVersion.get()})`);

  if (isPreviewMode() && !isPreviewCookieSet()) {
    logPreviewInfo('Preview mode not correctly set, please see the documentation on how to set the cookie.');
  }

  let locale = getLocaleVariantName();

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
      import('../userview/locale/userview_oil.js')
        .then(userview_modal => {
          userview_modal.locale(uv_m => uv_m.renderOil({noCookie: true}));
        })
        .catch((e) => {
          logError(`${locale} could not be loaded.`, e);
        });
      sendEventToHostSite(EVENT_NAME_NO_COOKIES_ALLOWED);
      return;
    }

    /**
     * We read our cookie and get an optin value, true or false
     */
    checkOptIn().then((optin) => {
      if (optin) {
        /**
         * User has opted in
         */
        sendEventToHostSite(EVENT_NAME_HAS_OPTED_IN);
        executeCommandCollection();
        attachCommandCollectionFunctionToWindowObject();
      } else {
        /**
         * Any other case, when the user didn't decide before and oil needs to be shown:
         */
        import('../userview/locale/userview_oil.js')
          .then(userview_modal => {
            userview_modal.locale(uv_m => uv_m.renderOil({optIn: false}));
            attachCommandCollectionFunctionToWindowObject();
          })
          .catch((e) => {
            logError(`${locale} could not be loaded.`, e);
          });
        sendEventToHostSite(EVENT_NAME_OIL_SHOWN);
      }
    });
  }
}

function attachCommandCollectionFunctionToWindowObject() {
  setGlobalOilObject('commandCollectionExecutor', executeCommandCollection);
}

/**
 * Attach Utility Functions to window Object, so users of oil can use it.
 */
function attachUtilityFunctionsToWindowObject(locale) {

  function loadLocale(callbackMethod) {
    import('../userview/locale/userview_oil.js')
      .then(userview_modal => {
        if (!getConfigValue(OIL_CONFIG.ATTR_LOCALE, undefined)) {
          userview_modal.locale(callbackMethod);
        } else {
          callbackMethod(userview_modal);
        }
      })
      .catch((e) => {
        logError(`${locale} could not be loaded.`, e);
      });
  }

  setGlobalOilObject('previewModeOn', () => {
    setPreviewCookie();
    return 'preview mode on';
  });

  setGlobalOilObject('previewModeOff', () => {
    removePreviewCookie();
    return 'preview mode off';
  });

  setGlobalOilObject('verboseModeOn', () => {
    setVerboseCookie();
    return 'verbose mode on';
  });

  setGlobalOilObject('verboseModeOff', () => {
    removeVerboseCookie();
    return 'verbose mode off';
  });

  setGlobalOilObject('reload', () => {
    resetConfiguration();
    initOilLayer();
    return 'OIL reloaded';
  });

  setGlobalOilObject('status', () => {
    return getSoiCookie();
  });

  setGlobalOilObject('showPreferenceCenter', () => {
    loadLocale(userview_modal => {
      userview_modal.oilShowPreferenceCenter();
    });
  });

  setGlobalOilObject('triggerOptIn', () => {
    loadLocale(userview_modal => {
      userview_modal.handleOptIn();
    });
  });

  setGlobalOilObject('triggerSoiOptIn', () => {
    loadLocale(userview_modal => {
      userview_modal.handleSoiOptIn();
    });
  });

  setGlobalOilObject('triggerPoiOptIn', () => {
    loadLocale(userview_modal => {
      userview_modal.handlePoiOptIn();
    });
  });

  setGlobalOilObject('triggerOptOut', () => {
    handleOptOut();
  });
}


