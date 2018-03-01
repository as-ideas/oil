import { advancedSettingsSnippet } from './components/oil.advanced.settings.content';
import { DATA_CONTEXT_YES, DATA_CONTEXT_BACK } from '../../core/core_constants.js';
import { OIL_LABELS } from '../userview_constants.js'
import {
  getLabel
} from '../userview_config.js';

/**
 * OIL SOI will be only shown, when there is no POI on the advanced settings
 * Returned element is used to ignore Oil completely
 */
const SOIButtonSnippet = () => {
  return ` <div class="as-oil-l-item">
            <button class="as-oil__btn-soi as-js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_SOI)}
            </button>
        </div>
      `;
};

export function oilAdvancedSettingsTemplate() {
  return `
<div class="as-oil-content-overlay" data-qa="oil-as-overlay">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_TEXT)}
            </p>
            ${advancedSettingsSnippet()}
            <div class="as-oil-l-row as-oil-l-buttons">
                ${SOIButtonSnippet()}
                <div class="as-oil-l-item as-oil-l-item--stretch">
                  <button class="as-oil__btn-loi as-js-oilback" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-NotNowButton">
                      ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
                  </button>
                </div>
            </div>
        </div>
    </div>
`
}
