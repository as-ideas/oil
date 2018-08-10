import { hasRunningTimeout, renderOil, } from '../../../src/scripts/userview/userview_modal';
import { loadFixture, readFixture } from '../../test-utils/utils_fixtures';
import { resetOil } from '../../test-utils/utils_reset';

describe('the user view modal aka the oil layer wrapper with NO COOKIE view', () => {

  beforeEach(() => resetOil());

  it('should renderOil with NO COOKIE as NO COOKIE template', () => {
    loadFixture('config/given.config.example.labels.html');
    renderOil({optIn: false, noCookie: true});

    expect(document.querySelector('.as-oil')).toEqualWithDiff(readFixture('gold-master/no-cookie.html'));
    expectTimeoutNotStarted();
  });

  function expectTimeoutNotStarted() {
    expect(hasRunningTimeout).toBeUndefined();
  }
});
