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
  DATA_CONTEXT_YES_POI,
  EVENT_NAME_BACK_TO_MAIN,
  EVENT_NAME_ADVANCED_SETTINGS,
  EVENT_NAME_SOI_OPT_IN,
  EVENT_NAME_POI_OPT_IN,
  EVENT_NAME_SOI_OPT_IN_WHILE_LATER,
  EVENT_NAME_POI_OPT_IN_WHILE_LATER,
  EVENT_NAME_AS_SELECTED_MINIMUM,
  EVENT_NAME_AS_SELECTED_FUNCTIONAL,
  EVENT_NAME_AS_SELECTED_FULL
} from '../core/core_constants.js';
import { oilOptIn, oilPowerOptIn, oilOptLater, oilOptIgnore } from './userview_optin.js';
import { deActivatePowerOptIn } from '../core/core_poi.js';
import { oilDefaultTemplate } from './view/oil.default.js';
import { oilOptLaterTemplate } from './view/oil.opt.later.js';
import { oilNoCookiesTemplate } from './view/oil.no.cookies.js';
import { oilAdvancedSettingsTemplate } from './view/oil.advanced.settings.js';
import { advancedSettingsSnippet } from './view/components/oil.advanced.settings.content';
import { CSSPrefix } from './view/oil.view.config.js';
import { logInfo, logError } from '../core/core_log.js';
import { isPersistMinimumTracking } from './userview_config.js';
import { isSubscriberSetCookieActive } from '../core/core_config.js';


// Initialize our Oil wrapper and save it ...

export const oilWrapper = defineOilWrapper();

/**
 * Helper that determines if Oil layer is shown or not...
 * Oil layer is not rendered eg. if user opted in or opted close
 * @param {*} props
 */
function shouldRenderOilLayer(props) {
  return props.optIn === true ? false : props.optIgnore !== true;
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
export function renderOil(wrapper, props) {
  if (wrapper && shouldRenderOilLayer(props)) {
    if (props.noCookie) {
      renderOilContentToWrapper(wrapper, oilNoCookiesTemplate());
    } else if (props.optLater) {
      renderOilContentToWrapper(wrapper, oilOptLaterTemplate());
    } else if (props.advancedSettings) {
      renderOilContentToWrapper(wrapper, oilAdvancedSettingsTemplate());
    } else {
      renderOilContentToWrapper(wrapper, oilDefaultTemplate());
    }
  } else {
    removeOilWrapperFromDOM();
  }
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


export function oilShowPreferenceCenter(wrapper = false, preset = PRIVACY_MINIMUM_TRACKING) {
  let entryNode = document.querySelector('#oil-preference-center');
  if (wrapper) {
    renderOil(wrapper, {advancedSettings: true});
  } else if (entryNode) {
    entryNode.innerHTML = advancedSettingsSnippet();
  } else {
    logError('No wrapper for the CPC with the id #oil-preference-center was found.');
    return;
  }

  let rangeSlider = document.getElementById(CSSPrefix + 'slider-range');

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

  let essential = document.getElementById(CSSPrefix + 'slider-essential-title');
  let functional = document.getElementById(CSSPrefix + 'slider-functional-title');
  let advertising = document.getElementById(CSSPrefix + 'slider-advertising-title');

  rangeSlider.noUiSlider.on('update', function (params) {
    let currentSelection = params[0];
    let result = interpretSliderValue(currentSelection);

    switch (result) {
      case PRIVACY_MINIMUM_TRACKING:
      default:
        essential.setAttribute('class', CSSPrefix + 'slider-active');
        functional.setAttribute('class', CSSPrefix + 'slider-inactive');
        advertising.setAttribute('class', CSSPrefix + 'slider-inactive');
        break;
      case PRIVACY_FUNCTIONAL_TRACKING:
        essential.setAttribute('class', CSSPrefix + 'slider-inactive');
        functional.setAttribute('class', CSSPrefix + 'slider-active');
        advertising.setAttribute('class', CSSPrefix + 'slider-inactive');
        break;
      case PRIVACY_FULL_TRACKING:
        essential.setAttribute('class', CSSPrefix + 'slider-inactive');
        functional.setAttribute('class', CSSPrefix + 'slider-inactive');
        advertising.setAttribute('class', CSSPrefix + 'slider-active');
        break;
    }
  });
}

/**
 * Define Oil Wrapper DOM Node
 * @return object DOM element
 */

function defineOilWrapper() {
  let oilWrapper = document.createElement('div');
  // Set some attributes as CSS classes and attributes for testing
  oilWrapper.setAttribute('class', `${CSSPrefix}oil`);
  oilWrapper.setAttribute('data-qa', 'oil-Layer');
  return oilWrapper;
}

/**
 * Define Content of our Oil Wrapper
 * Sets HTML based on props ...
 */
function renderOilContentToWrapper(wrapper, content) {
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
    oilWrapper: document.querySelectorAll(`.${CSSPrefix}oil`),
    btnSoiOptIn: document.querySelectorAll(`.${CSSPrefix}oil .${CSSPrefix}js-optin`),
    btnPoiOptIn: document.querySelectorAll(`.${CSSPrefix}oil .${CSSPrefix}js-optin-poi`),
    btnOptLater: document.querySelectorAll(`.${CSSPrefix}oil .${CSSPrefix}js-optlater`),
    btnAdvancedSettings: document.querySelectorAll(`.${CSSPrefix}oil .${CSSPrefix}js-advanced-settings`),
    btnClose: document.querySelectorAll(`.${CSSPrefix}oil .${CSSPrefix}js-optignore`),
    btnBack: document.querySelectorAll(`.${CSSPrefix}oil .${CSSPrefix}js-oilback`)
  }
}

function getRangeSliderValue() {
  let rangeSlider = document.getElementById(CSSPrefix + 'slider-range');
  if (rangeSlider) {
    return interpretSliderValue(rangeSlider.noUiSlider.get());
  }
  return PRIVACY_FULL_TRACKING;
}

/**
 * Handler Functions for our Oil Action Elements
 *
 */
function handleOptLater() {
  logInfo('Handling OptLater');
  oilOptLater().then((cookieOptLater) => {
    renderOil(oilWrapper, {optLater: cookieOptLater});
  });
}

function handleBackToMainDialog() {
  logInfo('Handling Back Button');
  renderOil(oilWrapper, {});
  sendEventToHostSite(EVENT_NAME_BACK_TO_MAIN);
}

function handleAdvancedSettings() {
  oilShowPreferenceCenter(oilWrapper, PRIVACY_MINIMUM_TRACKING);
  sendEventToHostSite(EVENT_NAME_ADVANCED_SETTINGS);
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

export function handleSoiOptIn() {
  let privacySetting = getRangeSliderValue();
  logInfo('Handling POI with settings: ', privacySetting);
  trackPrivacySetting(privacySetting);
  if (privacySetting !== PRIVACY_MINIMUM_TRACKING || isPersistMinimumTracking()) {
    oilOptIn(convertPrivacySettingsToCookieValue(privacySetting)).then((cookieOptIn) => {
      renderOil(oilWrapper, {optIn: cookieOptIn});
      if (this && this.getAttribute('data-context') === DATA_CONTEXT_YES) {
        sendEventToHostSite(EVENT_NAME_SOI_OPT_IN);
      } else if (this) {
        sendEventToHostSite(EVENT_NAME_SOI_OPT_IN_WHILE_LATER);
      }
    });
  } else {
    removeSubscriberCookies();
    handleOptLater();
  }
}

export function handlePoiOptIn() {
  let privacySetting = getRangeSliderValue();
  logInfo('Handling POI with settings: ', privacySetting);
  trackPrivacySetting(privacySetting);
  if (privacySetting !== PRIVACY_MINIMUM_TRACKING || isPersistMinimumTracking()) {
    oilPowerOptIn(convertPrivacySettingsToCookieValue(privacySetting), !isSubscriberSetCookieActive()).then(() => {
      renderOil(oilWrapper, {optIn: true});
      if (this && this.getAttribute('data-context') === DATA_CONTEXT_YES_POI) {
        sendEventToHostSite(EVENT_NAME_POI_OPT_IN);
      } else if (this) {
        sendEventToHostSite(EVENT_NAME_POI_OPT_IN_WHILE_LATER);
      }
    });
  } else {
    removeSubscriberCookies();
    deActivatePowerOptIn();
    handleOptLater();
  }
}

export function handleOilIgnore() {
  oilOptIgnore().then((cookieOptIgnore) => {
    renderOil(oilWrapper, {optIgnore: cookieOptIgnore});
  });
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
  addEventListenersToDOMList(nodes.btnSoiOptIn, handleSoiOptIn);
  addEventListenersToDOMList(nodes.btnPoiOptIn, handlePoiOptIn);
  addEventListenersToDOMList(nodes.btnOptLater, handleOptLater);
  addEventListenersToDOMList(nodes.btnAdvancedSettings, handleAdvancedSettings);
  addEventListenersToDOMList(nodes.btnClose, handleOilIgnore);
  addEventListenersToDOMList(nodes.btnBack, handleBackToMainDialog);
}

function removeOilWrapperAndHandlers(nodes) {
  removeEventListenersToDOMList(nodes.btnSoiOptIn, handleSoiOptIn);
  removeEventListenersToDOMList(nodes.btnPoiOptIn, handlePoiOptIn);
  removeEventListenersToDOMList(nodes.btnOptLater, handleOptLater);
  removeEventListenersToDOMList(nodes.btnAdvancedSettings, handleAdvancedSettings);
  removeEventListenersToDOMList(nodes.btnClose, handleOilIgnore);
  removeEventListenersToDOMList(nodes.btnBack, handleBackToMainDialog);

  if (nodes.oilWrapper) {
    forEach(nodes.oilWrapper, function (domNode) {
      domNode.parentElement.removeChild(domNode);
    });
  }
}
