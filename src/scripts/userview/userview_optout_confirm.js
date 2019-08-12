import { OptoutConfirmDialog } from './view/components/oil.optout.confirm.js';
import { forEach } from './userview_modal';
import { deactivateAll } from './view/oil.advanced.settings.standard';
import { CSS_CLASS_OPTOUT_DIALOG, JS_CLASS_BUTTON_CANCEL, JS_CLASS_BUTTON_PROCEED } from '../core/core_constants';
import { logError } from '../core/core_log';

export function showOptoutConfirmation() {
  return new Promise((resolve) => {
    let entryNode = document.querySelector('#as-oil-cpc');
    if (entryNode === null) {
      entryNode = document.querySelector('#oil-preference-center');
    }
    if (entryNode === null) {
      logError('No wrapper for the CPC was found.');
      return;
    }
    let dialog = OptoutConfirmDialog();
    entryNode.insertBefore(dialog, entryNode.firstElementChild);

    document.querySelector(`.${JS_CLASS_BUTTON_CANCEL}`).addEventListener('click', () => resolve(true), false);
    document.querySelector(`.${JS_CLASS_BUTTON_PROCEED}`).addEventListener('click', () => resolve(false), false);
    document.querySelector(`.${CSS_CLASS_OPTOUT_DIALOG}`).addEventListener('click', event => {
      if (event.target.id === CSS_CLASS_OPTOUT_DIALOG) {
        resolve(true);
      }
    }, false);
  });
}

function hideOptoutConfirmation() {
  let dialog = document.querySelector(`.${CSS_CLASS_OPTOUT_DIALOG}`);
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
