import {
  OIL_LAYER,
  GDPR_APPLY_BUTTON
} from '../test_constants.js';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/gdpr-applies-false.html')
      .useCss()
      .waitForElementPresent('body', 1000, false);
  },

  'OIL Layer should remain hidden because gdpr_applies_globally is false': function (browser) {
    browser
      .pause(200)
      .useXpath().waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  },

  'OIL Layer should show after calling AS_OIL.applyGDPR()': function (browser) {
    browser
      .useXpath().waitForElementNotPresent(OIL_LAYER, 1000)
      .click(GDPR_APPLY_BUTTON)
      .pause(200)
      .waitForElementPresent(OIL_LAYER, 1000, false)
      .end();
  }
};
