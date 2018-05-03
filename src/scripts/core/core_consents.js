import {getSoiCookie} from './core_cookies';

export function getVendorConsentData(vendorIds) {
  let base64EncodedMetaData = '';
  let purposeConsents = getPurposeConsents();
  let vendorConsents = {};


  return {
    metadata: base64EncodedMetaData,
    gdprApplies: false,
    hasGlobalScope: false,
    purposeConsents: purposeConsents,
    vendorConsents: vendorConsents
  };
}

function getPurposeConsents() {
  let soiCookie = getSoiCookie();
  let privacy = soiCookie.privacy;

  if (typeof privacy === 'object') {

  } else {
    // purposeConsents =
  }
  // return purposeConsents;
  return {};
}
