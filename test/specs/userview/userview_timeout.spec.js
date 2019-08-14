import {
  EVENT_NAME_OPT_IN,
  EVENT_NAME_OPT_IN_BUTTON_CLICKED,
  EVENT_NAME_SOI_OPT_IN
} from '../../../src/scripts/core/core_constants';
import { getSoiCookie } from '../../../src/scripts/core/core_cookies';
import * as CoreUtils from '../../../src/scripts/core/core_utils';
import { loadFixture } from '../../test-utils/utils_fixtures';
import { renderOil } from '../../../src/scripts/userview/userview_modal';
import { resetOil } from '../../test-utils/utils_reset';

describe('the timeout of the user view modal aka the auto hide function', () => {

  beforeEach(() => resetOil());

  it('should hide OIL after the configured timeout', (done) => {
    givenOneSecondTimeout();
    givenOilIsShown();

    expect(document.querySelector('.as-oil')).not.toBeNull();

    window.setTimeout(() => {
      expect(document.querySelector('.as-oil')).toBeNull();
      done();
    }, 1150);
  });

  it('should hide OIL after the configured timeout and set consent cookie when info_banner_only is true', (done) => {
    loadFixture('config/given.config.with.one.second.timeout.and.infobanneronly.html');
    givenOilIsShown();

    expect(document.querySelector('.as-oil')).not.toBeNull();
    expect(getSoiCookie().opt_in).toBeFalsy();
    expect(getSoiCookie().consentString).toBe('');

    window.setTimeout(() => {
      expect(document.querySelector('.as-oil')).toBeNull();
      expect(getSoiCookie().opt_in).toBeTruthy();
      expect(getSoiCookie().consentString).toBe('');
      done();
    }, 1150);
  });

  // HINT: I know there are multiple ways to trigger a stopTimeout, but they currently are hard to test - I settle for the principal test of the function
  it('should stop the timeout after any click', (done) => {
    givenOneSecondTimeout();
    givenOilIsShown();

    window.setTimeout(() => {
      document.querySelector('.as-js-advanced-settings').click();
      window.setTimeout(() => {
        expect(document.querySelector('.as-oil')).not.toBeNull();
        done();
      }, 1000);
    }, 500);
  });
  it('should stop the timeout after OK click', (done) => {
    givenOneSecondTimeoutWithInfoBannerOnly();
    givenOilIsShown();
    spyOn(CoreUtils,'sendEventToHostSite').and.callThrough();

    window.setTimeout(() => {
      document.querySelector('[data-qa="oil-YesButton"]').click();
      window.setTimeout(() => {
        expect(document.querySelector('.as-oil')).toBeNull();
        expect(CoreUtils.sendEventToHostSite.calls.count()).toBe(3);
        expect(CoreUtils.sendEventToHostSite.calls.argsFor(0)[0]).toBe(EVENT_NAME_OPT_IN_BUTTON_CLICKED);
        expect(CoreUtils.sendEventToHostSite.calls.argsFor(1)[0]).toBe(EVENT_NAME_OPT_IN);
        expect(CoreUtils.sendEventToHostSite.calls.argsFor(2)[0]).toBe(EVENT_NAME_SOI_OPT_IN);
        done();
      }, 1000);
    }, 500);
  });

  function givenOilIsShown() {
    renderOil({optIn: false});
  }

  function givenOneSecondTimeout() {
    loadFixture('config/given.config.with.one.second.timeout.html');
  }
  function givenOneSecondTimeoutWithInfoBannerOnly() {
    loadFixture('config/given.config.with.one.second.timeout.and.infobanneronly.html');
  }
});
