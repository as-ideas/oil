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
  handleSoiOptIn,
  handlePoiOptIn,
  oilWrapper
} from '../userview_modal';

export function locale(callback) {
  let localeObject = getLocale();
  const missingLabels = (localeObject && localeObject.texts) ? findMissingLabels(localeObject.texts) : [];

  if (localeObject && localeObject.texts && missingLabels.length === 0) {
    return callback(this);
  } else {
    const localeUrl = getLocaleUrl();

    if (localeUrl) {
      fetchJsonData(localeUrl)
      .then(response => {
        fillAndSetLocaleObject(response, localeObject, missingLabels);
        return callback(this);
      })
      .catch(error => {
        logError(`OIL backend returned error: ${error}. Falling back to default locale '${DEFAULT_LOCALE.localeId}', version ${DEFAULT_LOCALE.version}!`);
        fillAndSetLocaleObject(DEFAULT_LOCALE, localeObject, missingLabels);
        return callback(this);
      });
    } else {
      fillAndSetLocaleObject(DEFAULT_LOCALE, localeObject, missingLabels);
      return callback(this);
    }
  }
}

function fillAndSetLocaleObject(sourceObject, targetObject, missingLabels) {
  if (!targetObject || !targetObject.texts) {
    setLocale(sourceObject);
    return;
  }

  missingLabels.forEach((label) => {
    if(!sourceObject.texts[label]){
      logWarn(`${label} missing from locale config.`);
    } else {
      targetObject.texts[label] = sourceObject.texts[label];
    }
  });

  setLocale(targetObject);
}

function findMissingLabels(locale) {
  const requiredLabels = Object.values(OIL_LABELS).filter(key => !key.startsWith(OPTIONAL_LABEL_PREFIX));
  return requiredLabels.filter(key => !locale[key]);
}
