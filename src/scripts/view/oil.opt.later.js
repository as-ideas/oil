import { CSSPrefix } from './oil.view.config.js';
import { POIButtonSnippet } from './components/oil.poi.button.opt.later';
import { privacyPageSnippet } from './components/oil.privacy.page';
import { getConfiguration } from './../config.js';
import { OIL_CONFIG } from './../constants.js';

let config = getConfiguration();

/**
 * OIL Ignore or Close Button
 * Returned element is used to ignore Oil completely
 */
const OilIgnore = (oilIgnore) => {
  return oilIgnore === true ? (
    `
        <div class="${CSSPrefix}oil-close js-optignore" data-qa="oil-closeButton">
            <svg class="${CSSPrefix}oil-icon-close" width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                <g fill-rule="evenodd">
                    <path d="M.222 13.364L12.95.636l1.414 1.414L1.636 14.778z"/>
                    <path d="M1.636.636l12.728 12.728-1.414 1.414L.222 2.05z"/>
                </g>
            </svg>
        </div>
        `
  ) : '';
};


/**
 * Opt Later Template
 */
export const oilOptLaterTemplate =
  `
    <div class="${CSSPrefix}oil-content-overlay" data-qa="oil-optlater">
        ${OilIgnore(config[OIL_CONFIG.ATTR_OIL_IGNORE])}
        <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-row--fixed-width">
            <div class="${CSSPrefix}oil-l-item">
                <div class="${CSSPrefix}oil-loi__heading">
                    ${config.label_later_heading}
                </div>
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
