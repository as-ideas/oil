nightwatch_config = {
  src_folders : [
    "test/e2e"
  ],

  "output_folder": "./target/browserstack-reports",
  "globals_path": "./etc/remote_globals.js",

  selenium : {
    "start_process" : false,
    "host" : "hub-cloud.browserstack.com",
    "port" : 80
  },

  common_capabilities: {
    'browserstack.user': 'asideas1',
    'browserstack.key': 'r7VdBAeqfwx3o3Drqg81'
  },

  test_settings: {
    default: {
    },
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
        'device': 'HTC One M8'
      }
    },
    iphone5: {
      desiredCapabilities: {
        'browserName': 'iPhone',
        'platform': 'MAC',
        'device': 'iPhone 5'
      }
    }, 
    chrome14Win7: {
    	desiredCapabilities: {
		  'os': 'Windows',
		  'os_version': '7',
		  'browser': 'Chrome',
		  'browser_version': '14.0'
		}
	}, 
    chrome40Win81: {
    	desiredCapabilities: {
		  'os': 'Windows',
		  'os_version': '8.1',
		  'browser': 'Chrome',
		  'browser_version': '40.0'
		}
	}, 
    IE8Win7: {
    	desiredCapabilities: {
		  'os': 'Windows',
		  'os_version': '7',
		  'browser': 'IE',
		  'browser_version': '8.0'
		}
	}, 
    FF9Win7: {
    	desiredCapabilities: {
		  'os': 'Windows',
		  'os_version': '7',
		  'browser': 'Firefox',
		  'browser_version': '9.0'
		}
	},  
    FF35Win81: {
    	desiredCapabilities: {
		  'os': 'Windows',
		  'os_version': '8.1',
		  'browser': 'Firefox',
		  'browser_version': '35.0'
		}
	}, 
    Opera1215Win81: {
    	desiredCapabilities: {
		  'os': 'Windows',
		  'os_version': '8.1',
		  'browser': 'Opera',
		  'browser_version': '12.15'
		}
	},  
    Safari71: {
    	desiredCapabilities: {
		  'os': 'OS X',
		  'os_version': 'Mavericks',
		  'browser': 'Safari',
		  'browser_version': '7.1'
		}
	},  
    Safari8: {
    	desiredCapabilities: {
		  'os': 'OS X',
		  'os_version': 'Yosemite',
		  'browser': 'Safari',
		  'browser_version': '8.0'
		}
	},  
    Safari91: {
    	desiredCapabilities: {
		  'os': 'OS X',
		  'os_version': 'Yosemite',
		  'browser': 'Safari',
		  'browser_version': '9.1'
		}
	},  
    iphone5s_ios6: {
    	desiredCapabilities: {
			'browserName': 'iPhone',
			'platform': 'MAC',
			'device': 'iPhone 5S'
		}
	},  
    ipad4_ios7: {
    	desiredCapabilities: {
		  'browserName': 'iPad',
		  'platform': 'MAC',
		  'device': 'iPad 4th'
		}
	},  
    iphone6_ios83: {
    	desiredCapabilities: {
		  'browserName': 'iPhone',
		  'platform': 'MAC',
		  'device': 'iPhone 6'
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
