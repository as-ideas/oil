import { OptoutConfirmDialog } from './view/components/oil.optout.confirm.js';
import { forEach } from './userview_modal.js';

export function showOptoutConfirmation() {
  let confirmer = new Promise(() => {
    let entryNode = document.querySelector('#as-oil-cpc');
    debugger
    let dialog = document.createElement(OptoutConfirmDialog());
    entryNode.appendChild(dialog);

    // show dialog
    //if(true == 1) {
      // user clciks yes, resolve
      //resolve(answer);
    //} else {
    //  reject();
    //}
  });
  debugger
  return confirmer;
}

export function activateOptoutConfirm() {
  forEach(document.querySelectorAll('.as-js-purpose-slider'), (element) => {
    element.onclick = (event) => {
      if(!event.target.checked) {
        // open dialog
        showOptoutConfirmation().then((confirmed) => {
          // on confirmation trigger deactivate
          event.target.checked = !!confirmed;
        });
        return false;
      }
    }
  });
}
