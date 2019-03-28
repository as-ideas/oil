import {getSoiCookie} from '../core/core_cookies.js';
import {PRIVACY_FULL_TRACKING} from '../core/core_constants';
import {logInfo} from '../core/core_log';
import {forEach} from './userview_modal';

export function getSoiConsentData() {
  let soiCookie = getSoiCookie();
  return soiCookie.opt_in ? soiCookie.consentData : undefined;
}

/**
 * If the CPC is visible it returns the settings from the CPC,
 * otherwise '1' is returned for 'full tracking'
 *
 * @returns {Object,number}
 *  "0": if no checkbox is marked
 *  "1": if all checkboxes are marked or if
 *  "{}": if there are multiple checkboxes
 */
export function getPrivacySettings() {
  if (document.querySelector('.as-js-purpose-slider')) {
    let result = {};
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (element) => {
      let element_id = element.dataset ? element.dataset.id : element.getAttribute('data-id');
      result[element_id] = element.checked;
    }, this);
    return result;
  }
  return PRIVACY_FULL_TRACKING;
}

export function applyPrivacySettings(allowedPurposes) {
  logInfo('Apply privacy settings from cookie', allowedPurposes);

  if (allowedPurposes === 1) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = true);
    });
  } else if (allowedPurposes === 0) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = false);
    });
  } else if (allowedPurposes) {
    allowedPurposes.map(function(allowedPurpose) {
      document.querySelector(`#as-js-purpose-slider-${allowedPurpose}`).checked = (allowedPurpose !== -1);
    });
  }

}
