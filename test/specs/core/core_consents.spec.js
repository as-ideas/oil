import { getConsentDataString, getVendorConsentData, buildPurposeConsents, getPublisherConsentData, getLimitedVendorIds } from '../../../src/scripts/core/core_consents';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import { OIL_SPEC } from '../../../src/scripts/core/core_constants';
import { loadVendorList } from '../../../src/scripts/core/core_vendor_information';

const {ConsentString} = require('consent-string');

describe('consents', () => {

  const PURPOSE_ID_1 = 1;
  const PURPOSE_ID_2 = 2;
  const CUSTOM_PURPOSE_ID_1 = 25;
  const CUSTOM_PURPOSE_ID_2 = 26;

  const PURPOSES_ARRAY = [
    {
      id: PURPOSE_ID_1,
      name: 'Information storage and access',
      description: 'The storage of information, or access to information that is already stored, on your device such as advertising identifiers, device identifiers, cookies, and similar technologies.'
    },
    {
      id: PURPOSE_ID_2,
      name: 'Personalisation',
      description: 'The collection and processing of information about your use of this service to subsequently personalise advertising and/or content for you in other contexts, such as on other websites or apps, over time. Typically, the content of the site or app is used to make inferences about your interests, which inform future selection of advertising and/or content.'
    }
  ];

  const CUSTOM_PURPOSES_ARRAY = [
    {
      "id": CUSTOM_PURPOSE_ID_1,
      "name": "Foo",
      "description": "Bar!"
    },{
      "id": CUSTOM_PURPOSE_ID_2,
      "name": "Bar",
      "description": "Baz Lorem Ipsum"
    }
  ];

  describe('getVendorConsentData', () => {

    const VALID_VENDOR_ID_1 = 8;
    const VALID_VENDOR_ID_2 = 12;
    const VALID_VENDOR_ID_3 = 32;
    const INVALID_VENDOR_ID = 20;

    loadVendorList();

    const GLOBAL_VENDORS_ARRAY = [
      {
        id: VALID_VENDOR_ID_1,
        name: 'Emerse Sverige AB',
        policyUrl: 'https://www.emerse.com/privacy-policy/',
        purposeIds: [1, 2, 4],
        legIntPurposeIds: [3, 5],
        featureIds: [1, 2]
      },
      {
        id: VALID_VENDOR_ID_2,
        name: 'BeeswaxIO Corporation',
        policyUrl: 'https://www.beeswax.com/privacy.html',
        purposeIds: [1, 3, 5],
        legIntPurposeIds: [],
        featureIds: [3]
      },
      {
        id: VALID_VENDOR_ID_3,
        name: 'FOO',
        policyUrl: 'https://www.foo.com/bar.html',
        purposeIds: [1, 2, 3],
        legIntPurposeIds: [],
        featureIds: [3]
      }
    ];

    beforeEach(() => {
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(GLOBAL_VENDORS_ARRAY);
    });

    it('should create vendor consent data with correct meta data', () => {
      const EXPECTED_TIMESTAMP = Math.round(Date.now() / 100) * 100; // accuracy: deciseconds only
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: EXPECTED_TIMESTAMP
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.metadata).toBeDefined();

      let metaData = new ConsentString(vendorConsentData.metadata);
      expect(metaData.getVersion()).toBeDefined();
      expect(metaData.getCmpId()).toEqual(OIL_SPEC.CMP_ID);
      expect(metaData.getCmpVersion()).toEqual(OIL_SPEC.CMP_VERSION);
      expect(metaData.getConsentScreen()).toEqual(1);
      expect(metaData.getConsentLanguage()).toEqual('de');
      expect(metaData.getVendorListVersion()).toEqual(CoreVendorInformation.getVendorListVersion());
      expect(metaData.created.getTime()).toEqual(EXPECTED_TIMESTAMP);

      expect(vendorConsentData.gdprApplies).toBeTruthy();
      expect(vendorConsentData.hasGlobalScope).toBeFalsy();
    });

    it('should create vendor consent data with correct purpose consents if global consent for all purposes is given', () => {
      const EXPECTED_CONSENT_VALUE = 1;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: EXPECTED_CONSENT_VALUE,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.purposeConsents).toBeDefined();

      let purposeIds = Object.keys(vendorConsentData.purposeConsents);
      expect(purposeIds.length).toEqual(CoreVendorInformation.getPurposes().length);
      purposeIds.forEach(purposeId => {
        expect(vendorConsentData.purposeConsents[purposeId]).toEqual(EXPECTED_CONSENT_VALUE);
      });
    });

    it('should create vendor consent data with correct purpose consents if privacy in cookie is 1', () => {
      const EXPECTED_CONSENT_VALUE = 1;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([1, 2]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.purposeConsents).toBeDefined();

      let purposeIds = Object.keys(vendorConsentData.purposeConsents);
      expect(purposeIds.length).toEqual(CoreVendorInformation.getPurposes().length);
      purposeIds.forEach(purposeId => {
        expect(vendorConsentData.purposeConsents[purposeId]).toEqual(EXPECTED_CONSENT_VALUE);
      });
    });

    it('should create vendor consent data with correct purpose consents if privacy is object', () => {
      const GIVEN_CONSENT   = 1;
      const REVOKED_CONSENT = 2;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        privacy: {
          [GIVEN_CONSENT]: 1,
          [REVOKED_CONSENT]: 0
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
      expect(vendorConsentData.purposeConsents[GIVEN_CONSENT]).toEqual(1)
      expect(vendorConsentData.purposeConsents[REVOKED_CONSENT]).toEqual(0)
    });

    it('should create vendor consent data with correct purpose consents if single consents for purposes are given', () => {
      const EXPECTED_CONSENT_VALUE1 = true;
      const EXPECTED_CONSENT_VALUE2 = false;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: {
          1: EXPECTED_CONSENT_VALUE1,
          2: EXPECTED_CONSENT_VALUE2
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
      expect(vendorConsentData.purposeConsents[1]).toEqual(EXPECTED_CONSENT_VALUE1);
      expect(vendorConsentData.purposeConsents[2]).toEqual(EXPECTED_CONSENT_VALUE2);
    });

    it('should create vendor consent data with correct vendor consents for given valid vendor id list', () => {
      const EXPECTED_CONSENT_VALUE = true;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: EXPECTED_CONSENT_VALUE,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([VALID_VENDOR_ID_1]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.vendorConsents).toBeDefined();

      let vendorIds = Object.keys(vendorConsentData.vendorConsents);
      expect(vendorIds.length).toEqual(1);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toEqual(EXPECTED_CONSENT_VALUE);
    });

    it('should create vendor consent data with correct vendor consents for given vendor id list with invalid vendor id', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData([INVALID_VENDOR_ID]);
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.vendorConsents).toBeDefined();

      let vendorIds = Object.keys(vendorConsentData.vendorConsents);
      expect(vendorIds.length).toEqual(1);
      expect(vendorConsentData.vendorConsents[INVALID_VENDOR_ID]).toEqual(false);
    });

    it('should create vendor consent data with all vendor consents if no vendor id list is given', () => {
      const EXPECTED_CONSENT_VALUE = true;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: EXPECTED_CONSENT_VALUE,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData).toBeDefined();
      expect(vendorConsentData.vendorConsents).toBeDefined();

      let vendorIds = Object.keys(vendorConsentData.vendorConsents);
      expect(vendorIds.length).toEqual(3);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toEqual(EXPECTED_CONSENT_VALUE);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_2]).toEqual(EXPECTED_CONSENT_VALUE);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_3]).toEqual(EXPECTED_CONSENT_VALUE);
    });

    it('should return correct vendor list when whitelist in config', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });
      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue([VALID_VENDOR_ID_1])
      
      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toEqual(true);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_2]).toEqual(false);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_3]).toEqual(false);
    });

    it('should return correct vendor list when blacklist in config', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });
      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue([VALID_VENDOR_ID_1, VALID_VENDOR_ID_3])
      
      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toEqual(false);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_2]).toEqual(true);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_3]).toEqual(false);
    });

    it('should only consider vendor ids in whitelist', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue([VALID_VENDOR_ID_3, VALID_VENDOR_ID_1])
      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue([VALID_VENDOR_ID_3])
      
      let vendorConsentData = getVendorConsentData();
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_1]).toEqual(true);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_2]).toEqual(false);
      expect(vendorConsentData.vendorConsents[VALID_VENDOR_ID_3]).toEqual(true);
    });

    it('should create proper consent string for whitelisted elements', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: 100000
      });

      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue([VALID_VENDOR_ID_3, VALID_VENDOR_ID_1])
      let vendorConsentData = getVendorConsentData();
      let consentData = new ConsentString(vendorConsentData.metadata);
      expect(consentData.allowedVendorIds).toEqual([VALID_VENDOR_ID_2]);

      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue([VALID_VENDOR_ID_3, VALID_VENDOR_ID_1])
      vendorConsentData = getVendorConsentData();
      consentData = new ConsentString(vendorConsentData.metadata);
      expect(consentData.allowedVendorIds).toEqual([VALID_VENDOR_ID_1, VALID_VENDOR_ID_3]);
    });

  });

  describe('getConsentDataString', () => {

    const VENDOR_ID_1 = 8;
    const VENDOR_ID_2 = 12;

    const GLOBAL_VENDOR_LIST = {
      vendorListVersion: 16,
      lastUpdated: '2018-05-08T15:59:02Z',
      purposes: PURPOSES_ARRAY,
      vendors: [
        {
          id: VENDOR_ID_1,
          name: 'Emerse Sverige AB',
          policyUrl: 'https://www.emerse.com/privacy-policy/',
          purposeIds: [PURPOSE_ID_1, PURPOSE_ID_2],
          legIntPurposeIds: [],
          featureIds: []
        },
        {
          id: VENDOR_ID_2,
          name: 'BeeswaxIO Corporation',
          policyUrl: 'https://www.beeswax.com/privacy.html',
          purposeIds: [PURPOSE_ID_1],
          legIntPurposeIds: [],
          featureIds: []
        }
      ]
    };

    beforeEach(() => {
      spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(GLOBAL_VENDOR_LIST);
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(GLOBAL_VENDOR_LIST.vendors);
      spyOn(CoreVendorInformation, 'getVendorListVersion').and.returnValue(GLOBAL_VENDOR_LIST.vendorListVersion);
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(GLOBAL_VENDOR_LIST.purposes);
    });

    it('should get consent data string with null as ConsentStringVersion', () => {
      const EXPECTED_TIMESTAMP = Math.round(Date.now() / 100) * 100; // accuracy: deciseconds only

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: EXPECTED_TIMESTAMP
      });

      let result = getConsentDataString(null);
      expect(result).toBeDefined();
    });

    it('should get consent data string with correct meta data', () => {
      const EXPECTED_TIMESTAMP = Math.round(Date.now() / 100) * 100; // accuracy: deciseconds only

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: EXPECTED_TIMESTAMP
      });

      let result = getConsentDataString();
      expect(result).toBeDefined();
      expect(result.gdprApplies).toBeTruthy();
      expect(result.hasGlobalScope).toBeFalsy();

      let consentData = new ConsentString(result.consentData);
      expect(consentData).toBeDefined();
      expect(consentData.getVersion()).toBeDefined();
      expect(consentData.getCmpId()).toEqual(OIL_SPEC.CMP_ID);
      expect(consentData.getCmpVersion()).toEqual(OIL_SPEC.CMP_VERSION);
      expect(consentData.getConsentScreen()).toEqual(1);
      expect(consentData.getConsentLanguage()).toEqual('de');
      expect(consentData.getVendorListVersion()).toEqual(CoreVendorInformation.getVendorListVersion());
      expect(consentData.created.getTime()).toEqual(EXPECTED_TIMESTAMP);
    });

    it('should get consent data string with correct purpose consents if global consent for all purposes is given', () => {
      const EXPECTED_CONSENT_VALUE = 1;

      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: EXPECTED_CONSENT_VALUE,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString();
      expect(result).toBeDefined();

      let consentData = new ConsentString(result.consentData);
      expect(consentData).toBeDefined();
      expect(consentData.getPurposesAllowed().length).toEqual(2);
      expect(consentData.getPurposesAllowed()).toContain(PURPOSE_ID_1);
      expect(consentData.getPurposesAllowed()).toContain(PURPOSE_ID_2);
    });

    it('should consent data string with correct purpose consents if single consents for purposes are given', () => {
      const EXPECTED_CONSENT_VALUE1 = true;
      const EXPECTED_CONSENT_VALUE2 = false;
      const PRIVACY = {};

      PRIVACY[PURPOSE_ID_1] = EXPECTED_CONSENT_VALUE1;
      PRIVACY[PURPOSE_ID_2] = EXPECTED_CONSENT_VALUE2;
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: PRIVACY,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString();
      expect(result).toBeDefined();

      let consentData = new ConsentString(result.consentData);
      expect(consentData).toBeDefined();
      expect(consentData.getPurposesAllowed().length).toEqual(1);
      expect(consentData.getPurposesAllowed()).toContain(PURPOSE_ID_1);
    });

    it('should create vendor consent data with correct vendor consents for given consent', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString();
      expect(result).toBeDefined();

      let consentData = new ConsentString(result.consentData);
      expect(consentData).toBeDefined();
      expect(consentData.getVendorsAllowed().length).toEqual(2);
      expect(consentData.getVendorsAllowed()).toContain(VENDOR_ID_1);
      expect(consentData.getVendorsAllowed()).toContain(VENDOR_ID_2);
    });

    it('should create vendor consent data without vendor consents for revoked consent', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        privacy: 0,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString();
      expect(result).toBeDefined();

      let consentData = new ConsentString(result.consentData);
      expect(consentData).toBeDefined();
      expect(consentData.getVendorsAllowed().length).toEqual(0);
    });

    it('should create vendor consent data with vendor consents when privacy is 1 even for revoked consent', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString();
      expect(result).toBeDefined();

      let consentData = new ConsentString(result.consentData);
      expect(consentData).toBeDefined();
      expect(consentData.getVendorsAllowed().length).toEqual(2);
    });

    it('should not create vendor consent data if invalid consent string version is requested', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString("ThisIsNotAValidVersionString");
      expect(result).not.toBeDefined();
    });

    it('should not create vendor consent data if wrong consent string version is requested', () => {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });

      let result = getConsentDataString("99999");
      expect(result).not.toBeDefined();
    });

  });

  describe('getPublisherConsentData', () => {
    it('should return default info object', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });
      spyOn(CoreConfig, 'getCustomPurposes').and.returnValue(CUSTOM_PURPOSES_ARRAY);
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(PURPOSES_ARRAY);

      let result = getPublisherConsentData();

      expect(result.metadata).toBeDefined();
      expect(result.gdprApplies).toBeTruthy();
      expect(result.hasGlobalScope).toEqual(false);
      expect(result.standardPurposeConsents).toBeDefined();
      expect(result.customPurposeConsents).toBeDefined();

      expect(result.standardPurposeConsents[PURPOSE_ID_1]).toEqual(1);
      expect(result.standardPurposeConsents[PURPOSE_ID_2]).toEqual(1);
      expect(result.standardPurposeConsents[CUSTOM_PURPOSE_ID_1]).toBeFalsy();
      expect(result.customPurposeConsents[CUSTOM_PURPOSE_ID_1]).toEqual(1);
      expect(result.customPurposeConsents[CUSTOM_PURPOSE_ID_2]).toEqual(1);
      expect(result.customPurposeConsents[PURPOSE_ID_1]).toBeFalsy();
    });

    it('should return info object with only purposes that are inside purposeIds array', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01',
        localeVariantVersion: 1,
        timestamp: Date.now()
      });
      spyOn(CoreConfig, 'getCustomPurposes').and.returnValue(CUSTOM_PURPOSES_ARRAY);
      let result = getPublisherConsentData([PURPOSE_ID_1,CUSTOM_PURPOSE_ID_1]);

      expect(result.standardPurposeConsents[PURPOSE_ID_1]).toEqual(1);
      expect(result.standardPurposeConsents[PURPOSE_ID_2]).toBeFalsy();
      expect(result.customPurposeConsents[CUSTOM_PURPOSE_ID_1]).toEqual(1);
      expect(result.customPurposeConsents[CUSTOM_PURPOSE_ID_2]).toBeFalsy();
    });
  });

  describe('buildPurposeConsents', function() {
    it('should return correct consent object', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: 1,
        version: 'aVersion',
        localeVariantName: 'deDE_01'
      });

      let result = buildPurposeConsents(PURPOSES_ARRAY);
      expect(result[PURPOSE_ID_1]).toEqual(1);
      expect(result[PURPOSE_ID_2]).toEqual(1);

      result = buildPurposeConsents(CUSTOM_PURPOSES_ARRAY);
      expect(result[CUSTOM_PURPOSE_ID_1]).toEqual(1);
      expect(result[CUSTOM_PURPOSE_ID_2]).toEqual(1);
    });

    it('should return 0 for each purpose when privacy=0', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: false,
        privacy: 0,
        version: 'aVersion',
        localeVariantName: 'deDE_01'
      });

      let result = buildPurposeConsents(PURPOSES_ARRAY);
      expect(result[PURPOSE_ID_1]).toEqual(0);
      expect(result[PURPOSE_ID_2]).toEqual(0);
    });

    it('should return cookie.privacy if it is object', function() {
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue({
        opt_in: true,
        privacy: {
          foo: 'bar'
        },
        version: 'aVersion',
        localeVariantName: 'deDE_01'
      });

      let result = buildPurposeConsents([]);
      expect(result.foo).toEqual('bar');
    });
  });

  describe('getLimitedVendorIds', function() {

    loadVendorList();

    const GLOBAL_VENDORS_ARRAY = [{
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
      {
        id: 12
      },
      {
        id: 15
      }];

    beforeEach(() => {
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(GLOBAL_VENDORS_ARRAY);
    })

    it('should return all vendors when whitelist and blacklist empty or null', function() {
      let result = getLimitedVendorIds();
      expect(result.length).toEqual(5);
    });

    it('should return vendor ids from global config whitelist', function() {
      spyOn(CoreConfig, 'getIabVendorWhitelist').and.returnValue([2,3,15])
      let result = getLimitedVendorIds();
      expect(result.toString()).toEqual("2,3,15");
    });

    it('should return all vendor ids expect the ones in global config blacklist', function() {
      spyOn(CoreConfig, 'getIabVendorBlacklist').and.returnValue([2,15])
      let result = getLimitedVendorIds();
      expect(result.toString()).toEqual("1,3,12");
    });

  });
});

