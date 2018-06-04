import {getSoiCookie} from './core_cookies';
import {getCustomPurposeIds} from './core_config';
import {getLimitedVendorIds, getPurposeIds} from './core_vendor_information';
import {OIL_SPEC} from './core_constants';

export function getVendorConsentData(vendorIds) {
  let cookie = getSoiCookie();

  if (cookie && cookie.consentData) {
    return {
      metadata: cookie.consentData.getMetadataString(),
      gdprApplies: true,
      hasGlobalScope: false,
      purposeConsents: buildPurposeConsents(cookie.consentData.getPurposesAllowed(), getPurposeIds()),
      vendorConsents: buildVendorConsents(cookie, vendorIds)
    };
  }
}

export function getConsentDataString(consentStringVersion) {
  let cookie = getSoiCookie();

  if (cookie && cookie.consentData) {
    const consentString = buildConsentString(cookie, consentStringVersion);

    if (consentString) {
      return {
        gdprApplies: true,
        hasGlobalScope: false,
        consentData: consentString
      };
    }
  }
}

export function getPublisherConsentData(purposeIds) {
  let cookie = getSoiCookie();

  if (cookie && cookie.consentData && cookie.customPurposes) {
    return {
      metadata: cookie.consentData.getMetadataString(),
      gdprApplies: true,
      hasGlobalScope: false,
      standardPurposeConsents: buildPurposeConsents(cookie.consentData.getPurposesAllowed(), getPurposeIds(), purposeIds),
      customPurposeConsents: buildPurposeConsents(cookie.customPurposes, getCustomPurposeIds(), purposeIds)
    };
  }
}

function buildPurposeConsents(allowedPurposeIds, allPurposeIds, requestedPurposeIds) {
  let purposeIds = (requestedPurposeIds && requestedPurposeIds.length) ? requestedPurposeIds : allPurposeIds;

  return purposeIds
    .filter(purposeId => allPurposeIds.indexOf(purposeId) !== -1)
    .reduce((map, purposeId) => {
      map[purposeId] = allowedPurposeIds.indexOf(purposeId) !== -1;
      return map
    }, {});
}

function buildVendorConsents(cookie, requestedVendorIds) {
  let vendorIds = (requestedVendorIds && requestedVendorIds.length) ? requestedVendorIds : getLimitedVendorIds();
  let allowedVendors = cookie.consentData.getVendorsAllowed();

  return vendorIds
    .reduce((map, vendorId) => {
      map[vendorId] = allowedVendors.indexOf(vendorId) !== -1;
      return map
    }, {});
}

function buildConsentString(cookie, consentStringVersionString) {
  let consentStringVersion = consentStringVersionString ? parseInt(consentStringVersionString, 10) : OIL_SPEC.LATEST_CONSENT_STRING_VERSION;
  return (!isNaN(consentStringVersion) && consentStringVersion <= cookie.consentData.getVersion()) ? cookie.consentString : null;
}
