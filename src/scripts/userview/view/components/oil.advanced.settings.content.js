import { CSSPrefix } from './../oil.view.config.js';
import { getConfiguration } from '../../config';

/**
 * Returns html content for advanced settings snippit
 */
export const advancedSettingsSnippet = () => {
  let config = getConfiguration();
  return `
              <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-cpc">
                <div id="${CSSPrefix}slider-range" class="${CSSPrefix}slider-wrapper" data-qa="oil-as-slider"></div>
                <div class="${CSSPrefix}slider-desc">
                  <div id="${CSSPrefix}slider-essential-title" class="${CSSPrefix}slider-inactive ">
                    <div class="${CSSPrefix}slider-option-title">${config.label_advanced_settings_essential_title}</div>
                    <div class="${CSSPrefix}slider-option-verbose">${config.label_advanced_settings_essential_verbose}</div>
                  </div>
                  <div id="${CSSPrefix}slider-functional-title" class="${CSSPrefix}slider-inactive">
                    <div class="${CSSPrefix}slider-option-title">${config.label_advanced_settings_functional_text}</div>
                    <div class="${CSSPrefix}slider-option-verbose">${config.label_advanced_settings_functional_verbose}</div>
                  </div>
                  <div id="${CSSPrefix}slider-advertising-title" class="${CSSPrefix}slider-inactive">
                    <div class="${CSSPrefix}slider-option-title">${config.label_advanced_settings_advertising_text}</div>
                    <div class="${CSSPrefix}slider-option-verbose">${config.label_advanced_settings_advertising_verbose}</div>
                  </div>
                </div>
              </div>
`;
};
