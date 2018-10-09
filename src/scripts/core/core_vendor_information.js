import { getIabVendorBlacklist, getIabVendorListUrl, getIabVendorWhitelist, getShowLimitedVendors } from './core_config';
import { logInfo, logError } from './core_log';
import { fetchJsonData } from './core_utils';

export const DEFAULT_VENDOR_LIST = {
  vendorListVersion: 36,
  maxVendorId: 380,
  lastUpdated: '2018-05-30T16:00:15Z',
  purposeIds: [1, 2, 3, 4, 5]
};

export let cachedVendorList;
export let pendingVendorlistPromise = null;

export function loadVendorList() {
  if (cachedVendorList) {
    return new Promise( resolve => {
      resolve(cachedVendorList); 
    });
  } else if (pendingVendorlistPromise) {
    return pendingVendorlistPromise;
  } else {
    return new Promise(function (resolve) {
    let iabVendorListUrl = getIabVendorListUrl();
    pendingVendorlistPromise = fetchJsonData(iabVendorListUrl)
    pendingVendorlistPromise.then(response => {
        sortVendors(response);
        cachedVendorList = response;
        pendingVendorlistPromise = null;
        resolve(cachedVendorList);
      })
      .catch(error => {
        pendingVendorlistPromise = null;
        logError(`OIL getVendorList failed and returned error: ${error}. Falling back to default vendor list!`);
        resolve(getVendorList());
      });
    });
  }
}

export function getPurposes() {
  return cachedVendorList ? cachedVendorList.purposes : expandIdsToObjects(DEFAULT_VENDOR_LIST.purposeIds);
}

export function getPurposeIds() {
  return getPurposes().map(({id}) => id);
}

export function getVendors() {
  return cachedVendorList ? cachedVendorList.vendors : expandIdsToObjects(buildDefaultVendorIdList());
}

export function getVendorIds() {
  return getVendors().map(({id}) => id);
}

export function getVendorListVersion() {
  return cachedVendorList ? cachedVendorList.vendorListVersion : DEFAULT_VENDOR_LIST.vendorListVersion;
}

export function getVendorList() {
  if (cachedVendorList) {
    return cachedVendorList;
  }
  return {
    vendorListVersion: DEFAULT_VENDOR_LIST.vendorListVersion,
    lastUpdated: DEFAULT_VENDOR_LIST.lastUpdated,
    vendors: expandIdsToObjects(buildDefaultVendorIdList()),
    purposes: expandIdsToObjects(DEFAULT_VENDOR_LIST.purposeIds),
    features: [],
    isDefault: true
  }
}

export function clearVendorListCache() {
  cachedVendorList = undefined;
  pendingVendorlistPromise = null;
}

export function getVendorsToDisplay() {
  return getShowLimitedVendors() ? getLimitedVendors() : getVendors();
}

export function getLimitedVendors() {
  let vendors = getVendors();
  const limitedIds = getLimitedVendorIds();

  logInfo('limiting vendors');

  vendors = vendors.filter(vendor => limitedIds.indexOf(vendor.id) > -1);

  return vendors;
}

export function getLimitedVendorIds() {
  let limited;
  if (!cachedVendorList) {
    limited = buildDefaultVendorIdList();
  } else {
    limited = getVendorIds();
  }
  const whitelist = getIabVendorWhitelist();
  const blacklist = getIabVendorBlacklist();

  if (whitelist && whitelist.length > 0) {
    limited = limited.filter(vendorId => whitelist.indexOf(vendorId) > -1)
  } else if (blacklist && blacklist.length > 0) {
    limited = limited.filter(vendorId => blacklist.indexOf(vendorId) === -1);
  }

  return limited;
}

function buildDefaultVendorIdList() {
  return ((a, b) => {
    while (a--) b[a] = a + 1;
    return b
  })(DEFAULT_VENDOR_LIST.maxVendorId, []);
}

function sortVendors(vendorList) {
  vendorList.vendors = vendorList.vendors.sort((leftVendor, rightVendor) => leftVendor.id - rightVendor.id);
}

function expandIdsToObjects(idArray) {
  return idArray.map(anId => ({'id': anId}));
}
