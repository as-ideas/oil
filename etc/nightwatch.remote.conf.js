require('babel-register')();
const HtmlReporter = require('nightwatch-html-reporter');

let reporter = new HtmlReporter({
  uniqueFilename: true,
  reportsDirectory: __dirname + '/../reports'
});

nightwatch_config = {
  src_folders: [
    "test/e2e"
  ],

  "output_folder": false,

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
    default: {
      'globals': {
        'openBrowser': false,
        'launch_url_host1': 'https://oil-integration-host1.herokuapp.com/',
        'launch_url_host2': 'https://oil-integration-host2.herokuapp.com/',
        'reporter': reporter.fn
      }
    },
    chrome15: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '15.0',
        'browserstack.console': 'disable'
      }
    },
    chrome74: {
      desiredCapabilities: {
        'browser': 'Chrome',
        'browser_version': '74.0',
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
    edge18: {
      desiredCapabilities: {
        'browser': 'Edge',
        'browser_version': '18.0'
      }
    },
    ff35: {
      desiredCapabilities: {
        'browser': 'Firefox',
        'browser_version': '35.0'
      }
    },
    ff66: {
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
    safari12: {
      desiredCapabilities: {
        'browser': 'Safari',
        'browser_version': '12.0'
      }
    },
    opera1216: {
      desiredCapabilities: {
        'browser': 'Opera',
        'browser_version': '12.16'
      }
    },
    opera60: {
      desiredCapabilities: {
        'browser': 'Opera',
        'browser_version': '60.0'
      }
    },
    iphoneSE: {
      desiredCapabilities: {
        'device': 'iPhone SE',
        'realMobile': 'true',
        'os_version': '11.2'
      }
    },
    iphone6: {
      desiredCapabilities: {
        'device': 'iPhone 6',
        'realMobile': 'true',
        'os_version': '8.0'
      }
    },
    iphoneXS: {
      desiredCapabilities: {
        'device': 'iPhone XS',
        'realMobile': 'true',
        'os_version': '12.0'
      }
    },
    ipadpro: {
      desiredCapabilities: {
        'device': 'iPad Pro 12.9 2018',
        'realMobile': 'true',
        'os_version': '12.0'
      }
    },
    android4: {
      desiredCapabilities: {
        'device': 'Google Nexus 5',
        'realMobile': 'true',
        'os_version': '4.4'
      }
    },
    android9: {
      desiredCapabilities: {
        'os_version' : '9.0',
        'device' : 'Samsung Galaxy S9+',
        'real_mobile' : 'true',
        'browserstack.console' : 'disable'
      },
    },
    galaxyNote9: {
      desiredCapabilities: {
        'device': 'Samsung Galaxy Note 9',
        'realMobile': 'true',
        'os_version': '8.1'
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
