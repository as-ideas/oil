import { findConfiguration } from "../../src/scripts/config";
import { loadFixture } from "../utils";

describe('configuration', () => {

    beforeEach(() => {});

    it('should work with empty config', () => {
        loadFixture('config/empty.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
        expect(config.opt_in_event_name).toBe('oil_optin_done');
    });

    it('should work with a given config', () => {
        loadFixture('config/given.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
        expect(config.language).toBe('de');
        expect(config.opt_in_event_name).toBe('oil_optin_done');
    });

    it('should work with overwritten default values', () => {
        loadFixture('config/overwritten.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
        expect(config.language).toBe('de');
        expect(config.opt_in_event_name).toBe('oil_optin_done_custom');
    });

    it('should work with invalid config', () => {
        loadFixture('config/invalid.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
        expect(config.opt_in_event_name).toBe('oil_optin_done');
    });


});
