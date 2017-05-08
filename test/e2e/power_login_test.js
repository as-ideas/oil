const OIL_LAYER = '//*[@data-qa="oil-Layer"]';
const OIL_YES_POI_BUTTON = '//*[@data-qa="oil-poi-YesButton"]';
const OIL_YES_BUTTON = '//*[@data-qa="oil-YesButton"]';
const OIL_NO_BUTTON = '//*[@data-qa="oil-NotNowButton"]';
const OIL_YES_SMALL_BUTTON = '//*[@data-qa="oil-small-YesButton"]';
const OIL_YES_POI_SMALL_BUTTON = '//*[@data-qa="oil-small-poi-YesButton"]';

const ASSERT_TIMEOUT = 2000;
const PAGE_INIT_TIMEOUT = 20000;

module.exports = {
  beforeEach: browser => {
    // wait for site hosts
    browser
      .url(browser.globals.launch_url_host1)
      .useCss()
      .waitForElementVisible('body', PAGE_INIT_TIMEOUT, false);
    browser
      .url(browser.globals.launch_url_host2)
      .useCss()
      .waitForElementVisible('body', PAGE_INIT_TIMEOUT, false);
    // wait for init of fake "CDN"
    browser
      .url(browser.globals.launch_url_cdn)
      .useCss()
      .waitForElementVisible('body', PAGE_INIT_TIMEOUT, false);
  },

  'OIL Layer Power Opt-In is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_POI_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, 'optin-true')
      .url(browser.globals.launch_url_host2 + 'end2end-tests/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .pause(ASSERT_TIMEOUT)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },
  'OIL Layer Power Opt-In is working across two domains (small button)': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_YES_POI_SMALL_BUTTON, ASSERT_TIMEOUT, false)
      .click(OIL_YES_POI_SMALL_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, 'optin-true')
      .url(browser.globals.launch_url_host2 + 'end2end-tests/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .pause(ASSERT_TIMEOUT)
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },
  'OIL Layer Power local yes is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_BUTTON)
      .waitForElementNotVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, 'optin-true')
      .url(browser.globals.launch_url_host2 + 'end2end-tests/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, 'optin-false')
      .assert.cssClassPresent(OIL_LAYER, 'expanded-true')
      .end();
  },
  'OIL Layer Power not now is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'end2end-tests/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, 'optin-false')
      .assert.cssClassPresent(OIL_LAYER, 'expanded-false')
      .url(browser.globals.launch_url_host2 + 'end2end-tests/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .assert.cssClassPresent(OIL_LAYER, 'optin-false')
      .assert.cssClassPresent(OIL_LAYER, 'expanded-true')
      .end();
  },
};
