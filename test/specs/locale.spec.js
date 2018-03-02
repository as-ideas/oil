import { resetConfiguration } from '../../src/scripts/core/core_config.js';
import { loadFixture } from '../utils.js';
import { getLabel } from '../../src/scripts/userview/userview_config.js';
import { OIL_LABELS } from '../../src/scripts/userview/userview_constants.js';

describe('locale', () => {

  beforeEach(() => {
    resetConfiguration();
  });

  it('deDE_01 should be loaded by default and set window.AS_OIL_LOCALE with the correct amount of keys', () => {
    loadFixture('config/given.config.html');
    expect(window.AS_OIL_LOCALE).toBeDefined();
    expect(Object.keys(window.AS_OIL_LOCALE).length).toEqual(19);
    expect(getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK).length).toBeGreaterThan(0)
    expect(getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)).toEqual('lisa simpson');
  });

});
