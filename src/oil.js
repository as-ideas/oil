import "./oil.scss";
import Cookie from 'js-cookie';
import { isDOMElement, addClickHandler } from './scripts/utils.js';
import { findConfiguration } from "./scripts/config";

// Our cookie settings
const oilCookie = {
  name: 'oil_data',
  expires: 31  
}

/**
 * Returns html content for our OIL overlay
 */
function defineOilContent() {
  return (
    `
      <h1 class="oil__heading">
        Axel Springer Optin Layer
      </h1>
      <p class="oil__intro-text">
        Hi, this is a little intro text.
      </p>
      <button class="oil__button oil__button--primary js-optin">
        Yes, I want!
      </button>
      <button class="oil__button oil__button--secondary js-optlater">
        Not now
      </button>
    `
  );
}


/**
 * Injects OIL into DOM at entry point
 */
function injectOil(entryPoint) {
  const optInCookie = Cookie.getJSON(oilCookie.name);

  if (typeof(optInCookie) === 'undefined' && isDOMElement(entryPoint)) {
    // Create overlay container
    const oil = document.createElement('div');
    oil.setAttribute('class', 'oil');
    oil.setAttribute('data-qa', 'oilLayer' );
    // Add overlay content
    oil.innerHTML = defineOilContent();
    // Add to DOM
    entryPoint.appendChild(oil);
  }
}


/**
 * Oil optIn
 */
function oilOptIn() {
  
  // Set cookie only if it does not yet exists
  if (typeof(Cookie.get(oilCookie.name)) === 'undefined') {
    Cookie.set(oilCookie.name, {
      optin: true
    }, {
      expires: oilCookie.expires
    });
    console.log("User opted in, cookie set")
  }
  else {
    console.log("User opted in, cookie not set")
  }
}


/**
 * Add click handler
 */
function addOilClickHandler() {
  const btnOptIn = document.getElementsByClassName('js-optin')[0];
  const btnOptLater = document.getElementsByClassName('js-optlater')[0];
  addClickHandler(btnOptIn, () => {
    oilOptIn();
  });
  addClickHandler(btnOptLater, () => console.log("OptLater"));
}


/**
 * Init OIL
 */
(function(){
  injectOil(document.body);
  addOilClickHandler();
  findConfiguration();
}());
