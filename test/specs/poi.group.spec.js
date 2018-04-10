import {resetConfiguration} from '../../src/scripts/core/core_config.js';
import {loadFixture} from '../utils.js';

describe('POI-Group axelSpringerSe_01', () => {

  beforeEach(() => {
    resetConfiguration();
  });

  //ToDo: tbd test for default POI-Group...maybe more
  xit('should be loaded by default', () => {
    loadFixture('config/empty.config.html');
  });

});
