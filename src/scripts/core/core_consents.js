import {getSoiCookie} from './core_cookies';
import {getPurposes, getVendorList, getVendors} from './core_vendor_information';
import {OIL_SPEC} from './core_constants';
import {getIabVendorBlacklist, getIabVendorWhitelist} from './core_config';

const {ConsentString} = require('consent-string');

export function getVendorConsentData(vendorIds) {
  return {
    metadata: buildConsentString(),
    gdprApplies: true,
    hasGlobalScope: false,
    purposeConsents: buildPurposeConsents(),
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

function buildPurposeConsents() {
  let soiCookie = getSoiCookie();
  let privacy = soiCookie.privacy;

  if (typeof privacy === 'object') {
    return soiCookie.privacy;
  } else {
    let purposes = getPurposes();
    let purposeConsents = {};

    purposes.forEach(purpose => {
      purposeConsents[purpose.id] = privacy;
    });
    return purposeConsents;
  }
}

function buildVendorConsents(requestedVendorIds) {
  const opt_in = getSoiCookie().opt_in;
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
    if (soiCookie.opt_in) {
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
  } else if(blacklist && blacklist.length > 0) {
    limited = getVendors().filter((vendor) => {
      return blacklist.indexOf(vendor.id) === -1;
    });
  }

  return limited.map(({id}) => id);
}

function getAllVendorIds() {
  return getVendors().map(({id}) => id);
}

