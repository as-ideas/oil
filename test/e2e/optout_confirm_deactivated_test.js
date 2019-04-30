import {
  OIL_ADVANCED_SETTINGS,
  OIL_DEFAULT_PURPOSE_SLIDER,
  OIL_LAYER,
  OIL_OPTOUT_CONFIRM
} from '../test_constants';

module.exports = {
  '@disabled': false,

  beforeEach: browser => {
    browser.deleteCookies();
  },

  'Optout layer should remain hidden when require_optout_confirm not in config or false': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/cpc-standard.html')
      .useXpath()
      .waitForElementPresent(OIL_LAYER, 5000, false)
      .click(OIL_ADVANCED_SETTINGS)
      .waitForElementPresent(OIL_DEFAULT_PURPOSE_SLIDER, 5000, false)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .click(OIL_DEFAULT_PURPOSE_SLIDER)
      .pause(100)
      .waitForElementNotPresent(OIL_OPTOUT_CONFIRM, 2500)
      .end()
  }


};
