import { fetchJsonData } from '../core/core_utils';
import { logError } from '../core/core_log';
import { getPoiGroupName } from '../core/core_config';

let cachedGroupList;

export function getGroupList() {
  let groupName = getPoiGroupName();
  return new Promise(function (resolve) {
    if (cachedGroupList) {
      resolve(cachedGroupList);
    } else {
      fetchJsonData(window.__webpack_public_path__ + '/poi-lists/' + groupName + '.json')
        .then(response => {
          cachedGroupList = response;
          resolve(cachedGroupList);
        })
        .catch(error => {
          logError(`OIL getGroupList failed and returned error: ${error}. Group "${groupName}" not found! Please add the JSON file with the correct name.`);
          resolve([]);
        });
    }
  });
}
