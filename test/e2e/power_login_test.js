import {
  OIL_LAYER,
  OIL_YES_BUTTON
} from '../test_constants.js';

const REDIRECT_TIMEOUT = 5000;
const ASSERT_TIMEOUT = 2000;

//ToDo: refactor this test is doesnt work properly (checks not for sure whether OIL is not load on site b)
module.exports = {
  '@disabled': true,
  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'OIL Layer Power Opt-In is working across two domains': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/complete-integration-site-a.html')
      .useXpath()
      .waitForElementPresent(OIL_LAYER, ASSERT_TIMEOUT, false)
      .click(OIL_YES_BUTTON);
    //fallback if post message not supported by browser
    //should be two test for this case
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
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  }
};
