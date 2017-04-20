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
    filename: 'demos/oil_direct-integration.html',
    template: path.resolve(sourcePath, 'demos', 'oil_direct-integration.html'),
    chunks: ['app', 'polyfills'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demo.html',
    template: path.resolve(sourcePath, 'demo.html'),
    chunks: ['demo', 'polyfills'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/iframe.html',
    template: path.resolve(sourcePath, 'demos', 'iframe.html'),
    chunks: ['demos/iframe-test'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/iframe-mypath-test.html',
    template: path.resolve(sourcePath, 'demos', 'iframe-mypath-test.html'),
    chunks: ['demos/iframe-mypath-test'],
    chunksSortMode: 'dependency'
  }],
  entry: {
    'app': path.resolve(sourcePath, 'oil.js'),
    'demo': path.resolve(sourcePath, 'demo.js'),
    'demos/iframe-test': path.resolve(sourcePath, 'demos/iframe-test.js'),
    'demos/iframe-mypath-test': path.resolve(sourcePath, 'demos/iframe-mypath-test.js')
  },
  copy: [{
    from: path.resolve(sourcePath, 'assets'),
    to: 'assets'
  }, {
    from: path.resolve(sourcePath, 'index.html'),
    to: 'index.html'
  }, {
    from: path.resolve(sourcePath, 'demos', 'tealium.html'),
    to: 'demos/tealium.html'
  }
  ],
  mangle: {},
  proxy: {},
  title: 'OIL',
  additionalWebpackOptions: false
};
