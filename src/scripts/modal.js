import "../styles/modal.scss";
import { getConfiguration } from './config.js';
import { OIL_CONFIG } from './constants.js';
import { oilOptIn, oilPowerOptIn,  oilOptLater } from "./optin.js";
import { oilDefaultTemplate } from './view/oil.default.js';
import { oilOptLaterTemplate } from './view/oil.opt.later.js';
import { oilNoCookiesTemplate } from './view/oil.no.cookies.js';
import { CSSPrefix } from './view/oil.view.config.js';


// Initialize our Oil wrapper and save it ...

export const oilWrapper = defineOilWrapper();


/**
 * Oil Main Render Function:
 *
 */

export function renderOil(wrapper, props) {
  writeOilContentToWrapper(wrapper, props);
  injectOilWrapperInDOM(wrapper, props);
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
 *
 */

function writeOilContentToWrapper(wrapper, props) {
  if (props.noCookie) {
    wrapper.innerHTML = oilNoCookiesTemplate;
  }
  else if (props.optLater) {
    wrapper.innerHTML = oilOptLaterTemplate;
  }
  else {
    wrapper.innerHTML = oilDefaultTemplate;
  }
}

function injectOilWrapperInDOM(wrapper, props) {
  let domNodes = getOilDOMNodes();

  // For every render cycle our OIL main DOM node gets removed,
  // if it already exists in DOM

  if (domNodes.oilWrapper) {
    removeOilWrapperAndHandlers(domNodes);
  }

  // Insert OIL into DOM only if not opted in

  if (!props.optIn) {
    document.body.insertBefore(wrapper, document.body.firstElementChild);
    addOilHandlers(getOilDOMNodes());
  }
}


/**
 * Small Utility Function to retrieve our Oil Wrapper and Action Elements,
 * like Buttons ...
 * @return data object which contains various OIL DOM nodes
 */

function getOilDOMNodes() {
  return {
    oilWrapper:  document.querySelector(`.${CSSPrefix}oil`),
    btnSoiOptIn: document.querySelector(`.${CSSPrefix}oil .js-optin`),
    btnPoiOptIn: document.querySelector(`.${CSSPrefix}oil .js-optin-poi`),
    btnOptLater: document.querySelector(`.${CSSPrefix}oil .js-optlater`)
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
  });
}

function handleSoiOptIn() {
  oilOptIn().then((cookieOptIn) => {
    renderOil(oilWrapper, {optIn: cookieOptIn});
  });
}

function handlePoiOptIn() {
  oilOptIn().then(() => {
    oilPowerOptIn(!config[OIL_CONFIG.ATTR_SUB_SET_COOKIE]).then(() => {
      renderOil(oilWrapper, {optIn: true});
    });
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
}

function removeOilWrapperAndHandlers(nodes) {
  nodes.btnSoiOptIn && nodes.btnSoiOptIn.removeEventListener('click', handleSoiOptIn, false);
  nodes.btnOptLater && nodes.btnOptLater.removeEventListener('click', handleOptLater, false);
  nodes.btnPoiOptIn && nodes.btnPoiOptIn.removeEventListener('click', handlePoiOptIn, false);

  if (nodes.oilWrapper) {
    nodes.oilWrapper.parentElement.removeChild(nodes.oilWrapper);
  }
}






