import { JS_CLASS_BUTTON_OPTIN } from '../../core/core_constants.js';
import { getLabel, isAdvancedSettings } from '../userview_config.js';
import { OIL_LABELS } from '../userview_constants.js';
import { AdvancedSettingsButton, YesButton } from './components/oil.buttons.js';

export function oilDefaultTemplate() {
  return `
    <div class="as-oil-content-overlay" data-qa="oil-full">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO)}
            </p>
            <div class="as-oil-l-row as-oil-l-buttons">
                <div class="as-oil-l-item">
                    ${YesButton(`as-oil__btn-optin ${JS_CLASS_BUTTON_OPTIN}`)}
                </div>
                <div class="as-oil-l-item as-oil-l-item--stretch">
                    ${AdvancedSettingsButton(isAdvancedSettings())}
                </div>
            </div>

        </div>
    </div>
`
}
