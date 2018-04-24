const webpack = require('webpack');
const util = require('util');
const debugLog = util.debuglog('oil-debug');
const path = require('path');
const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();

debugLog('Using following appConfig:', appConfig);

/*
 * Webpack Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/*
 * Webpack Constants
 */
const METADATA = {
  title: appConfig.title,
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
var config = {

  bail: true,

  /*
   * The entry point for the bundle
   * Our Angular.js app
   *
   * See: http://webpack.github.io/docs/configuration.html#entry
   */
  entry: appConfig.entry,

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js', '.jsx', '.json'],

    modules: [
      // Make sure root is src
      appConfig.src,
      appConfig.modulesPath
    ]

  },

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    rules: [
      // PRE-LOADERS
      {
        /*
         * Source map loader support for *.js files
         * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
         *
         * See: https://github.com/webpack/source-map-loader
         */
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          /node_modules/
        ],
        enforce: 'pre'
      },
      // LOADERS

      /*
       * An array of automatically applied loaders.
       *
       * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
       * This means they are not resolved relative to the configuration file.
       *
       * See: http://webpack.github.io/docs/configuration.html#module-loaders
       */

      {
        /*
         *  Babel- and ESLint-Loader
         */
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: [
          /\.ts$/,
          /node_modules/
        ]
      },
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        type: 'javascript/auto',
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/svg+xml'
      }, {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/png'
      }, {
        test: /\.jpeg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/png'
      }, {
        test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=image/png'
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/font-woff'
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?mimetype=application/octet-stream'
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      // https://github.com/jtangelder/sass-loader#usage
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      /*
       * to string and css loader support for *.css files
       * Returns file content as string
       *
       */
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      /* Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]

  },

  output: {
    publicPath: '/'
  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    /*
     * Plugin: CopyWebpackPlugin
     * Description: Copy files and directories in webpack.
     *
     * Copies project static assets.
     *
     * See: https://www.npmjs.com/package/copy-webpack-plugin
     */
    new CopyWebpackPlugin(appConfig.copy),

  ],

  /*
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    fs: 'empty',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
for (var indexConfig of appConfig.indexFiles) {
  config.plugins.push(new HtmlWebpackPlugin(indexConfig));
}

// add additional settings here
if (appConfig.additionalWebpackOptions) {
  config = webpackMerge(config, appConfig.additionalWebpackOptions);
}
module.exports = config;
