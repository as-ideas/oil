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
      .pause(200)
      .assert.containsText('html', 'Custom Purpose 1', 'Checking custom purpose #1s title is in html')
      .assert.containsText('html', 'Lorem2!', 'Checking custom purpose #2s description is in html')

    browser.end();
  },

};
