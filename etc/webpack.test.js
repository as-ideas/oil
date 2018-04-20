const helpers = require('./helpers');
const webpack = require('webpack');
const util = require('util');
const debugLog = util.debuglog('oil-debug');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common
const appConfig = helpers.getAppConfig();

/**
 * Webpack Plugins
 */
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const SourceMapDevToolPlugin = require('webpack/lib/SourceMapDevToolPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV || process.env.NODE_ENV || 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

var config = webpackMerge(commonConfig, {

  /**
   * Webpack mode (see https://webpack.js.org/concepts/mode/ for details).
   */
  mode: 'production',

  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /**
     * An array of applied pre and post loaders.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
     */

    rules: [
      // PRE-LOADERS
      /**
       * Instruments JS files with Istanbul for subsequent code coverage reporting.
       * Instrument only testing sources.
       *
       * See: https://github.com/deepsweet/istanbul-instrumenter-loader
       */
      {
        test: /\.(js|ts)$/,
        loader: 'istanbul-instrumenter-loader',
        include: [
          appConfig.srcPath,
          appConfig.testPath
        ],
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ],
        enforce: 'pre'
      }
    ]
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }),
    new LoaderOptionsPlugin({
      test: /\.ts/i,
      options: {
        tslint: {
          enforce: 'pre',
          emitErrors: true,
          failOnHint: false
        }
      }
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV),
        'HMR': false
      },
      'APP_CONFIG': JSON.stringify(appConfig)
    })
  ]
});

debugLog('Using following webpack test config:', config);
module.exports = config;
