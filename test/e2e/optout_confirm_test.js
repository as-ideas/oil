import {
  OIL_ADVANCED_SETTINGS,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_CANCEL_BUTTON,
  OIL_DEFAULT_PURPOSE_SLIDER,
  OIL_LAYER,
  OIL_OPTOUT_CONFIRM,
  OIL_PROCEED_BUTTON
} from '../test_constants.js';

const SLIDER = '.as-oil-cpc__slider:first-child';
const CHECKED_SLIDER = '.as-js-purpose-slider:checked';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser.deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-confirm-optout.html')
      .useXpath()
      .waitForElementVisible(OIL_LAYER, 5000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementVisible(OIL_ADVANCED_SETTINGS_WRAPPER, 5000, false)
      .waitForElementPresent(OIL_DEFAULT_PURPOSE_SLIDER, 5000, false)
      .useCss().waitForElementNotPresent(CHECKED_SLIDER, 2500, false)
      .click(SLIDER)
      .useCss().waitForElementPresent(CHECKED_SLIDER, 2500, false)
      .pause(100)
      .click(SLIDER)
      .useXpath();
  },

  'Optout layer should show when trying to deactivate a consent slider': function (browser) {
    browser
      .waitForElementPresent(OIL_OPTOUT_CONFIRM, 5000, false)
      .end()
  },

  'Optout layer should hide when pressing proceed button': function (browser) {
    browser
      .waitForElementPresent(OIL_PROCEED_BUTTON, 5000, false)
      .click(OIL_PROCEED_BUTTON)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 5000, false)
      .end()
  },

  'Slider should get deactivated when proceed was clicked in modal': function (browser) {
    browser
      .waitForElementPresent(OIL_PROCEED_BUTTON, 5000, false)
      .click(OIL_PROCEED_BUTTON)
      .pause(200)
      .useCss().waitForElementNotPresent(CHECKED_SLIDER, 2500, false)
      .end();
  },

  'Optout layer should hide when pressing cancel button': function (browser) {
    browser
      .waitForElementPresent(OIL_CANCEL_BUTTON, 5000, false)
      .click(OIL_CANCEL_BUTTON)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 5000, false)
      .end();
  },

  'Slider should remain activated when cancel was clicked in modal': function (browser) {
    browser
      .waitForElementPresent(OIL_CANCEL_BUTTON, 5000, false)
      .click(OIL_CANCEL_BUTTON)
      .pause(100)
      .useCss().waitForElementPresent(CHECKED_SLIDER, 2500, false)
      .end();
  },

  'Slider should remain activated when background area was clicked': function (browser) {
    browser
      .waitForElementPresent(OIL_CANCEL_BUTTON, 5000, false)
      .click(OIL_OPTOUT_CONFIRM)
      .pause(100)
      .useCss().waitForElementPresent(CHECKED_SLIDER, 2500, false)
      .end();
  }

};
