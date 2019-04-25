import { resetOil } from '../../test-utils/utils_reset';
import * as CoreVendorLists from '../../../src/scripts/core/core_vendor_lists'
import { DEFAULT_CUSTOM_VENDOR_LIST, getPurposeIds } from '../../../src/scripts/core/core_vendor_lists'
import * as CoreCookies from '../../../src/scripts/core/core_cookies'
import { getSoiCookie, setSoiCookie } from '../../../src/scripts/core/core_cookies'
import { sendConsentInformationToCustomVendors } from '../../../src/scripts/core/core_custom_vendors';
import CUSTOM_VENDOR_LIST from '../../fixtures/vendorlist/custom_vendor_list.json';

describe('custom vendors', () => {

  const CUSTOM_VENDOR_WITH_BOTH_SCRIPTS = CUSTOM_VENDOR_LIST.vendors[0];
  const CUSTOM_VENDOR_WITH_OPT_IN_SCRIPT = CUSTOM_VENDOR_LIST.vendors[1];
  const CUSTOM_VENDOR_WITH_OPT_OUT_SCRIPT = CUSTOM_VENDOR_LIST.vendors[2];

  beforeEach(() => resetOil());

  describe('consent information sending', () => {

    beforeEach(() => {
      spyOn(CoreVendorLists, 'loadVendorListAndCustomVendorList').and.returnValue(Promise.resolve());
    });

    it('should load custom vendor list first', (done) => {
      sendConsentInformationToCustomVendors().then(() => {
        expect(CoreVendorLists.loadVendorListAndCustomVendorList).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('should do nothing if custom vendor list does not exist', (done) => {
      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(undefined);
      spyOn(CoreCookies, 'getSoiCookie').and.callThrough();

      sendConsentInformationToCustomVendors().then(() => {
        expect(CoreVendorLists.getCustomVendorList).toHaveBeenCalledTimes(1);
        expect(CoreCookies.getSoiCookie).not.toHaveBeenCalled();
        done();
      });
    });

    it('should do nothing if custom vendor list is default list only', (done) => {
      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(DEFAULT_CUSTOM_VENDOR_LIST);
      spyOn(CoreCookies, 'getSoiCookie').and.callThrough();

      sendConsentInformationToCustomVendors().then(() => {
        expect(CoreVendorLists.getCustomVendorList).toHaveBeenCalledTimes(1);
        expect(CoreCookies.getSoiCookie).not.toHaveBeenCalled();
        done();
      });
    });

    it('should do nothing if soi cookie does not exist', (done) => {
      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(CUSTOM_VENDOR_LIST);
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(undefined);
      spyOn(window, 'eval').and.callThrough();

      sendConsentInformationToCustomVendors().then(() => {
        expect(CoreVendorLists.getCustomVendorList).toHaveBeenCalledTimes(1);
        expect(CoreCookies.getSoiCookie).toHaveBeenCalledTimes(1);
        expect(window.eval).not.toHaveBeenCalled();
        done();
      });
    });

    it('should do nothing if soi cookie does not contain consent data', (done) => {
      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(CUSTOM_VENDOR_LIST);
      spyOn(window, 'eval').and.callThrough();

      let soiCookie = givenSoiCookieWithoutConsentData();
      spyOn(CoreCookies, 'getSoiCookie').and.returnValue(soiCookie);

      sendConsentInformationToCustomVendors().then(() => {
        expect(CoreVendorLists.getCustomVendorList).toHaveBeenCalledTimes(1);
        expect(CoreCookies.getSoiCookie).toHaveBeenCalledTimes(1);
        expect(window.eval).not.toHaveBeenCalled();
        done();
      });
    });

    it('should execute opt-in snippet for custom vendor if all of its purposes have consent', (done) => {
      const CONSENTS = givenConsentsForPurposes(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.purposeIds);

      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(CUSTOM_VENDOR_LIST);
      spyOn(window, 'eval').and.callThrough();

      setSoiCookie(CONSENTS).then(() => {
        sendConsentInformationToCustomVendors().then(() => {
          expect(window.eval).toHaveBeenCalledWith(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optInSnippet);
          done();
        });
      });
    });

    it('should execute opt-out snippet for custom vendor if at least one of its purposes does not have consent', (done) => {
      const CONSENTS = givenConsentsForPurposes(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.purposeIds.filter(purposeId => purposeId !== 4));

      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(CUSTOM_VENDOR_LIST);
      spyOn(window, 'eval').and.callThrough();

      setSoiCookie(CONSENTS).then(() => {
        sendConsentInformationToCustomVendors().then(() => {
          expect(window.eval).toHaveBeenCalledWith(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optOutSnippet);
          done();
        });
      });
    });

    it('should ensure that error while opt-in snippet execution for one custom vendor does not prevent opt-in snippet execution for other custom vendor', (done) => {
      const CONSENTS = givenConsentsForPurposes(getPurposeIds());
      let evalCallList = givenThatCustomVendorScriptIsFaulty(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optInSnippet);

      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(CUSTOM_VENDOR_LIST);

      setSoiCookie(CONSENTS).then(() => {
        sendConsentInformationToCustomVendors().then(() => {
          expect(window.eval).toHaveBeenCalledTimes(2);
          expect(window.eval).toHaveBeenCalledWith(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optInSnippet);
          expect(window.eval).toHaveBeenCalledWith(CUSTOM_VENDOR_WITH_OPT_IN_SCRIPT.optInSnippet);
          expect(evalCallList).toEqual([CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optInSnippet, CUSTOM_VENDOR_WITH_OPT_IN_SCRIPT.optInSnippet]);
          done();
        });
      });
    });

    it('should ensure that error while opt-out snippet execution for one custom vendor does not prevent opt-out snippet execution for other custom vendor', (done) => {
      const CONSENTS = givenConsentsForPurposes(getPurposeIds(), false);
      let evalCallList = givenThatCustomVendorScriptIsFaulty(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optOutSnippet);

      spyOn(CoreVendorLists, 'getCustomVendorList').and.returnValue(CUSTOM_VENDOR_LIST);

      setSoiCookie(CONSENTS).then(() => {
        sendConsentInformationToCustomVendors().then(() => {
          expect(window.eval).toHaveBeenCalledTimes(2);
          expect(window.eval).toHaveBeenCalledWith(CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optOutSnippet);
          expect(window.eval).toHaveBeenCalledWith(CUSTOM_VENDOR_WITH_OPT_OUT_SCRIPT.optOutSnippet);
          expect(evalCallList).toEqual([CUSTOM_VENDOR_WITH_BOTH_SCRIPTS.optOutSnippet, CUSTOM_VENDOR_WITH_OPT_OUT_SCRIPT.optOutSnippet]);
          done();
        });
      });

    });

    function givenSoiCookieWithoutConsentData() {
      let cookie = getSoiCookie();
      cookie.consentData = undefined;
      return cookie;
    }

    function givenConsentsForPurposes(purposeIds, isConsentGiven = true) {
      return purposeIds.reduce((map, purposeId) => {
        map[purposeId] = isConsentGiven;
        return map
      }, {});
    }

    function givenThatCustomVendorScriptIsFaulty(faultyScript) {
      let evalCallList = [];

      spyOn(window, 'eval').and.callFake(script => {
        evalCallList.push(script);
        if (script === faultyScript) {
          throw new Error('eval execution failed!');
        }
      });
      return evalCallList;
    }

  });
});
