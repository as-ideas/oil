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
    filename: 'demos/complete-integration.html',
    template: path.resolve(sourcePath, 'demos', 'complete-integration.html'),
    chunks: ['demos/complete-integration'],
    chunksSortMode: 'dependency'
  }, {
    filename: 'demos/iframe-mypass-test.html',
    template: path.resolve(sourcePath, 'demos', 'iframe-mypass-test.html'),
    chunks: ['demos/iframe-mypass-test'],
    chunksSortMode: 'dependency'
  }],
  entry: {
    'oil': path.resolve(sourcePath, 'oil.js'),
    'demos/direct-integration': path.resolve(sourcePath, 'demos/direct-integration.js'),
    'demos/complete-integration': path.resolve(sourcePath, 'demos/complete-integration.js'),
    'demos/iframe-mypass-test': path.resolve(sourcePath, 'demos/iframe-mypass-test.js')
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
  }],
  mangle: {},
  proxy: {},
  title: 'OIL',
  additionalWebpackOptions: false
};
