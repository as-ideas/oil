import { OptoutConfirmDialog } from '../../../../../src/scripts/userview/view/components/oil.optout.confirm.js';
import { resetOil } from '../../../../test-utils/utils_reset';

describe('OptoutConfirmDialog', function() {
  beforeEach(function() {
    resetOil();
  });

  it('returns html node with correct id, className and childElementCount', function() {
    let dialog = OptoutConfirmDialog();
    expect(dialog.id).toEqual('as-oil-optout-confirm');
    expect(dialog.className).toEqual('as-oil-optout-confirm');
  });

  it('is a very small family', function() {
    let dialog = OptoutConfirmDialog();
    expect(dialog.childElementCount).toEqual(1);
  });
});
