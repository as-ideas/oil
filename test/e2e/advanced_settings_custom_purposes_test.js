import { OIL_LAYER,
  OIL_YES_BUTTON,
  OIL_ADVANCED_SETTINGS,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_CUSTOM_PURPOSE_SLIDER,
  OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER } from '../test_constants.js';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-custom-purposes.html')
      .deleteCookies();
  },

  'Shows five purposes by default': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath().waitForElementVisible(OIL_YES_BUTTON, 2000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .pause(100)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER, 1000, false)
      .end();
  },

  'Displays custom purposes in list': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-custom-purposes.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_YES_BUTTON, 2000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .pause(100)
      .waitForElementPresent(OIL_CUSTOM_PURPOSE_SLIDER, 100, false)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER, 100, false)
      // FIXME selector fails in IE10
      // .assert.containsText(OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER,'Custom Purpose 1')
      .pause(100)
      .end();
  }

};
