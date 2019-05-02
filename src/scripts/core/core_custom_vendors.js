import { getCustomVendorList, loadVendorListAndCustomVendorList } from './core_vendor_lists';
import { logError } from './core_log';
import { getSoiCookie } from './core_cookies';

export function sendConsentInformationToCustomVendors() {
  return loadVendorListAndCustomVendorList()
    .then(() => {
      let customVendorList = getCustomVendorList();

      if (customVendorList && !customVendorList.isDefault) {
        // TODO getSoiCookie is not sufficient - possibly required information is in poi cookie and soi cookie does not exist (see OIL-336)
        let cookie = getSoiCookie();
        if (cookie && cookie.consentData) {
          customVendorList.vendors.forEach(customVendor => sendConsentInformationToCustomVendor(customVendor, cookie.consentData));
        }
      }
    });
}

function sendConsentInformationToCustomVendor(customVendor, consentData) {
  let allowedPurposeIds = consentData.getPurposesAllowed();

  if (customVendor.purposeIds.every(purposeId => allowedPurposeIds.indexOf(purposeId) !== -1)) {
    executeCustomVendorScript('opt-in', customVendor.optInSnippet, customVendor);
  } else {
    executeCustomVendorScript('opt-out', customVendor.optOutSnippet, customVendor);
  }
}

function executeCustomVendorScript(scriptType, script, customVendor) {
  if (script) {
    try {
      // Note: We assign eval function to a variable and invoke it this way indirectly. This ensures that's the scope
      // for executed JavaScript function is global and not the scope of this function! We need this to enable the
      // executed script to set (global) variables that are reachable for other code snippets (i.e. for webtrekk) of
      // the website the opt-in layer is integrated in.
      let evalFunction = eval;
      evalFunction(script)
    } catch (error) {
      logError('Error occurred while executing ' + scriptType + ' script for custom vendor ' + customVendor.id + ' (' + customVendor.name + ')! Error was: ', error);
    }
  }
}
