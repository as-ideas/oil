import {CSSPrefix} from './../oil.view.config.js';
import {
  getLabel
} from '../../userview_config.js';
import { OIL_LABELS } from '../../userview_constants.js'

/**
 * Returns html content for advanced settings snippit
 */
export const advancedSettingsSnippet = () => {
  return `
          <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-cpc">
            <div id="${CSSPrefix}slider-range" class="${CSSPrefix}slider-wrapper" data-qa="oil-as-slider"></div>
            <div class="${CSSPrefix}slider-desc">
              <div id="${CSSPrefix}slider-essential-title" class="${CSSPrefix}slider-inactive ">
                <div class="${CSSPrefix}slider-option-title">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_TEXT)}</div>
                <div class="${CSSPrefix}slider-option-verbose">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ESSENTIAL_VERBOSE)}</div>
              </div>
              <div id="${CSSPrefix}slider-functional-title" class="${CSSPrefix}slider-inactive">
                <div class="${CSSPrefix}slider-option-title">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_TEXT)}</div>
                <div class="${CSSPrefix}slider-option-verbose">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_FUNCTIONAL_VERBOSE)}</div>
              </div>
              <div id="${CSSPrefix}slider-advertising-title" class="${CSSPrefix}slider-inactive">
                <div class="${CSSPrefix}slider-option-title">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_TEXT)}</div>
                <div class="${CSSPrefix}slider-option-verbose">${getLabel(OIL_LABELS.ATTR_LABEL_ADVANCED_SETTINGS_ADVERTISING_VERBOSE)}</div>
              </div>
            </div>
          </div>`;
};
