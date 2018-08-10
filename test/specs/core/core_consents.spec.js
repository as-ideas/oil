import { getConsentDataString, getPublisherConsentData, getVendorConsentData } from '../../../src/scripts/core/core_consents';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import { OIL_SPEC } from '../../../src/scripts/core/core_constants';
import { resetOil } from '../../test-utils/utils_reset';

const {ConsentString} = require('consent-string');

describe('consents', () => {

  const VERSION = '1.0.0';
  const LOCALE_VARIANT_DE_NAME = 'deDE_01';
  const LOCALE_VARIANT_DE_VERSION = 2;

  // CONSENT_STRING value represents
  // {
  //   "cookieVersion": 1,
  //   "created": "2018-06-01T07:26:03.700Z",
  //   "lastUpdated": "2018-06-01T07:26:03.700Z",
  //   "cmpId": 80,
  //   "cmpVersion": 1,
  //   "consentScreen": 1,
  //   "consentLanguage": "EN",
  //   "vendorListVersion": 17,
  //   "purposeIdBitString": "110110000000000000000000",
  //   "maxVendorId": 24,
  //   "isRange": false,
  //   "vendorIdBitString": "000000000001000000000001"
  // }
  // see http://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-decoder
  const CONSENT_STRING = 'BOOqZJ1OOqZJ1BQABBENAR2AAAABgACACA';
  const TIMESTAMP = Date.parse('2018-06-01T07:26:03.700Z');
  const VENDOR_LIST_VERSION = 17;

  const PURPOSE_ID_1 = 1;
  const PURPOSE_ID_2 = 2;
  const PURPOSE_ID_3 = 3;
  const PURPOSE_ID_4 = 4;
  const PURPOSE_ID_5 = 5;
  const PURPOSES = [
    {
      id: PURPOSE_ID_1,
      name: 'Information storage and access',
      description: 'The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies.'
    },
    {
      id: PURPOSE_ID_2,
      name: 'Personalisation',
      description: 'The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content.'
    },
    {
      'id': PURPOSE_ID_3,
      'name': 'Ad selection, delivery, reporting',
      'description': 'The collection of information, and combination with previously collected information, to select and deliver advertisements for you, and to measure the delivery and effectiveness of such advertisements. This includes using previously collected information about your interests to select ads, processing data about what advertisements were shown, how often they were shown, when and where they were shown, and whether you took any action related to the advertisement, including for example clicking an ad or making a purchase. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as websites or apps, over time.'
    },
    {
      'id': PURPOSE_ID_4,
      'name': 'Content selection, delivery, reporting',
      'description': 'The collection of information, and combination with previously collected information, to select and deliver content for you, and to measure the delivery and effectiveness of such content. This includes using previously collected information about your interests to select content, processing data about what content was shown, how often or how long it was shown, when and where it was shown, and whether the you took any action related to the content, including for example clicking on content. This does not include personalisation, which is the collection and processing of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, such as websites or apps, over time.'
    },
    {
      'id': PURPOSE_ID_5,
      'name': 'Measurement',
      'description': 'The collection of information about your use of the content, and combination with previously collected information, used to measure, understand, and report on your usage of the service. This does not include personalisation, the collection of information about your use of this service to subsequently personalise content and/or advertising for you in other contexts, i.e. on other service, such as websites or apps, over time.'
    }
  ];

  const CUSTOM_PURPOSE_ID_1 = 25;
  const CUSTOM_PURPOSE_ID_2 = 26;
  const CUSTOM_PURPOSES = [
    {
      "id": CUSTOM_PURPOSE_ID_1,
      "name": "Foo",
      "description": "Bar!"
    }, {
      "id": CUSTOM_PURPOSE_ID_2,
      "name": "Bar",
      "description": "Baz Lorem Ipsum"
    }
  ];

  const VALID_VENDOR_ID_1 = 12;
  const VALID_VENDOR_ID_2 = 13;
  const VALID_VENDOR_ID_3 = 24;
  const INVALID_VENDOR_ID = 100;
  const VENDORS = [
    {
      id: VALID_VENDOR_ID_1,
      name: 'Emerse Sverige AB',
      policyUrl: 'https://www.emerse.com/privacy-policy/',
    },
    {
      id: VALID_VENDOR_ID_2,
      name: 'Sovrn Holdings Inc',
      policyUrl: 'https://www.sovrn.com/sovrn-privacy',
    },
    {
      id: VALID_VENDOR_ID_3,
      name: 'BeeswaxIO Corporation',
      policyUrl: 'https://www.beeswax.com/privacy.html',
    }
  ];

  const COOKIE = {
    opt_in: true,
    version: VERSION,
    localeVariantName: LOCALE_VARIANT_DE_NAME,
    localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
    customPurposes: [CUSTOM_PURPOSE_ID_1],
    consentData: new ConsentString(CONSENT_STRING),
    consentString: CONSENT_STRING
  };

  beforeEach(() => resetOil());

  describe('getting vendor consent data', () => {
    beforeEach(() => {
      spyOn(CoreVendorInformation, 'getLimitedVendorIds').and.returnValue(VENDORS.map(({id}) => id));
      spyOn(CoreVendorInformation, 'getPurposeIds').and.returnValue(PURPOSES.map(({id}) => id));
    });

    it('should return vendor consent data with correct meta data', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.metadata).toBeDefined();

      let metaData = new ConsentString.decodeMetadataString(vendorConsentData.metadata);
      expect(metaData.version).toBeDefined();
      expect(metaData.cmpId).toEqual(OIL_SPEC.CMP_ID);
      expect(metaData.cmpVersion).toEqual(OIL_SPEC.CMP_VERSION);
      expect(metaData.consentScreen).toEqual(1);
      expect(metaData.vendorListVersion).toEqual(VENDOR_LIST_VERSION);
      expect(metaData.created.getTime()).toEqual(TIMESTAMP);
      expect(metaData.lastUpdated.getTime()).toEqual(TIMESTAMP);

      expect(vendorConsentData.gdprApplies).toBeTruthy();
      expect(vendorConsentData.hasGlobalScope).toBeFalsy();
    });

    it('should return vendor consent data with correct purpose consents', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.purposeConsents).toBeDefined();

      let purposeIds = Object.keys(vendorConsentData.purposeConsents);
      expect(purposeIds.length).toEqual(PURPOSES.length);
      expect(vendorConsentData.purposeConsents[PURPOSE_ID_1]).toBeTruthy();
      expect(vendorConsentData.purposeConsents[PURPOSE_ID_2]).toBeTruthy();
      expect(vendorConsentData.purposeConsents[PURPOSE_ID_3]).toBeFalsy();
      expect(vendorConsentData.purposeConsents[PURPOSE_ID_4]).toBeTruthy();
      expect(vendorConsentData.purposeConsents[PURPOSE_ID_5]).toBeTruthy();
    });

    it('should return vendor consent data with correct vendor consents for given vendor id list', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let requestedVendorIds = [VALID_VENDOR_ID_1, VALID_VENDOR_ID_2, VALID_VENDOR_ID_3, INVALID_VENDOR_ID];
      let vendorConsentData = getVendorConsentData(requestedVendorIds);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.vendorConsents).toBeDefined();

      let vendorIds = Object.keys(vendorConsentData.vendorConsents);
      expect(vendorIds.length).toEqual(requestedVendorIds.length);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toBeTruthy();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_2]).toBeFalsy();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_3]).toBeTruthy();
      expect(vendorConsentData.vendorConsents[INVALID_VENDOR_ID]).toBeFalsy();
    });

    it('should return vendor consent data with all vendor consents if no vendor id list is given', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.vendorConsents).toBeDefined();

      let vendorIds = Object.keys(vendorConsentData.vendorConsents);
      expect(vendorIds.length).toEqual(VENDORS.length);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toBeTruthy();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_2]).toBeFalsy();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_3]).toBeTruthy();
    });

    it('should return nothing if cookie cannot be retrieved', () => {
      spyOn(CoreCookies, 'getSoiCookie');

      expect(getVendorConsentData()).not.toBeDefined();
    });

    it('should return nothing if cookie does not contain any consent data', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        version: VERSION,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        customPurposes: [CUSTOM_PURPOSE_ID_1]
      });

      expect(getVendorConsentData()).not.toBeDefined();
    });
  });

  describe('getting consent data string', () => {

    it('should return consent data string if no consent string version is requested', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let result = getConsentDataString();

      expect(result.gdprApplies).toBeTruthy();
      expect(result.hasGlobalScope).toBeFalsy();
      expect(result.consentData).toEqual(CONSENT_STRING);
    });

    it('should return consent data string if valid consent string version is requested', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let result = getConsentDataString(OIL_SPEC.LATEST_CONSENT_STRING_VERSION);

      expect(result.gdprApplies).toBeTruthy();
      expect(result.hasGlobalScope).toBeFalsy();
      expect(result.consentData).toEqual(CONSENT_STRING);
    });

    it('should return nothing if invalid consent string version is requested', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let result = getConsentDataString("ThisIsNotAValidVersionString");
      expect(result).not.toBeDefined();
    });

    it('should return nothing if wrong consent string version is requested', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let result = getConsentDataString("99999");
      expect(result).not.toBeDefined();
    });

    it('should return nothing if cookie cannot be retrieved', () => {
      spyOn(CoreCookies, 'getSoiCookie');

      expect(getConsentDataString()).not.toBeDefined();
    });

    it('should return nothing if cookie does not contain any consent data', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        version: VERSION,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        customPurposes: [CUSTOM_PURPOSE_ID_1]
      });

      expect(getConsentDataString()).not.toBeDefined();
    });

  });

  describe('getting publisher consent data', () => {

    beforeEach(() => {
      spyOn(CoreConfig, 'getCustomPurposeIds').and.returnValue(CUSTOM_PURPOSES.map(({id}) => id));
      spyOn(CoreVendorInformation, 'getPurposeIds').and.returnValue(PURPOSES.map(({id}) => id));
    });

    it('should return publisher consent data with correct meta data', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let publisherConsentData = getPublisherConsentData();
      expect(publisherConsentData).toBeDefined();
      expect(publisherConsentData.metadata).toBeDefined();

      let metaData = new ConsentString.decodeMetadataString(publisherConsentData.metadata);
      expect(metaData.version).toBeDefined();
      expect(metaData.cmpId).toEqual(OIL_SPEC.CMP_ID);
      expect(metaData.cmpVersion).toEqual(OIL_SPEC.CMP_VERSION);
      expect(metaData.consentScreen).toEqual(1);
      expect(metaData.vendorListVersion).toEqual(VENDOR_LIST_VERSION);
      expect(metaData.created.getTime()).toEqual(TIMESTAMP);
      expect(metaData.lastUpdated.getTime()).toEqual(TIMESTAMP);

      expect(publisherConsentData.gdprApplies).toBeTruthy();
      expect(publisherConsentData.hasGlobalScope).toBeFalsy();
    });

    it('should return publisher consent data with correct purpose consents', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let publisherConsentData = getPublisherConsentData();
      expect(publisherConsentData).toBeDefined();

      expect(publisherConsentData.standardPurposeConsents).toBeDefined();
      let standardPurposeIds = Object.keys(publisherConsentData.standardPurposeConsents);
      expect(standardPurposeIds.length).toEqual(PURPOSES.length);
      expect(publisherConsentData.standardPurposeConsents[PURPOSE_ID_1]).toBeTruthy();
      expect(publisherConsentData.standardPurposeConsents[PURPOSE_ID_2]).toBeTruthy();
      expect(publisherConsentData.standardPurposeConsents[PURPOSE_ID_3]).toBeFalsy();
      expect(publisherConsentData.standardPurposeConsents[PURPOSE_ID_4]).toBeTruthy();
      expect(publisherConsentData.standardPurposeConsents[PURPOSE_ID_5]).toBeTruthy();

      expect(publisherConsentData.customPurposeConsents).toBeDefined();
      let customPurposeIds = Object.keys(publisherConsentData.customPurposeConsents);
      expect(customPurposeIds.length).toEqual(CUSTOM_PURPOSES.length);
      expect(publisherConsentData.customPurposeConsents[CUSTOM_PURPOSE_ID_1]).toBeTruthy();
      expect(publisherConsentData.customPurposeConsents[CUSTOM_PURPOSE_ID_2]).toBeFalsy();
    });

    it('should return publisher consent data with correct purpose consents for given purpose id list', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(COOKIE);

      let publisherConsentData = getPublisherConsentData([PURPOSE_ID_1, CUSTOM_PURPOSE_ID_1]);

      expect(publisherConsentData.standardPurposeConsents).toBeDefined();
      let standardPurposeIds = Object.keys(publisherConsentData.standardPurposeConsents);
      expect(standardPurposeIds.length).toEqual(1);
      expect(publisherConsentData.standardPurposeConsents[PURPOSE_ID_1]).toBeTruthy();

      expect(publisherConsentData.customPurposeConsents).toBeDefined();
      let customPurposeIds = Object.keys(publisherConsentData.customPurposeConsents);
      expect(customPurposeIds.length).toEqual(1);
      expect(publisherConsentData.customPurposeConsents[CUSTOM_PURPOSE_ID_1]).toBeTruthy();
    });

    it('should return nothing if cookie cannot be retrieved', () => {
      spyOn(CoreCookies, 'getSoiCookie');

      expect(getPublisherConsentData()).not.toBeDefined();
    });

    it('should return nothing if cookie does not contain any consent data', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        version: VERSION,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        customPurposes: [CUSTOM_PURPOSE_ID_1]
      });

      expect(getPublisherConsentData()).not.toBeDefined();
    });

    it('should return nothing if cookie does not contain any custom purposes data', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        version: VERSION,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        consentData: new ConsentString(CONSENT_STRING),
        consentString: CONSENT_STRING
      });

      expect(getPublisherConsentData()).not.toBeDefined();
    });

    it('should return gdprApplies false when got gdprApplies false from configuration', () => {
      spyOn(CoreConfig, 'gdprApplies').and.returnValue(false);
      let publisherConsentData = getPublisherConsentData();

      expect(publisherConsentData.gdprApplies).toBeFalsy();
      expect(getVendorConsentData().gdprApplies).toBeFalsy();
      expect(getConsentDataString().gdprApplies).toBeFalsy();
    });

  });

});

