import {
  OIL_LAYER,
  OIL_YES_BUTTON,
  OIL_NO_BUTTON,
  OIL_YES_POI_SMALL_BUTTON,
  OIL_YES_POI_BUTTON,
  OIL_LAYER_FULL,
  OIL_LAYER_OPTLATER
} from '../constants.js';

const REDIRECT_TIMEOUT = 5000;
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
    // wait for init of fake 'CDN'
    browser
      .url(browser.globals.launch_url_cdn)
      .useCss()
      .waitForElementVisible('body', PAGE_INIT_TIMEOUT, false);
  },

  'OIL Layer Power Opt-In is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_POI_BUTTON);
    browser.url((result) => {
      if (result.toString().indexOf('fallback') !== -1) {
        browser
          .pause(200)
          .waitForElementNotPresent(OIL_LAYER, ASSERT_TIMEOUT);
      } else {
        browser.pause(ASSERT_TIMEOUT);
      }
    });
    browser
      .pause(REDIRECT_TIMEOUT)
      .url(browser.globals.launch_url_host2 + 'demos/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },

  'OIL Layer Power Opt-In is working across two domains (small button)': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_NO_BUTTON)
      .waitForElementVisible(OIL_YES_POI_SMALL_BUTTON, ASSERT_TIMEOUT, false)
      .click(OIL_YES_POI_SMALL_BUTTON);
    browser.url((result) => {
      if (result.toString().indexOf('fallback') !== -1) {
        browser
          .pause(200)
          .waitForElementNotPresent(OIL_LAYER, ASSERT_TIMEOUT);
      } else {
        browser.pause(REDIRECT_TIMEOUT)
      }
      // return the current url
      console.log(result);
    });
    browser
      .url(browser.globals.launch_url_host2 + 'demos/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 500)
      .end();
  },

  'OIL Layer Power local yes is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_BUTTON);
    browser.url((result) => {
      if (result.toString().indexOf('fallback') !== -1) {
        browser
          .pause(200)
          .waitForElementNotPresent(OIL_LAYER, ASSERT_TIMEOUT);
      } else {
        browser.pause(REDIRECT_TIMEOUT)
      }
      // return the current url
      console.log(result);
    });

    browser
      .url(browser.globals.launch_url_host2 + 'demos/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER_FULL, ASSERT_TIMEOUT, false)
      .end();
  },

  'OIL Layer Power not now is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .deleteCookies()
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_NO_BUTTON);
    browser.url((result) => {
      if (result.toString().indexOf('fallback') !== -1) {
        browser
          .waitForElementVisible(OIL_LAYER_OPTLATER, ASSERT_TIMEOUT, false)
      } else {
        browser.pause(REDIRECT_TIMEOUT)
      }
      // return the current url
      console.log(result);
    });

    browser
      .url(browser.globals.launch_url_host2 + 'demos/complete-integration-site-b.html')
      .useCss()
      .waitForElementVisible('body', ASSERT_TIMEOUT, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER_FULL, ASSERT_TIMEOUT, false)
      .end();
  }
};
