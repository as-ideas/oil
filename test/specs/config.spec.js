import { OIL_CONFIG } from "../../src/scripts/constants";
import { getConfiguration, readConfiguration, resetConfiguration } from "../../src/scripts/config";
import { loadFixture } from "../utils";

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
      'hub_origin': '//oil-integration-cdn.herokuapp.com',
      'hub_path': '/end2end-tests/complete-integration-mypass.html',
      'subscriber_set_cookie': false
    };
    let parsedConfig = readConfiguration({ text: JSON.stringify(config) });
    expect(parsedConfig).toBeDefined();
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_ORIGIN]).toBe('http://oil-integration-cdn.herokuapp.com');
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_PATH]).toBe('/end2end-tests/complete-integration-mypass.html');
    expect(parsedConfig[OIL_CONFIG.ATTR_HUB_LOCATION]).toBe('http://oil-integration-cdn.herokuapp.com/end2end-tests/complete-integration-mypass.html');
  });


});
