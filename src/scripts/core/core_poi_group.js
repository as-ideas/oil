import {arrayContains} from './core_utils.js'

/**
 * This checks whether the locale is expected or not.
 */
export function isPoiGroupValid(poiGroup) {
  return arrayContains(
    [
      'axelSpringerSe_01',
      'axelSpringerPl_01'
    ],
    poiGroup
  );
}

