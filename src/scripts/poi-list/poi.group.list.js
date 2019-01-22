import { fetchJsonData, getGlobalOilObject, setGlobalOilObject } from '../core/core_utils';
import { logError } from '../core/core_log';
import { getPoiGroupName, setIabVendorWhitelist, setIabVendorBlacklist, isPoiActive } from '../core/core_config';

/**
 * IF POI is enabled: Gets the group list and sets IAB Vendor Whitelist/Blacklist
 *
 * @returns {Promise<Object>} A promise with the group list object as result, undefined if POI is disabled
 */
export function getGroupList() {
  let groupName = getPoiGroupName();

  let cachedGroupList = getGlobalOilObject('oilCachedGroupList');

  return new Promise(function (resolve) {
    if (cachedGroupList || !isPoiActive()) {
      resolve(cachedGroupList);
    } else {
      fetchJsonData(__webpack_public_path__ + 'poi-lists/' + groupName + '.json')
        .then(response => {
          cachedGroupList = response.companyList;
          setGlobalOilObject('oilCachedGroupList', cachedGroupList);

          if (response.iabVendorWhitelist && response.iabVendorWhitelist.length) {
            setIabVendorWhitelist(response.iabVendorWhitelist);
          }

          if (response.iabVendorBlacklist && response.iabVendorBlacklist.length) {
            setIabVendorBlacklist(response.iabVendorBlacklist);
          }

          resolve(cachedGroupList);
        })
        .catch(error => {
          logError(`OIL getGroupList failed and returned error: ${error}. Group "${groupName}" not found! Please add the JSON file with the correct name.`);
          resolve([]);
        });
    }
  });
}
