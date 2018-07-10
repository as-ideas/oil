var baseConfig = require('./karma.conf');

module.exports = function (config) {
  // Load base config
  baseConfig(config);
  // Override base config
  config.set({
    preprocessors: {
      'dist/oil.bundle.js': ['coverage']
    },

    reporters: [
      'spec',
      'junit',
      'kjhtml',
      'coverage',
      'coveralls'
    ],

    coverageReporter: {
      dir: 'target/coverage',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'},
        {type: 'lcov'}
      ]
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    autoWatch: false,
  });
  config.files.push('dist/oil.bundle.js');
};
