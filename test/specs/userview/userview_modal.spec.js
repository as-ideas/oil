import {
  renderOil,
  oilWrapper,
  stopTimeOut,
  forEach,
  hasRunningTimeout
} from '../../../src/scripts/userview/userview_modal.js';
import { loadFixture, readFixture, removeOilLayerAndConfig, deleteAllCookies } from '../../utils.js';
import * as CoreConfig from '../../../src/scripts/core/core_config.js';
import { initCustomYasmineMatchers } from '../../utils';

describe('the userview modal aka the oil layer wrapper', () => {

  beforeEach(() => {
    deleteAllCookies();
    CoreConfig.resetConfiguration();
    removeOilLayerAndConfig();
    stopTimeOut();
    initCustomYasmineMatchers();
  });

  it('should have an functioning forEach replacement', () => {
    let array = [2, 1, 0];
    let result = [];
    forEach(array, function (value) {
      result.push(value)
    });
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(0);
  });

  it('should have the correct attributes', () => {
    expect(oilWrapper().outerHTML).toBe('<div class="as-oil light" data-qa="oil-Layer"></div>');
  });

  it('should have the given theme', () => {
    loadFixture('config/given.config.with.theme.html');
    expect(oilWrapper().outerHTML).toBe('<div class="as-oil dark" data-qa="oil-Layer"></div>');
  });

  it('should NOT renderOil with OPTIN YES', () => {
    renderOil({optIn: true});

    expect(document.querySelector('.as-oil')).toBeNull();
    expectTimeoutNotStarted();
  });

  it('should NOT renderOil with OPTIN FALSE and OPT-IGNORE: TRUE', () => {
    renderOil({optIn: true, optIgnore: true});

    expect(document.querySelector('.as-oil')).toBeNull();
    expectTimeoutNotStarted();
  });

  it('should renderOil with NO OPTIN as DEFAULT TEMPLATE', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false});

    expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/soi.html'));
    expectTimeoutStarted();
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }

  function expectTimeoutStarted() {
    expect(hasRunningTimeout).toBeDefined();
  }
});
