import {getSoiCookie} from '../core/core_cookies.js';
import {PRIVACY_FULL_TRACKING} from '../core/core_constants';
import {logInfo} from '../core/core_log';
import {forEach} from './userview_modal';
import {getPurposes} from '../core/core_vendor_information';

export function getSoiConsentData() {
  return getSoiCookie().consentData;
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
      result[element.dataset.id] = element.checked;
    }, this);
    return result;
  }
  return PRIVACY_FULL_TRACKING;
}

export function applyPrivacySettings(allowedPurposes) {
  logInfo('Apply privacy settings from cookie', allowedPurposes);

  for (let i = 1; i <= getPurposes().length; i++) {
    document.querySelector(`#as-js-purpose-slider-${i}`).checked = (allowedPurposes.indexOf(i) !== -1);
  }

  if (allowedPurposes === 1) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = true);
    });
  }

  if (allowedPurposes === 0) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = false);
    });
  }
}
