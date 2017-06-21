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
        <button class="oil__button oil__button--1st js-optin-poi" data-qa="oil-poi-YesButton" onClick="ga('send', 'event', 'OIL', 'POI/yes');">
            Global zustimmen
            <span class="oil__button__label-2nd">
            Für alle Axel Springer Dienste
            </span>
        </button>
        `
    );
  }
  return '';
}