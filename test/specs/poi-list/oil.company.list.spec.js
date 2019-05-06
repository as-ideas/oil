import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { oilGroupListTemplate } from '../../../src/scripts/poi-list/oil.list';
import { resetOil } from '../../test-utils/utils_reset';
import { getGroupList } from '../../../src/scripts/poi-list/poi.group.list';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreLog from '../../../src/scripts/core/core_log';

require('jasmine-ajax');

describe('the poi list', () => {

  beforeEach(() => {
    resetOil();
  });

  describe('poi list template', () => {
    it('should be loaded with the given elements', () => {
      loadFixture('config/given.config.example.labels.html');
      let result = oilGroupListTemplate(['a', 'b']);
      expect(result).toEqualWithDiff(readFixture('gold-master/company-list.html'));
    });
  });

  describe('fetching', () => {

    const testResponse = {
      companyList: [
        "Supercompany 1",
        "Boring Co. 2",
        "Ultra Inc.",
        "Special Tech Ltd."
      ],
      "iabVendorBlacklist": [1, 2, 3],
      "iabVendorWhitelist": [4, 5]
    };

    it('is disabled if poi is not active', (done) => {
      loadFixture('config/given.config.example.labels.html');
      getGroupList().then((result) => {
        expect(result).toBeUndefined();
        done();
      });
    });

    it('is disabled if cached poi group list exists', (done) => {
      loadFixture('config/given.config.poi.html');

      spyOn(CoreUtils, 'getGlobalOilObject').and.returnValue(testResponse.companyList);

      getGroupList().then((result) => {
        expect(result).toEqual(testResponse.companyList);
        done();
      });
    });

    it('is enabled and fetches poi group list for configured poi group', () => {
      loadFixture('config/given.config.poi.html');

      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(Promise.resolve(testResponse));
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
      spyOn(CoreConfig, 'getPoiGroupName').and.returnValue('aGroupName');
      spyOn(CoreConfig, 'getPoiListDirectory').and.returnValue('aPoiListDirectory');

      getGroupList().then((result) => {
        expect(result).toEqual(testResponse.companyList);
        expect(CoreUtils.fetchJsonData).toHaveBeenCalledWith('aPoiListDirectory/aGroupName.json');
        done();
      });
    });

    it('is enabled and returns empty group if it fails', () => {
      loadFixture('config/given.config.poi.html');

      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(Promise.reject('something went wrong'));
      spyOn(CoreLog, 'logError').and.callThrough();
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
      spyOn(CoreConfig, 'getPoiGroupName').and.returnValue('aGroupName');

      getGroupList().then((result) => {
        expect(result).toEqual([]);
        expect(CoreLog.logError).toHaveBeenCalledWith(`OIL getGroupList failed and returned error: something went wrong. Group "aGroupName" not found! Please add the JSON file with the correct name.`);
        done();
      });

    });

    it('is enabled and sets fetched poi group list as new cached poi group list', () => {
      loadFixture('config/given.config.poi.html');

      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(Promise.resolve(testResponse));
      spyOn(CoreUtils, 'setGlobalOilObject').and.callThrough();
      spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);

      getGroupList().then((result) => {
        expect(result).toEqual(testResponse.companyList);
        expect(CoreUtils.setGlobalOilObject).toHaveBeenCalledWith('oilCachedGroupList', testResponse.companyList);
        done();
      });
    });

    describe('with iab blacklist/whitelist stored in poi list', () => {

      it('should be loaded', (done) => {
        loadFixture('config/given.config.poi.html');

        spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(testResponse)));
        spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
        spyOn(CoreConfig, 'setIabVendorWhitelist').and.callThrough();
        spyOn(CoreConfig, 'setIabVendorBlacklist').and.callThrough();

        getGroupList().then(() => {
          expect(CoreConfig.setIabVendorBlacklist).toHaveBeenCalledWith(testResponse.iabVendorBlacklist);
          expect(CoreConfig.setIabVendorWhitelist).toHaveBeenCalledWith(testResponse.iabVendorWhitelist);
          done();
        })
      });

    });

  });

});
