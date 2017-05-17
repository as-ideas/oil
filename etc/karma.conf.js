require('babel-register');

const path = require('path');
const util = require('util');
const debugLog = util.debuglog('oil-debug');
const isDebug = false;
const webpackConfig = require('./webpack.test.js');
// import CORS config
const headerConfig = require('./headerConfig');

const helpers = require('./helpers');
const appConfig = helpers.getAppConfig();

const srcPath = appConfig.srcPath;
const appPath = appConfig.appPath;
const testPath = appConfig.testPath;
const testSpecs = appConfig.testSpecs;
const templatesPath = appConfig.templatesPath;

const JUNIT = appConfig.junit;

//delete webpackConfig.entry;

module.exports = function (config) {
  'use strict';
  config.set({

    // see https://github.com/karma-runner/karma-junit-reporter/issues/61
    browserNoActivityTimeout: 30000,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    basePath: process.cwd(),

    frameworks: [
      'jasmine-jquery',
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      { pattern: '**/*.html', included: false }
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9001,

    // Start these browsers, currently available:
    // Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    reporters: [
      'progress',
      'junit',
      'kjhtml'
    ],

    junitReporter: JUNIT,

    coverageReporter: {
      dir: '../target/coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: { // Add asset Information
        assets: isDebug,
        // Sort assets by a field
        assetsSort: "field",
        // Add information about cached (not built) modules
        cached: isDebug,
        // Add children information
        children: isDebug,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: isDebug,
        // Add built modules information to chunk information
        chunkModules: isDebug,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: isDebug,
        // Sort the chunks by a field
        chunksSort: "field",
        // Context directory for request shortening
        context: "../src/",
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        errorDetails: true,
        colors: true
      }
    },

    singleRun: false,

    colors: true,

    logLevel: config.LOG_INFO
  });
  config.proxies = {
    '/scripts/': 'http://localhost:' + config.port + '/base/src/scripts/'
  };
  for (var key in appConfig.entry) {
    if (key) {
      // skip demos
      if (key.indexOf('demos/') === -1) {
        config.files.push(appConfig.entry[key]);
        config.preprocessors[appConfig.entry[key]] = ['webpack', 'sourcemap'];
      }
    }
  }

  config.customHeaders = [];
  for (key in headerConfig.headers) {
    // skip loop if the property is from prototype
    if (!headerConfig.headers.hasOwnProperty(key)) continue;
    // copy header config
    let object = headerConfig.headers[key];
    config.customHeaders.push({
      match: '.*',
      name: key,
      value: object
    });
  }
  config.files.push({ pattern: testSpecs, watched: false });
  config.preprocessors[testSpecs] = ['webpack', 'sourcemap'];

  debugLog('Using following karma config:', config);
};

