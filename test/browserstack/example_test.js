// var webdriver = require('selenium-webdriver');

// // Input capabilities
// var capabilities = {
//   'browserName' : 'firefox', 
//   'browserstack.user' : 'marcelbankmann1',
//   'browserstack.key' : 'YsD5Lq6KuGg2oxk9Sscx'
// }

// var driver = new webdriver.Builder().
//   usingServer('http://hub-cloud.browserstack.com/wd/hub').
//   withCapabilities(capabilities).
//   build();

// driver.get('http://www.google.com');
// driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
// driver.findElement(webdriver.By.name('btnG')).click();

// driver.getTitle().then(function(title) {
//   console.log(title);
// });

// driver.quit();