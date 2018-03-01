import { isPoiActive} from '../../../core/core_config.js';
import { getLabel } from '../../userview_config.js';
import { OIL_LABELS } from '../../userview_constants.js'
import { DATA_CONTEXT_YES_POI_WHILE_LATER } from '../../../core/core_constants.js';

/**
 * Returns html content for OIL power opt in button
 */

export const POIButtonSnippet = () => {
  if (isPoiActive()) {
    return`
      <button class="as-oil-loi__btn-poi as-js-optin-poi" data-context="${DATA_CONTEXT_YES_POI_WHILE_LATER}" data-qa="oil-small-poi-YesButton">
        ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_POI)}
      </button>
      `;
  }
  return '';
};
