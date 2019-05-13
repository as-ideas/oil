import { OIL_ADVANCED_SETTINGS, OIL_ADVANCED_SETTINGS_WRAPPER, OIL_CUSTOM_VENDORS_HEADLINE, OIL_CUSTOM_VENDORS_LIST, OIL_YES_BUTTON } from '../test_constants';
import { executeIfCompatible } from '../test-utils/utils_browser_check';

module.exports = {
  '@disabled': false,
  beforeEach: browser => {
    browser
      .deleteCookies();
  },

  'Displays custom vendors in list': function (browser) {
    executeIfCompatible(
      browser,
      [
        {name: 'IE', version: '9.0', reason: 'CORS HEADER deactivated in IE9 per default - see https://id-jira.axelspringer.de/browse/OIL-217.'}
      ],
      () => {
        browser
          .url(browser.globals.launch_url_host1 + 'demos/cpc-custom-vendors.html')
          .useXpath()
          .waitForElementPresent(OIL_YES_BUTTON, 15000, false)
          .click(OIL_ADVANCED_SETTINGS)
          .pause(200)
          .waitForElementPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 2000, false)
          .pause(100)
          .waitForElementPresent(OIL_CUSTOM_VENDORS_HEADLINE, 100, false)
          .waitForElementPresent(OIL_CUSTOM_VENDORS_LIST, 100, false)
          .assert.containsText(OIL_CUSTOM_VENDORS_LIST, 'CUSTOM_VENDOR_1')
          .assert.containsText(OIL_CUSTOM_VENDORS_LIST, 'CUSTOM_VENDOR_2')
          .pause(100)
          .end();
      })
  }

};
