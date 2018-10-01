if (window.AS_OIL && window.AS_OIL.CONFIG) {
  __webpack_public_path__ = window.AS_OIL.CONFIG.publicPath;
} else {
  const configurationElement = document.querySelector('script[type="application/configuration"]#oil-configuration');
  if (configurationElement !== null && configurationElement.text) {
    try {
      let parsedConfig = JSON.parse(configurationElement.text);
      if (parsedConfig && parsedConfig.hasOwnProperty('publicPath')) {
        __webpack_public_path__ = parsedConfig.publicPath;
      }
    } catch (error) {
      // no complaints
    }
  }
}
