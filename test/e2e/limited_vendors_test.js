import {
  OIL_LAYER,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_ADVANCED_SETTINGS,
  OIL_THIRD_PARTY_NAME
} from '../test_constants.js';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-limited-vendors.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-limited-vendors.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'third party list includes only two entries': function (browser) {
    browser
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .pause(200)
      .useCss()
      .expect.element(OIL_THIRD_PARTY_NAME).text.to.equal('Exponential Interactive, Inc')
    browser.end();
  }

};
