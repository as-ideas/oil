import { getSoiCookie } from '../core/core_cookies.js';
import { PRIVACY_MINIMUM_TRACKING, PRIVACY_FUNCTIONAL_TRACKING, PRIVACY_FULL_TRACKING, PRIVACY_SETTINGS_FULL_TRACKING, PRIVACY_SETTINGS_FUNCTIONAL_TRACKING, PRIVACY_SETTINGS_MINIMUM_TRACKING } from '../core/core_constants.js';

export function getSoiPrivacy() {
  let cookie = getSoiCookie();
  return cookie.privacy;
}

export function convertPrivacySettingsToCookieValue(value) {
  switch (value) {
    default:
    case PRIVACY_MINIMUM_TRACKING:
      return PRIVACY_SETTINGS_MINIMUM_TRACKING;
    case PRIVACY_FUNCTIONAL_TRACKING:
      return PRIVACY_SETTINGS_FUNCTIONAL_TRACKING;
    case PRIVACY_FULL_TRACKING:
      return PRIVACY_SETTINGS_FULL_TRACKING;
  }
}

