const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_POI_BUTTON = '//*[@data-qa="oil-poi-YesButton"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';

const ASSERT_TIMEOUT = 2000;

module.exports = {
  beforeEach: browser => {
  },

  'OIL Layer Power Opt-In is working across two domains' : function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_POI_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .url(browser.globals.launch_url_host2 + "demos/complete-integration-site-b.html")
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .pause(ASSERT_TIMEOUT)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },
  'OIL Layer Power local yes is working across two domains' : function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-true")
      .url(browser.globals.launch_url_host2 + "demos/complete-integration-site-b.html")
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-true")
      .end();
  },
  'OIL Layer Power not now is working across two domains' : function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + "demos/complete-integration-site-a.html")
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-false")
      .url(browser.globals.launch_url_host2 + "demos/complete-integration-site-b.html")
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, "optin-false")
      .assert.cssClassPresent(OIL_LAYER, "expanded-true")
      .end();
  },
};
