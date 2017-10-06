import { DATA_CONTEXT_YES, DATA_CONTEXT_LATER } from './../constants.js';
import { getConfiguration } from './../config.js';
import { POIButtonSnippet } from './components/oil.poi.button';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { CSSPrefix } from './oil.view.config.js';

let config = getConfiguration();

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
                    <button class="${CSSPrefix}oil__btn-loi js-optlater" data-context="${DATA_CONTEXT_LATER}" data-qa="oil-NotNowButton">
                        ${config.label_button_no}
                    </button>
                </div>
            </div>
        </div>
    </div>
`;
