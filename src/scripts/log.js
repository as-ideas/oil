import { isProd } from "./utils";

export function logInfo() {
  if (console && console.log) {
    console.log(console, arguments);
  }
}

export function logError() {
  if (console && console.log) {
    console.log(console, arguments);
  }
}

export function logDebug() {
  if (!isProd() && console && console.log) {
    console.log(console, arguments);
  }
}
