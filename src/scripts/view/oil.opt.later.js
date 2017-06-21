import { oilHeading, oilIntroText, CSSPrefix} from './oil.view.config.js';

export const oilOptLaterTemplate =
    `
    <div class="${CSSPrefix}oil-content-overlay">
        <div class="${CSSPrefix}oil-l-row ${CSSPrefix}oil-l-row--fixed-width">
            <div class="${CSSPrefix}oil-l-item">
                <h1 class="${CSSPrefix}oil__heading-mini">
                    ${oilHeading()}
                </h1>
                <p class="${CSSPrefix}oil__intro-text-mini">
                    ${oilIntroText()}
                </p>
            </div>
            <div class="${CSSPrefix}oil-l-item ${CSSPrefix}oil-l-item--stretch">
                <button class="${CSSPrefix}oil__btn-mini ${CSSPrefix}oil__btn-mini--1st js-optin" data-qa="oil-small-YesButton" onClick="gaTrackEvent('SOI/yes-2nd');">
                    Jetzt zustimmen
                </button>
            </div>
        </div>
    </div>
`;