import '../../styles/modal.scss';
import '../../styles/cpc.scss';
import {sendEventToHostSite} from '../core/core_utils.js';
import {removeSubscriberCookies} from '../core/core_cookies.js';
import {
  EVENT_NAME_ADVANCED_SETTINGS,
  EVENT_NAME_BACK_TO_MAIN,
  EVENT_NAME_COMPANY_LIST,
  EVENT_NAME_POI_OPT_IN,
  EVENT_NAME_SOI_OPT_IN,
  EVENT_NAME_THIRD_PARTY_LIST,
  EVENT_NAME_TIMEOUT
} from '../core/core_constants.js';
import {oilOptIn, oilPowerOptIn} from './userview_optin.js';
import {deActivatePowerOptIn} from '../core/core_poi.js';
import {oilDefaultTemplate} from './view/oil.default.js';
import {oilNoCookiesTemplate} from './view/oil.no.cookies.js';
import {oilAdvancedSettingsTemplate} from './view/oil.advanced.settings.js';
import {logError, logInfo} from '../core/core_log.js';
import {getTheme, getTimeOutValue, isPersistMinimumTracking} from './userview_config.js';
import {isSubscriberSetCookieActive} from '../core/core_config.js';
import {getPoiGroupName, isPoiActive} from '../core/core_config';
import {attachCpcHandlers} from './view/oil.advanced.settings.js';
import {applyPrivacySettings, getPrivacySettings, getSoiPrivacy, PRIVACY_SETTINGS_ALL_FALSE} from './userview_privacy.js';
import {EVENT_NAME_AS_PRIVACY_SELECTED, PRIVACY_MINIMUM_TRACKING} from '../core/core_constants.js';


// Initialize our Oil wrapper and save it ...

export const oilWrapper = defineOilWrapper;
export let hasRunningTimeout;

function startTimeOut() {
  if (!hasRunningTimeout && getTimeOutValue() > 0) {
    logInfo('OIL will auto-hide in', getTimeOutValue(), 'seconds.');
    hasRunningTimeout = setTimeout(function () {
      removeOilWrapperFromDOM();
      sendEventToHostSite(EVENT_NAME_TIMEOUT);
    }, getTimeOutValue() * 1000);
  }
}

export function stopTimeOut() {
  if (hasRunningTimeout) {
    clearTimeout(hasRunningTimeout);
    hasRunningTimeout = undefined;
  }
}

/**
 * Utility function for forEach safety
 *
 * @param array
 * @param callback
 * @param scope
 */
export function forEach(array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, array[i]);
  }
}

/**
 * Oil Main Render Function:
 */
export function renderOil(props) {
  if (shouldRenderOilLayer(props)) {
    if (props.noCookie) {
      renderOilContentToWrapper(oilNoCookiesTemplate());
    } else if (props.advancedSettings) {
      renderOilContentToWrapper(oilAdvancedSettingsTemplate());
    } else {
      startTimeOut();
      renderOilContentToWrapper(oilDefaultTemplate());
    }
  } else {
    removeOilWrapperFromDOM();
  }
}

/**
 * Helper that determines if Oil layer is shown or not...
 * Oil layer is not rendered eg. if user opted in
 * @param {*} props
 */
function shouldRenderOilLayer(props) {
  return props.optIn !== true;
}

// FIXME REWORKING WIP, default should come from CONFIG
// FIXME do we have enough tests for this?
export function oilShowPreferenceCenter(preset = PRIVACY_SETTINGS_ALL_FALSE) {
  let entryNode = document.querySelector('#oil-preference-center');
  if (entryNode) {
    // FIXME looks bad currently
    entryNode.innerHTML = oilAdvancedSettingsTemplate();
  } else {
    renderOil({advancedSettings: true});
  }
  let currentPrivacySetting = preset;
  let soiPrivacy = getSoiPrivacy();
  if (soiPrivacy) {
    currentPrivacySetting = soiPrivacy;
  }
  applyPrivacySettings(currentPrivacySetting);
}

function oilShowCompanyList() {
  import(`../poi-list/lists/poi-info_${getPoiGroupName()}.js`)
    .then(poiList => {
      renderOilContentToWrapper(poiList.oilGroupListTemplate(poiList.companyList));
    })
    .catch((e) => {
      logError(`POI 'group ${getPoiGroupName()}' could not be loaded.`, e);
    });

}

function oilShowThirdPartyList() {
  import(`../poi-list/lists/poi-info_${getPoiGroupName()}.js`)
    .then(poiList => {
      renderOilContentToWrapper(poiList.oilThirdPartyListTemplate(poiList.thirdPartyList));
    })
    .catch((e) => {
      logError(`POI 'group ${getPoiGroupName()}' could not be loaded.`, e);
    });
}

/**
 * Define Oil Wrapper DOM Node
 * @return object DOM element
 */
function defineOilWrapper() {
  let oilWrapper = document.createElement('div');
  // Set some attributes as CSS classes and attributes for testing
  oilWrapper.setAttribute('class', `as-oil ${getTheme()}`);
  oilWrapper.setAttribute('data-qa', 'oil-Layer');
  return oilWrapper;
}

/**
 * Define Content of our Oil Wrapper
 * Sets HTML based on props ...
 */
function renderOilContentToWrapper(content) {
  let wrapper = oilWrapper();
  wrapper.innerHTML = content;
  injectOilWrapperInDOM(wrapper);
}

function removeOilWrapperFromDOM() {
  let domNodes = getOilDOMNodes();
  // For every render cycle our OIL main DOM node gets removed, in case it already exists in DOM
  if (domNodes.oilWrapper) {
    forEach(domNodes.oilWrapper, function (domNode) {
      domNode.parentElement.removeChild(domNode);
    });
  }
}

function injectOilWrapperInDOM(wrapper) {
  removeOilWrapperFromDOM();

  // Insert OIL into DOM
  document.body.insertBefore(wrapper, document.body.firstElementChild);
  addOilHandlers(getOilDOMNodes());
}

/**
 * Small Utility Function to retrieve our Oil Wrapper and Action Elements,
 * like Buttons ...
 * @return data object which contains various OIL DOM nodes
 */
function getOilDOMNodes() {
  return {
    oilWrapper: document.querySelectorAll('.as-oil'),
    btnOptIn: document.querySelectorAll('.as-oil .as-js-optin'),
    btnPoiOptIn: document.querySelectorAll('.as-oil .as-js-optin-poi'),
    btnOptLater: document.querySelectorAll('.as-oil .as-js-optlater'),
    companyList: document.querySelectorAll('.as-oil .as-js-companyList'),
    thirdPartyList: document.querySelectorAll('.as-oil .as-js-thirdPartyList'),
    btnAdvancedSettings: document.querySelectorAll('.as-oil .as-js-advanced-settings'),
    btnBack: document.querySelectorAll('.as-oil .as-js-oilback')
  }
}

function handleBackToMainDialog() {
  logInfo('Handling Back Button');
  stopTimeOut();
  renderOil({});
  sendEventToHostSite(EVENT_NAME_BACK_TO_MAIN);
}

function handleAdvancedSettings() {
  logInfo('Handling Show Advanced Settings');
  stopTimeOut();
  // FIXME should be configured or loaded from the stored settings
  oilShowPreferenceCenter(PRIVACY_SETTINGS_ALL_FALSE);
  sendEventToHostSite(EVENT_NAME_ADVANCED_SETTINGS);
}

function handleCompanyList() {
  logInfo('Handling Show Company List');
  stopTimeOut();
  oilShowCompanyList();
  sendEventToHostSite(EVENT_NAME_COMPANY_LIST);
}

function handleThirdPartyList() {
  logInfo('Handling Show Third Party List');
  stopTimeOut();
  oilShowThirdPartyList();
  sendEventToHostSite(EVENT_NAME_THIRD_PARTY_LIST);
}

export function handleOptIn() {
  if (isPoiActive()) {
    handlePoiOptIn();
  } else {
    handleSoiOptIn();
  }
}

export function handleSoiOptIn() {
  let privacySetting = getPrivacySettings();
  logInfo('Handling SOI with settings: ', privacySetting);
  trackPrivacySettings(privacySetting);

  if (shouldPrivacySettingBeStored(privacySetting)) {
    oilOptIn(privacySetting).then(() => {
      // FIXME should remove Wrapper
      renderOil({optIn: true});
      sendEventToHostSite(EVENT_NAME_SOI_OPT_IN);
    });
  } else {
    removeSubscriberCookies();
  }
}

export function handlePoiOptIn() {
  let privacySetting = getPrivacySettings();
  logInfo('Handling POI with settings: ', privacySetting);
  trackPrivacySettings(privacySetting);

  if (shouldPrivacySettingBeStored(privacySetting)) {
    oilPowerOptIn(privacySetting, !isSubscriberSetCookieActive()).then(() => {
      // FIXME should remove Wrapper
      renderOil({optIn: true});
      if (isPoiActive()) {
        sendEventToHostSite(EVENT_NAME_POI_OPT_IN);
      }
    });
  } else {
    removeSubscriberCookies();
    deActivatePowerOptIn();
  }
}

function trackPrivacySettings(privacySetting) {
  if (isObject(privacySetting)) {
    sendEventToHostSite(EVENT_NAME_AS_PRIVACY_SELECTED);
  }
}

function isObject(o) {
  return o instanceof Object && o.constructor === Object;
}

function shouldPrivacySettingBeStored(privacySetting) {
  return privacySetting !== PRIVACY_MINIMUM_TRACKING || isPersistMinimumTracking();
}

/**
 * adds a listener to all dom nodes in this list
 *
 * @param {array} listOfDoms, can be null, as any kind of iterable
 * @param {function} listener as callable function
 */
function addEventListenersToDOMList(listOfDoms, listener) {
  if (listOfDoms) {
    forEach(listOfDoms, function (domNode) {
      domNode && domNode.addEventListener('click', listener, false);
    });
  }
}

function addOilHandlers(nodes) {
  addEventListenersToDOMList(nodes.btnOptIn, handleOptIn);
  addEventListenersToDOMList(nodes.btnAdvancedSettings, handleAdvancedSettings);
  addEventListenersToDOMList(nodes.btnBack, handleBackToMainDialog);
  addEventListenersToDOMList(nodes.companyList, handleCompanyList);
  addEventListenersToDOMList(nodes.thirdPartyList, handleThirdPartyList);
  attachCpcHandlers();
}
