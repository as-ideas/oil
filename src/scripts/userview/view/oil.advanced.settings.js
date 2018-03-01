import { CSSPrefix } from './oil.view.config.js';
import { advancedSettingsSnippet } from './components/oil.advanced.settings.content';
import { DATA_CONTEXT_YES, DATA_CONTEXT_BACK } from '../../core/core_constants.js';
import { POIButtonSnippet } from './components/oil.poi.button';
import { OIL_LABELS } from '../userview_constants.js'
import {
  getLabel
} from '../userview_config.js';
import {
  isPoiActive
} from '../../core/core_config.js';

/**
 * OIL SOI will be only shown, when there is no POI on the advanced settings
 * Returned element is used to ignore Oil completely
 */
const SOIButtonSnippet = (poiActivated) => {
  return poiActivated !== true ? (
    ` <div class="${CSSPrefix}oil-l-item">
            <button class="${CSSPrefix}oil__btn-soi ${CSSPrefix}js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_SOI)}
            </button>
        </div>
      `
  ) : '';
};

export function oilAdvancedSettingsTemplate() {
  return `
<div class="${CSSPrefix}oil-content-overlay ${CSSPrefix}oil-has-gradient" data-qa="oil-as-overlay">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <div class="${CSSPrefix}oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_HEADING)}
            </div>
            <p class="${CSSPrefix}oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_TEXT)}
            </p>
            ${advancedSettingsSnippet()}
            <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-buttons">
                ${POIButtonSnippet()}
                ${SOIButtonSnippet(isPoiActive())}
                <div class="${CSSPrefix}oil-l-item ${CSSPrefix}oil-l-item--stretch">
                  <button class="${CSSPrefix}oil__btn-loi ${CSSPrefix}js-oilback" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-NotNowButton">
                      ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
                  </button>
                </div>
            </div>
        </div>
    </div>
`
}
