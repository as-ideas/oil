import { getLabel } from '../../userview_config.js';
import { OIL_LABELS } from '../../userview_constants.js'
import {DATAQA_PRIVACY_PAGE} from '../../../core/core_constants.js';

/**
 * Returns html content for privacy page link
 */

export const privacyPageSnippet = () => {
  let privacyPage = getLabel(OIL_LABELS.ATTR_PRIVACY_PAGE_URL);
  if (privacyPage) {
    return `
            <a href="${privacyPage}" 
                class="as-oil__intro-txt--link"
                data-qa="${DATAQA_PRIVACY_PAGE}"
                target="_blank"
            >${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_PRIVACY)}</a>`;
  }
  return '';
};
