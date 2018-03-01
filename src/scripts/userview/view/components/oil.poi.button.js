import { getLabel } from '../../userview_config.js';
import { OIL_LABELS } from '../../userview_constants.js'
import { isPoiActive } from '../../../core/core_config.js';
import { DATA_CONTEXT_YES_POI } from '../../../core/core_constants';

/**
 * Returns html content for OIL power opt in button
 */

export const POIButtonSnippet = () => {
  if (isPoiActive()) {
    return `
      <div class="as-oil-l-item">
          <button class="as-oil__btn-poi as-js-optin-poi" data-context="${DATA_CONTEXT_YES_POI}" data-qa="oil-poi-YesButton">
              ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES_POI)}
          </button>
        </div>`;
  }
  return '';
};
