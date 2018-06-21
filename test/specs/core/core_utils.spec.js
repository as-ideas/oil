import { arrayContainsArray, fetchJsonData, getGlobalOilObject, getLocaleVariantVersion, setGlobalOilObject } from '../../../src/scripts/core/core_utils';
import { setLocale } from '../../../src/scripts/core/core_config';
import { resetOil } from '../../test-utils/utils_reset';

require('jasmine-ajax');

describe('core_utils', () => {

  beforeEach(() => resetOil());

  describe('getGlobalOilObject', function () {

    it('should set a global variable correctly', () => {
      let someData = '123456';
      setGlobalOilObject('someData', someData);
      let result = getGlobalOilObject('someData');
      expect(result).toBe('123456');
    });

    it('should not die when getting non-existent data', () => {
      let result = getGlobalOilObject('huckaboo');
      expect(result).toBe(undefined);
    });

    it('should work with functions', () => {
      let someFunction = (param) => param + ' this works!';
      setGlobalOilObject('verboseModeOn', someFunction);
      let result = getGlobalOilObject('verboseModeOn');
      expect(result('actually')).toBe('actually this works!');

      expect(window.AS_OIL.verboseModeOn('wow,')).toBe('wow, this works!');
    });

  });

  describe('getLocaleVariantVersion', function () {

    it('should get locale variant version correctly', () => {
      let expectedVersion = 17;
      setLocale({'version': expectedVersion, 'localeId': 'deDE_01', 'texts': {'key1': 'text1'}});
      expect(getLocaleVariantVersion()).toBe(expectedVersion);
    });

    it('should return default version if locale does not exist', () => {
      setLocale(null);
      expect(getLocaleVariantVersion()).toBe(0);
    });

    it('should return default version if locale has no version', () => {
      setLocale({'localeId': 'deDE_01', 'texts': {'key1': 'text1'}});
      expect(getLocaleVariantVersion()).toBe(0);
    });

  });

  describe('fetchJsonData', () => {

    beforeEach(() => {
      jasmine.Ajax.install();
    });

    afterEach(() => {
      jasmine.Ajax.uninstall();
    });

    it('should fetch JSON data successfully', (done) => {
      let expectedResponse = {
        'key1': 'text1',
        'key2': 'text2'
      };
      let url = 'http://call.backend/deDE_01';
      let fetchedData = fetchJsonData(url);

      let request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toEqual(url);
      expect(request.method).toEqual('GET');

      request.respondWith({
        'status': 200,
        'contentType': 'application/json',
        'responseText': JSON.stringify(expectedResponse)
      });
      fetchedData.then(response => {
        expect(response).toEqual(expectedResponse);
        done();
      }).catch(error => {
        fail(`Fetch JSON data promise returned unexpected error: ${error}!`);
      });
    });

    it('should return server\'s error response if server returns one', (done) => {
      let expectedResponse = {
        'errorMessage': 'errorMessage'
      };
      let url = 'http://call.backend/deDE_01';
      let fetchedData = fetchJsonData(url);

      let request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toEqual(url);
      expect(request.method).toEqual('GET');

      request.respondWith({
        'status': 404,
        'contentType': 'application/json',
        'responseText': JSON.stringify(expectedResponse)
      });
      fetchedData.then(response => {
        fail(`Fetch JSON data promise did not return expected error. Response was: ${response}!`);
      }).catch(error => {
        expect(error).toEqual(new Error('errorMessage'));
        done();
      });
    });

    it('should return generic error message if connection to server fails', (done) => {
      let url = 'http://call.backend/deDE_01';
      let fetchedData = fetchJsonData(url);

      let request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toEqual(url);
      expect(request.method).toEqual('GET');

      request.respondWith({
        'status': 0,
        'contentType': 'application/json',
        'responseText': JSON.stringify({
          'key1': 'text1',
          'key2': 'text2'
        })
      });

      fetchedData.then(response => {
        fail(`Fetch JSON data promise did not return expected error. Response was: ${response}!`);
      }).catch(error => {
        expect(error.message).toContain('Connection error occurred while fetching JSON data');
        done();
      });
    });
  });

  describe('arrayContainsArray', () => {

    it('should return true if checked array is empty and other array not', () => {
      expect(arrayContainsArray([4, 2, 3, 1], [])).toBeTruthy();
    });

    it('should return false if checked array is not empty but other array is', () => {
      expect(arrayContainsArray([], [1, 2])).toBeFalsy();
    });

    it('should return true if checked array is completely contained in other array', () => {
      expect(arrayContainsArray([2, 3, 4, 1], [1, 2])).toBeTruthy();
    });

    it('should return false if checked array is not completely contained in other array', () => {
      expect(arrayContainsArray([4, 1, 2, 3], [1, 5, 2])).toBeFalsy();
    });

    it('should return true if checked array with non-unique element is completely contained in other array', () => {
      expect(arrayContainsArray([2, 3, 4, 2, 1], [2, 1, 2])).toBeTruthy();
    });

    it('should return false if checked array with non-unique element is not completely contained in other array', () => {
      expect(arrayContainsArray([4, 3, 2, 1], [2, 2, 1])).toBeFalsy();
    });

    it('should return true if checked array is completely contained in other array with non-unique element', () => {
      expect(arrayContainsArray([2, 3, 4, 2, 1], [1, 2])).toBeTruthy();
    });

    it('should return false if checked array is not completely contained in other array with non-unique element', () => {
      expect(arrayContainsArray([4, 3, 2, 2, 1], [1, 5, 2])).toBeFalsy();
    });

    it('should return false if checked array is undefined', () => {
      expect(arrayContainsArray([4, 3, 2, 2, 1], undefined)).toBeFalsy();
    });

    it('should return false if other array is undefined', () => {
      expect(arrayContainsArray(undefined, [1, 2])).toBeFalsy();
    });

  });

});
