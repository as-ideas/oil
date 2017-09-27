const path = require("path");

const sourcePath = 'src';
const testPath = 'test';
const outputPath = 'dist';


module.exports = {
  appName: 'OptInLayer',
  srcPath: sourcePath,
  testPath: testPath,
  junit: {
    title: 'OptInLayer',
    dir: 'target/test-reports'
  },
  templatesPath: 'templates',
  distPath: outputPath,
  globals: {},
  chunks: {
    name: ['polyfills'].reverse()
  },
  indexFiles: [{
    filename: 'demos/direct-integration.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration.html'),
    chunks: ['demos/direct-integration'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/complete-integration-site-a.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration-site-a.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/complete-integration-site-b.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration-site-b.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/complete-integration-mypass.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration-mypass.html'),
    chunks: ['hub'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/direct-integration.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'direct-integration.html'),
    chunks: ['hub'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/direct-integration-preview-mode.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'direct-integration-preview-mode.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/direct-integration-event-test.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'direct-integration-event-test.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/direct-integration-opt-later-event-test.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'direct-integration-opt-later-event-test.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/direct-integration-opt-out-event-test.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'direct-integration-opt-out-event-test.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/complete-integration-mypass.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'complete-integration-mypass.html'),
    chunks: ['hub'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/complete-integration-site-a.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'complete-integration-site-a.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/complete-integration-site-b.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'complete-integration-site-b.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }],
  entry: {
    'oil': path.resolve(sourcePath, 'oil.js'),
    'demos/direct-integration': path.resolve(sourcePath, 'oil.js'),
    'hub': path.resolve(sourcePath, 'hub.js')
  },
  copy: [{
    from: path.resolve(sourcePath, 'assets'),
    to: 'assets'
  }, {
    from: path.resolve(sourcePath, '../release'),
    to: 'release'
  }, {
    from: path.resolve(sourcePath, 'index.html'),
    to: 'index.html'

  }, {
    from: path.resolve(sourcePath, 'end2end-tests', 'tealium-integration-test.html'),
    to: 'end2end-tests/tealium-integration-test.html'
  }, {
    from: path.resolve(sourcePath, 'demos', 'tealium-integration-production.html'),
    to: 'demos/tealium-integration-production.html'
  }],
  mangle: {},
  proxy: {},
  title: 'OIL',
  additionalWebpackOptions: false
};
