import {
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_ADVANCED_SETTINGS,
  OIL_OPTOUT_CONFIRM,
  OIL_CANCEL_BUTTON,
  OIL_PROCEED_BUTTON,
  OIL_DEFAULT_PURPOSE_SLIDER,
  PAGE_BACKGROUND
} from '../test_constants.js';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-tabs-confirm-optout.html')
      .deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-tabs.html')
      .useCss()
      .waitForElementVisible(PAGE_BACKGROUND, 1000, false)
      .useXpath()
      .click(OIL_ADVANCED_SETTINGS)
      .pause(200)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 1000, false)
      .waitForElementVisible(OIL_DEFAULT_PURPOSE_SLIDER, 1000, false);
  },

  'Optout layer should remain hidden when require_optout_confirm not in config or false': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(10)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 500)
      .end()
  },

  'Optout layer should show when trying to deactivate a consent slider': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .waitForElementVisible(OIL_OPTOUT_CONFIRM)
      .end()
  },

  'Optout layer should hide when pressing proceed button': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .waitForElementVisible(OIL_OPTOUT_CONFIRM)
      .click(OIL_PROCEED_BUTTON)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 500)
      .refresh();
  },

  'Optout layer should hide when pressing cancel button': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .waitForElementVisible(OIL_OPTOUT_CONFIRM)
      .click(OIL_CANCEL_BUTTON)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 500)
      .refresh();
  },

  'Slider should remain activated when cancel was clicked in modal': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .waitForElementVisible(OIL_OPTOUT_CONFIRM)
      .click(OIL_PROCEED_BUTTON)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 500)
      .end()
  },

  'Slider should remain activated when background area was clicked': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .waitForElementVisible(OIL_OPTOUT_CONFIRM)
      // CONTINUE
  },

  'Slider should not be activated when proceed was clicked in modal': function (browser) {
    browser
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .waitForElementVisible(OIL_OPTOUT_CONFIRM)
      // CONTINUE
  }
};
