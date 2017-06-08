import { getConfiguration } from './../../config.js';
import { OIL_CONFIG } from './../../constants.js';

let config = getConfiguration();
let privacyPage = config[OIL_CONFIG.ATTR_PRIVACY_PAGE_URL];


/**
 * Returns html content for privacy page link
 */

export const privacyPageSnippet = () => {
    if (privacyPage) {
        return `
            <a href="${privacyPage}" 
                class="oil__intro-text--secondary-mini"
                target="_blank"
            >
                Mehr erfahren
            </a>
        `;
    }
    return '';
}