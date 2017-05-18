import "../styles/modal.scss";
import { getConfiguration } from './config.js';
import { OIL_CONFIG } from './constants.js';
import { isDOMElement, addClickHandler } from './utils.js';
import { getOilCookie, oilOptIn, oilPowerOptIn,  oilOptLater } from "./optin.js";


/**
 * Returns html content for our OIL overlay
 */
export function defineOilContent() {
  return (
    `
      <div class="oil-expanded">
        <div class="oil-content-overlay">
          <h1 class="oil__heading">
            Um unsere Dienste für Sie noch besser zu machen, brauchen wir ihr Einverständnis.
          </h1>
          <p class="oil__intro-text">
            Nach der neuen EU Datenschutzgesetzgebung müssen Sie zustimmen, wenn wir ihre Daten erheben und weiter verarbeiteten wollen.
            Wir nutzen ihre Daten, um für Sie maßgeschneiderte journalistische Inhalte zu erstellen, zielgenauerere Werbung auszuspielen oder 
            unsere Services allgemein zu bewerten. <a href="#" class="oil__intro-text--secondary">Mehr erfahren</a>
          </p>
          <div class="oil__button-row">
            <button class="oil__button oil__button--1st js-optin-poi" data-qa="oil-poi-YesButton">
              Global zustimmen
              <span class="oil__button__label-2nd">
                Für alle Axel Springer Dienste
              </span>
            </button>
            <button class="oil__button oil__button--2nd js-optin" data-qa="oil-YesButton">
              Jetzt zustimmen
              <span class="oil__button__label-2nd">
                Nur für diese Seite
              </span>
            </button>
            <button class="oil__button oil__button--3rd js-optlater" data-qa="oil-NotNowButton">
              Nein, jetzt nicht
            </button>
          </div>
        </div>
      </div>
      <div class="oil-minified">
        <div class="oil-content-overlay">
          <div class="oil-l-container">
            <h1 class="oil__heading-mini">
              Um unsere Dienste für Sie noch besser zu machen, brauchen wir ihr Einverständnis.
            </h1>
            <p class="oil__intro-text-mini">
              Sie müssen zustimmen, wenn wir ihre Daten erheben und weiter verarbeiteten wollen. 
              <a href="#" class="oil__intro-text--secondary-mini">Mehr erfahren</a>
            </p>
          </div>
          <div class="oil-l-container">
            <div class="oil-btn-group-mini">
              <button class="oil__btn-mini oil__btn-mini--1st js-optin-poi" data-qa="oil-small-poi-YesButton">
                Global zustimmen
              </button>
              <div class="oil__btn-mini-label">
                Für alle Axel Springer Dienste
              </div>
            </div>
            <div class="oil-btn-group-mini">
              <button class="oil__btn-mini oil__btn-mini--2nd js-optin" data-qa="oil-small-YesButton">
                Jetzt zustimmen
              </button>
              <div class="oil__btn-mini-label">
                Nur für diese Seite
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  );
}


/**
 * Injects OIL into DOM at entry point
 */
export function injectOil(entryPoint) {
  // Cookie should be present...
  let cookieData = getOilCookie();
  if (typeof (cookieData) !== 'undefined' && isDOMElement(entryPoint)) {
    // Create overlay container
    let oil = document.createElement('div');

    // Add classes for styling Oil overlay, use setAttribute('class', ...) instead of classList to
    // get IE9 compatibiity
    oil.setAttribute('class', `oil optin-${cookieData.optin} expanded-${cookieData.expanded}`);

    // Add data attribute for testing purposes
    oil.setAttribute('data-qa', 'oil-Layer');

    // Add overlay content
    oil.innerHTML = defineOilContent();

    // Add to DOM
    // entryPoint.appendChild(oil);
    entryPoint.insertBefore(oil, entryPoint.firstElementChild);
  }
}


/**
 * Update Oil overlay class names
 */
export function updateOilOverlay(dataObj) {
  let oilOverlay = document.getElementsByClassName('oil')[0];

  // Reset CSS class to Oil base class
  oilOverlay.setAttribute('class', 'oil');

  // Add classes from data object
  oilOverlay.setAttribute('class', `oil optin-${dataObj.optin} expanded-${dataObj.expanded}`);
}


/**
 * Add click handler
 */
export function addOilClickHandler() {
  let config = getConfiguration();

  // Get button DOM elements

  let btnListOptIn = document.querySelectorAll('.oil .js-optin');
  let btnListPoiOptIn = document.querySelectorAll('.oil .js-optin-poi');
  let btnOptLater = document.getElementsByClassName('js-optlater')[0];

  // Define click handler

  function handleOilOptIn() {
   oilOptIn().then((cookieData) => updateOilOverlay(cookieData));
  }

  function handleOilPowerOptIn() {
    oilPowerOptIn(!config[OIL_CONFIG.ATTR_SUB_SET_COOKIE]).then((cookieData) => updateOilOverlay(cookieData));
  }

  // And iterate over node lists to add handler

  Array.prototype.forEach.call(btnListOptIn, (item) => {
    item.addEventListener('click', handleOilOptIn, false);
  });

  Array.prototype.forEach.call(btnListPoiOptIn, (item) => {
    item.addEventListener('click', handleOilPowerOptIn, false);
  });

  addClickHandler(btnOptLater, () => oilOptLater().then((cookieData) => updateOilOverlay(cookieData)));
}



