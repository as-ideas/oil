import { DATA_CONTEXT_YES, DATA_CONTEXT_LATER, DATA_CONTEXT_ADVANCED_SETTINGS } from '../../core/core_constants.js';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { OIL_LABELS } from '../userview_constants.js'
import {
  getLabel,
  isAdvancedSettings
} from '../userview_config.js';

/**
 * OIL advanced settings button
 */
const OilAdvancedSettings = (advancedSettings) => {
  return advancedSettings === true ? (
    `
        <button class="as-oil__btn-as as-js-advanced-settings" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
            ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS)}
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
        <button class="as-oil__btn-loi as-js-optlater" data-context="${DATA_CONTEXT_LATER}" data-qa="oil-NotNowButton">
            ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_NO)}
        </button>
      `
  ) : '';
};

const introLabelSnippet = () => {
  let labelIntro = getLabel(OIL_LABELS.ATTR_LABEL_INTRO);
  if (labelIntro) {
    return labelIntro;
  } else {
    return (`${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_START)} ${privacyPageSnippet()} ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_END)}`);
  }
};

export function oilDefaultTemplate() {
  return `
    <div class="as-oil-content-overlay" data-qa="oil-full">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${introLabelSnippet()}
            </p>
            <div class="as-oil-l-row as-oil-l-buttons">
                <div class="as-oil-l-item">
                    <button class="as-oil__btn-soi as-js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                        ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_SOI)}
                    </button>
                </div>
                <div class="as-oil-l-item as-oil-l-item--stretch">
                    ${OilLaterButton(isAdvancedSettings())}
                    ${OilAdvancedSettings(isAdvancedSettings())}
                </div>
            </div>

        </div>
    </div>
`
}
