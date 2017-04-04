import { findConfiguration } from "../../src/scripts/config";
import { loadFixture } from "../utils";

describe('configuration', () => {

    beforeEach(() => {});

    it('should work with empty config', () => {
        loadFixture('config/empty.config.html');
        let parsedConfig = findConfiguration();
        expect(parsedConfig).toBeDefined();
        expect(parsedConfig).toBeNull();
    });

    it('should work with given config', () => {
        loadFixture('config/given.config.html');
        let parsedConfig = findConfiguration();
        expect(parsedConfig).toBeDefined();
        let config = parsedConfig.config;
        expect(config.language).toBe('de');
        expect(config.opt_in_event_name).toBe('optinreceived');

    });

    it('should work with invalid config', () => {
        loadFixture('config/invalid.config.html');
        let parsedConfig = findConfiguration();
        expect(parsedConfig).toBeDefined();
        expect(parsedConfig).toBeNull();
    });


});