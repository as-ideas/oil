import { formatHtml, loadFixture, readFixture, removeOilLayerAndConfig } from '../../utils';
import { resetConfiguration } from '../../../src/scripts/core/core_config';
import { oilListTemplate } from '../../../src/scripts/company-list/oil.list';

describe('the company list', () => {

  beforeEach(() => {
    resetConfiguration();
    removeOilLayerAndConfig();
  });

  it('should be loaded with the given elements', () => {
    loadFixture('config/given.config.example.labels.html');
    let result = oilListTemplate(['a', 'b']);
    expect(formatHtml(result)).toEqual(formatHtml(readFixture('gold-master/company-list.html')));
  });
});
