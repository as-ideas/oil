import * as CoreVendorInformation from '../../src/scripts/core/core_vendor_information';
import VENDOR_LIST from '../fixtures/vendorlist/simple_vendor_list'

export function setupVendorListSpies() {
  spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
  spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
  spyOn(CoreVendorInformation, 'getVendorsToDisplay').and.returnValue(VENDOR_LIST.vendors);
  spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
  spyOn(CoreVendorInformation, 'getLimitedVendorIds').and.returnValue(VENDOR_LIST.vendors.map(({id}) => id));
  spyOn(CoreVendorInformation, 'loadVendorListAndCustomVendorList').and.returnValue(new Promise(resolve => resolve()));
}
