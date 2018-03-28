import {getCookieExpireInDays} from '../core/core_config.js'
import {getClientTimestamp} from '../core/core_utils.js';
import {
  PRIVACY_MINIMUM_TRACKING,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION,
  OIL_PAYLOAD_LOCALE
} from '../core/core_constants.js';
import {getOilCookie, setDomainCookie} from '../core/core_cookies.js';
import {logInfo} from '../core/core_log.js';

const OIL_HUB_DOMAIN_COOKIE_NAME = 'oil_data';
const OIL_HUB_UNKNOWN_VALUE = 'unknown';

/**
 * Internal Methods
 */
function getOilHubCookieName(groupName) {
  if (groupName) {
    return groupName + '_' + OIL_HUB_DOMAIN_COOKIE_NAME;
  }
  return OIL_HUB_DOMAIN_COOKIE_NAME;
}

function getHubDomainCookieConfig(groupName) {
  return {
    name: getOilHubCookieName(groupName),
    expires: getCookieExpireInDays(),
    default_content: {
      'power_opt_in': false,
      'timestamp': getClientTimestamp(),
      'version': OIL_HUB_UNKNOWN_VALUE, // those values cant be figured out
      'locale': OIL_HUB_UNKNOWN_VALUE, //  in the hub and come from the sites config
      'privacy': PRIVACY_MINIMUM_TRACKING
    }
  };
}

function getOilHubDomainCookie(groupName) {
  return getOilCookie(getHubDomainCookieConfig(groupName));
}

function getPrivacySettingsFromPayload(payload) {
  if (payload) {
    if (payload[OIL_PAYLOAD_PRIVACY]) {
      return payload[OIL_PAYLOAD_PRIVACY];
    } else { // backwards compatibility, when the payload was only the privacySettings
      return payload;
    }
  }
  return PRIVACY_MINIMUM_TRACKING;
}

function getVersionFromPayload(payload) {
  if (payload && payload[OIL_PAYLOAD_VERSION]) {
    return payload[OIL_PAYLOAD_VERSION];
  }
  return OIL_HUB_UNKNOWN_VALUE;
}

function getLocaleFromPayload(payload) {
  if (payload && payload[OIL_PAYLOAD_LOCALE]) {
    return payload[OIL_PAYLOAD_LOCALE];
  }
  return OIL_HUB_UNKNOWN_VALUE;
}

/**
 * Public Interface
 */
export function getPoiCookie(groupName = '') {
  let cookie = getOilHubDomainCookie(groupName);
  logInfo('Oil Hub Domain Cookie: ', cookie);
  return cookie;
}

export function setPoiOptIn(groupName = '', payload) {
  let privacySettings = getPrivacySettingsFromPayload(payload);
  let oilVersion = getVersionFromPayload(payload);
  let locale = getLocaleFromPayload(payload);

  let cookie = getOilHubDomainCookie(groupName);
  let cookieConfig = getHubDomainCookieConfig(groupName);
  cookie.power_opt_in = true;
  cookie.privacy = privacySettings;
  cookie.timestamp = getClientTimestamp();
  cookie.version = oilVersion;
  cookie.locale = locale;
  setDomainCookie(cookieConfig.name, cookie, cookieConfig.expires);
}
