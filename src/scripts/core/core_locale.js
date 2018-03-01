import { arrayContains } from './core_utils.js'
/**
 * This checks whether the locale is expected or not.
 */
export function isLocaleValid(locale) {
  return arrayContains(
    [
    'deDE_01'
    ],
    locale
  );
}

