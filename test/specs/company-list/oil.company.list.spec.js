import { initCustomYasmineMatchers, loadFixture, readFixture, removeOilLayerAndConfig } from '../../utils';
import {resetConfiguration} from '../../../src/scripts/core/core_config';
import {oilGroupListTemplate} from '../../../src/scripts/poi-list/oil.list';

xdescribe('the company list', () => {

  beforeEach(() => {
    resetConfiguration();
    removeOilLayerAndConfig();
    initCustomYasmineMatchers();
  });

  it('should be loaded with the given elements', () => {
    loadFixture('config/given.config.example.labels.html');
    let result = oilGroupListTemplate(['a', 'b']);
    expect(result).toEqualWithDiff(readFixture('gold-master/company-list.html'));
  });

});
