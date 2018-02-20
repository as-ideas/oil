import {CSSPrefix} from './../oil.view.config.js';
import {getLabelButtonYesPoi} from "../../userview_config.js";
import {isPoiActive} from "../../../core/core_config.js";
import {DATA_CONTEXT_YES_POI} from "../../../core/core_constants";

/**
 * Returns html content for OIL power opt in button
 */

export const POIButtonSnippet = () => {
  if (isPoiActive()) {
    return `
      <div class="${CSSPrefix}oil-l-item">
          <button class="${CSSPrefix}oil__btn-poi ${CSSPrefix}js-optin-poi" data-context="${DATA_CONTEXT_YES_POI}" data-qa="oil-poi-YesButton">
              ${getLabelButtonYesPoi()}
          </button>
        </div>`;
  }
  return '';
};
