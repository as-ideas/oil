const util = require('util');
const debugLog = util.debuglog('oil-debug');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const prodConfig = require('./webpack.prod.js'); // the settings that are common to prod and dev

let config = webpackMerge(prodConfig, {

  /**
   * Webpack mode (see https://webpack.js.org/concepts/mode/ for details).
   */
  mode: 'production',

  output: {
    // the public path which is used by all System.require
    publicPath: `https://unpkg.com/@ideasio/oil.js@${process.env.npm_package_version}/dist/latest/`,
  }
});

debugLog('Using following webpack release config:', config);
module.exports = config;
