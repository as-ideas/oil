import VENDOR_LIST from '../../fixtures/vendorlist/simple_vendor_list';
import Cookie from 'js-cookie';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import {
  OIL_CONFIG_DEFAULT_VERSION,
  OIL_PAYLOAD_CONFIG_VERSION,
  OIL_PAYLOAD_CUSTOM_PURPOSES, OIL_PAYLOAD_CUSTOM_VENDORLIST_VERSION,
  OIL_PAYLOAD_LOCALE_VARIANT_NAME,
  OIL_PAYLOAD_LOCALE_VARIANT_VERSION,
  OIL_PAYLOAD_PRIVACY,
  OIL_PAYLOAD_VERSION,
  OIL_SPEC
} from '../../../src/scripts/core/core_constants';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import { getPoiCookie, setPoiCookie } from '../../../src/scripts/hub/hub_cookies';
import { resetOil } from '../../test-utils/utils_reset';
import { setupVendorListSpies } from '../../test-utils/utils_vendorlist';

const {ConsentString} = require('consent-string');

const LANGUAGE_EN = 'en';
const LOCALE_VARIANT_EN_NAME = 'enEN_01';
const LOCALE_VARIANT_EN_VERSION = 2;
const GROUP_NAME = 'aGroupName';
const OIL_VERSION = '1.0.0';
const EXPIRATION_IN_DAYS = 31;
const PRIVACY = 1;
const PURPOSE_LIST = [1, 2, 3, 4, 5];
const CONFIG_VERSION = 17;

describe('hub cookies', () => {

  const DEFAULT_PAYLOAD = {p: 'BOO4NpHOO4NpHBQABBENAkuAAAAXyABgACAvgA'};

  beforeEach(() => resetOil());

  describe('poi cookie get/set', () => {

    it('shouldn\'t return the version of oil in the hub domain cookie, when never set', () => {
      let resultCookie = getPoiCookie();
      expect(resultCookie.version).toBe('unknown');
    });

    it('should create the correct hub domain default cookie with empty group name', () => {
      setPoiCookie(undefined, DEFAULT_PAYLOAD);
      let resultCookie = JSON.parse(getCookie('oil_data'));
      expect(resultCookie.power_opt_in).toBe(true);
    });

    it('should create the correct hub domain default cookie with undefined group name', () => {
      setPoiCookie(undefined, DEFAULT_PAYLOAD);
      let resultCookie = JSON.parse(getCookie('oil_data'));
      expect(resultCookie.power_opt_in).toBe(true);
    });

    it('should create the correct hub domain default cookie with given group name', () => {
      setPoiCookie('lisasimpson', DEFAULT_PAYLOAD);
      let resultCookie = JSON.parse(getCookie('lisasimpson_oil_data'));
      expect(resultCookie.power_opt_in).toBe(true);
    });

    function getCookie(sKey) {
      if (!sKey) {
        return null;
      }
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    }
  });

  describe('poi cookie setting', () => {

    beforeEach(() => {
      spyOn(CoreCookies, 'setDomainCookie');
      spyOn(CoreConfig, 'getCookieExpireInDays').and.returnValue(EXPIRATION_IN_DAYS);
    });

    it('should set poi cookie for payload', () => {
      let payload = givenPayload({
        privacy: 'BOOkmUuOOkmUuBQABBENAR-AAAABgACACA',
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        version: OIL_VERSION,
        customPurposes: [25, 26],
        customVendorListVersion: 135,
        configVersion: CONFIG_VERSION
      });

      setPoiCookie(GROUP_NAME, payload);
      expect(CoreCookies.setDomainCookie).toHaveBeenCalled();
      verifyThatCookieWasSetCorrectly(GROUP_NAME, {
        version: OIL_VERSION,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        language: LANGUAGE_EN,
        allowedPurposeIds: PURPOSE_LIST,
        customVendorListVersion: 135,
        allowedVendorIds: [12, 24],
        customPurposes: [25, 26],
        configVersion: CONFIG_VERSION
      });
    });

    it('should NOT set poi cookie for OLD payload (old oil.js, new hub.js with new cookie format) with NUMBER', () => {
      let payload = givenPayload({
        privacy: 1,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        version: OIL_VERSION
      });

      setPoiCookie(GROUP_NAME, payload);
      expect(CoreCookies.setDomainCookie).not.toHaveBeenCalled();
    });

    it('should NOT set poi cookie for OLD payload (old oil.js, new hub.js with new cookie format) with OBJECT', () => {
      let payload = givenPayload({
        privacy: {"1": true, "2": false, "3": true, "4": true, "5": true},
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        version: OIL_VERSION
      });

      setPoiCookie(GROUP_NAME, payload);
      expect(CoreCookies.setDomainCookie).not.toHaveBeenCalled();
    });
  });


  describe('poi cookie retrieval', () => {

    beforeEach(() => {
      spyOn(CoreCookies, 'getStandardPurposesWithConsent').withArgs(PRIVACY).and.returnValue(PURPOSE_LIST);
      setupVendorListSpies();
    });

    it('should get poi cookie', () => {
      let expectedCookie = givenCookie(GROUP_NAME, {
        version: OIL_VERSION,
        language: LANGUAGE_EN,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        allowedPurposeIds: [1, 3, 5],
        allowedVendorIds: [12],
        customPurposes: [25],
        configVersion: CONFIG_VERSION
      });
      spyOn(CoreCookies, 'findCookieConsideringCookieVersions').and.returnValue(expectedCookie);

      let retrievedCookie = getPoiCookie(GROUP_NAME);

      verifyCookie(retrievedCookie, expectedCookie);
    });

    it('should get transformed poi cookie if outdated cookie exists and is valid', () => {
      let outdatedCookie = givenOutdatedCookie(GROUP_NAME, {
        version: OIL_VERSION,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        privacy: PRIVACY
      });
      spyOn(Cookie, 'getJSON').withArgs(GROUP_NAME + '_oil_data').and.returnValue(outdatedCookie);
      spyOn(CoreCookies, 'findCookieConsideringCookieVersions').and.callFake((cookieConfig, transformer) => transformer(cookieConfig));

      let expectedCookieData = {
        version: OIL_VERSION,
        language: LANGUAGE_EN,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        allowedPurposeIds: PURPOSE_LIST,
        allowedVendorIds: [12, 24],
        customPurposes: [],
        configVersion: OIL_CONFIG_DEFAULT_VERSION
      };
      let expectedCookie = givenCookie(GROUP_NAME, expectedCookieData);

      let retrievedCookie = getPoiCookie(GROUP_NAME);

      verifyCookie(retrievedCookie, expectedCookie);
      expect(CoreCookies.getStandardPurposesWithConsent).toHaveBeenCalledWith(PRIVACY);
    });

    it('should get poi cookie if poi cookie without version exists and is valid', () => {
      let testCookie = givenCookie(GROUP_NAME, {
        version: OIL_VERSION,
        language: LANGUAGE_EN,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        allowedPurposeIds: PURPOSE_LIST,
        allowedVendorIds: [12, 24],
        customPurposes: []
      });
      spyOn(Cookie, 'getJSON').withArgs(GROUP_NAME + '_oil_data').and.returnValue(testCookie);

      let expectedCookieData = {
        version: OIL_VERSION,
        language: LANGUAGE_EN,
        localeVariantName: LOCALE_VARIANT_EN_NAME,
        localeVariantVersion: LOCALE_VARIANT_EN_VERSION,
        allowedPurposeIds: PURPOSE_LIST,
        allowedVendorIds: [12, 24],
        customPurposes: [],
        configVersion: OIL_CONFIG_DEFAULT_VERSION
      };
      let expectedCookie = givenCookie(GROUP_NAME, expectedCookieData);

      spyOn(CoreCookies, 'findCookieConsideringCookieVersions').and.returnValue(expectedCookie);

      let retrievedCookie = getPoiCookie(GROUP_NAME);

      verifyCookie(retrievedCookie, expectedCookie);
    });

  });

  function givenCookie(groupName, cookieData) {
    let consentData = new ConsentString();
    consentData.setCmpId(OIL_SPEC.CMP_ID);
    consentData.setCmpVersion((cookieData && cookieData.cmpVersion) ? cookieData.cmpVersion : OIL_SPEC.CMP_VERSION);
    consentData.setConsentScreen(1);
    consentData.setConsentLanguage(cookieData.language);
    consentData.setPurposesAllowed(cookieData.allowedPurposeIds);
    consentData.setVendorsAllowed(cookieData.allowedVendorIds);
    consentData.setGlobalVendorList(VENDOR_LIST);

    let cookie = {
      power_opt_in: typeof cookieData.power_opt_in !== 'undefined' ? cookieData.power_opt_in : true,
      version: cookieData.version,
      localeVariantName: cookieData.localeVariantName,
      localeVariantVersion: cookieData.localeVariantVersion,
      customPurposes: cookieData.customPurposes,
      consentData: consentData,
      consentString: consentData.getConsentString()
    };
    if (typeof cookieData.configVersion !== 'undefined') {
      cookie.configVersion = cookieData.configVersion;
    }
    return cookie;
  }

  function givenOutdatedCookie(groupName, cookieData) {
    return {
      power_opt_in: true,
      timestamp: Date.now(),
      version: cookieData.version,
      localeVariantName: cookieData.localeVariantName,
      localeVariantVersion: cookieData.localeVariantVersion,
      privacy: cookieData.privacy
    }
  }

  function givenPayload(testData) {
    return {
      [OIL_PAYLOAD_PRIVACY]: testData.privacy,
      [OIL_PAYLOAD_VERSION]: testData.version,
      [OIL_PAYLOAD_LOCALE_VARIANT_NAME]: testData.localeVariantName,
      [OIL_PAYLOAD_LOCALE_VARIANT_VERSION]: testData.localeVariantVersion,
      [OIL_PAYLOAD_CUSTOM_PURPOSES]: testData.customPurposes,
      [OIL_PAYLOAD_CUSTOM_VENDORLIST_VERSION]: testData.customVendorListVersion,
      [OIL_PAYLOAD_CONFIG_VERSION]: testData.configVersion
    }
  }

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

  function verifyThatCookieWasSetCorrectly(groupName, expectations) {
    const cookieSetArguments = CoreCookies.setDomainCookie.calls.argsFor(0);
    expect(cookieSetArguments[0]).toEqual(groupName + '_oil_data');
    expect(cookieSetArguments[2]).toEqual(EXPIRATION_IN_DAYS);

    let cookie = cookieSetArguments[1];
    expect(cookie.power_opt_in).toBeTruthy();
    expect(cookie.version).toEqual(expectations.version);
    expect(cookie.localeVariantName).toEqual(expectations.localeVariantName);
    expect(cookie.localeVariantVersion).toEqual(expectations.localeVariantVersion);
    expect(cookie.customPurposes).toEqual(expectations.customPurposes);
    expect(cookie.configVersion).toEqual(expectations.configVersion);

    let consentData = new ConsentString(cookie.consentString);
    let expectedConsentData = givenCookieConsentData(expectations);
    verifyConsentData(consentData, expectedConsentData);
  }

  function verifyCookie(cookie, expectedCookie) {
    expect(cookie.power_opt_in).toEqual(expectedCookie.power_opt_in);
    expect(cookie.version).toEqual(expectedCookie.version);
    expect(cookie.localeVariantName).toEqual(expectedCookie.localeVariantName);
    expect(cookie.localeVariantVersion).toEqual(expectedCookie.localeVariantVersion);
    expect(cookie.customPurposes).toEqual(expectedCookie.customPurposes);
    expect(cookie.configVersion).toEqual(expectedCookie.configVersion);
    verifyConsentData(cookie.consentData, expectedCookie.consentData);
  }

  function verifyConsentData(retrievedConsentData, expectedConsentData) {
    expect(retrievedConsentData.getCmpId()).toEqual(expectedConsentData.getCmpId());
    expect(retrievedConsentData.getCmpVersion()).toEqual(expectedConsentData.getCmpVersion());
    expect(retrievedConsentData.getConsentScreen()).toEqual(expectedConsentData.getConsentScreen());
    expect(retrievedConsentData.getConsentLanguage()).toEqual(expectedConsentData.getConsentLanguage());
    expect(retrievedConsentData.getPurposesAllowed().sort()).toEqual(expectedConsentData.getPurposesAllowed().sort());
    expect(retrievedConsentData.getVendorsAllowed().sort()).toEqual(expectedConsentData.getVendorsAllowed().sort());
  }

});
