import { OIL_LAYER, OIL_YES_BUTTON, PAGE_BACKGROUND } from '../test_constants.js';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .useCss()
      .waitForElementVisible(PAGE_BACKGROUND, 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer closed after clicking yes': function (browser) {
    browser
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .refresh()
      .useCss()
      .waitForElementVisible(PAGE_BACKGROUND, 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  },

  'OIL Layer wont break after the user deleted cookies while having the page open and then click yes': function (browser) {
    browser
      .waitForElementVisible(OIL_LAYER, 2000, false)
      .deleteCookies()
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  }
};
