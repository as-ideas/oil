import "../styles/modal.scss";
import { getConfiguration } from './config.js';
import { OIL_CONFIG } from './constants.js';
import { isDOMElement, addClickHandler } from './utils.js';
import { getOilCookie, oilOptIn, oilPowerOptIn,  oilOptLater } from "./optin.js";
import oilDefaultTemplate from './view/oil.default.js';
import oilOptLaterTemplate from './view/oil.opt.later.js';
import oilNoCookiesTemplate from './view/oil.no.cookies.js';

/**
 * Oil main render function
 * 
 */

export function renderOil(props) {
  // TODO Handle Props

  // Remove Oil from DOM if present
  let oilDOMNode = document.getElementsByClassName('oil')[0];
 
  if (typeof(oilDOMNode) !== 'undefined') {
    oilDOMNode.parentElement.removeChild(oilDOMNode);
  }

  // Inject Oil in document
  let body = document.body;
  let oilWrapper = document.createElement('div');
  
  // Add CSS classes
  oilWrapper.setAttribute('class', 'oil');
  
  // Add data attribute for testing purposes
  oilWrapper.setAttribute('data-qa', 'oil-Layer');
  
  // Define HTML content based on props
  if (props.noCookie) {
    oilWrapper.innerHTML = oilNoCookiesTemplate();
  }
  else if (props.optIn) {
    oilWrapper.innerHTML = "";
  }
  else if (props.optLater) {
    oilWrapper.innerHTML = oilOptLaterTemplate();
  }
  else {
    oilWrapper.innerHTML = oilDefaultTemplate();
  }

  // Inject in DOM
  body.insertBefore(oilWrapper, body.firstElementChild);

  // Add handlers
  addHandlers();
}


/**
 * Add handlers to action elements
 * 
 */

function addHandlers() {
  let config = getConfiguration();

  // Define Handlers
  function handleOptLater() {
    oilOptLater().then((cookieData) => {
      renderOil({optLater: cookieData.optLater, noCookie: false});
    });
  }

  function handleOptIn() {
    oilOptIn().then((cookieData) => {
      renderOil({optIn: cookieData.optin});
    });
  }

  function handlePoiOptIn() {
    oilOptIn().then((cookieData) => {
      oilPowerOptIn(!config[OIL_CONFIG.ATTR_SUB_SET_COOKIE]).then((cookieData) => {
        renderOil({optIn: true});
      });
    });
  }

  // Get elements that handlers will get attached to
  let btnOptIn =    document.querySelector('.oil .js-optin');
  let btnPoiOptIn = document.querySelector('.oil .js-optin-poi');
  let btnOptLater = document.querySelector('.oil .js-optlater');

  // Remove all handlers
  if (btnOptIn)    btnOptIn.removeEventListener('click', handleOptIn, false);
  if (btnPoiOptIn) btnPoiOptIn.removeEventListener('click', handlePoiOptIn, false);
  if (btnOptLater) btnOptLater.removeEventListener('click', handleOptLater, false);

  // Add handlers
  if (btnOptIn)    btnOptIn.addEventListener('click', handleOptIn, false);
  if (btnPoiOptIn) btnPoiOptIn.addEventListener('click', handlePoiOptIn, false);
  if (btnOptLater) btnOptLater.addEventListener('click', handleOptLater, false);
}

