import { getCookieExpireInDays } from '../core/core_config.js'
import { OilVersion, getClientTimestamp } from '../core/core_utils.js';
import { PRIVACY_MINIMUM_TRACKING } from '../core/core_constants.js';
import { getOilCookie, setDomainCookie } from '../core/core_cookies.js';
import { logInfo } from '../core/core_log.js';

const OIL_HUB_DOMAIN_COOKIE_NAME = 'oil_data';

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
      'version': OilVersion.get(),
      'privacy': PRIVACY_MINIMUM_TRACKING
    }
  };
}

function getOilHubDomainCookie(groupName) {
  return getOilCookie(getHubDomainCookieConfig(groupName));
}

/**
 * Public Interface
 */
export function getPoiCookie(groupName) {
  let cookie = getOilHubDomainCookie(groupName);
  logInfo('Current Oil Hub Domain Cookie: ', cookie);
  return cookie;
}

export function setPoiOptIn(groupName, privacySettings) {
  let cookie = getOilHubDomainCookie(groupName);
  cookie.power_opt_in = true;
  cookie.privacy = privacySettings;
  cookie.timestamp = getClientTimestamp();
  cookie.version = OilVersion.get();
  setDomainCookie(getHubDomainCookieConfig(groupName).name, cookie, getHubDomainCookieConfig(groupName).expires);
}
