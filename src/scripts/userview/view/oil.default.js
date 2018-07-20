import { privacyPageSnippet } from './components/oil.privacy.page';
import { OIL_LABELS } from '../userview_constants.js';
import { YesButton, AdvancedSettingsButton } from './components/oil.buttons.js';
import {
  getLabel,
  isAdvancedSettings
} from '../userview_config.js';

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
                    ${YesButton()}
                </div>
                <div class="as-oil-l-item as-oil-l-item--stretch">
                    ${AdvancedSettingsButton(isAdvancedSettings())}
                </div>
            </div>

        </div>
    </div>
`
}
