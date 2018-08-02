import {EVENT_NOTIFIER_DIV, OIL_LAYER, OIL_YES_BUTTON} from '../test_constants';
import {executeIfCompatible} from '../test-utils/utils_browser_check';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'OIL Layer event being sent after clicking yes, even after refresh': function (browser) {
    executeIfCompatible(
      browser,
      [
        // Deactivated because of instable event handling
        {name: 'IE', version: '9.0'}
      ],
      () => {
        browser
          .url(browser.globals.launch_url_host1 + 'demos/direct-integration-event-test.html')
          .useXpath()
          .waitForElementVisible(OIL_LAYER, 4000, false)
          .waitForElementVisible(OIL_YES_BUTTON, 2000, false)
          .assert.cssClassPresent(EVENT_NOTIFIER_DIV, 'event-notifier-hidden')
          .click(OIL_YES_BUTTON)
          .waitForElementNotPresent(OIL_LAYER, 1000)
          .assert.cssClassNotPresent(EVENT_NOTIFIER_DIV, 'event-notifier-hidden')
          .refresh()
          .waitForElementNotPresent(OIL_LAYER, 1000)
          .assert.cssClassNotPresent(EVENT_NOTIFIER_DIV, 'event-notifier-hidden')
          .end();
      });
  }
};
