import "./oil.scss";

/**
 * Returns html content for our OIL overlay
 *
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
 *
 */

function injectOil(entryPoint) {
  // Create overlay container
  const oil = document.createElement('div');
  oil.setAttribute('class', 'oil');
  // Add overlay content
  oil.innerHTML = defineOilContent();
  // Add to DOM
  entryPoint.appendChild(oil);
}

/**
 * Simple adding of event listeners to our OIL buttons
 *
 */

function addHandler() {
  // Get elements
  const btnOptIn = document.getElementsByClassName('js-optin')[0];
  const btnOptLater = document.getElementsByClassName('js-optlater')[0];
  // Add event handler
  btnOptIn.addEventListener('click', () => console.log("Optin"));
  btnOptLater.addEventListener('click', () => console.log("Optlater"));
}

injectOil(document.body);
addHandler();






