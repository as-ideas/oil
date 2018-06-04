import { forEach } from '../src/scripts/userview/userview_modal.js';
import { customMatchers } from './utilsHtmlDiff.js';

/**
 * Load a jasmine fixture from the given path
 * @param {string} file - filename
 * @function
 */
export function loadFixture(file) {
  jasmine.getFixtures().fixturesPath = '/base/test/fixtures';
  window.loadFixtures(file);
}

export function deleteAllCookies() {
  let cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf('=');
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export function readFixture(file) {
  jasmine.getFixtures().fixturesPath = '/base/test/fixtures';
  return window.readFixtures(file);
}

export function formatHtml(element) {
  if (typeof  element !== 'string') {
    element = element.outerHTML;
  }
  return element
    .trim()
    .split('\n')
    .reduce((prev, next) => {
      if (next) {
        prev += next.trim();
      }
      return prev;
    }, '');
}

export function initCustomYasmineMatchers() {
  jasmine.addMatchers(customMatchers);
}

export function removeOilLayerAndConfig() {
  window.AS_OIL = undefined;
  forEach(document.querySelectorAll('#oil-configuration'), (domNode) => {
    domNode.parentElement.removeChild(domNode);
  });
  forEach(document.querySelectorAll('.as-oil'), (domNode) => {
    domNode.parentElement.removeChild(domNode);
  });
}

export function waitForElementToDisplay(selector, callback) {
  waitsForAndRuns(() => document.querySelector(selector), callback, 200);
}

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
