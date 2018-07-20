import { OptoutConfirmDialog } from './view/components/oil.optout.confirm.js';
import { forEach } from './userview_modal';

export function showOptoutConfirmation() {
  let confirmer = new Promise((resolve) => {
    let entryNode = document.querySelector('#as-oil-cpc');
    let dialog = OptoutConfirmDialog();
    entryNode.insertBefore(dialog, entryNode.firstElementChild);

    document.querySelector('.as-js-cancel').addEventListener('click', () => resolve(true), false);
    document.querySelector('.as-js-confirm').addEventListener('click', () => resolve(false), false);
  });
  return confirmer;
}

function hideOptoutConfirmation() {
  let dialog = document.querySelector('#as-oil-optout-confirm');
  dialog.parentNode.removeChild(dialog);
}

export function activateOptoutConfirm() {
  forEach(document.querySelectorAll('.as-js-purpose-slider'), (element) => {
    element.addEventListener('click', optoutHandler, true);
  });
}

function optoutHandler(event) {
  if(!event.target.checked) {
    showOptoutConfirmation().then((confirmed) => {
      event.target.checked = confirmed;
      hideOptoutConfirmation();
    });
    event.target.checked = true;
    event.preventDefault();
    event.stopPropagation();
  }
}
