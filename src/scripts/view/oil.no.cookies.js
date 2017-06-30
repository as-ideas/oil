import { CSSPrefix} from './oil.view.config.js';

export const oilNoCookiesTemplate = `
    <div class="${CSSPrefix}oil-content-overlay" data-qa="oil-nocookies">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <h1 class="${CSSPrefix}oil__heading">
                Um unsere Services bestmöglich erbringen zu können, müssen in deinem Browser Cookies aktiviert sein.
            </h1>
            <p class="${CSSPrefix}oil__intro-txt">
                Bitte aktiviere Cookies in den Einstellungen deines Browsers. 
                So kannst du in 
                <a href="https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en-GB" 
                    class="${CSSPrefix}oil__intro-txt--link" 
                    target="_blank"
                >
                    Google Chrome
                </a>oder 
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" 
                    class="${CSSPrefix}oil__intro-txt--link" 
                    target="_blank"
                >
                    Firefox
                </a>Cookies aktivieren. 
            </p>
        </div>
    </div>
`;
