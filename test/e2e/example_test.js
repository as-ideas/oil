module.exports = {
  beforeEach: browser => {
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000, false);
  },
  'OIL Integration Online' : function (browser) {
    browser
      .assert.title('OIL - Aktuelles')
      .end();
  }
};
