import { isProd } from "./utils";

function initLogging() {
  if (!window.console) {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function () { };
    if (!window.console.info) window.console.log = function () { };
    if (!window.console.error) window.console.log = function () { };
  }
}

export function logError() {
  if (!isProd() && console && console.error) {
    initLogging();
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
    initLogging();
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
    initLogging();
    try {
      console.debug.apply(console, arguments);
    }
    catch (e) {
      var log = Function.prototype.bind.call(console.log, console);
      log.apply(console, arguments);
    }
  }
}
