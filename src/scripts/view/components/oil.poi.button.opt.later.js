import { getConfiguration } from './../../config.js';
import { OIL_CONFIG, DATA_CONTEXT_YES_POI_WHILE_LATER } from './../../constants.js';
import { CSSPrefix } from './../oil.view.config.js';

let config = getConfiguration();
let activatePoi = config[OIL_CONFIG.ATTR_ACTIVATE_POI];

/**
 * Returns html content for OIL power opt in button
 */

export const POIButtonSnippet = () => {
  if (activatePoi) {
    return (
      `
        <button class="${CSSPrefix}oil-loi__btn-poi js-optin-poi" data-context="${DATA_CONTEXT_YES_POI_WHILE_LATER}" data-qa="oil-small-poi-YesButton">
            ${config.label_button_yes_poi}
        </button>
        `
    );
  }
  return '';
}
