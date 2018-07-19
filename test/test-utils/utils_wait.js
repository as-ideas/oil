const REPEAT_INTERVAL = 10;

export function waitsForAndRuns(escapeFunction, runFunction, escapeTime) {
  // check the escapeFunction every millisecond so as soon as it is met we can escape the function
  let interval = setInterval(function () {
    if (escapeFunction()) {
      clearMe();
      runFunction();
    }
  }, escapeTime > REPEAT_INTERVAL ? Math.floor(escapeTime / (REPEAT_INTERVAL*10)) : 1);

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

export function waitForElementsToDisplay(selectors, callback) {
  let all_exist = true;
  selectors.map((selector) => {
    if (!document.querySelector(selector)) {
      all_exist = false;
    }
  });

  if (all_exist) {
    return callback();
  } else {
    setTimeout(() => {
      waitForElementsToDisplay(selectors, callback);
    }, 50);
  }
}
