import { getConfiguration } from './../../config.js';
import { OIL_CONFIG, DATAQA_PRIVACY_PAGE } from './../../constants.js';
import { logInfo } from './../../log';
import { CSSPrefix } from './../oil.view.config.js';

let config = getConfiguration();
let privacyPage = config[OIL_CONFIG.ATTR_PRIVACY_PAGE_URL];

/**
 * Returns html content for privacy page link
 */

export const privacyPageSnippet = () => {
    if (privacyPage) {
        return `
            <a href="${privacyPage}" 
                class="${CSSPrefix}oil__intro-txt--link"
                data-qa="${DATAQA_PRIVACY_PAGE}"
                target="_blank"
            >`+ config.label_button_privacy +`</a>`;
    }
    
    logInfo(`You don\'t have specified a link to your privacy page. Check the configuration section in your page and add a key "${OIL_CONFIG.ATTR_PRIVACY_PAGE_URL}" with a link to your privacy page.`);
    return '';
}