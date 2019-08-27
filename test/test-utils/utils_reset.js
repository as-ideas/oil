import { forEach, stopTimeOut } from '../../src/scripts/userview/userview_modal';
import { customMatchers } from './utils_htmldiff';
import { clearVendorListCache } from '../../src/scripts/core/core_vendor_lists';
import { resetPendingPurposes } from '../../src/scripts/core/core_pending_purposes';

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

export function clearCmpCallbackRegistration() {
  if (window.__cmp) {
    window.__cmp.commandCollection.length = 0;
  }
}

export function removeOilFrame() {
  if (document.getElementById('oil-frame')) {
    document.getElementById('oil-frame').remove();
  }
}

export function removeTealiumLoadingRuleStuff() {
  window.utag = undefined;
  window.utag_data = undefined;
  window.oilEventListenerForLoadingRules = undefined;
}

export function resetOil() {
  deleteAllCookies();
  removeOilLayerAndConfig();
  removeOilFrame();
  removeTealiumLoadingRuleStuff();
  clearVendorListCache();
  clearCmpCallbackRegistration();
  stopTimeOut();
  initCustomYasmineMatchers();
  resetPendingPurposes();
}
