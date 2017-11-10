import { forEach } from '../../src/scripts/modal.js';

describe('modal', () => {
  it('should have an functioning forEach replacement', () => {
    let array = [2,1,0];
    let result = [];
    forEach(array, function(value) {
      result.push(value)
    });
    expect(result.length).toBe(3);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(1);
    expect(result[2]).toBe(0);
  });
});
