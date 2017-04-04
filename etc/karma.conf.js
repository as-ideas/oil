require('babel-register');

var path = require('path');
var util = require('util');
const debugLog = util.debuglog('oil-debug');
var webpackConfig = require('./webpack.test.js');

var helpers = require('./helpers');
var appConfig = helpers.getAppConfig();

var srcPath = appConfig.srcPath;
var appPath = appConfig.appPath;
var testPath = appConfig.testPath;
var testSpecs = appConfig.testSpecs;
var templatesPath = appConfig.templatesPath;

const JUNIT = appConfig.junit;

webpackConfig.entry = {};

module.exports = function (config) {
  'use strict';
  config.set({

    // see https://github.com/karma-runner/karma-junit-reporter/issues/61
    browserNoActivityTimeout: 30000,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    basePath: process.cwd(),

    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      {pattern: '**/*.html', included: false}
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
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'}
      ]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        colors: true
      }
    },

    singleRun: false,

    colors: true,

    logLevel: config.LOG_INFO
  });
  // TODO move to config
  config.proxies = {
    '/scripts/': 'http://localhost:' + config.port + '/base/src/main/frontend/scripts/'
  };
  for (var key in appConfig.entry) {
    if (key) {
      config.files.push(appConfig.entry[key]);
      config.preprocessors[appConfig.entry[key]] = ['webpack', 'sourcemap'];
    }
  }
  config.files.push({pattern: testSpecs, watched: false});
  config.preprocessors[testSpecs] = ['webpack', 'sourcemap'];

  debugLog('Using following karma config:', config);
};
