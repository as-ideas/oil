import { getConfiguration } from './../../config.js';
import { OIL_CONFIG } from './../../constants.js';

let config = getConfiguration();
let activatePoi = config[OIL_CONFIG.ATTR_ACTIVATE_POI];

/**
 * Returns html content for OIL power opt in button
 */

export const POIButtonSnippet = () => {
  if (activatePoi) {
    return (
        `
        <div class="oil-btn-group-mini">
            <button class="oil__btn-mini oil__btn-mini--1st js-optin-poi" data-qa="oil-small-poi-YesButton">
                Global zustimmen
            </button>
            <div class="oil__btn-mini-label">
                Für alle Axel Springer Dienste
            </div>
        </div>
        `
    );
  }
  return '';
}