import {
  OIL_BACK_BUTTON, OIL_LAYER,
  OIL_LAYER_FULL,
  OIL_LAYER_GROUP_LIST_ELEMENT,
  OIL_LAYER_POI_LIST,
  OIL_LAYER_THIRD_PARTY_LIST_ELEMENT,
  OIL_SHOW_COMPANY_LIST_BUTTON,
  OIL_SHOW_THIRD_PARTY_LIST_BUTTON
} from '../test_constants';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration.html')
      .useXpath()
      .waitForElementPresent(OIL_LAYER, 2000, false);
  },

  'OIL Layer show group list clicked, verify group list is visible and back': function (browser) {
    browser
      .useCss()
      .waitForElementPresent(OIL_SHOW_COMPANY_LIST_BUTTON, 500)
      .click(OIL_SHOW_COMPANY_LIST_BUTTON)
      .pause(200)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER_FULL, 500)
      .waitForElementPresent(OIL_LAYER_POI_LIST, 500)
      .useCss()
      .waitForElementPresent(OIL_LAYER_GROUP_LIST_ELEMENT, 1000)
      .useXpath()
      .waitForElementPresent(OIL_BACK_BUTTON, 1000)
      .click(OIL_BACK_BUTTON)
      .waitForElementPresent(OIL_LAYER_FULL, 2000)
      .end();
  },

  'OIL Layer show vendor list (3rd party list) clicked, verify 3rd list is visible and back': function (browser) {
    browser
      .useCss()
      .waitForElementPresent(OIL_SHOW_THIRD_PARTY_LIST_BUTTON, 500)
      .click(OIL_SHOW_THIRD_PARTY_LIST_BUTTON)
      .pause(200)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER_FULL, 500)
      .waitForElementPresent(OIL_LAYER_POI_LIST, 500)
      .useCss()
      .waitForElementPresent(OIL_LAYER_THIRD_PARTY_LIST_ELEMENT+':nth-of-type(1)', 500)
      .useXpath()
      .click(OIL_BACK_BUTTON)
      .waitForElementPresent(OIL_LAYER_FULL, 1000, false)
      .end();
  }
};
