// import { isProd } from "./utils";

/**
 * Make sure the fallback can't break.
 */
function initLogging() {
  // FIXME, see https://github.com/mishoo/UglifyJS2/issues/506
  // https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#components/sidebar/sidebar.jsx
  if (process.env.NODE_ENV !== 'production' && !window.console) {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };
    if (!window.console.info) window.console.log = function () { };
    if (!window.console.error) window.console.log = function () { };
  }
}

/**
 * LogError on none-production environments.
 * if console.error is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logError() {
  if (process.env.NODE_ENV !== 'production' && window.console && window.console.error) {
    initLogging();
    if (window.console.error) {
      try {
        window.console.error.apply(window.console, arguments);
      } catch (ignored) {}
    } else {
      window.console.log(arguments);
    }
  }
}

/**
 * LogInfo on none-production environments.
 * if console.info is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logInfo() {
  if (process.env.NODE_ENV !== 'production' && window.console && window.console.info) {
    initLogging();
    if (window.console.info) {
      try {
        window.console.info.apply(window.console, arguments);
      } catch (ignored) {}
    } else {
      window.console.log(arguments);
    }
  }
}

/**
 * LogDebug on none-production environments.
 * if console.debug is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logDebug() {
  if (process.env.NODE_ENV !== 'production' && window.console && window.console.debug) {
    initLogging();
    if (window.console.debug) {
      try {
        window.console.debug.apply(window.console, arguments);
      } catch (ignored) {}
    } else {
      window.console.log(arguments);
    }
  }
}
