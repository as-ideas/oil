import {
  OIL_ADVANCED_SETTINGS,
  OIL_ADVANCED_SETTINGS_ACTIVE_PURPOSE_TAB,
  OIL_ADVANCED_SETTINGS_INACTIVE_PURPOSE_TABS,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_BACK_BUTTON,
  OIL_LAYER,
  OIL_YES_BUTTON
} from '../test_constants';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
     browser.deleteCookies();
  },

  'Cookie Preference Center Tabs opens after clicking more information, back button works, okay works': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-tabs.html')
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 4000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 2000, false)
      .waitForElementVisible(OIL_BACK_BUTTON, 2000, false)
      .click(OIL_BACK_BUTTON)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 2000)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 2000, false)
      .useCss()
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_ACTIVE_PURPOSE_TAB, 2000, false)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_INACTIVE_PURPOSE_TABS, 2000, false)
      .useXpath()
      .click(OIL_YES_BUTTON)
      .waitForElementNotPresent(OIL_LAYER, 2000)
      .end();
  }
};
