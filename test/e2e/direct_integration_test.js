const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';

module.exports = {
  beforeEach: browser => {
     browser
      .url(browser.launch_url_host1 + "demos/direct-integration.html")
      .deleteCookies();

    browser
      .url(browser.launch_url_host1 + "demos/direct-integration.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath();
  },

  'OIL Layer Visible' : function (browser) {
    browser
      .assert.visible(OIL_LAYER)
      .end();
  },

  'OIL Layer closed after clicking yes' : function (browser) {
    browser
      .assert.visible(OIL_LAYER)
      .click(OIL_YES_BUTTON)
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .end();
  },

  'OIL Layer closed after clicking no' : function (browser) {
    browser
      .assert.visible(OIL_LAYER)
      .click(OIL_NO_BUTTON)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .end();
  },

  'OIL Layer wont break after the user deleted cookies while having the page open and then click yes' : function (browser) {
    browser
      .assert.visible(OIL_LAYER)
      .deleteCookies()
      .click(OIL_YES_BUTTON)
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .end();
  },

    'OIL Layer wont break after the user deleted cookies while having the page open and then click no' : function (browser) {
    browser
      .assert.visible(OIL_LAYER)
      .deleteCookies()
      .click(OIL_NO_BUTTON)
      .assert.visible(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .end();
  },
};
