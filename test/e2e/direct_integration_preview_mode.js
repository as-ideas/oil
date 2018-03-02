import { OIL_LAYER } from '../test_constants.js';

module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration-preview-mode.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration-preview-mode.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
  },

  'OIL Layer wont open in dev Mode without cookie': function (browser) {
    browser
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  }
};
