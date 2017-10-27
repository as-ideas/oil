import '../styles/modal.scss';
import noUiSlider from 'nouislider';
import { getConfiguration, gaTrackEvent } from './config.js';
import { OIL_CONFIG, DATA_CONTEXT_YES, DATA_CONTEXT_YES_POI, PRIVACY_SETTINGS_FULL_TRACKING, PRIVACY_SETTINGS_FUNCTIONAL_TRACKING, PRIVACY_SETTINGS_MINIMUM_TRACKING } from './constants.js';
import { oilOptIn, oilPowerOptIn, oilOptLater, oilOptIgnore } from './optin.js';
import { oilDefaultTemplate } from './view/oil.default.js';
import { oilOptLaterTemplate } from './view/oil.opt.later.js';
import { oilNoCookiesTemplate } from './view/oil.no.cookies.js';
import { oilAdvancedSettingsTemplate } from './view/oil.advanced.settings.js';
import { advancedSettingsSnippet } from './view/components/oil.advanced.settings.content';
import { CSSPrefix } from './view/oil.view.config.js';
import { logInfo } from './log.js';

// Initialize our Oil wrapper and save it ...

export const oilWrapper = defineOilWrapper();

let privacySettings = PRIVACY_SETTINGS_FULL_TRACKING;

/**
 * Helper that determines if Oil layer is shown or not...
 * Oil layer is not rendered eg. if user opted in or opted close
 * @param {*} props
 */
function shouldRenderOilLayer(props) {
  return props.optIn === true ? false : props.optIgnore !== true;
}

/**
 * Oil Main Render Function:
 */
export function renderOil(wrapper, props) {
  privacySettings = PRIVACY_SETTINGS_FULL_TRACKING;
  if (shouldRenderOilLayer(props)) {
    if (props.noCookie) {
      renderOilContentToWrapper(wrapper, oilNoCookiesTemplate);
    } else if (props.optLater) {
      renderOilContentToWrapper(wrapper, oilOptLaterTemplate);
    } else if (props.advancedSettings) {
      renderOilContentToWrapper(wrapper, oilAdvancedSettingsTemplate);
    } else {
      renderOilContentToWrapper(wrapper, oilDefaultTemplate);
    }
  } else {
    renderOilContentToWrapper(wrapper, '');
  }
}

export function oilShowPreferenceCenter(wrapper) {
  let entryNode = document.querySelector('#oil-preference-center');
  if (entryNode) {
    entryNode.innerHTML = advancedSettingsSnippet();
  } else {
    renderOil(wrapper, { advancedSettings : true})
  }

  let rangeSlider = document.getElementById(CSSPrefix+'slider-range');

  noUiSlider.create(rangeSlider, {
    start: 0,
    step: 1,
    orientation: 'vertical',
    range: {
      'min': 0,
      'max': 2
    }
  });

  let essential = document.getElementById(CSSPrefix+'slider-essential-title');
  let functional = document.getElementById(CSSPrefix+'slider-functional-title');
  let advertising =  document.getElementById(CSSPrefix+'slider-advertising-title');

  rangeSlider.noUiSlider.on('update', function(params){
    let currentSelection = params[0];
    switch (currentSelection) {
      case '0.00':
      default:
        logInfo('Essential Cookies selected');
        essential.setAttribute('class', CSSPrefix+'slider-active');
        functional.setAttribute('class', CSSPrefix+'slider-inactive');
        advertising.setAttribute('class', CSSPrefix+'slider-inactive');
        privacySettings = PRIVACY_SETTINGS_MINIMUM_TRACKING;
        break;
      case '1.00':
        logInfo('Functional Cookies selected');
        essential.setAttribute('class', CSSPrefix+'slider-inactive');
        functional.setAttribute('class', CSSPrefix+'slider-active');
        advertising.setAttribute('class', CSSPrefix+'slider-inactive');
        privacySettings = PRIVACY_SETTINGS_FUNCTIONAL_TRACKING;
        break;
      case '2.00':
        logInfo('Full Cookies selected');
        essential.setAttribute('class', CSSPrefix+'slider-inactive');
        functional.setAttribute('class', CSSPrefix+'slider-inactive');
        advertising.setAttribute('class', CSSPrefix+'slider-active');
        privacySettings = PRIVACY_SETTINGS_FULL_TRACKING;
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

function injectOilWrapperInDOM(wrapper) {
  let domNodes = getOilDOMNodes();

  // For every render cycle our OIL main DOM node gets removed, in case it already exists in DOM
  if (domNodes.oilWrapper) {
    removeOilWrapperAndHandlers(domNodes);
  }

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
    oilWrapper: document.querySelector(`.${CSSPrefix}oil`),
    btnSoiOptIn: document.querySelector(`.${CSSPrefix}oil .js-optin`),
    btnPoiOptIn: document.querySelector(`.${CSSPrefix}oil .js-optin-poi`),
    btnOptLater: document.querySelector(`.${CSSPrefix}oil .js-optlater`),
    btnAdvancedSettings: document.querySelector(`.${CSSPrefix}oil .js-advanced-settings`),
    btnClose: document.querySelector(`.${CSSPrefix}oil .js-optignore`)
  }
}


/**
 * Handler Functions for our Oil Action Elements
 *
 */

let config = getConfiguration();

function handleOptLater() {
  oilOptLater().then((cookieOptLater) => {
    renderOil(oilWrapper, {optLater: cookieOptLater});
    if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
        gaTrackEvent('later', 0);
    }
  });
}

function handleAdvancedSettings() {
    oilShowPreferenceCenter(oilWrapper);
    if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
      gaTrackEvent('advanced-settings', 0);
    }
}

function handleSoiOptIn() {
  logInfo('Handling POI with settings: ', privacySettings);
  oilOptIn(privacySettings).then((cookieOptIn) => {
    renderOil(oilWrapper, {optIn: cookieOptIn});
    if (this.getAttribute('data-context') === DATA_CONTEXT_YES) {
      gaTrackEvent('SOI/yes', 0);
    } else {
      gaTrackEvent('SOI/yes-while-later', 0);
    }
  });
}

function handlePoiOptIn() {
  logInfo('Handling POI with settings: ', privacySettings);
  oilPowerOptIn(privacySettings, !config[OIL_CONFIG.ATTR_SUB_SET_COOKIE]).then(() => {
    renderOil(oilWrapper, {optIn: true});
    if (this.getAttribute('data-context') === DATA_CONTEXT_YES_POI) {
      gaTrackEvent('POI/yes', 0);
    } else {
      gaTrackEvent('POI/yes-while-later', 0);
    }
  });
}

function handleOilIgnore() {
  oilOptIgnore().then((cookieOptIgnore) => {
    renderOil(oilWrapper, {optIgnore: cookieOptIgnore});
    if (config[OIL_CONFIG.ATTR_GA_TRACKING] === 2) {
      gaTrackEvent('ignored', 0);
    }
  });
}

/**
 * Add and Remove Handlers to Oil Action Elements
 *
 */

function addOilHandlers(nodes) {
  nodes.btnSoiOptIn && nodes.btnSoiOptIn.addEventListener('click', handleSoiOptIn, false);
  nodes.btnPoiOptIn && nodes.btnPoiOptIn.addEventListener('click', handlePoiOptIn, false);
  nodes.btnOptLater && nodes.btnOptLater.addEventListener('click', handleOptLater, false);
  nodes.btnAdvancedSettings && nodes.btnAdvancedSettings.addEventListener('click', handleAdvancedSettings, false);
  nodes.btnClose && nodes.btnClose.addEventListener('click', handleOilIgnore, false);
}

function removeOilWrapperAndHandlers(nodes) {
  nodes.btnSoiOptIn && nodes.btnSoiOptIn.removeEventListener('click', handleSoiOptIn, false);
  nodes.btnOptLater && nodes.btnOptLater.removeEventListener('click', handleOptLater, false);
  nodes.btnPoiOptIn && nodes.btnPoiOptIn.removeEventListener('click', handlePoiOptIn, false);
  nodes.btnAdvancedSettings && nodes.btnAdvancedSettings.removeEventListener('click', handleAdvancedSettings, false);
  nodes.btnClose && nodes.btnClose.removeEventListener('click', handleOilIgnore, false);

  if (nodes.oilWrapper) {
    nodes.oilWrapper.parentElement.removeChild(nodes.oilWrapper);
  }
}
