import {
  OIL_LAYER
} from '../test_constants.js';

module.exports = {
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

  'OIL Layer should be auto-hided after the correct amount of time': function (browser) {
    browser
      .pause(800)
      .waitForElementVisible(OIL_LAYER, 2000, false)
      .pause(800)
      .useXpath().waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  }
};
