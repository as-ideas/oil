import { OIL_LAYER, OIL_ADVANCED_SETTINGS, OIL_ADVANCED_SETTINGS_WRAPPER } from '../test_constants.js';

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

  'Displays custom purposes in list': function (browser) {
    browser
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .waitForElementVisible('.as-oil-cpc__purpose', 1000)
      .assert.containsText('.as-oil-cpc__purpose', 'Custom Purpose 1', 'Checking project title is set to nightwatch')

    browser.end();
  },

};
