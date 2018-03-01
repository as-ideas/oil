import { privacyPageSnippet } from './components/oil.privacy.page';
import { DATA_CONTEXT_YES_WHILE_LATER, DATA_CONTEXT_IGNORE_WHILE_LATER } from '../../core/core_constants.js';
import { OIL_LABELS } from '../userview_constants.js'
import {
  isOilIgnore,
  getLabel
} from './../userview_config.js';


const laterLabelSnippet = () => {
  let labelLater = getLabel(OIL_LABELS.ATTR_LABEL_LATER)
  if(labelLater) {
    return labelLater;
  } else {
    return (`${getLabel(OIL_LABELS.ATTR_LABEL_LATER_START)} ${privacyPageSnippet()} ${getLabel(OIL_LABELS.ATTR_LABEL_LATER_END)}`);
  }
};

/**
 * OIL Ignore or Close Button
 * Returned element is used to ignore Oil completely
 */
const OilIgnore = (oilIgnore) => {
  return oilIgnore === true ? (
    `
        <div class="as-oil-close as-js-optignore" data-context="${DATA_CONTEXT_IGNORE_WHILE_LATER}" data-qa="oil-closeButton">
            <svg class="as-oil-icon-close" width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
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
export function oilOptLaterTemplate() {
  return `
    <div class="as-oil-content-overlay as-oil-opt-later" data-qa="oil-optlater">
        ${OilIgnore(isOilIgnore())}
        <div class="as-oil-l-row as-oil-l-row--fixed-width">
            <div class="as-oil-l-item">
                <div class="as-oil-loi__heading">
                    ${getLabel(OIL_LABELS.ATTR_LABEL_LATER_HEADING)}
                </div>
                <p class="as-oil-loi__intro-txt">
                    ${laterLabelSnippet()}
                </p>
            </div>
            <div class="as-oil-l-item as-oil-l-item--stretch">
                <button class="as-oil-loi__btn-soi as-js-optin" data-context="${DATA_CONTEXT_YES_WHILE_LATER}" data-qa="oil-small-YesButton">
                    ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_SOI)}
                </button>
            </div>
        </div>
    </div>
`
}
