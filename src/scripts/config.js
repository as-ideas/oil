/**
 * Read configuration of component from JSON script block
 * @param {Element} - DOM config element
 * @returns {{}} extracted configuration as JSON
 * @function
 */
export function readConfiguration(configuration) {
    try {
        if (configuration.text) {
            configuration = JSON.parse(configuration.text);
        }
        return configuration;
    } catch (ignored) {
        return null;
    }
}

/**
 * Search HTML document for configuration and reads it in
 * @returns parsed config
 */
export function findConfiguration() {
    let configurationElement = document.querySelector('script[type="application/configuration"]'),
        config = null;
    if (configurationElement) {
        config = readConfiguration(configurationElement);
    }
    return config;
}