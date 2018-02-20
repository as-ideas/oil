import {isPoiActive} from "../../../core/core_config.js";
import {getLabelButtonYesPoi} from "../../userview_config.js";
import {DATA_CONTEXT_YES_POI_WHILE_LATER} from "../../../core/core_constants.js";


/**
 * Returns html content for OIL power opt in button
 */

export const POIButtonSnippet = () => {
  if (isPoiActive()) {
    return`
      <button class="${CSSPrefix}oil-loi__btn-poi ${CSSPrefix}js-optin-poi" data-context="${DATA_CONTEXT_YES_POI_WHILE_LATER}" data-qa="oil-small-poi-YesButton">
        ${getLabelButtonYesPoi()}
      </button>
      `;
  }
  return '';
};
