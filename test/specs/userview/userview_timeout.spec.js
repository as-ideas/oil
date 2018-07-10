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
    }, 501);
  });

  function givenOilIsShown() {
    renderOil({optIn: false});
  }

  function givenOneSecondTimeout() {
    loadFixture('config/given.config.with.one.second.timeout.html');
  }
});
