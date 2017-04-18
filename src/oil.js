import "./oil.scss";
import { isDOMElement, addClickHandler } from './scripts/utils.js';
import { findConfiguration } from "./scripts/config";
import { getOilCookie, validateOilCookie, oilOptIn, oilOptLater } from "./scripts/optin";



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
      <button class="oil__button oil__button--primary js-optin" data-qa="oil-YesButton">
        Yes, I want!
      </button>
      <button class="oil__button oil__button--secondary js-optlater" data-qa="oil-NotNowButton">
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
  let cookieData = getOilCookie();

  if (typeof (cookieData) !== 'undefined' && isDOMElement(entryPoint)) {
    // Create overlay container
    let oil = document.createElement('div');

    // Add classes for styling Oil overlay
    // Classes are added sequentially, see here for problems in some browsers with alternative syntax oil.classList.add('foo', 'bar', 'baz')
    // http://stackoverflow.com/questions/11115998/is-there-a-way-to-add-remove-several-classes-in-one-single-instruction-with-clas
    oil.classList.add(`oil`)
    oil.classList.add(`optin-${cookieData.optin}`)
    oil.classList.add(`expanded-${cookieData.expanded}`)

    // Add data attribute for testing purposes
    oil.setAttribute('data-qa', 'oil-Layer');

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
  let oilOverlay = document.getElementsByClassName('oil')[0]

  // Reset classlist to Oil base class
  oilOverlay.setAttribute('class', 'oil')

  // Add classes from data object
  oilOverlay.classList.add(`optin-${dataObj.optin}`)
  oilOverlay.classList.add(`expanded-${dataObj.expanded}`)
}




/**
 * Add click handler
 */
function addOilClickHandler() {
  let btnOptIn = document.getElementsByClassName('js-optin')[0],
    btnOptLater = document.getElementsByClassName('js-optlater')[0];
  addClickHandler(btnOptIn, () => oilOptIn().then((cookieData) => updateOilOverlay(cookieData)));
  addClickHandler(btnOptLater, () => oilOptLater().then((cookieData) => updateOilOverlay(cookieData)));
}


/**
 * Init OIL
 */
(function () {
  validateOilCookie();

  // Inject Oil overlay depending on cookie data
  injectOil(document.body);
  addOilClickHandler();
  findConfiguration();
}());
