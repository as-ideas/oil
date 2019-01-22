var nwc = require('./nightwatch.remote.conf.js');

nwc.common_capabilities['browserstack.local'] = true;
nwc.globals_path = "./nightwatch.localhost.globals.js";

// Code to support common capabilites
for (let i in nwc.test_settings) {
  let config = nwc.test_settings[i];
  config['selenium_host'] = nwc.selenium.host;
  config['selenium_port'] = nwc.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for (let j in nwc.common_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nwc.common_capabilities[j];
  }
}

module.exports = nwc;
