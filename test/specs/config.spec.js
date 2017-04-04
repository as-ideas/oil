import { findConfiguration } from "../../src/scripts/config";
import { loadFixture } from "../utils";

describe('configuration', () => {

    beforeEach(() => {});

    it('should work with empty config', () => {
        loadFixture('config/empty.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
        expect(config).toBeNull();
    });

    it('should work with given config', () => {
        loadFixture('config/given.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
    });

    it('should work with invalid config', () => {
        loadFixture('config/invalid.config.html');
        let config = findConfiguration();
        expect(config).toBeDefined();
        expect(config).toBeNull();
    });


});