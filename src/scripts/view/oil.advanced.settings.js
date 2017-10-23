
import { CSSPrefix } from './oil.view.config.js';
import { advancedSettingsSnippet } from './components/oil.advanced.settings.content';
import { DATA_CONTEXT_YES } from './../constants.js';
import { getConfiguration } from './../config.js';
import { POIButtonSnippet } from './components/oil.poi.button';

let config = getConfiguration();

export const oilAdvancedSettingsTemplate = `
<div class="${CSSPrefix}oil-content-overlay ${CSSPrefix}oil-has-gradient" data-qa="oil-full">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <div class="${CSSPrefix}oil__heading">
                ${config.label_title_advanced_settings}
            </div>
                ${advancedSettingsSnippet()}
            <div class="${CSSPrefix}oil-l-row">
                ${POIButtonSnippet()}
                <div class="${CSSPrefix}oil-l-item">
                    <button class="${CSSPrefix}oil__btn-soi js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                        ${config.label_button_yes_soi}
                    </button>
                </div>
            </div>
        </div>
    </div>
    
`;


