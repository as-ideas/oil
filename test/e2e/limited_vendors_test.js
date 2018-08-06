import {
  OIL_LAYER,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_ADVANCED_SETTINGS,
  OIL_THIRD_PARTY_NAME,
  OIL_LAYER_THIRD_PARTY_LIST_ELEMENT
} from '../test_constants.js';
import { executeIfCompatible } from '../test-utils/utils_browser_check';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    executeIfCompatible(
      browser,
      [
        {name: 'IE', version: '9.0', reason: 'CORS HEADER deactivated in IE9 per default - see https://id-jira.axelspringer.de/browse/OIL-217.'}
      ],
      () => {
        browser
          .deleteCookies();

        browser
          .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-limited-vendors.html')
          .useXpath()
          .waitForElementPresent(OIL_LAYER, 2000, false);
      });
  },

  'third party list includes only two entries': function (browser) {
    executeIfCompatible(
      browser,
      [
        {name: 'IE', version: '9.0', reason: 'CORS HEADER deactivated in IE9 per default - see https://id-jira.axelspringer.de/browse/OIL-217.'}
      ],
      () => {
        browser
          .click(OIL_ADVANCED_SETTINGS)
          .pause(200)
          .waitForElementPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
          .pause(200)
          .useCss()
          .expect.element(OIL_LAYER_THIRD_PARTY_LIST_ELEMENT + ':nth-child(1) ' + OIL_THIRD_PARTY_NAME).text.to.equal('Captify Technologies Limited');
        browser.expect.element(OIL_LAYER_THIRD_PARTY_LIST_ELEMENT + ':nth-child(2) ' + OIL_THIRD_PARTY_NAME).text.to.equal('affilinet');
        browser.waitForElementNotPresent(OIL_LAYER_THIRD_PARTY_LIST_ELEMENT + ':nth-child(3) ' + OIL_THIRD_PARTY_NAME, 1000);
        browser.end();
      });
  }

};
