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
        <div class="oil-l-item">
          <button class="oil__btn oil__btn--1st js-optin-poi" data-qa="oil-poi-YesButton" onClick="ga('send', 'event', 'OIL', 'POI/yes');">
          <button class="oil__btn oil__btn--1st js-optin-poi" data-qa="oil-poi-YesButton">
              Global zustimmen
          </button>
        </div>
        `
    );
  }
  return '';
}