import { getConfiguration } from './../../config.js';
import { OIL_CONFIG } from './../../constants.js';
import { logInfo } from './../../log';
import { CSSPrefix } from './../oil.view.config.js';

let config = getConfiguration();
let privacyPage = config[OIL_CONFIG.ATTR_PRIVACY_PAGE_URL];


/**
 * Returns html content for privacy page link
 */

export const privacyPageSnippet = () => {
    // Log a message to inform developers that they most likely forgot to configure the privacy page
    if (!privacyPage) logInfo('You don\'t have specified a link to your privacy page. Check the configuration section in your page and add a key "privacy_page_location" with a link to your privacy page.' );
    
    if (privacyPage) {
        return `
            <a href="${privacyPage}" 
                class="${CSSPrefix}oil__intro-txt--link"
                target="_blank"
            >Mehr erfahren</a>`;
    }
    return '';
}