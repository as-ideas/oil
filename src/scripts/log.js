import { isProd } from "./utils";

export function logError() {
  if (console && console.error) {
    console.error.apply(console, arguments);
  }
}

export function logInfo() {
  if (!isProd() && console && console.info) {
    console.info.apply(console, arguments);
  }
}

export function logDebug() {
  if (!isProd() && console && console.debug) {
    console.debug.apply(console, arguments);
  }
}
