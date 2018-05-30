import Cookie from 'js-cookie';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import {OilVersion} from '../../../src/scripts/core/core_utils';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import {
  getOilCookie,
  getPurposesWithConsent,
  getSoiCookie,
  hasOutdatedOilCookie,
  isBrowserCookieEnabled,
  removeHubCookie,
  setSoiCookie,
  setSoiCookieWithConsentString,
} from '../../../src/scripts/core/core_cookies';
import {OIL_SPEC} from '../../../src/scripts/core/core_constants';
import VENDOR_LIST from '../../fixtures/vendorlist/simple_vendor_list.json';

const {ConsentString} = require('consent-string');

describe('core cookies', () => {

  beforeEach(() => {
    spyOn(OilVersion, 'get').and.returnValue('1.0.0');
  });

  const LANGUAGE_DE = 'de';
  const LANGUAGE_EN = 'en';
  const LOCALE_VARIANT_DE_NAME = 'deDE_01';
  const LOCALE_VARIANT_DE_VERSION = 1;
  const LOCALE_VARIANT_EN_NAME = 'enEN_01';
  const LOCALE_VARIANT_EN_VERSION = 2;
  const OTHER_CMP_VERSION = 99999;

  describe('get oil cookie', () => {

    beforeEach(() => {
      spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
    });

    it('should get cookie if it exists and is valid', () => {
      let testData = {
        language: LANGUAGE_DE,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        allowedPurposeIds: [1, 2, 3, 4, 5],
        allowedVendorIds: [12, 24],
      };
      givenThatOilCookieIsSet(testData);
      let cookieConfig = givenOilCookieConfig(testData);

      let retrievedCookie = getOilCookie(cookieConfig);

      let expectedCookie = givenOilCookie(testData, givenCookieConsentData(testData));
      verifyCookie(retrievedCookie, expectedCookie);
    });

    it('should get default cookie data if cookie exists but is not valid', () => {
      givenThatInvalidOilCookieIsSet();
      let cookieConfig = givenOilCookieConfig();

      let retrievedCookie = getOilCookie(cookieConfig);

      verifyCookie(retrievedCookie, cookieConfig.defaultCookieContent);
    });

    it('should get default cookie data if cookie does not exist', () => {
      givenThatNoOilCookieIsSet();
      let cookieConfig = givenOilCookieConfig();

      let retrievedCookie = getOilCookie(cookieConfig);

      verifyCookie(retrievedCookie, cookieConfig.defaultCookieContent);
    });

  });

  describe('outdated oil cookie detection', () => {

    it('should detect outdated oil cookie if it exists and is valid', () => {
      let testData = {
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        privacy: 1
      };
      givenThatOutdatedOilCookieIsSet(testData);
      let cookieConfig = givenOilCookieConfig(testData);

      expect(hasOutdatedOilCookie(cookieConfig)).toBeTruthy();
    });

    it('should not detect outdated oil cookie if exists but is not valid', () => {
      givenThatInvalidOilCookieIsSet();
      let cookieConfig = givenOilCookieConfig();

      expect(hasOutdatedOilCookie(cookieConfig)).toBeFalsy();
    });

    it('should not detect outdated oil cookie if does not exist', () => {
      givenThatNoOilCookieIsSet();
      let cookieConfig = givenOilCookieConfig();

      expect(hasOutdatedOilCookie(cookieConfig)).toBeFalsy();
    });

  });

  describe('soi cookie setting', () => {

    let cookieSetSpy;

    beforeEach(() => {
      cookieSetSpy = spyOn(Cookie, 'set');
      spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue(LOCALE_VARIANT_EN_NAME);
      spyOn(CoreUtils, 'getLocaleVariantVersion').and.returnValue(LOCALE_VARIANT_EN_VERSION);
      spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    });

    it('should set soi cookie for global opt-in if cookie does not exist yet', (done) => {
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(undefined).withArgs('oil_verbose').and.callThrough();

      setSoiCookie(1).then(() => {
        verifyThatCookieWasSetCorrectly({
          localeVariantName: LOCALE_VARIANT_EN_NAME,
          localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
          language: LANGUAGE_EN,
          allowedPurposeIds: [1, 2, 3, 4, 5],
          allowedVendorIds: [12, 24]
        });
        done();
      });
    });

    it('should set soi cookie for global opt-out if cookie does not exist yet', (done) => {
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(undefined).withArgs('oil_verbose').and.callThrough();

      setSoiCookie(0).then(() => {
        expect(cookieSetSpy).toHaveBeenCalled();
        verifyThatCookieWasSetCorrectly({
          localeVariantName: LOCALE_VARIANT_EN_NAME,
          localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
          language: LANGUAGE_EN,
          allowedPurposeIds: [],
          allowedVendorIds: [12, 24]
        });
        done();
      });
    });

    it('should set soi cookie for selected opt-in if cookie does not exist yet', (done) => {
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(undefined).withArgs('oil_verbose').and.callThrough();

      setSoiCookie({
        1: true,
        2: false,
        3: true,
        4: false,
        5: true
      }).then(() => {
        expect(cookieSetSpy).toHaveBeenCalled();
        verifyThatCookieWasSetCorrectly({
          localeVariantName: LOCALE_VARIANT_EN_NAME,
          localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
          language: LANGUAGE_EN,
          allowedPurposeIds: [1, 3, 5],
          allowedVendorIds: [12, 24]
        });
        done();
      });
    });

    it('should update soi cookie if cookie already exists', (done) => {
      givenThatOilCookieIsSet({
        language: LANGUAGE_DE,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        allowedPurposeIds: [],
        allowedVendorIds: [12],
        cmpVersion: OTHER_CMP_VERSION
      });

      setSoiCookie(1).then(() => {
        expect(cookieSetSpy).toHaveBeenCalled();
        verifyThatCookieWasSetCorrectly({
          localeVariantName: LOCALE_VARIANT_EN_NAME,
          localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
          language: LANGUAGE_EN,
          allowedPurposeIds: [1, 2, 3, 4, 5],
          allowedVendorIds: [12, 24],
          cmpVersion: OIL_SPEC.CMP_VERSION,
        });
        done();
      });
    });

    it('should set soi cookie with consent string if cookie does not exist yet', () => {
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(undefined).withArgs('oil_verbose').and.callThrough();

      setSoiCookieWithConsentString('BOOkmUuOOkmUuBQABBENAR-AAAABgACACA');

      expect(cookieSetSpy).toHaveBeenCalled();
      verifyThatCookieWasSetCorrectly({
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        language: LANGUAGE_EN,
        allowedPurposeIds: [1, 2, 3, 4, 5],
        allowedVendorIds: [12, 24],
        cmpVersion: OIL_SPEC.CMP_VERSION,
      });
    });

    it('should overwrite soi cookie with consent string  if cookie already exists', () => {
      givenThatOilCookieIsSet({
        language: LANGUAGE_DE,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        allowedPurposeIds: [],
        allowedVendorIds: [12],
        cmpVersion: OTHER_CMP_VERSION
      });

      setSoiCookieWithConsentString('BOOkmUuOOkmUuBQABBENAR-AAAABgACACA');

      expect(cookieSetSpy).toHaveBeenCalled();
      verifyThatCookieWasSetCorrectly({
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        language: LANGUAGE_EN,
        allowedPurposeIds: [1, 2, 3, 4, 5],
        allowedVendorIds: [12, 24],
        cmpVersion: OIL_SPEC.CMP_VERSION,
      });
    });
  });

  describe('soi cookie retrieval', () => {

    beforeEach(() => {
      spyOn(CoreConfig, 'getLocaleVariantName').and.returnValue(LOCALE_VARIANT_EN_NAME);
      spyOn(CoreConfig, 'getDefaultToOptin').and.returnValue(true);
      spyOn(CoreUtils, 'getLocaleVariantVersion').and.returnValue(LOCALE_VARIANT_EN_VERSION);
      spyOn(CoreVendorInformation, 'getVendorList').and.returnValue(VENDOR_LIST);
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
      spyOn(CoreVendorInformation, 'getVendors').and.returnValue(VENDOR_LIST.vendors);
    });

    it('should get soi cookie if it exists and is valid', () => {
      let testData = {
        language: LANGUAGE_DE,
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        allowedPurposeIds: [1, 3, 5],
        allowedVendorIds: [12]
      };
      givenThatOilCookieIsSet(testData);

      let retrievedCookie = getSoiCookie();

      verifyCookie(retrievedCookie, givenOilCookie(testData, givenCookieConsentData(testData)));
    });

    it('should get default soi cookie if cookie exists but is not valid', () => {
      givenThatInvalidOilCookieIsSet();

      let retrievedCookie = getSoiCookie();

      let expectedData = {
        opt_in: false,
        language: LANGUAGE_EN,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        allowedPurposeIds: [1, 2, 3, 4, 5],
        allowedVendorIds: [12, 24]
      };
      verifyCookie(retrievedCookie, givenOilCookie(expectedData, givenCookieConsentData(expectedData)));
    });

    it('should get default soi cookie if cookie does not exist', () => {
      givenThatNoOilCookieIsSet();

      let retrievedCookie = getSoiCookie();

      let expectedData = {
        opt_in: false,
        language: LANGUAGE_EN,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        allowedPurposeIds: [1, 2, 3, 4, 5],
        allowedVendorIds: [12, 24]
      };
      verifyCookie(retrievedCookie, givenOilCookie(expectedData, givenCookieConsentData(expectedData)));
    });

    it('should get transformed soi cookie if outdated cookie with selected opt-in exists and is valid', () => {
      let outdatedCookie = givenOutdatedOilCookie({
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        privacy: {
          1: true,
          2: false,
          3: true,
          4: false,
          5: true
        }
      });
      let expectedData = {
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        language: LANGUAGE_DE,
        allowedPurposeIds: [1, 3, 5],
        allowedVendorIds: [12, 24]
      };
      let expectedCookie = givenOilCookie(expectedData, givenCookieConsentData(expectedData));
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(JSON.stringify(outdatedCookie)).withArgs('oil_verbose').and.callThrough();
      spyOn(Cookie, 'getJSON').withArgs('oil_data').and.returnValue(outdatedCookie);

      let retrievedCookie = getSoiCookie();
      verifyCookie(retrievedCookie, expectedCookie);
    });

    it('should get transformed soi cookie if outdated oil cookie with global opt-in exists and is valid', () => {
      let outdatedCookie = givenOutdatedOilCookie({
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        privacy: 1
      });
      let expectedData = {
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        language: LANGUAGE_DE,
        allowedPurposeIds: [1, 2, 3, 4, 5],
        allowedVendorIds: [12, 24]
      };
      let expectedCookie = givenOilCookie(expectedData, givenCookieConsentData(expectedData));
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(JSON.stringify(outdatedCookie)).withArgs('oil_verbose').and.callThrough();
      spyOn(Cookie, 'getJSON').withArgs('oil_data').and.returnValue(outdatedCookie);

      let retrievedCookie = getSoiCookie();

      verifyCookie(retrievedCookie, expectedCookie);
    });

    it('should get transformed soi cookie if outdated oil cookie with global opt-out exists and is valid', () => {
      let outdatedCookie = givenOutdatedOilCookie({
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        privacy: 0
      });
      let expectedData = {
        localeVariantName: LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: LOCALE_VARIANT_DE_VERSION,
        language: LANGUAGE_DE,
        allowedPurposeIds: [],
        allowedVendorIds: [12, 24]
      };

      let expectedCookie = givenOilCookie(expectedData, givenCookieConsentData(expectedData));
      spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(JSON.stringify(outdatedCookie)).withArgs('oil_verbose').and.callThrough();
      spyOn(Cookie, 'getJSON').withArgs('oil_data').and.returnValue(outdatedCookie);

      let retrievedCookie = getSoiCookie();

      verifyCookie(retrievedCookie, expectedCookie);
    });

  });

  describe('hub cookie removal', () => {

    beforeEach(() => {
      spyOn(Cookie, 'remove');
    });

    it('should remove subscriber cookies', () => {
      removeHubCookie();

      expect(Cookie.remove.calls.count()).toEqual(2);
      expect(Cookie.remove).toHaveBeenCalledWith('oil_data');
      expect(Cookie.remove).toHaveBeenCalledWith('oil_data_session');
    });

    it('should remove poi group cookie if requested', () => {
      removeHubCookie('aPoiGroupName');
      expect(Cookie.remove.calls.count()).toEqual(3);
      expect(Cookie.remove).toHaveBeenCalledWith('oil_data');
      expect(Cookie.remove).toHaveBeenCalledWith('oil_data_session');
      expect(Cookie.remove).toHaveBeenCalledWith('aPoiGroupName_oil_data');
    });

  });

  describe('check whether browser is able to store cookies', () => {

    beforeEach(() => {
      spyOn(Cookie, 'set');
      spyOn(Cookie, 'remove');
    });

    it('should answer true if browser is able to store cookies', () => {
      spyOn(Cookie, 'get').and.returnValue('cookiedata');

      expect(isBrowserCookieEnabled()).toBeTruthy();
      expect(Cookie.set).toHaveBeenCalledWith('oil_cookie_exp', 'cookiedata');
      expect(Cookie.remove).toHaveBeenCalledWith('oil_cookie_exp');
    });

    it('should answer false if browser is not able to store cookies', () => {
      spyOn(Cookie, 'get').and.returnValue(undefined);

      expect(isBrowserCookieEnabled()).toBeFalsy();
      expect(Cookie.set).toHaveBeenCalledWith('oil_cookie_exp', 'cookiedata');
      expect(Cookie.remove).toHaveBeenCalledWith('oil_cookie_exp');
    });
  });

  describe('getting purposes with consent', () => {

    beforeEach(() => {
      spyOn(CoreVendorInformation, 'getPurposes').and.returnValue(VENDOR_LIST.purposes);
    });

    it('should return all purposes if privacy settings are true', () => {
      expect(getPurposesWithConsent(1).sort()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return no purposes if privacy settings are false', () => {
      expect(getPurposesWithConsent(0)).toEqual([]);
    });

    it('should return selected purposes if privacy settings are an object', () => {
      expect(getPurposesWithConsent({
        1: true,
        2: false,
        3: true,
        4: false,
        5: true
      }).sort()).toEqual([1, 3, 5]);
    });
  });

  function givenCookieConsentData(data) {
    let consentData = new ConsentString();
    consentData.setCmpId(OIL_SPEC.CMP_ID);
    consentData.setCmpVersion(data.cmpVersion ? data.cmpVersion : OIL_SPEC.CMP_VERSION);
    consentData.setConsentScreen(1);
    consentData.setConsentLanguage(data.language);
    consentData.setPurposesAllowed(data.allowedPurposeIds);
    consentData.setVendorsAllowed(data.allowedVendorIds);
    consentData.setGlobalVendorList(VENDOR_LIST);
    return consentData;
  }

  function givenThatOilCookieIsSet(testData) {
    let cookieConsentData = givenCookieConsentData(testData);
    let cookie = givenOilCookie(testData, cookieConsentData);
    spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(JSON.stringify(cookie)).withArgs('oil_verbose').and.callThrough();
    spyOn(Cookie, 'getJSON').withArgs('oil_data').and.returnValue(cookie);
  }

  function givenThatInvalidOilCookieIsSet() {
    let cookie = {invalidKey: 'invalidValue'};
    spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(JSON.stringify(cookie)).withArgs('oil_verbose').and.callThrough();
    spyOn(Cookie, 'getJSON').withArgs('oil_data').and.returnValue(cookie);
  }

  function givenThatNoOilCookieIsSet() {
    spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(undefined).withArgs('oil_verbose').and.callThrough();
  }

  function givenThatOutdatedOilCookieIsSet(testData) {
    let outdatedCookie = givenOutdatedOilCookie(testData);
    spyOn(Cookie, 'get').withArgs('oil_data').and.returnValue(JSON.stringify(outdatedCookie)).withArgs('oil_verbose').and.callThrough();
    spyOn(Cookie, 'getJSON').withArgs('oil_data').and.returnValue(outdatedCookie);
  }

  function givenOilCookie(testData, expectedConsentData) {
    return {
      opt_in: typeof testData.opt_in !== 'undefined' ? testData.opt_in : true,
      version: '1.0.0',
      localeVariantName: testData.localeVariantName,
      localeVariantVersion: testData.localeVariantVersion,
      consentData: expectedConsentData,
      consentString: expectedConsentData.getConsentString()
    };
  }

  function givenOutdatedOilCookie(expectedCookieData) {
    return {
      opt_in: true,
      timestamp: Date.now(),
      version: '1.0.0',
      localeVariantName: expectedCookieData.localeVariantName,
      localeVariantVersion: expectedCookieData.localeVariantVersion,
      privacy: expectedCookieData.privacy
    }
  }

  function givenOilCookieConfig(configData) {
    let consentData = new ConsentString();
    consentData.setCmpId(OIL_SPEC.CMP_ID);
    consentData.setCmpVersion((configData && configData.cmpVersion) ? configData.cmpVersion : OIL_SPEC.CMP_VERSION);
    consentData.setConsentScreen(1);
    consentData.setConsentLanguage((configData && configData.language) ? configData.language : LANGUAGE_DE);
    consentData.setPurposesAllowed([]);
    consentData.setVendorsAllowed([]);
    consentData.setGlobalVendorList(VENDOR_LIST);

    return {
      name: 'oil_data',
      expires: 31,
      defaultCookieContent: {
        opt_in: false,
        version: '1.0.0',
        localeVariantName: (configData && configData.localeVariantName) ? configData.localeVariantName : LOCALE_VARIANT_DE_NAME,
        localeVariantVersion: (configData && configData.localeVariantVersion) ? configData.localeVariantVersion : LOCALE_VARIANT_DE_VERSION,
        consentData: consentData,
        consentString: consentData.getConsentString()
      },
      outdated_cookie_content_keys: ['opt_in', 'timestamp', 'version', 'localeVariantName', 'localeVariantVersion', 'privacy']
    };
  }

  function verifyConsentData(retrievedConsentData, expectedConsentData) {
    expect(retrievedConsentData.getCmpId()).toEqual(expectedConsentData.getCmpId());
    expect(retrievedConsentData.getCmpVersion()).toEqual(expectedConsentData.getCmpVersion());
    expect(retrievedConsentData.getConsentScreen()).toEqual(expectedConsentData.getConsentScreen());
    expect(retrievedConsentData.getConsentLanguage()).toEqual(expectedConsentData.getConsentLanguage());
    expect(retrievedConsentData.getPurposesAllowed().sort()).toEqual(expectedConsentData.getPurposesAllowed().sort());
    expect(retrievedConsentData.getVendorsAllowed().sort()).toEqual(expectedConsentData.getVendorsAllowed().sort());
  }

  function verifyThatCookieWasSetCorrectly(expectations) {
    const cookieSetArguments = Cookie.set.calls.argsFor(0);
    expect(cookieSetArguments[0]).toEqual('oil_data');
    expect(cookieSetArguments[2].expires).toEqual(31);

    let cookie = cookieSetArguments[1];
    expect(cookie.opt_in).toBeTruthy();
    expect(cookie.version).toEqual(OilVersion.get());
    expect(cookie.localeVariantName).toEqual(expectations.localeVariantName);
    expect(cookie.localeVariantVersion).toEqual(expectations.localeVariantVersion);

    let consentData = new ConsentString(cookie.consentString);
    let expectedConsentData = givenCookieConsentData(expectations);
    verifyConsentData(consentData, expectedConsentData);
  }

  function verifyCookie(cookie, expectedCookie) {
    expect(cookie.opt_in).toEqual(expectedCookie.opt_in);
    expect(cookie.version).toEqual(expectedCookie.version);
    expect(cookie.localeVariantName).toEqual(expectedCookie.localeVariantName);
    expect(cookie.localeVariantVersion).toEqual(expectedCookie.localeVariantVersion);
    verifyConsentData(cookie.consentData, expectedCookie.consentData);
  }
})
;
