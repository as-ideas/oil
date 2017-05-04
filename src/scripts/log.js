import { isProd } from "./utils";

/**
 * Make sure the fallback can't break.
 */
function initLogging() {
  if (!window.console) {
    window.console = {};
    window.console.log = function () {};
  }
}

/**
 * LogError on none-production environments.
 * if console.error is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logError() {
  if (!isProd()) {
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
  if (!isProd()) {
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
  if (!isProd()) {
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
