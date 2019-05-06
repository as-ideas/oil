import {
  OIL_ADVANCED_SETTINGS,
  OIL_ADVANCED_SETTINGS_WRAPPER,
  OIL_CANCEL_BUTTON,
  OIL_FIRST_STANDARD_PURPOSE_SLIDER,
  OIL_LAYER,
  OIL_OPTOUT_CONFIRM,
  OIL_PROCEED_BUTTON
} from '../test_constants.js';
import { OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, OIL_FIRST_STANDARD_PURPOSE_SLIDER_CLICKABLE_ELEMENT } from '../test_constants';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser.deleteCookies();

    browser
      .url(browser.globals.launch_url_host1 + 'demos/cpc-confirm-optout.html')
      .useXpath()
      .waitForElementPresent(OIL_LAYER, 5000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_WRAPPER, 5000, false)
      .waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_SLIDER, 5000, false)
      .useCss().waitForElementNotPresent(OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, 2500, false)
      .click(OIL_FIRST_STANDARD_PURPOSE_SLIDER_CLICKABLE_ELEMENT)
      .useCss().waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, 2500, false)
      .useCss().waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_SLIDER_CLICKABLE_ELEMENT, 2500, false)
      .pause(500)
      .click(OIL_FIRST_STANDARD_PURPOSE_SLIDER_CLICKABLE_ELEMENT)
      .useXpath();
  },

  'Optout layer should show when trying to deactivate a consent slider': function (browser) {
    browser
      .useXpath()
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
      .useCss().waitForElementNotPresent(OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, 2500, false)
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
      .useCss().waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, 2500, false)
      .end();
  },

  'Slider should remain activated when background area was clicked': function (browser) {
    browser
      .waitForElementPresent(OIL_CANCEL_BUTTON, 5000, false)
      .click(OIL_OPTOUT_CONFIRM)
      .pause(100)
      .useCss().waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, 2500, false)
      .end();
  }

};
