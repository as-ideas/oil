var baseConfig = require('./karma.conf');

module.exports = function (config) {
  // Load base config
  baseConfig(config);
  // Override base config
  config.set({
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    autoWatch: false
  });
};
