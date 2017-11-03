import { DATA_CONTEXT_YES, DATA_CONTEXT_LATER, DATA_CONTEXT_ADVANCED_SETTINGS } from './../constants.js';
import { getConfiguration } from './../config.js';
import { POIButtonSnippet } from './components/oil.poi.button';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { CSSPrefix } from './oil.view.config.js';
import { OIL_CONFIG } from './../constants.js';

let config = getConfiguration();

/**
 * OIL advanced settings button
 */
const OilAdvancedSettings = (advancedSettings) => {
  return advancedSettings === true ? (
      `
          <button class="${CSSPrefix}oil__btn-as js-advanced-settings" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
              ${config.label_button_advanced_settings}
          </button>
        `
    ) : '';
};

/**
 * OIL Later Button
 */
const OilLaterButton = (advancedSettings) => {
  return advancedSettings !== true ? (
      `
          <button class="${CSSPrefix}oil__btn-loi js-optlater" data-context="${DATA_CONTEXT_LATER}" data-qa="oil-NotNowButton">
              ${config.label_button_no}
          </button>
        `
    ) : '';
};

export const oilDefaultTemplate = `
    <div class="${CSSPrefix}oil-content-overlay ${CSSPrefix}oil-has-gradient" data-qa="oil-full">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <div class="${CSSPrefix}oil__heading">
                ${config.label_intro_heading}
            </div>
            <p class="${CSSPrefix}oil__intro-txt">
                ${config.label_intro_start} ${privacyPageSnippet()}
                ${config.label_intro_end}
            </p>
            <div class="${CSSPrefix}oil-l-row">
                ${POIButtonSnippet()}
                <div class="${CSSPrefix}oil-l-item">
                    <button class="${CSSPrefix}oil__btn-soi js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                        ${config.label_button_yes_soi}
                    </button>
                </div>
                <div class="${CSSPrefix}oil-l-item ${CSSPrefix}oil-l-item--stretch">
                    ${OilLaterButton(config[OIL_CONFIG.ATTR_ADVANCED_SETTINGS])}
                    ${OilAdvancedSettings(config[OIL_CONFIG.ATTR_ADVANCED_SETTINGS])}
                </div>
            </div>
      
        </div>
    </div>
`;
