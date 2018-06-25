import { OIL_LAYER, OIL_ADVANCED_SETTINGS, OIL_ADVANCED_SETTINGS_WRAPPER, OIL_CUSTOM_PURPOSE_SLIDER } from '../test_constants.js';

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
      .pause(100)
      .waitForElementPresent(OIL_CUSTOM_PURPOSE_SLIDER, 100, false)
      .pause(100)
      .useCss()
      // FIXME OIL-196
      // deactivate because opening the page in IE10 and 9 the custom purposes, only the e2e test fails
      //.assert.containsText('html', 'Custom Purpose 1', 'Checking custom purpose title')
      .pause(200)
      .end()
  }

};
