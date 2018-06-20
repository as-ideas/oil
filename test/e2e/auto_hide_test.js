import {
  OIL_LAYER
} from '../test_constants.js';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/auto-hide.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/auto-hide.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer should be auto-hidden after the correct amount of time': function (browser) {
    browser
      .pause(500)
      .waitForElementVisible(OIL_LAYER, 2000, false)
      .pause(2000)
      .useXpath().waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  }
};
