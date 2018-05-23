import { OIL_LAYER, OIL_ADVANCED_SETTINGS } from '../test_constants.js';

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
      .useXpath()
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000)
      .useXpath()
      .expect.element("//*[contains(text(), 'Custom Purpose 1')]").to.equal(true)      
      .end();
  },

};
