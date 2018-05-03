import {getSoiCookie} from './core_cookies';
import {getPurposeList} from './core_vendor_information';
import {encodeCookieValue, encodeIntToBits} from './core_utils';

export function getVendorConsentData(vendorIds) {
  return {
    metadata: encodeCookieValue(buildMetaData()),
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

  for (let i = 0; i < numberOfVendors; i++) {
    vendorConsents[vendorIds[i]] = soiCookie.opt_in;
  }
  return vendorConsents;
}

function buildMetaData() {
  let soiCookie = getSoiCookie();
  let cookieVersionAsBitString = encodeIntToBits(1, 6);
  let creationTimeAsBitString = encodeIntToBits(Math.round(soiCookie.timestamp / 100), 36); // TODO where do we get the creation time from?
  let lastUpdateTimeAsBitString = encodeIntToBits(Math.round(soiCookie.timestamp / 100), 36);
  let cmpIdAsBitString = encodeIntToBits(1, 12); // TODO what is our CMP Id?
  let cmpVersionAsBitString = encodeIntToBits(1, 6); // TODO We need a numeric OIL version here.
  let consentScreenAsBitString = encodeIntToBits(1, 6);
  let vendorListVersionAsBitString = encodeIntToBits(1, 12); // TODO Currently, we don't get the vendor list dynamically!

  return `${cookieVersionAsBitString}${creationTimeAsBitString}${lastUpdateTimeAsBitString}${cmpIdAsBitString}${cmpVersionAsBitString}${consentScreenAsBitString}${vendorListVersionAsBitString}`;
}

