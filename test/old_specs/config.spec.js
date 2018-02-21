import { OIL_CONFIG } from '../../src/scripts/constants';
import { getConfiguration, readConfiguration, resetConfiguration } from '../../src/scripts/config';
import { loadFixture } from '../utils';

describe('configuration', () => {

  beforeEach(() => {
    resetConfiguration();
  });

  it('should work with empty config', () => {
    loadFixture('config/empty.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.cookie_expires_in_days).toBe(31);
  });

  it('should work with a given config', () => {
    loadFixture('config/given.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.cookie_expires_in_days).toBe(31);
    expect(config.label_intro_heading).toBe('lisa simpson');
  });

  it('should work with overwritten default values', () => {
    loadFixture('config/overwritten.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.label_intro_heading).toBe('lisa simpson');
  });

  it('should work with invalid config', () => {
    loadFixture('config/invalid.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.cookie_expires_in_days).toBe(31);
  });

  it('should generate location', () => {
    let config = {
      'poi_hub_origin': '//oil-integration-cdn.herokuapp.com',
      'poi_hub_path': '/demos/complete-integration-mypass.html',
      'poi_subscriber_set_cookie': false
    };
    let parsedConfig = readConfiguration({text: JSON.stringify(config)});
    expect(parsedConfig).toBeDefined();
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_ORIGIN]).toBe('http://oil-integration-cdn.herokuapp.com');
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_PATH]).toBe('/demos/complete-integration-mypass.html');
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_LOCATION]).toBe('http://oil-integration-cdn.herokuapp.com/demos/complete-integration-mypass.html');
  });

});
