import { resetOil } from '../test-utils/utils_reset';

describe('poi group name', () => {

  let originalTimeout;

  beforeEach((done) => {
    resetOil();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    done();
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  // TODO: TBD test for default POI-Group... maybe more
  // xit('should be loaded by default', () => {
  //   loadFixture('config/empty.config.html');
  // });

});
