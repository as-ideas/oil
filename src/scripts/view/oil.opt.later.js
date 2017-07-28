import { CSSPrefix } from './oil.view.config.js';
import { POIButtonSnippet } from './components/oil.poi.button.opt.later';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { getConfiguration } from './../config.js';

let config = getConfiguration();

export const oilOptLaterTemplate =
    `
    <div class="${CSSPrefix}oil-content-overlay" data-qa="oil-optlater">
        <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-row--fixed-width">
            <div class="${CSSPrefix}oil-l-item">
                <h1 class="${CSSPrefix}oil-loi__heading">
                    ${config.label_heading}
                </h1>
                <p class="${CSSPrefix}oil-loi__intro-txt">
                    ${config.label_later_start} ${privacyPageSnippet()}
                    ${config.label_later_end}
                </p>
            </div>
            <div class="${CSSPrefix}oil-l-item ${CSSPrefix}oil-l-item--stretch">
                ${POIButtonSnippet()}
                <button class="${CSSPrefix}oil-loi__btn-soi js-optin" data-qa="oil-small-YesButton">
                    ${config.label_button_yes_soi}
                </button>
            </div>
        </div>
    </div>
`;