import { OIL_LABELS } from '../../userview_constants';
import { getLabel } from '../../userview_config';
import { DATA_CONTEXT_YES,
DATA_CONTEXT_CANCEL,
DATA_CONTEXT_PROCEED,
DATA_CONTEXT_BACK,
DATA_CONTEXT_ADVANCED_SETTINGS,
JS_CLASS_BUTTON_OILBACK,
JS_CLASS_BUTTON_PROCEED,
JS_CLASS_BUTTON_CANCEL,
JS_CLASS_BUTTON_ADVANCED_SETTINGS } from '../../../core/core_constants.js';

export const YesButton = (classes) => {
  return `
    <button class="${classes}" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
      ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES)}
    </div>
  `
}

export const ProceedButton = () => {
  return `
    <button class="as-oil__btn-proceed ${JS_CLASS_BUTTON_PROCEED}" data-context="${DATA_CONTEXT_PROCEED}" data-qa="oil-ProceedButton">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_PROCEED)}
    </div>
  `
}

export const CancelButton = () => {
  return `
    <button class="as-oil__btn-cancel ${JS_CLASS_BUTTON_CANCEL}" data-context="${DATA_CONTEXT_CANCEL}" data-qa="oil-CancelButton">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_OPTOUT_CANCEL)}
    </div>
  `
}

export const BackButton = () => {
  return `
    <button class="as-oil-back-button ${JS_CLASS_BUTTON_OILBACK}" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
      <span class="as-oil-back-button__text">
        ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
      </span>
      <svg class="as-oil-back-button__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fill-rule="evenodd">
          <circle fill="#757575" cx="11" cy="11" r="11"/>
          <path d="M15.592 14.217a.334.334 0 0 1 .098.245c0 .098-.033.18-.098.246l-.928.908a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098L11 12.4l-3.2 3.216a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098l-.928-.908a.334.334 0 0 1-.098-.246c0-.098.033-.18.098-.245L9.632 11 6.408 7.808c-.163-.164-.163-.327 0-.491l.904-.933a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098L11 9.576l3.2-3.192a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098l.904.933c.163.164.163.32 0 .466l-3.224 3.192 3.224 3.242z"
                fill="#FFF" opacity=".88"/>
        </g>
      </svg>
    </button>
  `
};


/**
 * OIL advanced settings button
 */
export const AdvancedSettingsButton = (advancedSettings) => {
  return advancedSettings === true ? (
    `
        <button class="as-oil__btn-cpc ${JS_CLASS_BUTTON_ADVANCED_SETTINGS}" data-context="${DATA_CONTEXT_ADVANCED_SETTINGS}" data-qa="oil-AdvancedSettingsButton">
            ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_ADVANCED_SETTINGS)}
        </button>
      `
  ) : '';
};
