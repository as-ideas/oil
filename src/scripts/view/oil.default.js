import { POIButtonSnippet } from './components/oil.poi.button';
import { oilHeading, oilIntroText} from './oil.text.constants.js';

export const oilDefaultTemplate = `
    <div class="oil-expanded" data-qa="oil-full">
        <div class="oil-content-overlay">
        <h1 class="oil__heading">
            ${oilHeading()}
        </h1>
        <p class="oil__intro-text">
            ${oilIntroText()}
        </p>
        <div class="oil__button-row">

            ${POIButtonSnippet()}

            <button class="oil__button oil__button--2nd js-optin" data-qa="oil-YesButton" onClick="gaTrackEvent('SOI/yes');">
                Jetzt zustimmen
                <span class="oil__button__label-2nd"></span>
            </button>
            <button class="oil__button oil__button--3rd js-optlater" data-qa="oil-NotNowButton" onClick="gaTrackEvent('SOI/no');">
                Nein, jetzt nicht
            </button>
        </div>
        </div>
    </div>
`;