import { getConfiguration } from './../../config.js';
import { OIL_CONFIG } from './../../constants.js';
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
        <div class="${CSSPrefix}oil-btn-group-mini">
            <button class="${CSSPrefix}oil__btn-mini ${CSSPrefix}oil__btn-mini--1st js-optin-poi" data-qa="oil-small-poi-YesButton">
                Global zustimmen
            </button>
            <div class="${CSSPrefix}oil__btn-mini-label"></div>
        </div>
        `
    );
  }
  return '';
}