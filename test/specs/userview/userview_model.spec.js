import { forEach, oilWrapper } from '../../../src/scripts/userview/userview_modal.js';
import { formatHtml, loadFixture, readFixture, removeOilLayerAndConfig } from '../../utils';
import { resetConfiguration } from '../../../src/scripts/core/core_config';
import { renderOil } from '../../../src/scripts/userview/userview_modal';

describe('the userview modal aka the oil layer wrapper', () => {

  beforeEach(() => {
    resetConfiguration();
    removeOilLayerAndConfig();
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
  });

  it('should NOT renderOil with OPTIN FALSE and OPT-IGNORE: TRUE', () => {
    renderOil({optIn: true, optIgnore: true});
    expect(document.querySelector('.as-oil')).toBeNull();
  });

  it('should renderOil with NO OPTIN as DEFAULT TEMPLATE', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false});
    expect(formatHtml(document.querySelector('.as-oil'))).toEqual(formatHtml(readFixture('gold-master/soi.html')));
  });

  it('should renderOil with NO COOKIE as NO COOKIE template', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false, noCookie: true});
    expect(formatHtml(document.querySelector('.as-oil'))).toEqual(formatHtml(readFixture('gold-master/no-cookie.html')));
  });

  it('should renderOil with ADVANCED-SETTINGS as CPC template', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false, advancedSettings: true});
    expect(formatHtml(document.querySelector('.as-oil'))).toEqual(formatHtml(readFixture('gold-master/cpc.html')));
  });
});
