import "./oil.scss";
import Cookie from 'js-cookie';
import { isDOMElement, addClickHandler, isCookie, isCookieValid } from './scripts/utils.js';
import { findConfiguration } from "./scripts/config";

// Our cookie default settings
const oilCookie = {
  name: 'oil_data',
  expires: 31,
  config: {
    optin: false,
    expanded: true
  }
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
  // Cookie should be present...
  const cookieData = Cookie.getJSON(oilCookie.name);

  if (typeof(cookieData) !== 'undefined' && isDOMElement(entryPoint)) {
    // Create overlay container
    const oil = document.createElement('div');
    
    // Add classes for styling Oil overlay 
    // Classes are added sequentially, see here for problems in some browsers with alternative syntax oil.classList.add('foo', 'bar', 'baz')
    // http://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas 
    oil.classList.add(`oil`)
    oil.classList.add(`optin-${cookieData.optin}`)
    oil.classList.add(`expanded-${cookieData.expanded}`)

    // Add data attribute for testing purposes
    oil.setAttribute('data-qa', 'oilLayer' );
    
    // Add overlay content
    oil.innerHTML = defineOilContent();
    
    // Add to DOM
    entryPoint.appendChild(oil);
  }
}


/**
 * Update Oil overlay class names
 */
function updateOilOverlay(dataObj) {
  const oilOverlay = document.getElementsByClassName('oil')[0]
  
  // Reset classlist to Oil base class
  oilOverlay.setAttribute('class', 'oil')

  // Add classes from data object
  oilOverlay.classList.add(`optin-${dataObj.optin}`)
  oilOverlay.classList.add(`expanded-${dataObj.expanded}`)
}


/**
 * Oil optIn
 */
function oilOptIn() {
  // Cookie should be there...
  const cookieData = Cookie.getJSON(oilCookie.name)
  const newCookieData = Object.assign({}, cookieData, {optin: true});
  
  // Update Oil cookie
  Cookie.set(oilCookie.name, newCookieData, {
    expires: oilCookie.expires
  });

  // Update classes on Oil overlay DOM element
  updateOilOverlay(newCookieData)
  
  console.log("User opted in, cookie set")
}


/**
 * Oil optLater
 */
function oilOptLater() {
  // Cookie should be there...
  const cookieData = Cookie.getJSON(oilCookie.name)
  const newCookieData = Object.assign({}, cookieData, {expanded: false});

  // Update Oil cookie
  Cookie.set(oilCookie.name, newCookieData, {
    expires: oilCookie.expires
  });

  // Update classes on Oil overlay DOM element
  updateOilOverlay(newCookieData)

  console.log("User opted later, cookie set")
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
  addClickHandler(btnOptLater, () => {
    oilOptLater()
  });
}


/**
 * Init OIL
 */
(function(){
  // Set Oil cookie if no cookie exists
  if (!isCookie(oilCookie.name)) {
    Cookie.set(oilCookie.name, oilCookie.config)
  }

  // In case Oil cookie exists but is not valid, create new Oil cookie with default config 
  if (!isCookieValid(oilCookie.name, Object.keys(oilCookie.config))) {
    Cookie.set(oilCookie.name, oilCookie.config)
  }

  // Inject Oil overlay depending on cookie data
  injectOil(document.body);
  addOilClickHandler();
  findConfiguration();
}());
