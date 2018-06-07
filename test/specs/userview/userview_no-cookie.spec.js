import { hasRunningTimeout, renderOil, stopTimeOut, } from '../../../src/scripts/userview/userview_modal';
import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import * as CoreConfig from '../../../src/scripts/core/core_config';
import { deleteAllCookies, initCustomYasmineMatchers, removeOilLayerAndConfig } from '../../test-utils/utils_reset';

describe('the userview modal aka the oil layer wrapper with NO COOKIE view', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
    initCustomYasmineMatchers();
  });

  it('should renderOil with NO COOKIE as NO COOKIE template', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false, noCookie: true});

    expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/no-cookie.html'));
    expectTimeoutNotStarted();
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }
});
