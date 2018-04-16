import { getSoiCookie } from '../core/core_cookies.js';
import { PRIVACY_FULL_TRACKING } from '../core/core_constants';

export const PRIVACY_SETTINGS_ALL_FALSE = {
  '01': false,
  '02': false,
  '03': false,
  '04': false,
  '05': false,
  '06': false,
  '07': false
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
  if (document.getElementById('as-oil-cpc')) {
    return {
      '01': document.getElementById('as-js-purpose-slider-01').checked,
      '02': document.getElementById('as-js-purpose-slider-02').checked,
      '03': document.getElementById('as-js-purpose-slider-03').checked,
      '04': document.getElementById('as-js-purpose-slider-04').checked,
      '05': document.getElementById('as-js-purpose-slider-05').checked,
      '06': document.getElementById('as-js-purpose-slider-06').checked,
      '07': document.getElementById('as-js-purpose-slider-07').checked
    }
  }
  return PRIVACY_FULL_TRACKING;
}

export function applyPrivacySettings(privacySetting) {
  document.getElementById('as-js-purpose-slider-01').checked = privacySetting['01'];
  document.getElementById('as-js-purpose-slider-02').checked = privacySetting['02'];
  document.getElementById('as-js-purpose-slider-03').checked = privacySetting['03'];
  document.getElementById('as-js-purpose-slider-04').checked = privacySetting['04'];
  document.getElementById('as-js-purpose-slider-05').checked = privacySetting['05'];
  document.getElementById('as-js-purpose-slider-06').checked = privacySetting['06'];
  document.getElementById('as-js-purpose-slider-07').checked = privacySetting['07'];
}

