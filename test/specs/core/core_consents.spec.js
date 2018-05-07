import {getVendorConsentData} from '../../../src/scripts/core/core_consents';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import {getPurposeList} from '../../../src/scripts/core/core_vendor_information';

const {ConsentString} = require('consent-string');

describe('consents', () => {

  describe('getVendorConsentData', () => {

    it('should create vendor consent data with correct meta data', () => {
      let expectedTimestamp = Date.now();
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: expectedTimestamp
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.metadata).toBeDefined();

      let metaData = new ConsentString(vendorConsentData.metadata);
      expect(metaData.getVersion()).toBeDefined();
      // expect(metaData.created.getTime()).toEqual(Math.round(expectedTimestamp / 100) * 100);
      expect(metaData.getCmpId()).toEqual(1);
      expect(metaData.getCmpVersion()).toEqual(1);
      expect(metaData.getConsentScreen()).toEqual(1);
      expect(metaData.getVendorListVersion()).toEqual(1);
      expect(metaData.getConsentLanguage()).toEqual('de');

      expect(vendorConsentData.gdprApplies).toBeTruthy();
      expect(vendorConsentData.hasGlobalScope).toBeFalsy();
    });

    it('should create vendor consent data with correct purpose consents if global consent for all purposes is given', () => {
      const expectedConsentValue = 1;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: expectedConsentValue,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.purposeConsents).toBeDefined();

      let purposeIds = Object.keys(vendorConsentData.purposeConsents);
      expect(purposeIds.length).toEqual(getPurposeList().length);
      for (let i = 0; i < purposeIds.length; i++) {
        expect(vendorConsentData.purposeConsents[purposeIds[i]]).toEqual(expectedConsentValue);
      }
    });

    it('should create vendor consent data with correct purpose consents if single consents for purposes are given', () => {
      const expectedConsentValue1 = 1;
      const expectedConsentValue2 = 0;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: {
          1: expectedConsentValue1,
          2: expectedConsentValue2
        },
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.purposeConsents).toBeDefined();

      let purposeIds = Object.keys(vendorConsentData.purposeConsents);
      expect(purposeIds.length).toEqual(2);
      expect(vendorConsentData.purposeConsents[1]).toEqual(expectedConsentValue1);
      expect(vendorConsentData.purposeConsents[2]).toEqual(expectedConsentValue2);
    });

    it('should create vendor consent data with correct vendor consents for given vendor id list', () => {
      let expectedConsentValue = true;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: expectedConsentValue,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.vendorConsents).toBeDefined();

      let vendorIds = Object.keys(vendorConsentData.vendorConsents);
      expect(vendorIds.length).toEqual(2);
      expect(vendorConsentData.vendorConsents[1]).toEqual(expectedConsentValue);
      expect(vendorConsentData.vendorConsents[2]).toEqual(expectedConsentValue);
    });

  });
});

