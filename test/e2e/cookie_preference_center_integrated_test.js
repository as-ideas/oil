import {
  OIL_LAYER,
  OIL_YES_BUTTON,
  OIL_ADVANCED_SETTINGS_TEST_BUTTON_SHOW_PREF,
  OIL_ADVANCED_SETTINGS_TEST_BUTTON_TRIGGER_OPTIN,
  OIL_ADVANCED_SETTINGS_SNIPPET
} from '../test_constants.js';
import {  } from '../test_constants';

module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-poi-integrated.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-poi-integrated.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'Cookie Preference Center integrates into the host site on trigger and works': function (browser) {
    browser
      .click(OIL_YES_BUTTON)
      .pause(200)
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-poi-integrated.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(300)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_SNIPPET, 1000)
      .click(OIL_ADVANCED_SETTINGS_TEST_BUTTON_SHOW_PREF)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_SNIPPET, 1000, false)
      .click(OIL_ADVANCED_SETTINGS_TEST_BUTTON_TRIGGER_OPTIN)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  }
};
