export function executeIfCompatible(browser, incompatibleBrowsers, testFunction) {
  let incompatibleBrowser = incompatibleBrowsers.find(incompatibleBrowserSpec =>
    browser.options.desiredCapabilities.browser === incompatibleBrowserSpec.name &&
    browser.options.desiredCapabilities.browser_version === incompatibleBrowserSpec.version
  );
  if (typeof incompatibleBrowser === 'undefined') {
    testFunction();
  } else {
    console.log(`Test disabled for ${browser.options.desiredCapabilities.browser} ${browser.options.desiredCapabilities.browser_version}!`);
    browser.end();
  }
}
