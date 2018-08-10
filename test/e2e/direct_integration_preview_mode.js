import { OIL_LAYER } from '../test_constants.js';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration-preview-mode.html')
      .useCss()
      .waitForElementPresent('body', 1000, false)
      .useXpath()
  },

  'OIL Layer wont open in dev Mode without cookie': function (browser) {
    browser
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  }
};
