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
    chunks: ['demos/complete-integration-site-a'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/complete-integration-site-b.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration-site-b.html'),
    chunks: ['demos/complete-integration-site-b'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/complete-integration-mypass.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration-mypass.html'),
    chunks: ['demos/complete-integration-mypass'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/direct-integration.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'direct-integration.html'),
    chunks: ['end2end-tests/direct-integration'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/complete-integration-mypass.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'complete-integration-mypass.html'),
    chunks: ['end2end-tests/complete-integration-mypass'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/complete-integration-site-a.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'complete-integration-site-a.html'),
    chunks: ['end2end-tests/complete-integration-site-a'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'end2end-tests/complete-integration-site-b.html',
    template: path.resolve(sourcePath, 'end2end-tests', 'complete-integration-site-b.html'),
    chunks: ['end2end-tests/complete-integration-site-b'],
    chunksSortMode: 'dependency'
  }],
  entry: {
    'oil': path.resolve(sourcePath, 'oil.js'),
    'hub': path.resolve(sourcePath, 'hub.js'),
    'subscriber': path.resolve(sourcePath, 'subscriber.js'),
    'demos/direct-integration': path.resolve(sourcePath, 'demos/direct-integration.js'),
    'demos/complete-integration-site-a': path.resolve(sourcePath, 'subscriber.js'),
    'demos/complete-integration-site-b': [path.resolve(sourcePath, 'subscriber.js'), path.resolve(sourcePath, 'demos', 'complete-integration-site-b.js')],
    'demos/complete-integration-mypass': path.resolve(sourcePath, 'hub.js'),
    'end2end-tests/direct-integration': path.resolve(sourcePath, 'subscriber.js'),
    'end2end-tests/complete-integration-site-a': path.resolve(sourcePath, 'subscriber.js'),
    'end2end-tests/complete-integration-site-b': path.resolve(sourcePath, 'subscriber.js'),
    'end2end-tests/complete-integration-mypass': path.resolve(sourcePath, 'hub.js'),
  },
  copy: [{
    from: path.resolve(sourcePath, 'assets'),
    to: 'assets'
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
