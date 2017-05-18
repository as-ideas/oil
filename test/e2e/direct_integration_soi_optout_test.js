const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';
const OIL_YES_SMALL_BUTTON = '//*[@data-qa="oil-small-YesButton"]';
const HOST_SEND_OPTOUT_BUTTON = '//*[@data-qa="send-opt-out-button"]';

module.exports = {
  beforeEach: browser => {
     browser
      .url(browser.globals.launch_url_host1 + "end2end-tests/direct-integration-opt-out-event-test.html")
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + "end2end-tests/direct-integration-opt-out-event-test.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer Site Opt-In clicked, verify opt-in, opt-out by event' : function (browser) {
    browser
      .click(OIL_YES_BUTTON)
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
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
