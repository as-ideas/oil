import { isDev } from './utils';
import { isDeveloperCookieSet } from './cookies.js'

function concatLogArguments(args) {
  let concatedString = '';
  for (let i = 0; i < args.length; i++) {
    concatedString = concatedString + args[i];
  }
  return concatedString;
}


/**
 * Make sure the fallbacks can't break.
 */
function fixLogging() {
  if (!window.console) window.console = {};
  if (!window.console.log) window.console.log = function () {
  };
}

/**
 * LogError on none-production environments.
 * if console.error is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logError() {
  if ((isDev() || isDeveloperCookieSet()) && window.console) {
    fixLogging();
    if (window.console.error) {
      try {
        window.console.error.apply(window.console, arguments);
      } catch (e) {
        try {
          window.console.error(concatLogArguments(arguments));
        } catch (ignored) {
        }
      }
    } else {
      window.console.log(concatLogArguments(arguments));
    }
  }
}

/**
 * LogInfo on none-production environments.
 * if console.info is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logInfo() {
  if ((isDev() || isDeveloperCookieSet()) && window.console) {
    fixLogging();
    if (window.console.info) {
      try {
        window.console.info.apply(window.console, arguments);
      } catch (e) {
        try {
          window.console.info(concatLogArguments(arguments));
        } catch (ignored) {
        }
      }
    } else {
      window.console.log(concatLogArguments(arguments));
    }
  }
}
