import {
  OIL_LAYER,
  OIL_SHOW_COMPANY_LIST_BUTTON,
  OIL_SHOW_THIRD_PARTY_LIST_BUTTON,
  OIL_LAYER_COMPANY_LIST,
  OIL_LAYER_THIRD_PARTY_LIST,
  OIL_BACK_BUTTON,
  OIL_LAYER_FULL
} from '../test_constants.js';

module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer show group list clicked, verify group list is visible and back': function (browser) {
    browser
      .useCss().waitForElementVisible(OIL_SHOW_COMPANY_LIST_BUTTON, 500)
      .useCss().waitForElementVisible(OIL_SHOW_THIRD_PARTY_LIST_BUTTON, 500)
      .useCss().click(OIL_SHOW_COMPANY_LIST_BUTTON)
      .pause(200)
      .useXpath().waitForElementNotPresent(OIL_LAYER_FULL, 500)
      .useXpath().waitForElementVisible(OIL_LAYER_COMPANY_LIST, 500)
      .useXpath().waitForElementVisible(OIL_LAYER_THIRD_PARTY_LIST, 500)
      .useXpath().click(OIL_BACK_BUTTON)
      .useXpath().waitForElementVisible(OIL_LAYER_FULL, 500, false)
      .end();
  }
};
