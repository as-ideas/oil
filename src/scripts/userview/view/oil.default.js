import { DATA_CONTEXT_YES, DATA_CONTEXT_LATER, DATA_CONTEXT_ADVANCED_SETTINGS } from '../../core/core_constants.js';
import { POIButtonSnippet } from './components/oil.poi.button';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { CSSPrefix } from './oil.view.config.js';

import {
  getLabelButtonAdvancedSettings,
  getLabelButtonNo,
  getLabelIntro,
  getLabelIntroStart,
  getLabelIntroEnd,
  getLabelIntroHeading,
  getLabelButtonYesSoi,
  isAdvancedSettings
} from '../userview_config.js';

/**
 * OIL advanced settings button
 */
const OilAdvancedSettings = (advancedSettings) => {
  return advancedSettings === true ? (
      `
        <button class="${CSSPrefix}oil__btn-as ${CSSPrefix}js-advanced-settings" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
            ${getLabelButtonAdvancedSettings()}
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
            ${getLabelButtonNo()}
        </button>
      `
  ) : '';
};

const introLabelSnippet = () => {
  let labelIntro = getLabelIntro();
  if(labelIntro) {
    return labelIntro;
  } else {
    return (`${getLabelIntroStart()} ${privacyPageSnippet()} ${getLabelIntroEnd()}`);
  }
};

export function oilDefaultTemplate() {
  return `
    <div class="${CSSPrefix}oil-content-overlay ${CSSPrefix}oil-has-gradient" data-qa="oil-full">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <div class="${CSSPrefix}oil__heading">
                ${getLabelIntroHeading()}
            </div>
            <p class="${CSSPrefix}oil__intro-txt">
                ${introLabelSnippet()}
            </p>
            <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-buttons">
                ${POIButtonSnippet()}
                <div class="${CSSPrefix}oil-l-item">
                    <button class="${CSSPrefix}oil__btn-soi ${CSSPrefix}js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                        ${getLabelButtonYesSoi()}
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
