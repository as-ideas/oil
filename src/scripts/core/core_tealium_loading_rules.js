import { getSoiCookie } from './core_cookies';

const LOADING_RULE_ALL = '_dip_oil_consent_all';
const LOADING_RULE_ESSENTIAL = '_dip_oil_consent_essential';
const LOADING_RULE_ANALYTICS = '_dip_oil_consent_analytics';
const LOADING_RULE_SOCIAL_CONNECT = '_dip_oil_consent_social_connect';
const LOADING_RULE_ADS_BASE = '_dip_oil_consent_ads_base';
const LOADING_RULE_ADS_BEHAVIOUR = '_dip_oil_consent_ads_behaviour';

const PRIVACY_SETTING_ESSENTIAL = 'esse';
const PRIVACY_SETTING_ANALYTICS = 'analy';
const PRIVACY_SETTING_SOCIAL_CONNECT = 'soci';
const PRIVACY_SETTING_ADS_BASE = 'adsbase';
const PRIVACY_SETTING_ADS_BEHAVIOUR = 'adsbehav';

/**
 * Sets the tealium variables for the loading rules.
 * Only works, when there was already an optin. Otherwise
 * tealium will need to be notifyt to re-evaluate the
 * loading rules
 *
 * HINT: utag_data = UDO, Universal Data Objectm
 *
 * @param optin - the current cookie value
 */
export function doSetTealiumVariables(optin) {

  if (window && window.utag) {
    if (!window.utag_data) {
      window.utag_data = {}
    }

    window.utag_data[LOADING_RULE_ALL] = false;
    window.utag_data[LOADING_RULE_ESSENTIAL] = false;
    window.utag_data[LOADING_RULE_ANALYTICS] = false;
    window.utag_data[LOADING_RULE_SOCIAL_CONNECT] = false;
    window.utag_data[LOADING_RULE_ADS_BASE] = false;
    window.utag_data[LOADING_RULE_ADS_BEHAVIOUR] = false;
  }

  if (optin) {
    let privacy = getSoiCookie().privacy;
    if (privacy) {
      window.utag_data[LOADING_RULE_ESSENTIAL] = privacy[PRIVACY_SETTING_ESSENTIAL] === 1;
      window.utag_data[LOADING_RULE_ANALYTICS] = privacy[PRIVACY_SETTING_ANALYTICS] === 1;
      window.utag_data[LOADING_RULE_SOCIAL_CONNECT] = privacy[PRIVACY_SETTING_SOCIAL_CONNECT] === 1;
      window.utag_data[LOADING_RULE_ADS_BASE] = privacy[PRIVACY_SETTING_ADS_BASE] === 1;
      window.utag_data[LOADING_RULE_ADS_BEHAVIOUR] = privacy[PRIVACY_SETTING_ADS_BEHAVIOUR] === 1;

      window.utag_data[LOADING_RULE_ALL] =
        window.utag_data[LOADING_RULE_ESSENTIAL] &&
        window.utag_data[LOADING_RULE_ANALYTICS] &&
        window.utag_data[LOADING_RULE_SOCIAL_CONNECT] &&
        window.utag_data[LOADING_RULE_ADS_BASE] &&
        window.utag_data[LOADING_RULE_ADS_BEHAVIOUR];
    }
  }
}

