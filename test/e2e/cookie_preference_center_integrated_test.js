import {
  OIL_LAYER,
  OIL_YES_BUTTON,
  OIL_ADVANCED_SETTINGS_TEST_BUTTON_SHOW_PREF,
  OIL_ADVANCED_SETTINGS_TEST_BUTTON_TRIGGER_OPTIN,
  OIL_ADVANCED_SETTINGS_SNIPPET
} from '../test_constants';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .deleteCookies()
  },

  'Cookie Preference Center integrates into the host site on trigger and works': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/cpc-poi-integrated-in-page.html')
      .useXpath()
      .waitForElementPresent(OIL_LAYER, 4000, false)
      .waitForElementPresent(OIL_YES_BUTTON, 1000, false)
      .click(OIL_YES_BUTTON)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 2000)
      .refresh()
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 4000)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_SNIPPET, 1000)
      .click(OIL_ADVANCED_SETTINGS_TEST_BUTTON_SHOW_PREF)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_SNIPPET, 4000, false)
      .click(OIL_ADVANCED_SETTINGS_TEST_BUTTON_TRIGGER_OPTIN)
      .refresh()
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 4000)
      .end();
  }
};
