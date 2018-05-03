import {getSoiCookie} from '../core/core_cookies.js';
import {PRIVACY_FULL_TRACKING} from '../core/core_constants';
import {logInfo} from '../core/core_log';
import {forEach} from './userview_modal';

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
    return {
      '1': document.querySelector('#as-js-purpose-slider-1').checked,
      '2': document.querySelector('#as-js-purpose-slider-2').checked,
      '3': document.querySelector('#as-js-purpose-slider-3').checked,
      '4': document.querySelector('#as-js-purpose-slider-4').checked,
      '5': document.querySelector('#as-js-purpose-slider-5').checked,
      '6': document.querySelector('#as-js-purpose-slider-6').checked,
      '7': document.querySelector('#as-js-purpose-slider-7').checked
    }
  }
  return PRIVACY_FULL_TRACKING;
}

export function applyPrivacySettings(privacySetting) {
  logInfo('Apply privacy settings from cookie', privacySetting);

  document.querySelector('#as-js-purpose-slider-1').checked = privacySetting['1'];
  document.querySelector('#as-js-purpose-slider-2').checked = privacySetting['2'];
  document.querySelector('#as-js-purpose-slider-3').checked = privacySetting['3'];
  document.querySelector('#as-js-purpose-slider-4').checked = privacySetting['4'];
  document.querySelector('#as-js-purpose-slider-5').checked = privacySetting['5'];
  document.querySelector('#as-js-purpose-slider-6').checked = privacySetting['6'];
  document.querySelector('#as-js-purpose-slider-7').checked = privacySetting['7'];

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

