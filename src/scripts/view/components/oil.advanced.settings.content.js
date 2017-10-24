import { CSSPrefix } from './../oil.view.config.js';

/**
 * Returns html content for advanced settings snippit
 */

export const advancedSettingsSnippet = () => {
    return `
              <div class="${CSSPrefix}oil-l-row">
                <div id="${CSSPrefix}slider-range" class="${CSSPrefix}slider-wrapper"></div>
                <div class="${CSSPrefix}slider-desc">
                  <div id="${CSSPrefix}slider-essential-title" class="${CSSPrefix}slider-inactive ">
                    <div class="${CSSPrefix}slider-option-title">Erforderliche Cookies</div>
                    <div class="${CSSPrefix}slider-option-verbose">Diese Cookies sind für die grundlegenden Funktionen der Website erforderlich.</div>
                  </div>
                  <div id="${CSSPrefix}slider-functional-title" class="${CSSPrefix}slider-inactive">
                    <div class="${CSSPrefix}slider-option-title">Funktionelle Cookies</div>
                    <div class="${CSSPrefix}slider-option-verbose">Diese Cookies ermöglichen uns die Analyse der Website-Nutzung, damit wir deren Leistung messen und verbessern können.</div>
                  </div>
                  <div id="${CSSPrefix}slider-advertising-title" class="${CSSPrefix}slider-inactive">
                    <div class="${CSSPrefix}slider-option-title">Marketing-Cookies</div>
                    <div class="${CSSPrefix}slider-option-verbose">Diese Cookies werden von Werbeagenturen verwendet, um Ihnen Werbung zu unterbreiten, die für Ihre Interessen relevant ist.</div>
                  </div>
                </div>
              </div>
`;
}
