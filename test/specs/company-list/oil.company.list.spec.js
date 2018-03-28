import { loadFixture, readFixture, removeOilLayerAndConfig } from '../../utils';
import { resetConfiguration } from '../../../src/scripts/core/core_config';
import { oilGroupListTemplate } from '../../../src/scripts/poi-list/oil.list';
import { customMatchers } from '../../utilsHtmlDiff';

describe('the company list', () => {

  beforeEach(() => {
    resetConfiguration();
    removeOilLayerAndConfig();
    jasmine.addMatchers(customMatchers);

  });

  it('should be loaded with the given elements', () => {
    loadFixture('config/given.config.example.labels.html');
    let result = oilGroupListTemplate(['a', 'b']);
    expect(result).toEqualWithDiff(readFixture('gold-master/company-list.html'));
  });

});
