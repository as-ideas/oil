import {getConfigValue} from '../../../src/scripts/core/core_config';

describe('cookies', () => {

  describe('getConfigValue', () => {

    it('returns default when value not found', function () {
      let result = getConfigValue('foo', 'bar');
      expect(result).toEqual('bar');
    });

  });
});
