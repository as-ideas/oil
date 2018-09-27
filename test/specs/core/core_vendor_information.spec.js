import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import {
  DEFAULT_VENDOR_LIST,
  getLimitedVendorIds,
  getPurposeIds,
  getPurposes,
  getVendorIds,
  getVendorList,
  getVendorListVersion,
  getVendors,
  getLimitedVendors,
  getVendorsToDisplay,
  loadVendorList,
  cachedVendorList,
  pendingVendorlistPromise
} from '../../../src/scripts/core/core_vendor_information';
import VENDOR_LIST from '../../fixtures/vendorlist/simple_vendor_list.json';
import { resetOil } from '../../test-utils/utils_reset';

describe('core_vendor_information', () => {

  const WHITELISTED_VENDORS = [1,2];
  const BLACKLISTED_VENDORS = Array.apply(null, {length: (DEFAULT_VENDOR_LIST.maxVendorId-2)}).map(Number.call, Number).slice(1);

  beforeEach(() => resetOil());

  describe('loading vendor list', () => {

    it('should load vendor list from remote url', (done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");

      loadVendorList().then((retrievedVendorList) => {
        expect(retrievedVendorList.vendorListVersion).toEqual(17);
        expect(retrievedVendorList).toEqual(VENDOR_LIST);
        expect(areVendorsSortedById(retrievedVendorList)).toBeTruthy();
        done();
      });
    });

    it('should use cached vendor list if there is one', (done) => {
      let fetchSpy = spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");

      loadVendorList().then(() => {
        expect(CoreUtils.fetchJsonData).toHaveBeenCalled();
        fetchSpy.calls.reset();

        loadVendorList().then(() => {
          expect(CoreUtils.fetchJsonData).not.toHaveBeenCalled();
          done();
        });
      });
    });

    it('should wait for cached vendor list if request is already started', (done) => {
      let fetchSpy = spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");

      expect(pendingVendorlistPromise).toBeNull();
      expect(cachedVendorList).toBeUndefined();
      loadVendorList().then((retrievedVendorList) => {
        expect(retrievedVendorList.vendorListVersion).toEqual(VENDOR_LIST.vendorListVersion);
        expect(retrievedVendorList).toEqual(VENDOR_LIST);
        expect(cachedVendorList).toBeDefined();
      });
      expect(cachedVendorList).toBeUndefined();
      expect(pendingVendorlistPromise).toBeDefined();
      loadVendorList().then((retrievedVendorList) => {
        expect(retrievedVendorList.vendorListVersion).toEqual(VENDOR_LIST.vendorListVersion);
        expect(retrievedVendorList).toEqual(VENDOR_LIST);
      });
      expect(cachedVendorList).toBeUndefined();
      loadVendorList().then((retrievedVendorList) => {
        expect(retrievedVendorList.vendorListVersion).toEqual(VENDOR_LIST.vendorListVersion);
        expect(retrievedVendorList).toEqual(VENDOR_LIST);
      });
      expect(fetchSpy.calls.count()).toBe(1);

      done();
    });

    it('should use default vendor list if vendor list fetching fails', (done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve, reject) => reject(new Error("something went wrong"))));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");

      loadVendorList().then((retrievedVendorList) => {
        expect(CoreUtils.fetchJsonData).toHaveBeenCalled();
        expect(retrievedVendorList.vendorListVersion).toEqual(DEFAULT_VENDOR_LIST.vendorListVersion);
        done();
      })
    });

  });

  describe('getting vendor list data for already loaded vendor list', () => {

    beforeEach((done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");
      loadVendorList().then(() => {
        done()
      });
    });

    it('should return cached vendor list', () => {
      let vendorList = getVendorList();

      expect(vendorList).toBeDefined();
      expect(vendorList.vendorListVersion).toEqual(VENDOR_LIST.vendorListVersion);
      expect(vendorList.lastUpdated).toEqual(VENDOR_LIST.lastUpdated);
      expect(vendorList.vendors).toEqual(VENDOR_LIST.vendors);
      expect(vendorList.purposes).toEqual(VENDOR_LIST.purposes);
      expect(vendorList.features).toEqual(VENDOR_LIST.features);
    });

    it('should return purposes from cached vendor list', () => {
      expect(getPurposes()).toEqual(VENDOR_LIST.purposes);
    });

    it('should return purpose ids from cached vendor list', () => {
      expect(getPurposeIds()).toEqual(VENDOR_LIST.purposes.map(({id}) => id));
    });

    it('should return vendors from cached vendor list', () => {
      expect(getVendors()).toEqual(VENDOR_LIST.vendors);
    });

    it('should return vendor ids from cached vendor list', () => {
      expect(getVendorIds()).toEqual(VENDOR_LIST.vendors.map(({id}) => id));
    });

    it('should return vendor list version from cached vendor list', () => {
      expect(getVendorListVersion()).toEqual(VENDOR_LIST.vendorListVersion);
    });
  });

  describe('getting vendor list data for default vendor list (vendor list not loaded yet)', () => {

    it('should return default vendor list', () => {
      let vendorList = getVendorList();

      expect(vendorList).toBeDefined();
      expect(vendorList.vendorListVersion).toEqual(DEFAULT_VENDOR_LIST.vendorListVersion);
      expect(vendorList.lastUpdated).toEqual(DEFAULT_VENDOR_LIST.lastUpdated);
      expect(vendorList.purposes).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
      expect(vendorList.features.length).toEqual(0);
      expect(vendorList.vendors.length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
      expect(vendorList.vendors[0]).toEqual({id: 1});
      expect(vendorList.vendors[DEFAULT_VENDOR_LIST.maxVendorId - 1]).toEqual({id: DEFAULT_VENDOR_LIST.maxVendorId});
    });

    it('should return purposes from default vendor list', () => {
      expect(getPurposes()).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
    });

    it('should return purpose ids from default vendor list', () => {
      expect(getPurposeIds()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return vendors from default vendor list', () => {
      let vendors = getVendors();
      expect(vendors.length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
      expect(vendors[0]).toEqual({id: 1});
      expect(vendors[DEFAULT_VENDOR_LIST.maxVendorId - 1]).toEqual({id: DEFAULT_VENDOR_LIST.maxVendorId});
    });

    it('should return vendor ids from default vendor list', () => {
      expect(getVendorIds()).toEqual(buildDefaultVendorIdList(DEFAULT_VENDOR_LIST.maxVendorId));
    });

    it('should return vendor list version from default vendor list', () => {
      expect(getVendorListVersion()).toEqual(DEFAULT_VENDOR_LIST.vendorListVersion);
    });
  });

  describe('getting vendor list data for default vendor list (vendor list loading failed)', () => {

    beforeEach((done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve, reject) => reject(new Error("something went wrong"))));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");
      loadVendorList().then(() => {
        done()
      });
    });

    it('should return default vendor list', () => {
      let vendorList = getVendorList();

      expect(vendorList).toBeDefined();
      expect(vendorList.vendorListVersion).toEqual(DEFAULT_VENDOR_LIST.vendorListVersion);
      expect(vendorList.lastUpdated).toEqual(DEFAULT_VENDOR_LIST.lastUpdated);
      expect(vendorList.purposes).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
      expect(vendorList.features.length).toEqual(0);
      expect(vendorList.vendors.length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
      expect(vendorList.vendors[0]).toEqual({id: 1});
      expect(vendorList.vendors[DEFAULT_VENDOR_LIST.maxVendorId - 1]).toEqual({id: DEFAULT_VENDOR_LIST.maxVendorId});
    });

    it('should return purposes from default vendor list', () => {
      expect(getPurposes()).toEqual([{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]);
    });

    it('should return purpose ids from default vendor list', () => {
      expect(getPurposeIds()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return vendors from default vendor list', () => {
      let vendors = getVendors();
      expect(vendors.length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
      expect(vendors[0]).toEqual({id: 1});
      expect(vendors[DEFAULT_VENDOR_LIST.maxVendorId - 1]).toEqual({id: DEFAULT_VENDOR_LIST.maxVendorId});
    });

    it('should return vendor ids from default vendor list', () => {
      expect(getVendorIds()).toEqual(buildDefaultVendorIdList(DEFAULT_VENDOR_LIST.maxVendorId));
    });

    it('should return vendor list version from default vendor list', () => {
      expect(getVendorListVersion()).toEqual(DEFAULT_VENDOR_LIST.vendorListVersion);
    });
  });

  describe('getting limited vendor ids from fetched vendor list', function () {

    beforeEach((done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");
      loadVendorList().then(() => done());
    });

    it('should return all vendors when whitelist and blacklist empty or null', function () {
      let result = getLimitedVendorIds();
      expect(result.length).toEqual(2);
    });

    it('should return vendor ids from global config whitelist', function () {
      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue([12]);
      let result = getLimitedVendorIds();
      expect(result).toEqual([12]);
    });

    it('should return all vendor ids except the ones in global config blacklist', function () {
      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue([24]);
      let result = getLimitedVendorIds();
      expect(result).toEqual([12]);
    });
  });

  describe('getting limited vendor ids from default vendor list', function () {

    it('should return all vendors when whitelist and blacklist empty or null', function () {
      let result = getLimitedVendorIds();
      expect(result.length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
    });

    it('should return vendor ids from global config whitelist', function () {
      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue([3]);
      let result = getLimitedVendorIds();
      expect(result).toEqual([3]);
    });

    it('should return all vendor ids except the ones in global config blacklist', function () {
      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue(buildDefaultVendorIdList(DEFAULT_VENDOR_LIST.maxVendorId - 1));
      let result = getLimitedVendorIds();
      expect(result).toEqual([DEFAULT_VENDOR_LIST.maxVendorId]);
    });

  });

  describe('getting vendor list information', () => {

    it('should return default purpose id list if vendor list was not loaded yet', () => {
      const expectedPurposes = [{'id': 1}, {'id': 2}, {'id': 3}, {'id': 4}, {'id': 5}];
      expect(getPurposes()).toEqual(expectedPurposes);
    });

    it('should return default vendor id list if vendor list was not loaded yet', () => {
      let vendors = getVendors();
      expect(vendors.length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
      expect(vendors[0]).toEqual({'id': 1});
    });

    it('should return purpose id list if vendor list was already loaded', (done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");
      loadVendorList().then(() => {
        expect(getPurposes()).toEqual(VENDOR_LIST.purposes);
        done();
      });
    });

    it('should return vendor id list if vendor list was already loaded', (done) => {
      spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve) => resolve(VENDOR_LIST)));
      spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");
      loadVendorList().then(() => {
        expect(getVendors()).toEqual(VENDOR_LIST.vendors);
        done();
      });
    });
  });

  describe('getLimitedVendors', function() {

    it('returns regular vendors when no whitelist or blacklist exists', function() {
      spyOn(CoreConfig, 'getShowLimitedVendors').and.returnValue(true);
      expect(getLimitedVendors().length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId);
    });

    it('returns limited vendors when getShowLimitedVendors is true and whitelist exists', function() {
      spyOn(CoreConfig, 'getShowLimitedVendors').and.returnValue(true);
      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue(WHITELISTED_VENDORS);
      expect(getLimitedVendors().length).toEqual(WHITELISTED_VENDORS.length);
    });

    it('returns limited vendors when getShowLimitedVendors is true and blacklist exists', function() {
      spyOn(CoreConfig, 'getShowLimitedVendors').and.returnValue(true);
      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue(BLACKLISTED_VENDORS);
      expect(getLimitedVendors().length).toEqual(DEFAULT_VENDOR_LIST.maxVendorId - BLACKLISTED_VENDORS.length);
    });

  });

  describe('getVendorsToDisplay', function() {

    it('should return full vendor list when configuration parameter show_limited_vendors_only is false', function() {
      spyOn(CoreConfig, 'getShowLimitedVendors').and.returnValue(false);
      let result = getVendorsToDisplay();
      expect(result.length).toEqual(380);
    });

    it('should return limited vendor list when configuration parameter show_limited_vendors_only is true', function() {
      spyOn(CoreConfig, 'getShowLimitedVendors').and.returnValue(true);
      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue(WHITELISTED_VENDORS);
      let result = getVendorsToDisplay();
      expect(result.length).toEqual(WHITELISTED_VENDORS.length);
    });

  });

  function buildDefaultVendorIdList(maxVendorId) {
    return ((a, b) => {
      while (a--) b[a] = a + 1;
      return b
    })(maxVendorId, []);
  }

  function areVendorsSortedById(vendorList) {
    let vendorListCopy = JSON.parse(JSON.stringify(vendorList));
    vendorListCopy.vendors = vendorListCopy.vendors.sort((leftVendor, rightVendor) => leftVendor.id - rightVendor.id);
    // the following comparison method is sufficient because order of elements in compared objects is expected to be the same
    return JSON.stringify(vendorList) === JSON.stringify(vendorListCopy);
  }

});
