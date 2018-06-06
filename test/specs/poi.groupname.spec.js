import * as PoiAPICore from '../../src/scripts/core/core_poi.js';
import * as PoiAPIUserview from '../../src/scripts/userview/userview_poi.js';
import {loadFixture, deleteAllCookies} from '../utils.js';
import {resetConfiguration} from '../../src/scripts/core/core_config.js';

describe('poi group name', () => {

  let originalTimeout;

  beforeEach((done) => {
    resetConfiguration();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    deleteAllCookies();
    // remove every existing frame
    if (document.getElementById('oil-frame')) {
      document.getElementById('oil-frame').remove();
    }
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
