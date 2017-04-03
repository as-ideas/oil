require('babel-register');

var path = require('path');
var util = require('util');
var debugLog = util.debuglog('@holisticon/angularjs-common/karma.conf');
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

    // see https://github.com/angular/angular-cli/issues/2125
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },

    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
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

    preprocessors: {
      ['**/*.html']: ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: '.*/frontend/scripts/',
      prependPrefix: 'scripts/'
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
