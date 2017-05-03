import { isProd } from "./utils";

export function logError() {
  if (!isProd() && console && console.error) {
    try {
      console.error.apply(console, arguments);
    }
    catch (e) {
      var log = Function.prototype.bind.call(console.log, console);
      log.apply(console, arguments);
    }
  }
}

export function logInfo() {
  if (!isProd() && console && console.info) {
    try {
    console.info.apply(console, arguments);
    }
    catch (e) {
      var log = Function.prototype.bind.call(console.log, console);
      log.apply(console, arguments);
    }
  }
}

export function logDebug() {
  if (!isProd() && console && console.debug) {
    try {
    console.debug.apply(console, arguments);
    }
    catch (e) {
      var log = Function.prototype.bind.call(console.log, console);
      log.apply(console, arguments);
    }
  }
}
