const path = require('path');
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
  chunks: {
    name: ['polyfills'].reverse()
  },
  indexFiles: [{
    filename: 'hub.html',
    template: path.resolve(sourcePath, '', 'hub.html'),
    chunks: ['hub'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings-custom-purposes.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings-custom-purposes.html'),
    chunks: ['oilstub', 'oil', 'oildevkit'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings-purposes-default.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings-purposes-default.html'),
    chunks: ['oilstub', 'oil', 'oildevkit'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/english-version.html',
    template: path.resolve(sourcePath, 'demos', 'english-version.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/configuration-default-optin.html',
    template: path.resolve(sourcePath, 'demos', 'configuration-default-optin.html'),
    chunks: ['oil', 'oildevkit'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/advanced-settings-e2e-locale.html',
    template: path.resolve(sourcePath, 'demos', 'advanced-settings-e2e-locale.html'),
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
    chunks: ['oil', 'oildevkit'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/open-source-example.html',
    template: path.resolve(sourcePath, 'demos', 'open-source-example.html'),
    chunks: [],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration.dark.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration-dark.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/direct-integration-with-all-buttons.html',
    template: path.resolve(sourcePath, 'demos', 'direct-integration-with-all-buttons.html'),
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
  }, {
    filename: 'demos/auto-hide.html',
    template: path.resolve(sourcePath, 'demos', 'auto-hide.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/small-design.html',
    template: path.resolve(sourcePath, 'demos', 'small-design.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/tag-management.html',
    template: path.resolve(sourcePath, 'demos', 'tag-management.html'),
    chunks: ['oil'],
    chunksSortMode: 'dependency'
  }],
  entry: {
    'hub': path.resolve(sourcePath, 'hub.js'),
    'oil': path.resolve(sourcePath, 'oil.js'),
    'oildevkit': path.resolve(sourcePath, 'scripts/dev-kit/dev-kit.js'),
    'oilstub': path.resolve(sourcePath, 'oilstub.js')
  },
  copy: [{
    from: path.resolve(sourcePath, 'public'),
    to: ''
  }, {
    from: path.resolve(sourcePath, 'assets'),
    to: 'assets'
  }, {
    from: path.resolve(docsPath, 'src/images'),
    to: 'docs/src/images'
  }, {
    from: path.resolve(sourcePath, 'poi-lists'),
    to: 'poi-lists'
  }, {
    from: path.resolve(sourcePath, '../release'),
    to: 'release'
  }, {
    from: path.resolve(sourcePath, 'demos/empty.html'),
    to: 'demos/empty.html'
  }, {
    from: path.resolve(sourcePath, 'cmp'),
    to: 'cmp'
  }],
  mangle: {},
  proxy: {},
  title: 'OIL',
  additionalWebpackOptions: false
};
