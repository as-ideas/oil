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
export function doSetTealiumVariables() {
  attachEventListenerForLoadingRules();

  if (window && window.utag) {
    checkUtagDataExists();

    let ud = window.utag_data;
    let privacy = getSoiCookie().privacy;
    if (privacy) {
      ud[LOADING_RULE_ESSENTIAL] = privacy[PRIVACY_SETTING_ESSENTIAL] === 1 ? 1 : 0;
      ud[LOADING_RULE_ANALYTICS] = privacy[PRIVACY_SETTING_ANALYTICS] === 1 ? 1 : 0;
      ud[LOADING_RULE_SOCIAL_CONNECT] = privacy[PRIVACY_SETTING_SOCIAL_CONNECT] === 1 ? 1 : 0;
      ud[LOADING_RULE_ADS_BASE] = privacy[PRIVACY_SETTING_ADS_BASE] === 1 ? 1 : 0;
      ud[LOADING_RULE_ADS_BEHAVIOUR] = privacy[PRIVACY_SETTING_ADS_BEHAVIOUR] === 1 ? 1 : 0;

      calculateLoadingRuleAll(ud);
    } else {
      setAllLoadingRulesToFalse(ud);
    }
  }
}

function checkUtagDataExists() {
  if (!window.utag_data) {
    window.utag_data = {};
  }
}

function calculateLoadingRuleAll(ud) {
  ud[LOADING_RULE_ALL] =
    (ud[LOADING_RULE_ESSENTIAL] === 1 &&
      ud[LOADING_RULE_ANALYTICS] === 1 &&
      ud[LOADING_RULE_SOCIAL_CONNECT] === 1 &&
      ud[LOADING_RULE_ADS_BASE] === 1 &&
      ud[LOADING_RULE_ADS_BEHAVIOUR] === 1) ? 1 : 0;
}

function setAllLoadingRulesToFalse(ud) {
  ud[LOADING_RULE_ALL] = 0;
  ud[LOADING_RULE_ESSENTIAL] = 0;
  ud[LOADING_RULE_ANALYTICS] = 0;
  ud[LOADING_RULE_SOCIAL_CONNECT] = 0;
  ud[LOADING_RULE_ADS_BASE] = 0;
  ud[LOADING_RULE_ADS_BEHAVIOUR] = 0;
}


function receiveMessage(event) {
  function eventDataContains(str) {
    return JSON.stringify(event.data).indexOf(str) !== -1;
  }

  if (event && event.data && (eventDataContains('oil_opt'))) {
    console.info('event', event.data);
    doSetTealiumVariables();
    reEvaluateTealiumLoadingRules();
  }
}


function attachEventListenerForLoadingRules() {
  if (!window.oilEventListenerForLoadingRules) {
    window.oilEventListenerForLoadingRules = receiveMessage;

    let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    let messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
    let eventer = window[eventMethod];
    eventer(messageEvent, window.oilEventListenerForLoadingRules, false);
  }
}

function reEvaluateTealiumLoadingRules() {
  // cf. https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/Reload-re-evaluate-load-rules/td-p/7282
  // and documentation under https://community.tealiumiq.com/t5/JavaScript-utag-js/Page-Tracking/ta-p/15563#toc-hId--1333191890
  let ud = window.utag_data;
  if (ud) {
    let payload = {
      [LOADING_RULE_ALL]: ud[LOADING_RULE_ALL],
      [LOADING_RULE_ESSENTIAL]: ud[LOADING_RULE_ESSENTIAL],
      [LOADING_RULE_ANALYTICS]: ud[LOADING_RULE_ANALYTICS],
      [LOADING_RULE_SOCIAL_CONNECT]: ud[LOADING_RULE_SOCIAL_CONNECT],
      [LOADING_RULE_ADS_BASE]: ud[LOADING_RULE_ADS_BASE],
      [LOADING_RULE_ADS_BEHAVIOUR]: ud[LOADING_RULE_ADS_BEHAVIOUR]
    };
    window.utag.view(payload);
  }
}

