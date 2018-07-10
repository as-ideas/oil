import {
  OIL_BACK_BUTTON,
  OIL_LAYER_FULL,
  OIL_LAYER_GROUP_LIST_ELEMENT,
  OIL_LAYER_POI_LIST,
  OIL_LAYER_THIRD_PARTY_LIST_ELEMENT,
  OIL_SHOW_COMPANY_LIST_BUTTON,
  OIL_SHOW_THIRD_PARTY_LIST_BUTTON,
  OIL_YES_BUTTON,
  PAGE_BACKGROUND
} from '../test_constants';

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
      .waitForElementVisible(OIL_YES_BUTTON, 2000, false);
  },

  'OIL Layer show group list clicked, verify group list is visible and back': function (browser) {
    browser
      .useCss().waitForElementVisible(OIL_SHOW_COMPANY_LIST_BUTTON, 500)
      .useCss().click(OIL_SHOW_COMPANY_LIST_BUTTON)
      .pause(200)
      .useXpath().waitForElementNotPresent(OIL_LAYER_FULL, 500)
      .useXpath().waitForElementVisible(OIL_LAYER_POI_LIST, 500)
      .useCss().waitForElementVisible(OIL_LAYER_GROUP_LIST_ELEMENT, 1000)
      .useXpath().click(OIL_BACK_BUTTON)
      .useXpath().waitForElementVisible(OIL_LAYER_FULL, 500, false)
      .end();
  },

  'OIL Layer show vendor list (3rd party list) clicked, verify 3rd list is visible and back': function (browser) {
    browser
      .useCss().waitForElementVisible(OIL_SHOW_THIRD_PARTY_LIST_BUTTON, 500)
      .useCss().click(OIL_SHOW_THIRD_PARTY_LIST_BUTTON)
      .pause(200)
      .useXpath().waitForElementNotPresent(OIL_LAYER_FULL, 500)
      .useXpath().waitForElementVisible(OIL_LAYER_POI_LIST, 500)
      .useCss().waitForElementVisible(OIL_LAYER_THIRD_PARTY_LIST_ELEMENT, 500)
      .useXpath().click(OIL_BACK_BUTTON)
      .useXpath().waitForElementVisible(OIL_LAYER_FULL, 500, false)
      .end();
  }
};
