const path = require("path");

const sourcePath = 'src';
const testPath = 'test';
const docsPath = 'docs';
const outputPath = 'dist';

module.exports = {
  appName: 'OptInLayer',
  srcPath: sourcePath,
  testPath: testPath,
  docsPath: docsPath,
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
    filename: 'hub.html',
    template: path.resolve(sourcePath, '', 'hub.html'),
    chunks: ['hub'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration.html'),
    chunks: ['demos/direct-integration'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings-poi.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings-poi.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings-poi-integrated.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings-poi-integrated.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration-preview-mode.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration-preview-mode.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration-event-test.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration-event-test.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration-opt-later-event-test.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration-opt-later-event-test.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration-opt-out-event-test.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration-opt-out-event-test.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/complete-integration-mypass.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration-mypass.html'),
    chunks: ['hub'],
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
    filename: 'demos/demo-group-a-site-a.html',
    template: path.resolve(sourcePath, 'demos', 'demo-group-a-site-a.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/demo-group-a-site-b.html',
    template: path.resolve(sourcePath, 'demos', 'demo-group-a-site-b.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/demo-group-b-site-a.html',
    template: path.resolve(sourcePath, 'demos', 'demo-group-b-site-a.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/demo-group-b-site-b.html',
    template: path.resolve(sourcePath, 'demos', 'demo-group-b-site-b.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/tealium-integration-test.html',
    template: path.resolve(sourcePath, 'demos', 'tealium-integration-test.html'),
    chunks: [],
    chunksSortMode: 'dependency'
  }],
  entry: {
    'oil': path.resolve(sourcePath, 'oil.js'),
    'oil_preloader': path.resolve(sourcePath, 'oil_preloader.js'),
    'demos/direct-integration': path.resolve(sourcePath, 'oil.js'),
    'hub': path.resolve(sourcePath, 'hub.js')
  },
  copy: [{
    from: path.resolve(sourcePath, 'assets'),
    to: 'assets'
  }, {
    from: path.resolve(docsPath, 'src/images'),
    to: 'docs/src/images'
  }, {
    from: path.resolve(sourcePath, 'examples'),
    to: 'examples'
  }, {
    from: path.resolve(sourcePath, '../release'),
    to: 'release'
  }, {
    from: path.resolve(sourcePath, 'index.html'),
    to: 'index.html'

  }, {
    from: path.resolve(sourcePath, 'legal'),
    to: 'legal'

  }],
  mangle: {},
  proxy: {},
  title: 'OIL',
  additionalWebpackOptions: false
};
