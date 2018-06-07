import { forEach, stopTimeOut } from '../../src/scripts/userview/userview_modal';
import { customMatchers } from './utils_htmldiff';

export function removeOilLayerAndConfig() {
  window.AS_OIL = undefined;
  forEach(document.querySelectorAll('#oil-configuration'), (domNode) => {
    domNode.parentElement.removeChild(domNode);
  });
  forEach(document.querySelectorAll('.as-oil'), (domNode) => {
    domNode.parentElement.removeChild(domNode);
  });
}

export function deleteAllCookies() {
  let cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf('=');
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export function initCustomYasmineMatchers() {
  jasmine.addMatchers(customMatchers);
}

export function resetOil() {
  deleteAllCookies();
  removeOilLayerAndConfig();
  stopTimeOut();
  initCustomYasmineMatchers();
}
