import { OIL_LAYER,
  PAGE_BACKGROUND } from '../test_constants';

module.exports = {
  '@disabled': false,
  tags: ['locale'],
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/configuration-default-optin.html')
      .deleteCookies();
  },

  'Script loads and displays OIL layer': function (browser) {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/configuration-default-optin.html')
      .refresh()
      .useCss().waitForElementVisible(PAGE_BACKGROUND, 2000, false)
      .useXpath().waitForElementVisible(OIL_LAYER, 2000, false)
      .end()
  },

  'OIL layer remains hidden when opted in cookie is set': function (browser) {
    browser
      .setCookie({
        name: 'oil_data',
        value: '{%22opt_in%22:true%2C%22timestamp%22:1527155609513%2C%22version%22:%221.1.1-SNAPSHOT%22%2C%22localeVariantName%22:%22enEN_01%22%2C%22localeVariantVersion%22:1%2C%22privacy%22:1}'
      })
      .url(browser.globals.launch_url_host1 + 'demos/configuration-default-optin.html')
      .useCss().waitForElementVisible(PAGE_BACKGROUND, 3000, false)
      .useXpath().waitForElementNotPresent(OIL_LAYER, 1000)
      .end()
  }
};
