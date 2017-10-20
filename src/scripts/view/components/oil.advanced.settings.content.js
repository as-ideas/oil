import { CSSPrefix } from './../oil.view.config.js';

/**
 * Returns html content for advanced settings snippit
 */

export const advancedSettingsSnippet = () => {
    return `
              <div class="${CSSPrefix}slider-wrapper">
                <input type="range" min="1" max="3" value="3" step="1">
              </div>
`;
}
