import {
  renderOil,
  stopTimeOut,
} from '../../../src/scripts/userview/userview_modal.js';
import { loadFixture, readFixture, removeOilLayerAndConfig, deleteAllCookies } from '../../utils.js';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import { hasRunningTimeout } from '../../../src/scripts/userview/userview_modal';
import { initCustomYasmineMatchers } from '../../utils';

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
