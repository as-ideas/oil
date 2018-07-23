import { OptoutConfirmDialog } from './view/components/oil.optout.confirm.js';
import { forEach } from './userview_modal';
import { deactivateAll } from './view/oil.advanced.settings.standard';
import { JS_CLASS_BUTTON_CANCEL, JS_CLASS_BUTTON_PROCEED, CSS_CLASS_OPTOUT_DIALOG } from '../core/core_constants';

export function showOptoutConfirmation() {
  let confirmer = new Promise((resolve) => {
    let entryNode = document.querySelector('#as-oil-cpc');
    let dialog = OptoutConfirmDialog();
    entryNode.insertBefore(dialog, entryNode.firstElementChild);

    document.querySelector(`.${JS_CLASS_BUTTON_CANCEL}`).addEventListener('click', () => resolve(true), false);
    document.querySelector(`.${JS_CLASS_BUTTON_PROCEED}`).addEventListener('click', () => resolve(false), false);
    document.querySelector(`.${CSS_CLASS_OPTOUT_DIALOG}`).addEventListener('click', (event) => {
      if(event.target.id === CSS_CLASS_OPTOUT_DIALOG) {
        console.log('resolve and do nothing');
        resolve(true);
      }
    }, false);
  });
  return confirmer;
}

function hideOptoutConfirmation() {
  console.log('called hideOptoutConfirmation');
  let dialog = document.querySelector(`.${CSS_CLASS_OPTOUT_DIALOG}`);
  console.log('remove it really');
  dialog.parentNode.removeChild(dialog);
}

export function activateOptoutConfirm() {
  forEach(document.querySelectorAll('.as-js-purpose-slider'), (element) => {
    element.addEventListener('click', optoutHandler, true);
  });
  forEach(document.querySelectorAll('.as-js-btn-deactivate-all'), (element) => {
    element.addEventListener('click', deactivateHandler, true);
  });
}

function deactivateHandler(event) {
  showOptoutConfirmation().then((actionCancelled) => {
    if(!actionCancelled) {
      deactivateAll();
    }
    hideOptoutConfirmation();
  });
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  return false;
} 

function optoutHandler(event) {
  if(!event.target.checked) {
    showOptoutConfirmation().then((actionCancelled) => {
      event.target.checked = actionCancelled;
      event.target.dispatchEvent(new CustomEvent('change'));
      hideOptoutConfirmation();
    });
    event.target.checked = true;
    event.preventDefault();
    event.stopPropagation();
  }
}
