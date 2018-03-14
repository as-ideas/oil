import '../../styles/modal.scss';
import noUiSlider from 'nouislider';
import { sendEventToHostSite } from '../core/core_utils.js';
import { removeSubscriberCookies } from '../core/core_cookies.js';
import { convertPrivacySettingsToCookieValue, getSoiPrivacy } from './userview_cookies.js';
import {
  PRIVACY_MINIMUM_TRACKING,
  PRIVACY_FUNCTIONAL_TRACKING,
  PRIVACY_FULL_TRACKING,
  DATA_CONTEXT_YES,
  EVENT_NAME_BACK_TO_MAIN,
  EVENT_NAME_ADVANCED_SETTINGS,
  EVENT_NAME_SOI_OPT_IN,
  EVENT_NAME_POI_OPT_IN,
  EVENT_NAME_AS_SELECTED_MINIMUM,
  EVENT_NAME_AS_SELECTED_FUNCTIONAL,
  EVENT_NAME_AS_SELECTED_FULL,
  EVENT_NAME_COMPANY_LIST,
  EVENT_NAME_THIRD_PARTY_LIST
} from '../core/core_constants.js';
import { oilOptIn, oilPowerOptIn } from './userview_optin.js';
import { deActivatePowerOptIn } from '../core/core_poi.js';
import { oilDefaultTemplate } from './view/oil.default.js';
import { oilNoCookiesTemplate } from './view/oil.no.cookies.js';
import { oilAdvancedSettingsTemplate } from './view/oil.advanced.settings.js';
import { advancedSettingsSnippet } from './view/components/oil.advanced.settings.content';
import { logInfo, logError } from '../core/core_log.js';
import { isPersistMinimumTracking } from './userview_config.js';
import { isSubscriberSetCookieActive } from '../core/core_config.js';
import { getPoiGroupName, getTheme, isPoiActive } from '../core/core_config';


// Initialize our Oil wrapper and save it ...

export const oilWrapper = defineOilWrapper;

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

function interpretSliderValue(value) {
  switch (value) {
    default:
    case '0.00':
      logInfo('Essential Cookies selected');
      return PRIVACY_MINIMUM_TRACKING;
    case '1.00':
      logInfo('Functional Cookies selected');
      return PRIVACY_FUNCTIONAL_TRACKING;
    case '2.00':
      logInfo('Full Cookies selected');
      return PRIVACY_FULL_TRACKING;
  }
}

// FIXME no unit test (or should not be exported)
export function oilShowPreferenceCenter(preset = PRIVACY_MINIMUM_TRACKING) {
  let wrapper = document.querySelector('.as-oil');
  let entryNode = document.querySelector('#oil-preference-center');
  if (wrapper) {
    renderOil({advancedSettings: true});
  } else if (entryNode) {
    entryNode.innerHTML = advancedSettingsSnippet();
  } else {
    logError('No wrapper for the CPC with the id #oil-preference-center was found.');
    return;
  }

  let rangeSlider = document.getElementById('as-slider-range');

  // we take the soi privacy for now as start value, since this should always represent the poi privacy if it was set
  // we need a product decision how to handle this if poi and soi values can differ
  let currentPrivacySetting = preset;
  let soiPrivacy = getSoiPrivacy();
  if (soiPrivacy) {
    currentPrivacySetting = soiPrivacy.oiid;
  }

  noUiSlider.create(rangeSlider, {
    start: currentPrivacySetting,
    step: 1,
    orientation: 'vertical',
    range: {
      'min': PRIVACY_MINIMUM_TRACKING,
      'max': PRIVACY_FULL_TRACKING
    }
  });

  let essential = document.getElementById('as-slider-essential-title');
  let functional = document.getElementById('as-slider-functional-title');
  let advertising = document.getElementById('as-slider-advertising-title');
  rangeSlider.noUiSlider.on('update', function (params) {
    let currentSelection = params[0];
    let result = interpretSliderValue(currentSelection);

    switch (result) {
      case PRIVACY_MINIMUM_TRACKING:
      default:
        essential.setAttribute('class', 'as-slider-active');
        functional.setAttribute('class', 'as-slider-inactive');
        advertising.setAttribute('class', 'as-slider-inactive');
        break;
      case PRIVACY_FUNCTIONAL_TRACKING:
        essential.setAttribute('class', 'as-slider-inactive');
        functional.setAttribute('class', 'as-slider-active');
        advertising.setAttribute('class', 'as-slider-inactive');
        break;
      case PRIVACY_FULL_TRACKING:
        essential.setAttribute('class', 'as-slider-inactive');
        functional.setAttribute('class', 'as-slider-inactive');
        advertising.setAttribute('class', 'as-slider-active');
        break;
    }
  });
}

function oilShowCompanyList() {
  System.import(`../company-list/poi-group/poi-group_${getPoiGroupName()}.js`)
    .then(poiGroupList => {
      renderOilContentToWrapper(poiGroupList.oilCompanyListTemplate(poiGroupList.companyList));
    })
    .catch((e) => {
      logError(`POI 'group ${getPoiGroupName()}' could not be loaded.`, e);
    });

}

function oilShowThirdPartyList() {
  System.import(`../third-party-list/poi-group/poi-group_${getPoiGroupName()}.js`)
    .then(poiGroupList => {
      renderOilContentToWrapper(poiGroupList.oilThirdPartyListTemplate(poiGroupList.thirdPartyList));
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
    removeOilWrapperAndHandlers(domNodes);
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

function getRangeSliderValue() {
  let rangeSlider = document.getElementById('as-slider-range');
  if (rangeSlider) {
    return interpretSliderValue(rangeSlider.noUiSlider.get());
  }
  return PRIVACY_FULL_TRACKING;
}

function handleBackToMainDialog() {
  logInfo('Handling Back Button');
  renderOil({});
  sendEventToHostSite(EVENT_NAME_BACK_TO_MAIN);
}

function handleAdvancedSettings() {
  oilShowPreferenceCenter(PRIVACY_MINIMUM_TRACKING);
  sendEventToHostSite(EVENT_NAME_ADVANCED_SETTINGS);
}

function handleCompanyList() {
  oilShowCompanyList();
  sendEventToHostSite(EVENT_NAME_COMPANY_LIST);
}

function handleThirdPartyList() {
  oilShowThirdPartyList();
  sendEventToHostSite(EVENT_NAME_THIRD_PARTY_LIST);
}

function trackPrivacySetting(privacySetting) {
  switch (privacySetting) {
    default:
    case PRIVACY_MINIMUM_TRACKING:
      sendEventToHostSite(EVENT_NAME_AS_SELECTED_MINIMUM);
      break;
    case PRIVACY_FUNCTIONAL_TRACKING:
      sendEventToHostSite(EVENT_NAME_AS_SELECTED_FUNCTIONAL);
      break;
    case PRIVACY_FULL_TRACKING:
      sendEventToHostSite(EVENT_NAME_AS_SELECTED_FULL);
      break;
  }
}

// FIXME no unit test
export function handleOptIn() {
  if (isPoiActive()) {
    handlePoiOptIn();
  } else {
    handleSoiOptIn();
  }
}

// FIXME no unit test (or should not be exported)
export function handleSoiOptIn() {
  let privacySetting = getRangeSliderValue();
  logInfo('Handling POI with settings: ', privacySetting);
  trackPrivacySetting(privacySetting);
  if (privacySetting !== PRIVACY_MINIMUM_TRACKING || isPersistMinimumTracking()) {
    oilOptIn(convertPrivacySettingsToCookieValue(privacySetting)).then((cookieOptIn) => {
      renderOil({optIn: cookieOptIn});
      if (this && this.getAttribute('data-context') === DATA_CONTEXT_YES) {
        sendEventToHostSite(EVENT_NAME_SOI_OPT_IN);
      }
    });
  } else {
    removeSubscriberCookies();
  }
}

// FIXME no unit test (or should not be exported)
export function handlePoiOptIn() {
  let privacySetting = getRangeSliderValue();
  logInfo('Handling POI with settings: ', privacySetting);
  trackPrivacySetting(privacySetting);
  if (privacySetting !== PRIVACY_MINIMUM_TRACKING || isPersistMinimumTracking()) {
    oilPowerOptIn(convertPrivacySettingsToCookieValue(privacySetting), !isSubscriberSetCookieActive()).then(() => {
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

/**
 * adds a listener to all dom nodes in this list
 * @param listOfDoms
 * @param listener
 */
function addEventListenersToDOMList(listOfDoms, listener) {
  if (listOfDoms) {
    forEach(listOfDoms, function (domNode) {
      domNode && domNode.addEventListener('click', listener, false);
    });
  }
}

/**
 * removes a listener from all dom nodes in this list
 * @param listOfDoms
 * @param listener
 */
function removeEventListenersToDOMList(listOfDoms, listener) {
  if (listOfDoms) {
    forEach(listOfDoms, function (domNode) {
      domNode && domNode.removeEventListener('click', listener, false);
    });
  }
}

/**
 * Add and Remove Handlers to Oil Action Elements
 */
function addOilHandlers(nodes) {
  addEventListenersToDOMList(nodes.btnOptIn, handleOptIn);
  addEventListenersToDOMList(nodes.btnAdvancedSettings, handleAdvancedSettings);
  addEventListenersToDOMList(nodes.btnBack, handleBackToMainDialog);
  addEventListenersToDOMList(nodes.companyList, handleCompanyList);
  addEventListenersToDOMList(nodes.thirdPartyList, handleThirdPartyList);
}

function removeOilWrapperAndHandlers(nodes) {
  removeEventListenersToDOMList(nodes.btnOptIn, handleOptIn);
  removeEventListenersToDOMList(nodes.btnAdvancedSettings, handleAdvancedSettings);
  removeEventListenersToDOMList(nodes.btnBack, handleBackToMainDialog);
  removeEventListenersToDOMList(nodes.companyList, handleCompanyList);
  removeEventListenersToDOMList(nodes.thirdPartyList, handleThirdPartyList);

  if (nodes.oilWrapper) {
    forEach(nodes.oilWrapper, function (domNode) {
      domNode.parentElement.removeChild(domNode);
    });
  }
}
