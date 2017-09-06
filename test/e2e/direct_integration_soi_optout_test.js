import { OIL_LAYER, OIL_YES_BUTTON, HOST_SEND_OPTOUT_BUTTON } from '../constants.js';

module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'end2end-tests/direct-integration-opt-out-event-test.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'end2end-tests/direct-integration-opt-out-event-test.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer Site Opt-In clicked, verify opt-in, opt-out by event': function (browser) {
    browser
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .click(HOST_SEND_OPTOUT_BUTTON)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false)
      .end();
  }
};
