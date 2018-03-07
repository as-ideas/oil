import { formatHtml, loadFixture, readFixture, removeOilLayerAndConfig } from '../../utils';
import { resetConfiguration } from '../../../src/scripts/core/core_config';
import { oilCompanyListTemplate } from '../../../src/scripts/company-list/oil.company.list';

describe('the company list', () => {

  beforeEach(() => {
    resetConfiguration();
    removeOilLayerAndConfig();
  });

  it('should the company list with the given elements', () => {
    loadFixture('config/given.config.example.labels.html');
    let result = oilCompanyListTemplate(['a', 'b']);
    expect(formatHtml(result)).toEqual(formatHtml(readFixture('gold-master/company-list.html')));
  });
});
