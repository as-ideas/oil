import {
  getIabVendorBlacklist,
  getIabVendorListUrl,
  getCustomVendorListUrl,
  getIabVendorWhitelist,
  getShowLimitedVendors
} from './core_config';
import { logInfo, logError } from './core_log';
import { fetchJsonData } from './core_utils';

export const DEFAULT_VENDOR_LIST = {
  vendorListVersion: 36,
  maxVendorId: 380,
  lastUpdated: '2018-05-30T16:00:15Z',
  purposeIds: [1, 2, 3, 4, 5]
};

const DEFAULT_CUSTOM_VENDOR_LIST = {
  'vendorListVersion': -1,
  'isDefault': true,
  'vendors': []
};

export let cachedVendorList;
export let cachedCustomVendorList;
export let pendingVendorlistPromise = null;

export function loadVendorListAndCustomVendorList() {
  if (cachedVendorList && cachedCustomVendorList) {
    return new Promise(resolve => {
      resolve();
    });
  } else if (pendingVendorlistPromise) {
    return pendingVendorlistPromise;
  } else {
    pendingVendorlistPromise = new Promise(function (resolve) {
      let iabVendorListUrl = getIabVendorListUrl();
      fetchJsonData(iabVendorListUrl)
        .then(response => {
          sortVendors(response);
          cachedVendorList = response;
        })
        .catch(error => {
          logError(`OIL getVendorList failed and returned error: ${error}. Falling back to default vendor list!`);
        })
        .finally(() => {
          loadCustomVendorList()
            .finally(() => {
              pendingVendorlistPromise = null;
              resolve()
            });
        });
    });
    return pendingVendorlistPromise;
  }
}

function loadCustomVendorList() {
  return new Promise(resolve => {
    let customVendorListUrl = getCustomVendorListUrl();
    if (!customVendorListUrl) {
      cachedCustomVendorList = DEFAULT_CUSTOM_VENDOR_LIST;
      resolve();
    } else {
      fetchJsonData(customVendorListUrl)
        .then(response => {
          cachedCustomVendorList = response;
        })
        .catch(error => {
          cachedCustomVendorList = DEFAULT_CUSTOM_VENDOR_LIST;
          logError(`OIL getCustomVendorList failed and returned error: ${error}. Falling back to default vendorlist!`);
        })
        .finally(() => resolve());
    }
  });
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

export function getCustomVendorList() {
  return cachedCustomVendorList ? cachedCustomVendorList : DEFAULT_CUSTOM_VENDOR_LIST;
}

export function getCustomVendorListVersion() {
  if (cachedCustomVendorList && !cachedCustomVendorList.isDefault) {
    return cachedCustomVendorList.vendorListVersion;
  }
  return undefined;
}

export function clearVendorListCache() {
  cachedVendorList = undefined;
  cachedCustomVendorList = undefined;
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

// FIXME Refactor this code. Nobody can read it!
function buildDefaultVendorIdList() {
  return ((a, b) => {
    while (a--) b[a] = a + 1;
    return b
  })(DEFAULT_VENDOR_LIST.maxVendorId, []);
}

function sortVendors(vendorList) {
  vendorList.vendors = vendorList.vendors.sort((leftVendor, rightVendor) => leftVendor.id - rightVendor.id);
}

/**
 * This function takes every element from the input array
 * and wraps it with as {id: element} object
 */
function expandIdsToObjects(idArray) {
  return idArray.map(anId => ({'id': anId}));
}
