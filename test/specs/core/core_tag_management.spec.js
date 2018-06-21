import { resetOil } from '../../test-utils/utils_reset';
import * as CoreCookies from '../../../src/scripts/core/core_cookies';
import * as CoreVendorInformation from '../../../src/scripts/core/core_vendor_information';
import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { activateDomElementsWithConsent } from '../../../src/scripts/core/core_tag_management';

const {ConsentString} = require('consent-string');

describe("Tag Management", () => {

  // The following consent strings represent
  //   cookieVersion: 1,
  //   created: 2018-06-01T07:26:03.700Z,
  //   lastUpdated: 2018-06-01T07:26:03.700Z,
  //   cmpId: 80,
  //   cmpVersion: 1,
  //   consentScreen: 1,
  //   consentLanguage: EN,
  //   vendorListVersion: 17,
  //   purposeIdBitString: 111110000000000000000000, -> CONSENT_STRING_WITH_ALL_CONSENTS
  //   purposeIdBitString: 000000000000000000000000, -> CONSENT_STRING_WITHOUT_CONSENTS
  //   purposeIdBitString: 110010000000000000000000, -> CONSENT_STRING_WITH_SELECTED_CONSENTS
  //   maxVendorId: 24,
  //   isRange: false,
  //   vendorIdBitString: 000000000001000000000001
  // see http://acdn.origin.appnexus.net/cmp/docs/#/tools/vendor-cookie-decoder
  const CONSENT_STRING_WITH_ALL_CONSENTS = 'BOOqZJ1OOqZJ1BQABBENAR-AAAABgACACA';
  const CONSENT_STRING_WITHOUT_CONSENTS = 'BOOqZJ1OOqZJ1BQABBENARAAAAABgACACA';
  const CONSENT_STRING_WITH_SELECTED_CONSENTS = 'BOOqZJ1OOqZJ1BQABBENARyAAAABgACACA';

  beforeEach(() => resetOil());

  it('should not activate elements if opt-in is not given', () => {
    spyOn(CoreCookies, 'getSoiCookie').and.returnValue({opt_in: false});
    loadFixture('tag-management/script-and-img-tag.html');

    activateDomElementsWithConsent();
    expect(document.getElementById('jasmine-fixtures').innerHTML).toEqualWithDiff(readFixture('tag-management/managed-results/inactive-managed-tags.html'));
  });

  it('should not activate elements if opt-in is given but purposes don\'t have any consent', () => {
    spyOn(CoreCookies, 'getSoiCookie').and.returnValue(givenCookieWithoutConsents());
    loadFixture('tag-management/script-and-img-tag.html');

    activateDomElementsWithConsent();
    expect(document.getElementById('jasmine-fixtures').innerHTML).toEqualWithDiff(readFixture('tag-management/managed-results/inactive-managed-tags.html'));
  });

  it('should not activate elements if opt-in is given but some required purposes don\'t have consent', () => {
    spyOn(CoreCookies, 'getSoiCookie').and.returnValue(givenCookieWithSelectedConsents());
    loadFixture('tag-management/script-and-img-tag-with-purposes.html');

    activateDomElementsWithConsent();
    expect(document.getElementById('jasmine-fixtures').innerHTML).toEqualWithDiff(readFixture('tag-management/managed-results/inactive-managed-tags-with-purposes.html'));
  });

  it('should activate elements without requested purposes if opt-in and purpose consents are given', () => {
    spyOn(CoreCookies, 'getSoiCookie').and.returnValue(givenCookieWithAllConsents());
    spyOn(CoreVendorInformation, 'getPurposeIds').and.returnValue([1, 2, 3, 4, 5]);
    loadFixture('tag-management/script-and-img-tag.html');

    activateDomElementsWithConsent();
    expect(document.getElementById('jasmine-fixtures').innerHTML).toEqualWithDiff(readFixture('tag-management/managed-results/active-managed-tags.html'));
  });

  it('should activate elements with requested purposes if opt-in and required purposes have consent', () => {
    spyOn(CoreCookies, 'getSoiCookie').and.returnValue(givenCookieWithAllConsents());
    loadFixture('tag-management/script-and-img-tag-with-purposes.html');

    activateDomElementsWithConsent();
    expect(document.getElementById('jasmine-fixtures').innerHTML).toEqualWithDiff(readFixture('tag-management/managed-results/active-managed-tags-with-purposes.html'));
  });

  function givenCookieWithAllConsents() {
    return givenCookieWithConsentString(CONSENT_STRING_WITH_ALL_CONSENTS)
  }

  function givenCookieWithoutConsents() {
    return givenCookieWithConsentString(CONSENT_STRING_WITHOUT_CONSENTS)
  }

  function givenCookieWithSelectedConsents() {
    return givenCookieWithConsentString(CONSENT_STRING_WITH_SELECTED_CONSENTS)
  }

  function givenCookieWithConsentString(consentString) {
    return {
      opt_in: true,
      version: '1.0.0',
      localeVariantName: 'deDE_01',
      localeVariantVersion: 1,
      customPurposes: [25, 26],
      consentData: new ConsentString(consentString),
      consentString: consentString
    }
  }
});
