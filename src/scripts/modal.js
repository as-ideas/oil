import '../styles/modal.scss';
import noUiSlider from 'nouislider';
import { getConfiguration, gaTrackEvent } from './config.js';
import { convertPrivacySettingsToCookieValue, removeSubscriberCookies, getSoiPrivacy } from './cookies.js';
import {
  PRIVACY_MINIMUM_TRACKING,
  PRIVACY_FUNCTIONAL_TRACKING,
  PRIVACY_FULL_TRACKING,
  OIL_CONFIG,
  DATA_CONTEXT_YES,
  DATA_CONTEXT_YES_POI
} from './constants.js';
import { oilOptIn, oilPowerOptIn, oilOptLater, oilOptIgnore } from './optin.js';
import { deActivatePowerOptIn } from './poi.js';
import { oilDefaultTemplate } from './view/oil.default.js';
import { oilOptLaterTemplate } from './view/oil.opt.later.js';
import { oilNoCookiesTemplate } from './view/oil.no.cookies.js';
import { oilAdvancedSettingsTemplate } from './view/oil.advanced.settings.js';
import { advancedSettingsSnippet } from './view/components/oil.advanced.settings.content';
import { CSSPrefix } from './view/oil.view.config.js';
import { logInfo, logError } from './log.js';

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
  let config = getConfiguration();
  logInfo('Handling OptLater');
  oilOptLater().then((cookieOptLater) => {
    renderOil(oilWrapper, {optLater: cookieOptLater});
    if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
      gaTrackEvent('later', 0);
    }
  });
}

function handleBackToMainDialog() {
  let config = getConfiguration();
  logInfo('Handling Back Button');
  renderOil(oilWrapper, {});
  if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
    gaTrackEvent('back-to-main-dialog', 0);
  }
}

function handleAdvancedSettings() {
  let config = getConfiguration();
  oilShowPreferenceCenter(oilWrapper, PRIVACY_MINIMUM_TRACKING);
  if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
    gaTrackEvent('advanced-settings', 0);
  }
}

export function handleSoiOptIn() {
  let config = getConfiguration();
  let privacySetting = getRangeSliderValue();
  logInfo('Handling POI with settings: ', privacySetting);
  if (privacySetting !== PRIVACY_MINIMUM_TRACKING || config[OIL_CONFIG.ATTR_PERSIST_MINIMUM_TRACKING]) {
    oilOptIn(convertPrivacySettingsToCookieValue(privacySetting)).then((cookieOptIn) => {
      renderOil(oilWrapper, {optIn: cookieOptIn});
      if (this && this.getAttribute('data-context') === DATA_CONTEXT_YES) {
        gaTrackEvent('SOI/yes', 0);
      } else if (this) {
        gaTrackEvent('SOI/yes-while-later', 0);
      }
    });
  } else {
    removeSubscriberCookies();
    handleOptLater();
  }
}

export function handlePoiOptIn() {
  let config = getConfiguration();
  let privacySetting = getRangeSliderValue();
  logInfo('Handling POI with settings: ', privacySetting);
  if (privacySetting !== PRIVACY_MINIMUM_TRACKING || config[OIL_CONFIG.ATTR_PERSIST_MINIMUM_TRACKING]) {
    oilPowerOptIn(convertPrivacySettingsToCookieValue(privacySetting), !config[OIL_CONFIG.ATTR_SUB_SET_COOKIE]).then(() => {
      renderOil(oilWrapper, {optIn: true});
      if (this && this.getAttribute('data-context') === DATA_CONTEXT_YES_POI) {
        gaTrackEvent('POI/yes', 0);
      } else if (this) {
        gaTrackEvent('POI/yes-while-later', 0);
      }
    });
  } else {
    removeSubscriberCookies();
    deActivatePowerOptIn();
    handleOptLater();
  }
}

export function handleOilIgnore() {
  let config = getConfiguration();
  oilOptIgnore().then((cookieOptIgnore) => {
    renderOil(oilWrapper, {optIgnore: cookieOptIgnore});
    if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
      gaTrackEvent('ignored', 0);
    }
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
