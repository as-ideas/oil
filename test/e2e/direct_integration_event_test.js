import {OIL_LAYER, OIL_YES_BUTTON, EVENT_NOTIFIER_DIV, PAGE_BACKGROUND} from '../test_constants.js';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'OIL Layer event being sent after clicking yes, even after refresh': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/direct-integration-event-test.html')
      .useCss().waitForElementVisible('body', 1000, false)
      .useXpath().waitForElementVisible(OIL_LAYER, 2000, false)
      .waitForElementVisible(OIL_YES_BUTTON, 2000, false)
      .assert.cssClassPresent(EVENT_NOTIFIER_DIV, 'event-notifier-hidden')
      .click(OIL_YES_BUTTON)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .assert.cssClassNotPresent(EVENT_NOTIFIER_DIV, 'event-notifier-hidden')
      .refresh()
      .useCss()
      .waitForElementVisible(PAGE_BACKGROUND, 1000, false)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .assert.cssClassNotPresent(EVENT_NOTIFIER_DIV, 'event-notifier-hidden')
      .end();
  }
};
