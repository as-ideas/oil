import { privacyPageSnippet } from './components/oil.privacy.page';
import { POIButtonSnippet } from './components/oil.poi.button';

export const oilDefaultTemplate = `
    <div class="oil-expanded" data-qa="oil-full">
        <div class="oil-content-overlay">
        <h1 class="oil__heading">
            Um unsere Dienste für Sie noch besser zu machen, brauchen wir ihr Einverständnis.
        </h1>
        <p class="oil__intro-text">
            Nach der neuen EU Datenschutzgesetzgebung müssen Sie zustimmen, wenn wir ihre Daten erheben und weiter verarbeiteten wollen.
            Wir nutzen ihre Daten, um für Sie maßgeschneiderte journalistische Inhalte zu erstellen, zielgenauerere Werbung auszuspielen oder 
            unsere Services allgemein zu bewerten. 
            ${privacyPageSnippet()}
        </p>
        <div class="oil__button-row">

            ${POIButtonSnippet()}

            <button class="oil__button oil__button--2nd js-optin" data-qa="oil-YesButton">
                Jetzt zustimmen
                <span class="oil__button__label-2nd">
                    Nur für diese Seite
                </span>
            </button>
            <button class="oil__button oil__button--3rd js-optlater" data-qa="oil-NotNowButton">
                Nein, jetzt nicht
            </button>
        </div>
        </div>
    </div>
`;
