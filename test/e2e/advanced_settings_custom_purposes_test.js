import { OIL_LAYER, OIL_SHOW_COMPANY_LIST_BUTTON } from '../test_constants.js';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-custom-purposes.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-custom-purposes.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'Opens advanced settings when clicking publisher ID': function (browser) {
    browser
      .click(OIL_SHOW_COMPANY_LIST_BUTTON)
      .pause(200)
      .useXpath()
      .waitForElementVisible(OIL_PUBLISHER_DETAILS, 1000)
      .end();
  },

};
