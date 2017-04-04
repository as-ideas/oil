/**
 * Load a jasmine fixture from the given path
 * @param {string} file - filename
 * @function
 */
export function loadFixture(file) {
    jasmine.getFixtures().fixturesPath = '/base/test/fixtures';
    loadFixtures(file);
}