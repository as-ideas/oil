import { getInfoBannerOnly } from './core_config';
import {getSoiCookie} from './core_cookies.js';


const LOADING_RULE_ALL = '_dip_oil_purpose_all';
const LOADING_RULE_PURPOSE_01 = '_dip_oil_purpose_01';
const LOADING_RULE_PURPOSE_02 = '_dip_oil_purpose_02';
const LOADING_RULE_PURPOSE_03 = '_dip_oil_purpose_03';
const LOADING_RULE_PURPOSE_04 = '_dip_oil_purpose_04';
const LOADING_RULE_PURPOSE_05 = '_dip_oil_purpose_05';

/**
 * Sets the tealium variables for the loading rules.
 * Only works, when there was already an optin. Otherwise
 * tealium will need to be notified to re-evaluate the
 * loading rules
 *
 * HINT: utag_data = UDO, Universal Data Object
 */
// FIXME deprecated
export function doSetTealiumVariables() {
  if (window && window.utag) {
    attachEventListenerForLoadingRules();
    checkUtagDataExists();

    let ud = window.utag_data;
    let consentData = getSoiCookie().consentData;
    if (consentData) {
      let allowedPurposes = consentData.getPurposesAllowed();
      if (allowedPurposes.length === 5) {
        ud[LOADING_RULE_ALL] = 1;
      } else {
        calculateLoadingRules(ud, allowedPurposes);
        calculateLoadingRuleAll(ud);
      }
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

function calculateLoadingRules(ud, allowedPurposes) {
  ud[LOADING_RULE_PURPOSE_01] = allowedPurposes.indexOf(1) !== -1 ? 1 : 0;
  ud[LOADING_RULE_PURPOSE_02] = allowedPurposes.indexOf(2) !== -1 ? 1 : 0;
  ud[LOADING_RULE_PURPOSE_03] = allowedPurposes.indexOf(3) !== -1 ? 1 : 0;
  ud[LOADING_RULE_PURPOSE_04] = allowedPurposes.indexOf(4) !== -1 ? 1 : 0;
  ud[LOADING_RULE_PURPOSE_05] = allowedPurposes.indexOf(5) !== -1 ? 1 : 0;
}


function calculateLoadingRuleAll(ud) {
  ud[LOADING_RULE_ALL] =
    (ud[LOADING_RULE_PURPOSE_01] === 1 &&
      ud[LOADING_RULE_PURPOSE_02] === 1 &&
      ud[LOADING_RULE_PURPOSE_03] === 1 &&
      ud[LOADING_RULE_PURPOSE_04] === 1 &&
      ud[LOADING_RULE_PURPOSE_05] === 1) ? 1 : 0;
}

function setAllLoadingRulesToFalse(ud) {
  ud[LOADING_RULE_ALL] = 0;
  ud[LOADING_RULE_PURPOSE_01] = 0;
  ud[LOADING_RULE_PURPOSE_02] = 0;
  ud[LOADING_RULE_PURPOSE_03] = 0;
  ud[LOADING_RULE_PURPOSE_04] = 0;
  ud[LOADING_RULE_PURPOSE_05] = 0;
}


function receiveMessage(event) {
  function eventDataContains(str) {
    return JSON.stringify(event.data).indexOf(str) !== -1;
  }

  if (event && event.data && (eventDataContains('oil_opt'))) {
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
      [LOADING_RULE_PURPOSE_01]: ud[LOADING_RULE_PURPOSE_01],
      [LOADING_RULE_PURPOSE_02]: ud[LOADING_RULE_PURPOSE_02],
      [LOADING_RULE_PURPOSE_03]: ud[LOADING_RULE_PURPOSE_03],
      [LOADING_RULE_PURPOSE_04]: ud[LOADING_RULE_PURPOSE_04],
      [LOADING_RULE_PURPOSE_05]: ud[LOADING_RULE_PURPOSE_05]
    };
    if(getInfoBannerOnly()) {
      window.utag.view(payload);
    }
  }
}

