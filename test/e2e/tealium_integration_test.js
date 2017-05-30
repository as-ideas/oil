import { OIL_LAYER, OIL_YES_BUTTON, OIL_NO_BUTTON, OIL_YES_SMALL_BUTTON } from "../constants.js";

module.exports = {

  beforeEach: browser => {
     browser
      .url(browser.globals.launch_url_host1 + "end2end-tests/tealium-integration-test.html")
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + "end2end-tests/tealium-integration-test.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer closed after clicking yes' : function (browser) {
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
      .end();
  },

  'OIL Layer closed after clicking no' : function (browser) {
    browser
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_LAYER_OPTLATER, 1000, false)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER_OPTLATER, 1000, false)
      .end();
  },

  'OIL Layer closed after clicking no and then optin after clicking yes' : function (browser) {
    browser
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_LAYER_OPTLATER, 1000, false)
      .waitForElementVisible(OIL_YES_SMALL_BUTTON, 1000, false)
      .click(OIL_YES_SMALL_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },

  'OIL Layer wont break after the user deleted cookies while having the page open and then click yes' : function (browser) {
    browser
      .waitForElementVisible(OIL_LAYER, 2000, false)
      .deleteCookies()
      .click(OIL_YES_BUTTON)
      .pause(200)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },

  'OIL Layer wont break after the user deleted cookies while having the page open and then click no' : function (browser) {
    browser
      .deleteCookies()
      .click(OIL_NO_BUTTON)
      .assert.visible(OIL_LAYER)
      .waitForElementVisible(OIL_LAYER_OPTLATER, 1000, false)
      .end();
  },
};
