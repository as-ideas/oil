const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_GOI_BUTTON = '//*[@data-qa="oil-goi-YesButton"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';

module.exports = {
  '@disabled': true,
  
  beforeEach: browser => {
  },

  'OIL Layer Global Opt-In is working across two domains' : function (browser) {
    browser

      .url(browser.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.visible(OIL_LAYER)
      .click(OIL_YES_GOI_BUTTON)
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .url(browser.launch_url_host2 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .end();
  },
  'OIL Layer Global local yes is working across two domains' : function (browser) {
    browser
      .url(browser.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.visible(OIL_LAYER)
      .click(OIL_YES_BUTTON)
      .assert.hidden(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .url(browser.launch_url_host2 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.visible(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-true")
      .end();
  },
  'OIL Layer Global not now is working across two domains' : function (browser) {
    browser
      .url(browser.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.visible(OIL_LAYER)
      .click(OIL_NO_BUTTON)
      .assert.visible(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .url(browser.launch_url_host2 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .assert.visible(OIL_LAYER)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-true")
      .end();
  },
};
