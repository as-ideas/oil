import '../../styles/modal.scss';
import '../../styles/cpc.scss';
import { getGlobalOilObject, isObject, sendEventToHostSite } from '../core/core_utils';
import { removeSubscriberCookies } from '../core/core_cookies';
import {
  EVENT_NAME_ADVANCED_SETTINGS,
  EVENT_NAME_AS_PRIVACY_SELECTED,
  EVENT_NAME_BACK_TO_MAIN,
  EVENT_NAME_COMPANY_LIST,
  EVENT_NAME_POI_OPT_IN,
  EVENT_NAME_SOI_OPT_IN,
  EVENT_NAME_THIRD_PARTY_LIST,
  EVENT_NAME_TIMEOUT,
  OIL_CONFIG_CPC_TYPES,
  PRIVACY_MINIMUM_TRACKING
} from '../core/core_constants';
import { oilOptIn, oilPowerOptIn } from './userview_optin';
import { deActivatePowerOptIn } from '../core/core_poi';
import { oilDefaultTemplate } from './view/oil.default';
import { oilNoCookiesTemplate } from './view/oil.no.cookies';
import * as AdvancedSettingsStandard from './view/oil.advanced.settings.standard';
import * as AdvancedSettingsTabs from './view/oil.advanced.settings.tabs';
import { logError, logInfo } from '../core/core_log';
import { getCpcType, getTheme, getTimeOutValue, isPersistMinimumTracking } from './userview_config';
import { getAdvancedSettingsPurposesDefault, isPoiActive, isSubscriberSetCookieActive, gdprApplies } from '../core/core_config';
import { applyPrivacySettings, getPrivacySettings, getSoiConsentData } from './userview_privacy';
import { getPurposeIds, loadVendorList } from '../core/core_vendor_information';
import { manageDomElementActivation } from '../core/core_tag_management';

// Initialize our Oil wrapper and save it ...

export const oilWrapper = defineOilWrapper;
export let hasRunningTimeout;

export function stopTimeOut() {
  if (hasRunningTimeout) {
    clearTimeout(hasRunningTimeout);
    hasRunningTimeout = undefined;
  }
}

/**
 * Utility function for forEach safety
 */
export function forEach(array, callback, scope) {
  for (let i = 0; i < array.length; i++) {
    callback.call(scope, array[i]);
  }
}

export function renderOil(props) {
  if (shouldRenderOilLayer(props)) {
    if (props.noCookie) {
      renderOilContentToWrapper(oilNoCookiesTemplate());
    } else if (props.advancedSettings) {
      renderOilContentToWrapper(findAdvancedSettingsTemplate());
    } else {
      startTimeOut();
      renderOilContentToWrapper(oilDefaultTemplate());
    }
  } else {
    removeOilWrapperFromDOM();
  }
}

export function oilShowPreferenceCenter() {
  // We need the PowerGroupUi-Stuff for the CPC
  import('../poi-list/poi-info.js');

  // We need to make sure the vendor list is loaded before showing the cpc
  loadVendorList()
    .then(() => {
      let wrapper = document.querySelector('.as-oil');
      let entryNode = document.querySelector('#oil-preference-center');
      if (wrapper) {
        renderOil({advancedSettings: true});
      } else if (entryNode) {
        entryNode.innerHTML = findAdvancedSettingsInlineTemplate();
        addOilHandlers(getOilDOMNodes());
      } else {
        logError('No wrapper for the CPC with the id #oil-preference-center was found.');
        return;
      }
      let consentData = getSoiConsentData();
      let currentPrivacySettings;
      if (consentData) {
        currentPrivacySettings = consentData.getPurposesAllowed();
      } else {
        currentPrivacySettings = getAdvancedSettingsPurposesDefault() ? getPurposeIds() : [];
      }
      applyPrivacySettings(currentPrivacySettings);
    })
    .catch((error) => logError(error));
}

export function handleOptIn() {
  (isPoiActive() ? handlePoiOptIn() : handleSoiOptIn()).then(() => {
    let commandCollectionExecutor = getGlobalOilObject('commandCollectionExecutor');
    if (commandCollectionExecutor) {
      commandCollectionExecutor();
    }
    manageDomElementActivation();
  });
  animateOptInButton();
}

function shouldRenderOilLayer(props) {
  return props.optIn === false && gdprApplies();
}

function startTimeOut() {
  if (!hasRunningTimeout && getTimeOutValue() > 0) {
    logInfo('OIL will auto-hide in', getTimeOutValue(), 'seconds.');
    hasRunningTimeout = setTimeout(function () {
      removeOilWrapperFromDOM();
      sendEventToHostSite(EVENT_NAME_TIMEOUT);
      hasRunningTimeout = undefined;
    }, getTimeOutValue() * 1000);
  }
}

function findAdvancedSettingsTemplate() {
  const cpcType = getCpcType();
  switch (cpcType) {
    case OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD:
      return AdvancedSettingsStandard.oilAdvancedSettingsTemplate();
    case OIL_CONFIG_CPC_TYPES.CPC_TYPE_TABS:
      return AdvancedSettingsTabs.oilAdvancedSettingsTemplate();
    default:
      logError(`Found unknown CPC type '${cpcType}'! Falling back to CPC type '${OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD}'!`);
      return AdvancedSettingsStandard.oilAdvancedSettingsTemplate();
  }
}

function findAdvancedSettingsInlineTemplate() {
  const cpcType = getCpcType();
  switch (cpcType) {
    case OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD:
      return AdvancedSettingsStandard.oilAdvancedSettingsInlineTemplate();
    case OIL_CONFIG_CPC_TYPES.CPC_TYPE_TABS:
      return AdvancedSettingsTabs.oilAdvancedSettingsInlineTemplate();
    default:
      logError(`Found unknown CPC type '${cpcType}'! Falling back to CPC type '${OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD}'!`);
      return AdvancedSettingsStandard.oilAdvancedSettingsInlineTemplate();
  }
}

function attachCpcEventHandlers() {
  const cpcType = getCpcType();
  switch (cpcType) {
    case OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD:
      AdvancedSettingsStandard.attachCpcHandlers();
      break;
    case OIL_CONFIG_CPC_TYPES.CPC_TYPE_TABS:
      AdvancedSettingsTabs.attachCpcHandlers();
      break;
    default:
      logError(`Found unknown CPC type '${cpcType}'! Falling back to CPC type '${OIL_CONFIG_CPC_TYPES.CPC_TYPE_STANDARD}'!`);
      AdvancedSettingsStandard.attachCpcHandlers();
      break;
  }
}


function oilShowCompanyList() {
  import('../poi-list/poi-info.js')
    .then(poiList => {
      poiList.renderOilGroupListTemplate(renderOilContentToWrapper);
    })
    .catch((e) => {
      logError('Error on oilShowCompanyList.', e);
    });
}

function oilShowThirdPartyList() {
  import('../poi-list/poi-info.js')
    .then(poiList => {
      poiList.renderOilThirdPartyListTemplate(renderOilContentToWrapper);
    })
    .catch((e) => {
      logError('Error on oilShowThirdPartyList.', e);
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
    btnOptIn: document.querySelectorAll('.as-js-optin'),
    btnPoiOptIn: document.querySelectorAll('.as-js-optin-poi'),
    companyList: document.querySelectorAll('.as-js-companyList'),
    thirdPartyList: document.querySelectorAll('.as-js-thirdPartyList'),
    btnAdvancedSettings: document.querySelectorAll('.as-js-advanced-settings'),
    btnBack: document.querySelectorAll('.as-js-oilback')
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
  oilShowPreferenceCenter();
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

function animateOptInButton() {
  let optInButton = document.querySelector('.as-js-optin');
  if (optInButton) {
    optInButton.className += ' as-oil__btn-optin-clicked';
    window.setTimeout(() => {
      optInButton.className = optInButton.className.replace(' as-js-clicked', '');
    }, 1200);
  }
}

function handleSoiOptIn() {
  let privacySetting = getPrivacySettings();
  logInfo('Handling SOI with settings: ', privacySetting);
  trackPrivacySettings(privacySetting);

  if (shouldPrivacySettingBeStored(privacySetting)) {
    return oilOptIn(privacySetting).then(() => {
      // FIXME should remove Wrapper
      renderOil({optIn: true});
      sendEventToHostSite(EVENT_NAME_SOI_OPT_IN);
    });
  } else {
    return new Promise(resolve => {
      removeSubscriberCookies();
      resolve();
    });
  }
}

function handlePoiOptIn() {
  let privacySetting = getPrivacySettings();
  logInfo('Handling POI with settings: ', privacySetting);
  trackPrivacySettings(privacySetting);

  if (shouldPrivacySettingBeStored(privacySetting)) {
    return oilPowerOptIn(privacySetting, !isSubscriberSetCookieActive()).then(() => {
      // FIXME should remove Wrapper
      renderOil({optIn: true});
      if (isPoiActive()) {
        sendEventToHostSite(EVENT_NAME_POI_OPT_IN);
      }
    });
  } else {
    removeSubscriberCookies();
    return deActivatePowerOptIn();
  }
}

function trackPrivacySettings(privacySetting) {
  if (isObject(privacySetting)) {
    sendEventToHostSite(EVENT_NAME_AS_PRIVACY_SELECTED);
  }
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
  attachCpcEventHandlers();
}
