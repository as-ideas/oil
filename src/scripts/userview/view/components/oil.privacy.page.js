import {CSSPrefix} from './../oil.view.config.js';
import {getPrivacyPageUrl, getLabelButtonPrivacy} from '../../userview_config.js';
import {DATAQA_PRIVACY_PAGE} from '../../../core/core_constants.js';

/**
 * Returns html content for privacy page link
 */

export const privacyPageSnippet = () => {
  let privacyPage = getPrivacyPageUrl();
  if (privacyPage) {
    return `
            <a href="${privacyPage}" 
                class="${CSSPrefix}oil__intro-txt--link"
                data-qa="${DATAQA_PRIVACY_PAGE}"
                target="_blank"
            >${getLabelButtonPrivacy()}</a>`;
  }
  return '';
};
