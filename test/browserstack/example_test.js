module.exports = {
  'OIL Integration Online' : function (browser) {
    browser
      .url('https://oil:rig@oil-integration.herokuapp.com/')
      .waitForElementPresent('body', 1000, false)
      .assert.title('OIL - Aktuelles')
      .end();
  }
};
