require("./oil.scss");

const defineOilContent = () => {
  return (
    `
      <h1 class="oil__heading">
        Axel Springer Optin Layer
      </h1>
      <p class="oil__intro-text">
        Hi, this is a little intro text.
      </p>
      <button class="oil__button oil__button--primary">
        Yes, I want!
      </button>
      <button class="oil__button oil__button--secondary">
        Not now
      </button>
    `
  );
};

const injectOil = (entryPoint) => {
  const oil = document.createElement("div");
  oil.setAttribute('class', 'oil');
  oil.innerHTML = defineOilContent();
  entryPoint.appendChild(oil);
};

injectOil(document.body);





