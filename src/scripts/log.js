import { isProd } from "./utils";

export function initLogging() {
  if (!window.console) window.console = {};
  if (!window.console.log) window.console.log = function () { };
}

export function logInfo() {
  if (!isProd()) {
    console.log(console, arguments);
  }
}

export function logError() {
    console.log(console, arguments);
}

export function logDebug() {
  if (!isProd()) {
    console.log(console, arguments);
  }
}
