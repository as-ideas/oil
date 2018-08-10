import { OIL_LAYER, OIL_YES_BUTTON, HOST_SEND_OPTOUT_BUTTON } from '../test_constants.js';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'OIL Layer Site Opt-In clicked, verify opt-in, opt-out by event': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration-opt-out-event-test.html')
      .useCss().waitForElementPresent('body', 1000, false)
      .useXpath().waitForElementPresent(OIL_LAYER, 2000, false)
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .refresh()
      .useCss().waitForElementPresent('body', 1000, false)
      .pause(500)
      .useXpath().waitForElementNotPresent(OIL_LAYER, 1000)
      .click(HOST_SEND_OPTOUT_BUTTON)
      .refresh()
      .useCss().waitForElementPresent('body', 1000, false)
      .useXpath().waitForElementPresent(OIL_LAYER, 2000, false)
      .end();
  }
};
