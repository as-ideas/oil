import { OIL_ADVANCED_SETTINGS, OIL_LAYER, OIL_YES_BUTTON } from '../test_constants';

module.exports = {
  '@disabled': false,
  tags: ['locale'],
  beforeEach: browser => {
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
      .deleteCookies();
  },

  'Oil Layer loads texts dynamically from backend and uses them': function (browser) {
    let end2endRegexp = /^\[e2e\].*$/;

    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings.html')
      .useCss().waitForElementVisible('body', 1000, false)
      .useXpath().waitForElementVisible(OIL_LAYER, 2000, false);

    browser.useXpath().expect.element(OIL_YES_BUTTON).text.to.not.match(end2endRegexp);
    browser.useXpath().expect.element(OIL_ADVANCED_SETTINGS).text.to.not.match(end2endRegexp);

    // advanced-settings-e2e-locale should load a special LOCALE where every locale starts with '[e2e]'
    browser
      .url(browser.globals.launch_url_host1 + 'demos/advanced-settings-e2e-locale.html')
      .useCss().waitForElementVisible('body', 1000, false)
      .useXpath().waitForElementVisible(OIL_LAYER, 2000, false);

    // FIXME
    // this test fails in BrowserStack IE9. Change in the browser settings:
    // Tools -> Internet Options -> Security -> Custom level... -> Miscellaneous -> Access data sources across domains
    // Enable

    browser.useXpath().expect.element(OIL_YES_BUTTON).text.to.match(end2endRegexp);
    browser.useXpath().expect.element(OIL_ADVANCED_SETTINGS).text.to.match(end2endRegexp);

    browser.end();
  }
};
