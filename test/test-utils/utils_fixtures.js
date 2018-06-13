/**
 * Load a jasmine fixture from the given path
 * @param {string} file - filename
 * @function
 */
export function loadFixture(file) {
  jasmine.getFixtures().fixturesPath = '/base/test/fixtures';
  window.loadFixtures(file);
}

export function readFixture(file) {
  jasmine.getFixtures().fixturesPath = '/base/test/fixtures';
  return window.readFixtures(file);
}

