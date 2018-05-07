import {getSoiCookie} from './core_cookies';
import {getPurposeList} from './core_vendor_information';

const {ConsentString} = require('consent-string');

export function getVendorConsentData(vendorIds) {
  return {
    metadata: buildMetaData(),
    gdprApplies: true,
    hasGlobalScope: false,
    purposeConsents: buildPurposeConsents(),
    vendorConsents: buildVendorConsents(vendorIds)
  };
}

function buildPurposeConsents() {
  let soiCookie = getSoiCookie();
  let privacy = soiCookie.privacy;

  if (typeof privacy === 'object') {
    return soiCookie.privacy;
  } else {
    let purposes = getPurposeList();
    let numberOfPurposes = purposes.length;
    let purposeConsents = {};

    for (let i = 0; i < numberOfPurposes; i++) {
      purposeConsents[purposes[i].id] = privacy;
    }
    return purposeConsents;
  }
}

function buildVendorConsents(vendorIds) {
  let soiCookie = getSoiCookie();
  let numberOfVendors = vendorIds.length;
  let vendorConsents = {};

  // TODO return false for all invalid vendor ids (that are not in global vendor list) - we need the global vendor list for that
  // TODO return consent status for _all_ vendor ids if given 'vendorIds' parameter is null or empty - we need the global vendor list for that
  for (let i = 0; i < numberOfVendors; i++) {
    vendorConsents[vendorIds[i]] = soiCookie.opt_in;
  }
  return vendorConsents;
}

function buildMetaData() {
  let soiCookie = getSoiCookie();
  let consentData = new ConsentString();

  consentData.setCmpId(1);
  consentData.setCmpVersion(1);
  consentData.setConsentScreen(1);
  consentData.setConsentLanguage(soiCookie.localeVariantName.substring(0, 2));
  // TODO this is dummy code - set the vendor list retrieved from IAB here
  consentData.setGlobalVendorList({
    vendorListVersion: 1,
    purposes: getPurposeList(),
    vendors: []
  });
  consentData.created = new Date(soiCookie.timestamp);
  consentData.setPurposesAllowed([1, 2, 3, 4, 5]);
  return consentData.getConsentString();
}

