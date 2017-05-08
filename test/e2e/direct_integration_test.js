const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';
const OIL_YES_SMALL_BUTTON = '//*[@data-qa="oil-small-YesButton"]';

module.exports = {
  '@disable': true,

  beforeEach: browser => {
     browser
      .url(browser.globals.launch_url_host1 + "end2end-tests/direct-integration.html")
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + "end2end-tests/direct-integration.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'OIL Layer closed after clicking yes' : function (browser) {
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
      .end();
  },

  'OIL Layer closed after clicking no' : function (browser) {
    browser
      .click(OIL_NO_BUTTON)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(500)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .end();
  },

  'OIL Layer closed after clicking no and then optin after clicking yes' : function (browser) {
    browser
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_YES_SMALL_BUTTON, 1000, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .click(OIL_YES_SMALL_BUTTON)
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
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
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .end();
  },

    'OIL Layer wont break after the user deleted cookies while having the page open and then click no' : function (browser) {
    browser
      .deleteCookies()
      .click(OIL_NO_BUTTON)
      .assert.visible(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .end();
  },
};
