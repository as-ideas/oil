export function waitsForAndRuns(escapeFunction, runFunction, escapeTime) {
  // check the escapeFunction every millisecond so as soon as it is met we can escape the function
  let interval = setInterval(function () {
    if (escapeFunction()) {
      clearMe();
      runFunction();
    }
  }, 1);

  // in case we never reach the escapeFunction, we will time out
  // at the escapeTime
  let timeOut = setTimeout(function () {
    clearMe();
    runFunction();
  }, escapeTime);

  // clear the interval and the timeout
  function clearMe() {
    clearInterval(interval);
    clearTimeout(timeOut);
  }
}

export function waitForElementToDisplay(selector, callback) {
  waitsForAndRuns(() => document.querySelector(selector), callback, 200);
}
