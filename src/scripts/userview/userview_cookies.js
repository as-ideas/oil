import { getSoiCookie, getOilSessionCookie, setSessionCookie, getOilSessionCookieConfig } from '../core/core_cookies.js';
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

export function setOptLater(value) {
  let cookie = getOilSessionCookie();
  if (value !== cookie.opt_later) {
    cookie.opt_later = value;
    setSessionCookie(getOilSessionCookieConfig().name, cookie);
  }
}

export function setOilOptIgnore(value) {
  let cookie = getOilSessionCookie();
  if (value !== cookie.opt_ignore) {
    cookie.opt_ignore = value;
    setSessionCookie(getOilSessionCookieConfig().name, cookie);
  }
}
