nightwatch_config = {
  src_folders : [ "test/browserstack" ],

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

   "output_folder": "./target/browserstack-reports",

  common_capabilities: {
    'browserstack.user': 'marcelbankmann1',
    'browserstack.key': 'YsD5Lq6KuGg2oxk9Sscx'
  },

  test_settings: {
    default: {},
    chrome14: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '14.0',
      }
    },
    chromeRecent: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '57.0',
      }
    },
    ie9: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '9.0',
      }
    },
    edge: {
      'os': 'Windows',
      'browser': 'Edge',
      'browser_version': '14.0'
    },
    firefox9: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '9.0',
      }
    },
    firefoxRecent: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '52.0'
      }
    },
    safari6: {
      desiredCapabilities: {
        'os': 'OS X',
        'browser': 'Safari',
        'browser_version': '6.0',
      }
    },
    safari9: {
      desiredCapabilities: {
        'os': 'OS X',
        'browser': 'Safari',
        'browser_version': '9.1'
      }
    },
    safariRecent: {
      desiredCapabilities: {
        'os': 'OS X',
        'browser': 'Safari',
        'browser_version': '9.1'
      }
    },
    opera: {
      desiredCapabilities: {
        'os': 'Windows',
        'os_version': '7',
        'browser': 'Opera',
        'browser_version': '12.16',
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
