import { OIL_LAYER, OIL_YES_BUTTON } from '../constants.js';


module.exports = {

  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/tealium-integration-test.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/tealium-integration-test.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  // This test only tests the tealium integration - it does not test the latest version of oil, but the version on tealium
  'OIL Layer works while beeing loaded over Tealium - Closed after clicking yes': function (browser) {
    browser
      .click(OIL_YES_BUTTON)
      .pause(200)
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
