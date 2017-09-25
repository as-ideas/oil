import { OIL_CONFIG } from '../../src/scripts/constants';
import { getConfiguration, readConfiguration, resetConfiguration, gaTrackEvent } from '../../src/scripts/config';
import { loadFixture } from '../utils';

describe('configuration', () => {

  beforeEach(() => {
    resetConfiguration();
  });

  it('should work with empty config', () => {
    loadFixture('config/empty.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.opt_in_event_name).toBe('oil_optin_done');
  });

  it('should work with a given config', () => {
    loadFixture('config/given.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.language).toBe('de');
    expect(config.opt_in_event_name).toBe('oil_optin_done');
  });

  it('should work with overwritten default values', () => {
    loadFixture('config/overwritten.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.language).toBe('de');
    expect(config.opt_in_event_name).toBe('oil_optin_done_custom');
  });

  it('should work with invalid config', () => {
    loadFixture('config/invalid.config.html');
    let config = getConfiguration();
    expect(config).toBeDefined();
    expect(config.opt_in_event_name).toBe('oil_optin_done');
  });

  it('should generate location', () => {
    let config = {
      'poi_hub_origin': '//oil-integration-cdn.herokuapp.com',
      'poi_hub_path': '/end2end-tests/complete-integration-mypass.html',
      'poi_subscriber_set_cookie': false
    };
    let parsedConfig = readConfiguration({text: JSON.stringify(config)});
    expect(parsedConfig).toBeDefined();
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_ORIGIN]).toBe('http://oil-integration-cdn.herokuapp.com');
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_PATH]).toBe('/end2end-tests/complete-integration-mypass.html');
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_LOCATION]).toBe('http://oil-integration-cdn.herokuapp.com/end2end-tests/complete-integration-mypass.html');
  });

  it('should use config in ga_tracking', () => {
    loadFixture('config/ga_tracking.config.html');
    let parsedConfig = getConfiguration();
    expect(parsedConfig).toBeDefined();
    expect(parsedConfig[OIL_CONFIG.ATTR_GA_TRACKING]).toBe(2);
    expect(parsedConfig[OIL_CONFIG.ATTR_GA_COMMAND_PREFIX]).toBe('homer.');

    // Google Analytics mocks
    window.ga = function (param1, param2, param3, param4, param5) {
      window.ga_result = param1 + param2 + param3 + param4 + param5;
    };
    window.ga.loaded = 1;

    gaTrackEvent('myAction', 0);
    expect(window.ga_result).toBe('homer.sendeventOILmyAction[object Object]');
  });

});
