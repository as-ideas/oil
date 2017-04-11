nightwatch_config = {
  src_folders : [ "test/browserstack" ],

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  common_capabilities: {
    'browserstack.user': 'marcelbankmann1',
    'browserstack.key': 'YsD5Lq6KuGg2oxk9Sscx'
  },

  test_settings: {
    default: {},
    chrome: {
      desiredCapabilities: {
        browser: "chrome"
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: "firefox"
      }
    },
    safari: {
      desiredCapabilities: {
        browser: "safari"
      }
    },
    ie: {
      desiredCapabilities: {
        browser: "internet explorer"
      }
    },
    android4: {
      desiredCapabilities: {
        'browserName': 'android',
        'platform': 'ANDROID',
        'device': 'Samsung Galaxy S5 Mini'
      }
    },
    iphone5: {
      desiredCapabilities: {
        'browserName': 'iPhone',
        'platform': 'MAC',
        'device': 'iPhone 5'
      }
    }
  }
};

// Code to support common capabilites
for(let i in nightwatch_config.test_settings){
  let config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for(let j in nightwatch_config.common_capabilities){
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
