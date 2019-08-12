import {OIL_ADVANCED_SETTINGS, OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER, OIL_ADVANCED_SETTINGS_WRAPPER, OIL_FIRST_CUSTOM_PURPOSE_SLIDER, OIL_YES_BUTTON} from '../test_constants';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();
  },
  'Shows five purposes by default': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/cpc-standard.html')
      .useXpath().waitForElementPresent(OIL_YES_BUTTON, 15000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 2000, false)
      .pause(100)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER, 1000, false)
      .end();
  },

  'Displays custom purposes in list': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/cpc-custom-purposes.html')
      .useXpath()
      .waitForElementPresent(OIL_YES_BUTTON, 15000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 2000, false)
      .pause(100)
      .waitForElementPresent(OIL_FIRST_CUSTOM_PURPOSE_SLIDER, 100, false)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER, 100, false)
      .assert.containsText(OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER,'Custom Purpose 1')
      .pause(100)
      .end();
  }

};
