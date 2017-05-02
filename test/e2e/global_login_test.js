const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_GOI_BUTTON = '//*[@data-qa="oil-goi-YesButton"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';

module.exports = {
  beforeEach: browser => {
  },

  'OIL Layer Global Opt-In is working across two domains' : function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 10000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 10000, false)
      .click(OIL_YES_GOI_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, 1000, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .url(browser.globals.launch_url_host2 + "demos/complete-integration-site-b.html")
      .useCss()
      .waitForElementVisible('body', 10000, false)
      .useXpath()
      .pause(2000)
      .waitForElementNotPresent(OIL_LAYER, 10000)
      .end();
  },
  'OIL Layer Global local yes is working across two domains' : function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 10000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 10000, false)
      .click(OIL_YES_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, 10000, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .url(browser.globals.launch_url_host2 + "demos/complete-integration-site-b.html")
      .useCss()
      .waitForElementVisible('body', 10000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 10000, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-true")
      .end();
  },
  'OIL Layer Global not now is working across two domains' : function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 10000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 10000, false)
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_LAYER, 10000, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .url(browser.globals.launch_url_host2 + "demos/complete-integration-site-b.html")
      .useCss()
      .waitForElementVisible('body', 10000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 10000, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-true")
      .end();
  },
};
