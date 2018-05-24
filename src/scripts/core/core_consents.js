import { getSoiCookie } from './core_cookies';
import { getCustomPurposes } from './core_config';
import { getPurposes, getVendorList, getVendors } from './core_vendor_information';
import { OIL_SPEC } from './core_constants';
import { getIabVendorBlacklist, getIabVendorWhitelist } from './core_config';

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

export function buildPurposeConsents(purposes, limitedPurposeIds) {
  let soiCookie = getSoiCookie();
  let privacy = soiCookie.privacy;

  if (typeof privacy === 'object') {
    return soiCookie.privacy;
  } else {
    let purposeConsents = {};

    purposes.forEach(purpose => {
      if (limitedPurposeIds && limitedPurposeIds.indexOf(purpose.id) > -1) {
        purposeConsents[purpose.id] = privacy;
      } else if (!limitedPurposeIds || !limitedPurposeIds.length) {
        purposeConsents[purpose.id] = privacy;
      }
    });

    return purposeConsents;
  }
}

function buildVendorConsents(requestedVendorIds) {
  // FIXME dom --> TESTs
  const soiCookie = getSoiCookie();
  const opt_in = soiCookie.opt_in || soiCookie.privacy;
  let vendorIds = (requestedVendorIds && requestedVendorIds.length) ? requestedVendorIds : getAllVendorIds();
  let vendorConsents = {};
  const validVendorIds = getLimitedVendorIds();

  vendorIds.forEach(vendorId => {
    vendorConsents[vendorId] = validVendorIds.indexOf(vendorId) !== -1 && opt_in;
  });
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
    // FIXME dom --> TESTs
    if (soiCookie.opt_in || soiCookie.privacy) {
      consentData.setVendorsAllowed(getLimitedVendorIds());
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

export function getLimitedVendorIds() {
  let limited = getVendors();
  const whitelist = getIabVendorWhitelist();
  const blacklist = getIabVendorBlacklist();

  if (whitelist && whitelist.length > 0) {
    limited = getVendors().filter((vendor) => {
      return whitelist.indexOf(vendor.id) > -1;
    })
  } else if (blacklist && blacklist.length > 0) {
    limited = getVendors().filter((vendor) => {
      return blacklist.indexOf(vendor.id) === -1;
    });
  }

  return limited.map(({id}) => id);
}

function getAllVendorIds() {
  return getVendors().map(({id}) => id);
}
