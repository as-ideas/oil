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
    browser
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-tabs.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'Cookie Preference Center Tabs opens after clicking more information, back button works, okay works': function (browser) {
    browser
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .click(OIL_BACK_BUTTON)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 1000)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .useCss();
    browser.expect.element(OIL_ADVANCED_SETTINGS_ACTIVE_PURPOSE_TAB).to.be.present;
    browser.expect.element(OIL_ADVANCED_SETTINGS_INACTIVE_PURPOSE_TABS).to.be.present;
    browser
      .useXpath()
      .click(OIL_YES_BUTTON)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  }
};
