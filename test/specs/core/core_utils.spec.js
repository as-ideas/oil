import {setGlobalOilObject, getGlobalOilObject} from '../../../src/scripts/core/core_utils.js';

describe('core_utils', () => {
  beforeEach(() => {
  });

  afterEach(() => {
  });

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
    let someFunction = (param) => {
      return param + ' this works!'
    };
    setGlobalOilObject('verboseModeOn', someFunction);
    let result = getGlobalOilObject('verboseModeOn');
    expect(result('actually')).toBe('actually this works!');

    expect(window.AS_OIL.verboseModeOn('wow,')).toBe('wow, this works!');
  });
});
