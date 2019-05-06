import {
  OIL_ADVANCED_SETTINGS_SNIPPET,
  OIL_ADVANCED_SETTINGS_TEST_BUTTON_SHOW_PREF,
  OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER,
  OIL_FIRST_STANDARD_PURPOSE_SLIDER,
  OIL_FIRST_STANDARD_PURPOSE_SLIDER_CLICKABLE_ELEMENT,
  OIL_LAYER,
  OIL_OPTOUT_CONFIRM,
  OIL_YES_BUTTON
} from '../test_constants';


module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser
      .deleteCookies()
  },

  'Cookie Preference Center integrates into the host site on trigger and opt-out confirmation dialog is shown if necessary': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/cpc-integrated-in-page.html')
      .useXpath()
      .waitForElementPresent(OIL_LAYER, 4000, false)
      .waitForElementPresent(OIL_YES_BUTTON, 1000, false)
      .click(OIL_YES_BUTTON)
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 2000)
      .refresh()
      .useXpath()
      .waitForElementNotPresent(OIL_LAYER, 4000)
      .waitForElementNotPresent(OIL_ADVANCED_SETTINGS_SNIPPET, 1000)
      .click(OIL_ADVANCED_SETTINGS_TEST_BUTTON_SHOW_PREF)
      .waitForElementPresent(OIL_ADVANCED_SETTINGS_SNIPPET, 4000, false)
      .waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_SLIDER, 5000, false)
      .useCss().waitForElementPresent(OIL_FIRST_STANDARD_PURPOSE_CHECKED_SLIDER, 2500, false)
      .click(OIL_FIRST_STANDARD_PURPOSE_SLIDER_CLICKABLE_ELEMENT)
      .useXpath().waitForElementPresent(OIL_OPTOUT_CONFIRM, 5000, false)
      .end();
  }
};
