import "../styles/modal.scss";
import { getConfiguration } from './config.js';
import { OIL_CONFIG } from './constants.js';
import { oilOptIn, oilPowerOptIn,  oilOptLater } from "./optin.js";
import { oilDefaultTemplate } from './view/oil.default.js';
import { oilOptLaterTemplate } from './view/oil.opt.later.js';
import { oilNoCookiesTemplate } from './view/oil.no.cookies.js';


// Initialize our Oil wrapper and save it ...

const oilWrapper = defineOilWrapper();

/**
 * Oil Main Render Function
 * 
 */

export function renderOil(props) {
  writeOilContentToWrapper(oilWrapper, props);
  injectOilWrapperInDOM(props);
}



/**
 * Define and Initialize our Oil Wrapper 
 * @return DOM element
 */

function defineOilWrapper() {
  // This is our Oil wrapper element
  let oilWrapper = document.createElement('div');
  
  // Set some attributes as CSS classes and attributes for testing
  oilWrapper.setAttribute('class', 'oil');
  oilWrapper.setAttribute('data-qa', 'oil-Layer');

  return oilWrapper;
}


function injectOilWrapperInDOM(props) {
  let domNodes = getOilDOMNodes();
  
  // Remove Oil if already in DOM
  if (domNodes.oilWrapper) {
    removeOilWrapperAndHandlers(domNodes);
  }

  // Insert into DOM only if not opted in
  if (!props.optIn) {
    document.body.insertBefore(oilWrapper, document.body.firstElementChild);
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
    oilWrapper:  document.querySelector('.oil'),
    btnSoiOptIn: document.querySelector('.oil .js-optin'),
    btnPoiOptIn: document.querySelector('.oil .js-optin-poi'),
    btnOptLater: document.querySelector('.oil .js-optlater')
  }
}



/**
 * Define Content of our Oil Wrapper
 * Sets HTML based on props ...
 * 
 */

function writeOilContentToWrapper(oilWrapper, props) {
  if (props.noCookie) {
    oilWrapper.innerHTML = oilNoCookiesTemplate;
  }
  else if (props.optLater) {
    oilWrapper.innerHTML = oilOptLaterTemplate;
  }
  else {
    oilWrapper.innerHTML = oilDefaultTemplate;
  }
}



/**
 * Handler Functions for our Oil Action Elements
 * 
 */

let config = getConfiguration();

function handleOptLater() {
  oilOptLater().then((cookieData) => {
    renderOil({optLater: cookieData.optLater});
  });
}

function handleSoiOptIn() {
  oilOptIn().then((cookieData) => {
    renderOil({optIn: cookieData.optin});
  });
}

function handlePoiOptIn() {
  oilOptIn().then(() => {
    oilPowerOptIn(!config[OIL_CONFIG.ATTR_SUB_SET_COOKIE]).then(() => {
      renderOil({optIn: true});
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






