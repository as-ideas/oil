import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { oilGroupListTemplate } from '../../../src/scripts/poi-list/oil.list';
import { resetOil } from '../../test-utils/utils_reset';
import { getGroupList } from '../../../src/scripts/poi-list/poi.group.list';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreConfig from '../../../src/scripts/core/core_config';

require('jasmine-ajax');

describe('the company list', () => {

  beforeEach(() => {
    resetOil();
  });

  describe('template', () => {
    it('should be loaded with the given elements', () => {
      loadFixture('config/given.config.example.labels.html');
      let result = oilGroupListTemplate(['a', 'b']);
      expect(result).toEqualWithDiff(readFixture('gold-master/company-list.html'));
    });
  });

  describe('with POI-Blacklist/Whitelist stored in GroupList', () => {

    const testResponse = {
      companyList: [
        "Supercompany 1",
        "Boring Co. 2",
        "Ultra Inc.",
        "Special Tech Ltd."
      ],
      "iabVendorBlacklist": [1, 2, 3]
    };

    it('should be loaded with POI enabled', (done) => {
      loadFixture('config/given.config.poi.html');

      let fetchSpy = spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(testResponse)));
      let configSpy = spyOn(CoreConfig, 'isPoiActive').and.returnValue(true);
      getGroupList()
        .then((result) => {
          expect(result).toBe(testResponse.companyList);
        })
        .finally(() => {
          fetchSpy.calls.reset();
          configSpy.calls.reset();
          done();
        });
    });

    it('should not be loaded if POI is disabled', (done) => {
      loadFixture('config/given.config.example.labels.html');
      getGroupList()
        .then((result) => {
          expect(result).toBeUndefined();
          done();
        });
    });
  });


});
