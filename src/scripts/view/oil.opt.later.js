import { privacyPageSnippet } from './components/oil.privacy.page.opt.later';
import { POIButtonSnippet } from './components/oil.poi.button.opt.later';
import { oilHeading, oilIntroText} from './oil.text.constants.js';

export const oilOptLaterTemplate =
    `
    <div class="oil-minified" data-qa="oil-optlater">
        <div class="oil-content-overlay">
            <div class="oil-l-container">
                <h1 class="oil__heading-mini">
                    ${oilHeading()}
                </h1>
                <p class="oil__intro-text-mini">
                    ${oilIntroText()}
                </p>
            </div>
            <div class="oil-l-container">
                
                ${POIButtonSnippet()}

                <div class="oil-btn-group-mini">
                    <button class="oil__btn-mini oil__btn-mini--2nd js-optin" data-qa="oil-small-YesButton">
                        Jetzt zustimmen
                    </button>
                    <div class="oil__btn-mini-label"></div>
                </div>
            </div>
        </div>
    </div>
`;
