require('babel-register')();

nightwatch_config = {
  src_folders: [
    "test/e2e"
  ],

  "output_folder": "./target/browserstack-reports",
  "globals_path": "./etc/nightwatch.remote.globals.js",

  selenium: {
    "start_process": false,
    "host": "hub-cloud.browserstack.com",
    "port": 80
  },

  common_capabilities: {
    'browserstack.user': "${ENV_USER}",
    'browserstack.key': "${ENV_KEY}",
    'browserstack.debug': true
  },

  test_settings: {
    default: {},
    chrome14: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '14.0'
      }
    },
    chrome15: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '15.0'
      }
    },
    chrome57: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '57.0'
      }
    },
    chrome65: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '65.0'
      }
    },
    ie9: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '9.0'
      }
    },
    ie10: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '10.0'
      }
    },
    ie11: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '11.0'
      }
    },
    edge14: {
      desiredCapabilities: {
        'browser': 'Edge',
        'browser_version': '14.0'
      }
    },
    edge16: {
      desiredCapabilities: {
        'browser': 'Edge',
        'browser_version': '16.0'
      }
    },
    ff35: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '35.0'
      }
    },
    ff58quantum: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '58.0'
      }
    },
    safari6: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '6.0'
      }
    },
    safari91: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '9.1'
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
    iphone8: {
      desiredCapabilities: {
        'device': 'iPhone 8',
        'realMobile': 'true',
        'os_version': '11.0'
      }
    },
    iphone10: {
      desiredCapabilities: {
        'device': 'iPhone X',
        'realMobile': 'true',
        'os_version': '11.0'
      }
    },
    ipad5: {
      desiredCapabilities: {
        'device': 'iPad 5th',
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
    android6: {
      desiredCapabilities: {
        'device' : 'Google Nexus 6',
        'realMobile' : 'true',
        'os_version' : '6.0'
      }
    },
    android8: {
      desiredCapabilities: {
        'device': 'Google Pixel',
        'realMobile': 'true',
        'os_version': '8.0'
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
