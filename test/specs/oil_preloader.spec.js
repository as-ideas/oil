import { needsOptIn } from '../../src/oil_preloader';
import { deleteAllCookies } from '../utils';
import Cookie from 'js-cookie';

describe('oil_preloader.js', () => {

  beforeEach(() => {
    deleteAllCookies();
  });

  it('should load oil script if cookie is undefined', () => {
    givenNoCookie();
    thenNeedsOptInReturnsTrue();
  });

  it('should load oil script if cookie is defined but opt-in is false', () => {
    givenCookieWithoutOptIn();
    thenNeedsOptInReturnsTrue();
  });

  it('should not load oil script if cookie is defined and opt-in is true', () => {
    givenCookieWithOptIn();
    thenNeedsOptInReturnsFalse();
  });

  function givenNoCookie() {
  }

  function givenCookieWithoutOptIn() {
    Cookie.set('oil_data', {opt_in: false});
  }

  function givenCookieWithOptIn() {
    Cookie.set('oil_data', {opt_in: true});
  }

  function thenNeedsOptInReturnsTrue() {
    expect(needsOptIn()).toBeTruthy();
  }

  function thenNeedsOptInReturnsFalse() {
    expect(needsOptIn()).toBeFalsy();
  }

});
