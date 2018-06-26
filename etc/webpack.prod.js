const helpers = require('./helpers');
const util = require('util');
const debugLog = util.debuglog('oil-debug');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const appConfig = helpers.getAppConfig();

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
/**
 * Webpack Constants
 */
const ENV = process.env.ENV || process.env.NODE_ENV || 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig.metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

const BUNDLE_VERSION = process.env.npm_package_version + (process.env.SNAPSHOT || '-SNAPSHOT');
const LATEST_RELEASE_VERSION = process.env.npm_package_version;

console.info('Building BUNDLE_VERSION', BUNDLE_VERSION);

const config = webpackMerge(commonConfig, {

  /**
   * Webpack mode (see https://webpack.js.org/concepts/mode/ for details).
   */
  mode: 'production',

  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  //devtool: 'source-map',

  /**
   * Options affecting the output of the compilation.
   *
   * See: http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: appConfig.dist,

    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: `[name].${BUNDLE_VERSION}.min.js`,

    /**
     * The filename of the SourceMaps for the JavaScript files.
     * They are inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
     */
    sourceMapFilename: `[name].${BUNDLE_VERSION}.min.map`,

    /**
     * The filename of non-entry chunks as relative path
     * inside the output.path directory.
     *
     * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
     */
    chunkFilename: `[id].${BUNDLE_VERSION}.chunk.js`

  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    // new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),

    /*
     * Plugin: OccurenceOrderPlugin
     * Description: Varies the distribution of the ids to get the smallest id length
     * for often used ids.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
     * See: https://github.com/webpack/docs/wiki/optimization#minimize
     */
    new webpack.optimize.OccurrenceOrderPlugin(true),
    /**
     * Plugin: WebpackMd5Hash
     * Description: Plugin to replace a standard webpack chunkhash with md5.
     *
     * See: https://www.npmjs.com/package/webpack-md5-hash
     */
    new WebpackMd5Hash(),

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.OIL_VERSION': JSON.stringify(BUNDLE_VERSION),
      'process.env.LATEST_RELEASE_VERSION': JSON.stringify(LATEST_RELEASE_VERSION)
    }),

    /**
     * Plugin: banner-webpack-plugin
     *
     * Adds comments to ouput files, eg. the version
     *
     * See: https://webpack.js.org/plugins/banner-plugin/
     * See: https://stackoverflow.com/questions/34280117/include-comment-at-top-of-webpack-file
     */
    new webpack.BannerPlugin(BUNDLE_VERSION),

    /**
     * The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated. These options are simply moved into a new plugin, LoaderOptionsPlugin, for separation of concerns reasons. Use it as such:
     */
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
    new UglifyJsPlugin({
      uglifyOptions: {
        debug: false,
        sourceMap: false,
        beautify: false,
        compress: {
          ie8: true,
          passes: 3
        },
        parse: {
          // screw_ie8: true,
          // sequences: true,  // join consecutive statemets with the “comma operator”
          // properties: true,  // optimize property access: a["foo"] → a.foo
          // dead_code: true,  // discard unreachable code
          // drop_debugger: true,  // discard “debugger” statements
          // unsafe: false, // some unsafe optimizations (see below)
          // conditionals: true,  // optimize if-s and conditional expressions
          // comparisons: true,  // optimize comparisons
          // evaluate: true,  // evaluate constant expressions
          // booleans: true,  // optimize boolean expressions
          // loops: true,  // optimize loops
          // unused: true,  // drop unused variables/functions
          // hoist_funs: true,  // hoist function declarations
          // hoist_vars: false, // hoist variable declarations
          // if_return: true,  // optimize if-s followed by return/continue
          // join_vars: true,  // join var declarations
          // cascade: true,  // try to cascade `right` into `left` in sequences
          // side_effects: true,  // drop side-effect-free statements
          // warnings: false,
        },
        comments: false

      }
    })
  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

});

debugLog('Using following webpack prod config:', config);
module.exports = config;
