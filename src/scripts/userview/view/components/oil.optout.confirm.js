import { OIL_LABELS } from '../../userview_constants.js';
import { getLabel } from '../../userview_config.js';
import { CancelButton, YesButton } from './oil.buttons.js';

export const OptoutConfirmDialog = () => {
  return `
    <div class="as-oil-optout-confirm>
      <div class="as-oil-l-wrapper-layout-max-width">
        <div class="as-oil__heading">
          ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_HEADING)}
        </div>
        <p class="as-oil__intro-txt">
          ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_TEXT)}
        </p>
        <div class="as-oil-l-row as-oil-l-buttons">
          ${YesButton()}
          ${CancelButton()}
        </div>
      </div>
    </div>
  `;
}
