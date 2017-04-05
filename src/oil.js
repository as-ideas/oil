import "./oil.scss";
import { isDOMElement, addClickHandler } from './util.js';

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
  if (isDOMElement(entryPoint)) {
    // Create overlay container
    const oil = document.createElement('div');
    oil.setAttribute('class', 'oil');
    // Add overlay content
    oil.innerHTML = defineOilContent();
    // Add to DOM
    entryPoint.appendChild(oil);
  }
}

/**
 * Add click handler
 */
function addOilClickHandler() {
  const btnOptIn = document.getElementsByClassName('js-optin')[0];
  const btnOptLater = document.getElementsByClassName('js-optlater')[0];
  addClickHandler(btnOptIn, () => console.log("Optin"));
  addClickHandler(btnOptLater, () => console.log("OptLater"));
}

/**
 * Init OIL
 */
function init() {
  injectOil(document.body);
  addOilClickHandler();
}

init();






