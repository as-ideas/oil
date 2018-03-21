import {
  getLabel
} from '../../userview_config.js';
import { OIL_LABELS } from '../../userview_constants.js'

/**
 * Returns html content for advanced settings snippit
 */
export const advancedSettingsSnippet = () => {
  return `
          <div data-qa="cpc-snippet" class="as-oil-l-row as-oil-l-cpc">
            <div id="as-slider-range" class="as-slider-wrapper" data-qa="oil-as-slider"></div>
            <div class="as-slider-desc">
              <div id="as-slider-essential-title" class="as-slider-inactive ">
                <div class="as-slider-option-title">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_TEXT)}</div>
                <div class="as-slider-option-verbose">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_VERBOSE)}</div>
              </div>
              <div id="as-slider-functional-title" class="as-slider-inactive">
                <div class="as-slider-option-title">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_TEXT)}</div>
                <div class="as-slider-option-verbose">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_VERBOSE)}</div>
              </div>
              <div id="as-slider-advertising-title" class="as-slider-inactive">
                <div class="as-slider-option-title">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_TEXT)}</div>
                <div class="as-slider-option-verbose">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_VERBOSE)}</div>
              </div>
            </div>
          </div>`;
};
