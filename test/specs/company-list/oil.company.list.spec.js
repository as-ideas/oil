import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { resetConfiguration } from '../../../src/scripts/core/core_config';
import { oilGroupListTemplate } from '../../../src/scripts/poi-list/oil.list';
import { initCustomYasmineMatchers, removeOilLayerAndConfig } from '../../test-utils/utils_reset';

describe('the company list', () => {

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
