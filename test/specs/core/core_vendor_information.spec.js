import * as CoreUtils from '../../../src/scripts/core/core_utils';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import {clearVendorListCache, loadVendorList} from '../../../src/scripts/core/core_vendor_information';
import VENDOR_LIST from '../../fixtures/vendorlist/simple_vendor_list.json';

describe('core_vendor_information', () => {

  beforeEach(() => {
    clearVendorListCache();
  });

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

  it('should use default vendor list if IAB vendor list url is not configured', (done) => {
    spyOn(CoreUtils, 'fetchJsonData').and.callThrough();
    spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue(undefined);

    loadVendorList().then((retrievedVendorList) => {
      expect(CoreUtils.fetchJsonData).not.toHaveBeenCalled();
      expect(retrievedVendorList.vendorListVersion).toEqual(27);
      expect(areVendorsSortedById(retrievedVendorList)).toBeTruthy();
      done();
    });
  });

  it('should use default vendor list if vendor list fetching fails', (done) => {
    spyOn(CoreUtils, 'fetchJsonData').and.returnValue(new Promise((resolve, reject) => reject(new Error("something went wrong"))));
    spyOn(CoreConfig, 'getIabVendorListUrl').and.returnValue("https://iab.vendor.list.url");

    loadVendorList().then((retrievedVendorList) => {
      expect(CoreUtils.fetchJsonData).toHaveBeenCalled();
      expect(retrievedVendorList.vendorListVersion).toEqual(27);
      expect(areVendorsSortedById(retrievedVendorList)).toBeTruthy();
      done();
    })
  });

  function areVendorsSortedById(vendorList) {
    let vendorListCopy = JSON.parse(JSON.stringify(vendorList));
    vendorListCopy.vendors = vendorListCopy.vendors.sort((leftVendor, rightVendor) => leftVendor.id - rightVendor.id);
    // the following comparison method is sufficient because order of elements in compared objects is expected to be the same
    return JSON.stringify(vendorList) === JSON.stringify(vendorListCopy);
  }
});
