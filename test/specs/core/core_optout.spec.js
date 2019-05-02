import { handleOptOut } from '../../../src/scripts/core/core_optout';
import * as CoreCookies from '../../../src/scripts/core/core_cookies'
import * as CorePoi from '../../../src/scripts/core/core_poi'
import * as CoreUtils from '../../../src/scripts/core/core_utils'
import * as CoreCommandCollection from '../../../src/scripts/core/core_command_collection'
import * as CoreCustomVendors from '../../../src/scripts/core/core_custom_vendors'
import * as CoreTagManager from '../../../src/scripts/core/core_tag_management'
import { waitsForAndRuns } from '../../test-utils/utils_wait';
import { EVENT_NAME_OPT_OUT } from '../../../src/scripts/core/core_constants';

describe('Opt Out', () => {

  it('removes subscriber cookies', () => {
    spyOn(CoreCookies, 'removeSubscriberCookies').and.callThrough();

    handleOptOut();

    expect(CoreCookies.removeSubscriberCookies).toHaveBeenCalled();
  });

  it('deactivates power opt-in', (done) => {
    spyOn(CorePoi, 'deActivatePowerOptIn').and.returnValue(Promise.resolve());
    spyOn(CoreUtils, 'sendEventToHostSite').and.callThrough();

    handleOptOut();

    waitsForAndRuns(
      () => CoreUtils.sendEventToHostSite.calls.count() > 0,
      () => {
        expect(CorePoi.deActivatePowerOptIn).toHaveBeenCalled();
        expect(CoreUtils.sendEventToHostSite).toHaveBeenCalledWith(EVENT_NAME_OPT_OUT);
        done();
      },
      2000
    );
  });

  it('executes command collection', () => {
    spyOn(CoreCommandCollection, 'executeCommandCollection').and.callThrough();

    handleOptOut();

    expect(CoreCommandCollection.executeCommandCollection).toHaveBeenCalled();
  });

  it('sends consent information to custom vendors', () => {
    spyOn(CoreCustomVendors, 'sendConsentInformationToCustomVendors').and.returnValue(Promise.resolve());

    handleOptOut();

    expect(CoreCustomVendors.sendConsentInformationToCustomVendors).toHaveBeenCalled();
  });

  it('invokes soft blocking of oil-managed tags', () => {
    spyOn(CoreTagManager, 'manageDomElementActivation').and.callThrough();

    handleOptOut();

    expect(CoreTagManager.manageDomElementActivation).toHaveBeenCalled();
  });

});
