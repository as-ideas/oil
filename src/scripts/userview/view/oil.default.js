import { DATA_CONTEXT_YES, DATA_CONTEXT_LATER, DATA_CONTEXT_ADVANCED_SETTINGS } from '../../core/core_constants.js';
import { POIButtonSnippet } from './components/oil.poi.button';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { CSSPrefix } from './oil.view.config.js';
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
        <button class="${CSSPrefix}oil__btn-as ${CSSPrefix}js-advanced-settings" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
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
        <button class="${CSSPrefix}oil__btn-loi ${CSSPrefix}js-optlater" data-context="${DATA_CONTEXT_LATER}" data-qa="oil-NotNowButton">
            ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_NO)}
        </button>
      `
  ) : '';
};

const introLabelSnippet = () => {
  let labelIntro = getLabel(OIL_LABELS.ATTR_LABEL_INTRO);
  if(labelIntro) {
    return labelIntro;
  } else {
    return (`${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_START)} ${privacyPageSnippet()} ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_END)}`);
  }
};

export function oilDefaultTemplate() {
  return `
    <div class="${CSSPrefix}oil-content-overlay ${CSSPrefix}oil-has-gradient" data-qa="oil-full">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <div class="${CSSPrefix}oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)}
            </div>
            <p class="${CSSPrefix}oil__intro-txt">
                ${introLabelSnippet()}
            </p>
            <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-buttons">
                ${POIButtonSnippet()}
                <div class="${CSSPrefix}oil-l-item">
                    <button class="${CSSPrefix}oil__btn-soi ${CSSPrefix}js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                        ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_SOI)}
                    </button>
                </div>
                <div class="${CSSPrefix}oil-l-item ${CSSPrefix}oil-l-item--stretch">
                    ${OilLaterButton(isAdvancedSettings())}
                    ${OilAdvancedSettings(isAdvancedSettings())}
                </div>
            </div>

        </div>
    </div>
`
}
