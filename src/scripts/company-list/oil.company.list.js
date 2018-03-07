import {
  getLabel
} from '../userview/userview_config.js';
import { OIL_LABELS } from '../userview/userview_constants';
import { DATA_CONTEXT_BACK } from '../core/core_constants';

/**
 * OIL SOI will be only shown, when there is no POI on the advanced settings
 * Returned element is used to ignore Oil completely
 */
const companyListSnippet = (companyList) => {
  let companyListInSpans = companyList.map((element) => {
    return `<div>${element}</div>`;
  });

  return `<div class="as-oil-poi-group-list">
           ${companyListInSpans.join('')}
          </div>`;
};


export function oilCompanyListTemplate(companyList) {
  return `
<div class="as-oil-content-overlay as-oil-poi-group-list-wrapper" data-qa="oil-company-list">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT)}
            </p>
            ${companyListSnippet(companyList)}
            <button class="as-oil__btn-loi as-js-oilback" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
                ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
            </button>
        </div>
    </div>
`
}
