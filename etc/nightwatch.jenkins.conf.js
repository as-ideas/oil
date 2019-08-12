require('babel-register')();
const BINPATH = './node_modules/nightwatch/bin/';

// we use a nightwatch.remote.conf.js file so we can include comments and helper functions
module.exports = {
  'src_folders': [
    'test/e2e'
  ],

  'output_folder': './target/local-reports',
  'selenium': { // downloaded by selenium-download module (see readme)
    'start_process': true, // tells nightwatch to start/stop the selenium process
    'server_path': './node_modules/nightwatch/bin/selenium.jar',
    'host': '127.0.0.1',
    'port': 4444, // standard selenium port
    'cli_args': { // chromedriver is downloaded by selenium-download (see readme)
      'webdriver.chrome.driver': './node_modules/nightwatch/bin/chromedriver'
    }
  },

  'test_settings': {
    'default': {
      'screenshots': {
        'enabled': false,
        'path': ''
      },
      'globals': {
        'waitForConditionTimeout': 5000,
        'openBrowser': false,
        'launch_url_host1': 'https://oil-integration-host1.herokuapp.com/',
        'launch_url_host2': 'https://oil-integration-host2.herokuapp.com/',
      }
    },
    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'chromeOptions': {
          'w3c': false,
          'args': [
            '--headless',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--no-sandbox',
            'window-size=1024,768'
          ]
        }
      }
    }
  }
};

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 /the following code checks for the existence of `selenium.jar` before trying to run our tests.
 */

require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function (error) {
      if (error) {
        throw new Error(error);
      } // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
