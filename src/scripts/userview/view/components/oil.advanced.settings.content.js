import {CSSPrefix} from './../oil.view.config.js';
import {
  getLabelAdvancedSettingsEssentialTitle,
  getLabelAdvancedSettingsEssentialVerbose,
  getLabelAdvancedSettingsFunctionalText,
  getLabelAdvancedSettingsFunctionalVerbose,
  getLabelAdvancedSettingsAdvertisingText,
  getLabelAdvancedSettingsAdvertisingVerbose
} from '../../userview_config.js';

/**
 * Returns html content for advanced settings snippit
 */
export const advancedSettingsSnippet = () => {
  return `
          <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-cpc">
            <div id="${CSSPrefix}slider-range" class="${CSSPrefix}slider-wrapper" data-qa="oil-as-slider"></div>
            <div class="${CSSPrefix}slider-desc">
              <div id="${CSSPrefix}slider-essential-title" class="${CSSPrefix}slider-inactive ">
                <div class="${CSSPrefix}slider-option-title">${getLabelAdvancedSettingsEssentialTitle()}</div>
                <div class="${CSSPrefix}slider-option-verbose">${getLabelAdvancedSettingsEssentialVerbose()}</div>
              </div>
              <div id="${CSSPrefix}slider-functional-title" class="${CSSPrefix}slider-inactive">
                <div class="${CSSPrefix}slider-option-title">${getLabelAdvancedSettingsFunctionalText()}</div>
                <div class="${CSSPrefix}slider-option-verbose">${getLabelAdvancedSettingsFunctionalVerbose()}</div>
              </div>
              <div id="${CSSPrefix}slider-advertising-title" class="${CSSPrefix}slider-inactive">
                <div class="${CSSPrefix}slider-option-title">${getLabelAdvancedSettingsAdvertisingText()}</div>
                <div class="${CSSPrefix}slider-option-verbose">${getLabelAdvancedSettingsAdvertisingVerbose()}</div>
              </div>
            </div>
          </div>`;
};
