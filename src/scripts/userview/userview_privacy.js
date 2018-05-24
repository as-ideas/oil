import { getSoiCookie } from '../core/core_cookies.js';
import { PRIVACY_FULL_TRACKING } from '../core/core_constants';
import { logInfo } from '../core/core_log';
import { forEach } from './userview_modal';
import { getPurposes } from '../core/core_vendor_information';

export const PRIVACY_SETTINGS_ALL_FALSE = {
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false
};

export function getSoiPrivacy() {
  let cookie = getSoiCookie();
  return cookie.privacy;
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

export function applyPrivacySettings(privacySetting) {
  logInfo('Apply privacy settings from cookie', privacySetting);

  for (let i = 1; i <= getPurposes().length; i++) {
    document.querySelector(`#as-js-purpose-slider-${i}`).checked = privacySetting[`${i}`];
  }

  if (privacySetting === 1) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = true);
    });
  }

  if (privacySetting === 0) {
    forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
      domNode && (domNode.checked = false);
    });
  }
}

