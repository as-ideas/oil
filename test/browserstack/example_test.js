module.exports = {
  'OIL Integration Online' : function (browser) {
    browser
      .url('https://oil:rig@oil-integration.herokuapp.com/')
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .assert.title('OIL - Aktuelles')
      .end();
  }
};
