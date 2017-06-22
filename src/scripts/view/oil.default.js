import { POIButtonSnippet } from './components/oil.poi.button';
import { oilHeading, oilIntroText, CSSPrefix} from './oil.view.config.js';

export const oilDefaultTemplate = `
    <div class="${CSSPrefix}oil-content-overlay ${CSSPrefix}oil-has-gradient">
        <h1 class="${CSSPrefix}oil__heading">
            ${oilHeading()}
        </h1>
        <p class="${CSSPrefix}oil__intro-txt">
            ${oilIntroText()}
        </p>
        <div class="${CSSPrefix}oil-l-row">
            ${POIButtonSnippet()}
            <div class="${CSSPrefix}oil-l-item">
                <button class="${CSSPrefix}oil__btn ${CSSPrefix}oil__btn--1st js-optin" data-qa="oil-YesButton" onClick="gaTrackEvent('SOI/yes');">
                    Jetzt zustimmen
                </button>
            </div>
            <div class="${CSSPrefix}oil-l-item ${CSSPrefix}oil-l-item--stretch">
                <button class="${CSSPrefix}oil__btn ${CSSPrefix}oil__btn--3rd js-optlater" data-qa="oil-NotNowButton">
                    Nein, jetzt nicht
                </button>
            </div>
        </div>
    </div>
`;
