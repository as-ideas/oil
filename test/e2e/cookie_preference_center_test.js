import { OIL_LAYER, OIL_ADVANCED_SETTINGS_WRAPPER, OIL_ADVANCED_SETTINGS_SLIDER, OIL_ADVANCED_SETTINGS, OIL_BACK_BUTTON, OIL_YES_BUTTON } from '../test_constants.js';

module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 2000, false);
  },

  'Cookie Preference Center opens after clicking more information, back button works, okay works': function (browser) {
    browser
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_SLIDER, 1000, false)
      .click(OIL_BACK_BUTTON)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 1000)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_SLIDER, 1000)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_SLIDER, 1000, false)
      .click(OIL_YES_BUTTON)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .refresh()
      .useCss()
      .waitForElementVisible('body', 1000, false)
      .useXpath()
      .pause(500)
      .waitForElementNotPresent(OIL_LAYER, 1000)
      .end();
  },

};
