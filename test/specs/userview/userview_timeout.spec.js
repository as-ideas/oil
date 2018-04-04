import { loadFixture, removeOilLayerAndConfig } from '../../utils';
import { resetConfiguration } from '../../../src/scripts/core/core_config';
import { renderOil, stopTimeOut } from '../../../src/scripts/userview/userview_modal';

describe('the timeout of the userview modal ake the auto hide function', () => {

  beforeEach(() => {
    resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
  });

  it('should hide OIL after the configured timeout', (done) => {
    givenOneSecondTimeout();
    givenOilIsShown();

    expect(document.querySelector('.as-oil')).not.toBeNull();

    window.setTimeout(() => {
      expect(document.querySelector('.as-oil')).toBeNull();
      done();
    }, 1050);
  });

  // HINT: I know there are multiple ways to trigger a stopTimeout, but they currently are hard to test - I settle for the principal test of the function
  it('should stop the timeout after any click', (done) => {
    givenOneSecondTimeout();
    givenOilIsShown();

    document.querySelector('.as-js-advanced-settings').click();

    window.setTimeout(() => {
      expect(document.querySelector('.as-oil')).not.toBeNull();
      done();
    }, 1050);
  });

  function givenOilIsShown() {
    renderOil({optIn: false});
  }

  function givenOneSecondTimeout() {
    loadFixture('config/given.config.with.one.second.timeout.html');
  }
});
