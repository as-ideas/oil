import {getSoiCookie} from './core_cookies';
import {getCustomPurposes} from './core_config';
import {getPurposes, getVendorList, getVendors} from './core_vendor_information';
import {OIL_SPEC} from './core_constants';

const {ConsentString} = require('consent-string');

export function getVendorConsentData(vendorIds) {
  return {
    metadata: buildConsentString(),
    gdprApplies: true,
    hasGlobalScope: false,
    purposeConsents: buildPurposeConsents(getPurposes()),
    vendorConsents: buildVendorConsents(vendorIds)
  };
}

export function getConsentDataString(consentStringVersion) {
  const consentData = buildConsentString(consentStringVersion);

  if (consentData) {
    return {
      gdprApplies: true,
      hasGlobalScope: false,
      consentData: consentData
    };
  }
}

export function getPublisherConsentData(purposeIds) {
  return {
    metadata: buildConsentString(),
    gdprApplies: true,
    hasGlobalScope: false,
    standardPurposeConsents: buildPurposeConsents(getPurposes(), purposeIds),
    customPurposeConsents: buildPurposeConsents(getCustomPurposes(), purposeIds)
  }
}

function buildPurposeConsents(purposes, limitedPurposeIds) {
  let soiCookie = getSoiCookie();
  let privacy = soiCookie.privacy;

  if (typeof privacy === 'object') {
    return soiCookie.privacy;
  } else {
    let purposeConsents = {};

    purposes.forEach(purpose => {
      if (limitedPurposeIds && limitedPurposeIds.indexOf(purpose.id) > -1) {
        purposeConsents[purpose.id] = privacy;
      } else if(!limitedPurposeIds || !limitedPurposeIds.length) {
        purposeConsents[purpose.id] = privacy;
      }
    });
    return purposeConsents;
  }
}

function buildVendorConsents(requestedVendorIds) {
  let soiCookie = getSoiCookie();
  let validVendorIds = getAllVendorIds();
  let vendorConsents = {};

  // TODO OIL-115 CMP: Blacklist/Whitelist for vendors
  if (requestedVendorIds && requestedVendorIds.length) {
    requestedVendorIds.forEach(vendorId => {
      vendorConsents[vendorId] = validVendorIds.indexOf(vendorId) !== -1 && soiCookie.opt_in;
    });
  } else {
    validVendorIds.forEach(vendorId => {
      vendorConsents[vendorId] = soiCookie.opt_in;
    });
  }
  return vendorConsents;
}

function buildConsentString(consentStringVersionString) {
  if (!consentStringVersionString) {
    consentStringVersionString = 1;
  }

  let consentData = new ConsentString();
  let consentStringVersion = parseInt(consentStringVersionString, 10);

  if (!isNaN(consentStringVersion) && consentStringVersion <= consentData.getVersion()) {

    let soiCookie = getSoiCookie();
    consentData.setCmpId(OIL_SPEC.CMP_ID);
    consentData.setCmpVersion(OIL_SPEC.CMP_VERSION);
    consentData.setConsentScreen(1);
    consentData.setConsentLanguage(soiCookie.localeVariantName.substring(0, 2));
    consentData.setGlobalVendorList(getVendorList());
    consentData.created = new Date(soiCookie.timestamp);
    consentData.setPurposesAllowed(getPurposesWithConsent(soiCookie));
    if (soiCookie.opt_in) {
      // TODO OIL-115 CMP: Blacklist/Whitelist for vendors
      consentData.setVendorsAllowed(getAllVendorIds());
    }
    return consentData.getConsentString();
  }
}

function getPurposesWithConsent(soiCookie) {
  let privacy = soiCookie.privacy;
  if (typeof privacy === 'object') {
    return getPurposes().map(({id}) => id).filter(purposeId => soiCookie.privacy[purposeId]);
  } else {
    return privacy === 1 ? getPurposes().map(({id}) => id) : [];
  }
}

function getAllVendorIds() {
  return getVendors().map(({id}) => id);
}
