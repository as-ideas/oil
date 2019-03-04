import {
  OIL_ADVANCED_SETTINGS,
  OIL_ADVANCED_SETTINGS_CUSTOM_PURPOSE_HEADER,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_CUTOM_VENDORS_HEADLINE,
  OIL_CUTOM_VENDORS_LIST,
  OIL_YES_BUTTON
} from '../test_constants';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'Displays custom vendors in list': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-custom-vendors.html')
      .useXpath()
      .waitForElementPresent(OIL_YES_BUTTON, 15000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 2000, false)
      .pause(100)
      .waitForElementPresent(OIL_CUTOM_VENDORS_HEADLINE, 100, false)
      .waitForElementPresent(OIL_CUTOM_VENDORS_LIST, 100, false)
      .assert.containsText(OIL_CUTOM_VENDORS_LIST,'CUSTOM_VENDOR_1')
      .assert.containsText(OIL_CUTOM_VENDORS_LIST,'CUSTOM_VENDOR_2')
      .pause(100)
      .end();
  }

};
