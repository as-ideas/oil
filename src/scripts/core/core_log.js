import {isDev} from './core_utils.js';
import {isVerboseCookieSet, isPreviewCookieSet} from './core_cookies.js'
import {isPreviewMode} from './core_config.js'

const prefix = 'OIL: ';

/**
 * LogError on none-production environments.
 * if console.error is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logError() {
  if ((isDev() || isVerboseCookieSet()) && window.console) {
    logInternally(window.console.error, arguments);
  }
}

/**
 * LogInfo on none-production environments.
 * if console.info is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logInfo() {
  if ((isDev() || isVerboseCookieSet()) && window.console) {
    logInternally(window.console.info, arguments);
  }
}

/**
 * LogPreviewInfo is for preview production environments.
 * if console.info is not defined, fall back to console.log, ignore completely on weird cases
 */
export function logPreviewInfo() {
  if (isDev() || isPreviewMode() || isPreviewCookieSet() || isVerboseCookieSet()) {
    logInternally(window.console.info, arguments);
  }
}

function logInternally(logFunction, argsWithoutPrefix) {
  fixLogging();
  let args = [prefix].concat(Array.prototype.slice.call(argsWithoutPrefix));
  if (logFunction) {
    try {
      logFunction.apply(window.console, args);
    } catch (e) {
      try {
        logFunction(concatArgs(args));
      } catch (ignored) {
      }
    }
  } else {
    window.console.log(concatArgs(args));
  }
}


function concatArgs(args) {
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
