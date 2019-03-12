require('babel-register')();

nightwatch_config = {
  src_folders: [
    "test/e2e"
  ],

  "output_folder": "./target/browserstack-reports",
  "globals_path": "./nightwatch.remote.globals.js",

  selenium: {
    "start_process": false,
    "host": "hub-cloud.browserstack.com",
    "port": 80
  },

  common_capabilities: {
    'browserstack.user': "${ENV_USER}",
    'browserstack.key': "${ENV_KEY}",
    'browserstack.debug': true,
    'project': 'oil.js'
  },

  test_settings: {
    default: {},
    chrome15: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '15.0',
        'browserstack.console': 'disable'
      }
    },
    chrome68: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '68.0',
        'browserstack.console': 'disable'
      }
    },
    ie9: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '9.0',
        'browserstack.console': 'disable'
      }
    },
    ie11: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '11.0'
      }
    },
    edge17: {
      desiredCapabilities: {
        'browser': 'Edge',
        'browser_version': '17.0'
      }
    },
    ff35: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '35.0'
      }
    },
    ff61: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '61.0'
      }
    },
    safari6: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '6.0'
      }
    },
    safari11: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '11.0'
      }
    },
    opera1216: {
      desiredCapabilities: {
        'browser': 'Opera',
        'browser_version': '12.16'
      }
    },
    iphoneSE: {
      desiredCapabilities: {
        'device': 'iPhone SE',
        'realMobile': 'true',
        'os_version': '11.2'
      }
    },
    iphone10: {
      desiredCapabilities: {
        'device': 'iPhone X',
        'realMobile': 'true',
        'os_version': '11.0'
      }
    },
    ipadpro: {
      desiredCapabilities: {
        'device': 'iPad Pro',
        'realMobile': 'true',
        'os_version': '11.2'
      }
    },
    android4: {
      desiredCapabilities: {
        'device': 'Google Nexus 5',
        'realMobile': 'true',
        'os_version': '4.4'
      }
    },
    android8: {
      desiredCapabilities: {
        'os_version' : '8.0',
        'device' : 'Samsung Galaxy S9',
        'real_mobile' : 'true',
        'browserstack.console' : 'disable'
      },
    },
    galaxyNote4: {
      desiredCapabilities: {
        'device': 'Samsung Galaxy Note 4',
        'realMobile': 'true',
        'os_version': '6.0'
      }
    }
  }
};

// Code to support common capabilites
for (let i in nightwatch_config.test_settings) {
  let config = nightwatch_config.test_settings[i];
  config['selenium_host'] = nightwatch_config.selenium.host;
  config['selenium_port'] = nightwatch_config.selenium.port;
  config['desiredCapabilities'] = config['desiredCapabilities'] || {};
  for (let j in nightwatch_config.common_capabilities) {
    config['desiredCapabilities'][j] = config['desiredCapabilities'][j] || nightwatch_config.common_capabilities[j];
  }
}

module.exports = nightwatch_config;
