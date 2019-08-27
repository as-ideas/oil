import {getSoiCookie} from '../core/core_cookies';
import {PRIVACY_FULL_TRACKING} from '../core/core_constants';
import {logInfo} from '../core/core_log';
import {forEach} from './userview_modal';
import {getPurposes, getPurposeIds} from '../core/core_vendor_lists';
import {getPendingPurposes} from '../core/core_pending_purposes';

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
  const pendingPurposes = getPendingPurposes();
  if (document.querySelector('.as-js-purpose-slider')) {
    let result = {};
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (element) => {
      let element_id = element.dataset ? element.dataset.id : element.getAttribute('data-id');
      result[element_id] = element.checked;
    }, this);
    return result;
  } else if (pendingPurposes) {
      const result = {};
      getPurposeIds().forEach((id) => {
        result[id] = pendingPurposes.indexOf(id) !== -1;
      });
    return result;
  }
  return PRIVACY_FULL_TRACKING;
}

export function applyPrivacySettings(allowedPurposes) {
  const pendingPurposes = getPendingPurposes();

  if (pendingPurposes) {
    logInfo('Apply pending privacy settings', pendingPurposes);
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      if (domNode) {
        const id = parseInt(domNode.getAttribute('data-id'), 10);
        domNode.checked = pendingPurposes.indexOf(id) !== -1;
      }
    });
  } else if (allowedPurposes === 1) {
    logInfo('Set all privacy settings to true');
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = true);
    });
  } else if (allowedPurposes === 0) {
    logInfo('Set all privacy settings to false');
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = false);
    });
  } else if (allowedPurposes) {
    logInfo('Apply privacy settings from cookie', allowedPurposes);
    for (let i = 1; i <= getPurposes().length; i++) {
      document.querySelector(`#as-js-purpose-slider-${i}`).checked = (allowedPurposes.indexOf(i) !== -1);
    }
  }
}
