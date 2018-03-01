import { CSSPrefix } from './oil.view.config.js';
import { OIL_LABELS } from '../userview_constants.js'
import {
  getLabel
} from './../userview_config.js';

export function oilNoCookiesTemplate() {
  return `
    <div class="${CSSPrefix}oil-content-overlay oil-nocookies" data-qa="oil-nocookies">
        <div class="${CSSPrefix}oil-l-wrapper-layout-max-width">
            <div class="${CSSPrefix}oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING)}
            </div>
            <p class="${CSSPrefix}oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT)}
            </p>
        </div>
    </div>
`
}
