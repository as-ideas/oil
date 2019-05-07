import { OIL_LABELS, OPTIONAL_LABEL_PREFIX } from '../userview_constants';
import { logError, logWarn } from '../../core/core_log';
import { fetchJsonData } from '../../core/core_utils';
import { getLocale, getLocaleUrl, setLocale } from '../../core/core_config';
// TODO add texts for label values with underscores...
import DEFAULT_LOCALE from './userview_default_locale';

export {
  renderOil,
  oilShowPreferenceCenter,
  handleOptIn,
  oilWrapper
} from '../userview_modal';

/**
 *
 * Loads the locale information and fills missing texts
 *
 * @param callback function which gets called after locale is loaded
 * @returns {*}
 */
export function locale(callback) {
  let localeObjectFromConfiguration = getLocale();

  if (hasMissingLabels(localeObjectFromConfiguration)) {
    return callback(this);
  } else {
    const localeUrl = getLocaleUrl();

    if (localeUrl) {
      fetchJsonData(localeUrl)
        .then(response => {
          fillAndSetLocaleObject(response, localeObjectFromConfiguration);
          return callback(this);
        })
        .catch(error => {
          logError(`OIL backend returned error: ${error}. Falling back to default locale '${DEFAULT_LOCALE.localeId}', version ${DEFAULT_LOCALE.version}!`);
          fillAndSetLocaleObject(DEFAULT_LOCALE, localeObjectFromConfiguration);

          return callback(this);
        });
    } else {
      // HINT: For no localeUrl we enrich the configured locale with our default locale
      fillAndSetLocaleObject(DEFAULT_LOCALE, localeObjectFromConfiguration);
      return callback(this);
    }
  }
}

function hasMissingLabels(localeObjectFromConfiguration) {
  const missingLabels = (localeObjectFromConfiguration && localeObjectFromConfiguration.texts) ? findMissingLabels(localeObjectFromConfiguration.texts) : [];
  return localeObjectFromConfiguration && localeObjectFromConfiguration.texts && missingLabels.length === 0;
}

/**
 * Gets a source and a target and adds all missing labels from the source to the target
 *
 * @param sourceObject default object
 * @param targetObject object with missing labels
 */
function fillAndSetLocaleObject(sourceObject, targetObject) {
  console.log('SourceObject: ', sourceObject);
  console.log('targetObject: ', targetObject);

  if (!targetObject || !targetObject.texts) {
    setLocale(sourceObject);
    return;
  }

  for (let key in sourceObject.texts) {
    if (!targetObject.texts[key]) {
      targetObject.texts[key] = sourceObject.texts[key];
    }
  }

  // Check for missing keys against default configuration
  for (let key in DEFAULT_LOCALE.texts) {
    if (!targetObject.texts[key]) {
      logWarn(`${key} missing from locale config.`);
    }
  }

  setLocale(targetObject);
}

/**
 * Determines which label-keys are mandatory.
 * Currently all labels starting with "label_cpc_purpose" are optional.
 *
 * @param locale
 * @returns {any[]} An array with all keys of missing labels
 */
function findMissingLabels(locale) {
  const requiredLabels = Object.values(OIL_LABELS).filter(key => !key.startsWith(OPTIONAL_LABEL_PREFIX));
  return requiredLabels.filter(key => !locale[key]);
}
