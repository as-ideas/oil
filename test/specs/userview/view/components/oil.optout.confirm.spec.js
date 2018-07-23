import { OptoutConfirmDialog } from '../../../../../src/scripts/userview/view/components/oil.optout.confirm.js';

describe('OptoutConfirmDialog', function() {
  it('returns html node with correct id, className and childElementCount', function() {
    let dialog = OptoutConfirmDialog();
    expect(dialog.id).toEqual('as-oil-optout-confirm');
    expect(dialog.className).toEqual('as-oil-optout-confirm');
    expect(dialog.childElementCount).toEqual(1);
  });
});
