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
    'browserstack.key': "${ENV_KEY}"
  },

  test_settings: {
    default: {},
    chrome14: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '14.0'
      }
    },
    chrome40: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '40.0'
      },
      chromeOptions: {
        "args": [
          "window-size=1280,800"
        ]
      }
    },
    chrome57: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '57.0',
      }
    },
    chrome64: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '64.0',
      }
    },
    ie8: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '8.0'
      }
    },
    ie9: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '9.0',
      }
    },
    ie10: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '10.0',
      }
    },
    ie11: {
      desiredCapabilities: {
        'browser': 'IE',
        'browser_version': '11.0',
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
    ff9: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '9.0'
      }
    },
    ff35: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '35.0'
      }
    },
    ff52: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '52.0'
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
        'browser_version': '6.0',
      }
    },
    safari71: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '7.1'
      }
    },
    safari8: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '8.0'
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
        'browser_version': '12.16',
      }
    },
    ipad4: {
      desiredCapabilities: {
        'browserName': 'iPad',
        'platform': 'MAC',
        'device': 'iPad 4th'
      }
    },
    iPadPro: {
      desiredCapabilities: {
        'browserName' : 'iPad',
        'device' : 'iPad Pro',
        'realMobile' : 'true',
        'os_version' : '11.2',
      }
    },
    iphone4S: {
      desiredCapabilities: {
        'browserName' : 'iPhone',
        'platform' : 'MAC',
        'device' : 'iPhone 4S (6.0)'
      }
    },
    iphone5: {
      desiredCapabilities: {
        'browserName': 'iPhone',
        'platform': 'MAC',
        'device': 'iPhone 5'
      }
    },
    iphone6: {
      desiredCapabilities: {
        'browserName': 'iPhone',
        'platform': 'MAC',
        'device': 'iPhone 6'
      }
    },
    iphone7: {
      desiredCapabilities: {
        'browserName' : 'iPhone',
        'device' : 'iPhone 7',
        'realMobile' : 'true',
        'os_version' : '10.3'
      }
    },
    iphone8: {
      desiredCapabilities: {
        'browserName' : 'iPhone',
        'device' : 'iPhone 8',
        'realMobile' : 'true',
        'os_version' : '11.0'
      }
    },
    android4: {
      desiredCapabilities: {
        'browserName' : 'android',
        'platform' : 'ANDROID',
        'device' : 'Samsung Galaxy S5 Mini'
      }
    },
    android5: {
      desiredCapabilities: {
        'browserName' : 'android',
        'device' : 'Samsung Galaxy S6',
        'realMobile' : 'true',
        'os_version' : '5.0',
      }
    },
    android6: {
      desiredCapabilities: {
        'browserName' : 'android',
        'device' : 'Google Nexus 6',
        'realMobile' : 'true',
        'os_version' : '6.0'
      }
    },
    android7: {
      desiredCapabilities: {
        'browserName' : 'android',
        'device' : 'Samsung Galaxy S8',
        'realMobile' : 'true',
        'os_version' : '7.0'
      }
    },
    android8: {
      desiredCapabilities: {
        'browserName' : 'android',
        'device' : 'Google Pixel',
        'realMobile' : 'true',
        'os_version' : '8.0'
      }
    },
  },
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
