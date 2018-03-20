import { OIL_LABELS } from '../userview_constants.js'
import {
  getLabel
} from './../userview_config.js';

export function oilNoCookiesTemplate() {
  return `
    <div class="as-oil-content-overlay oil-nocookies" data-qa="oil-nocookies">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_NO_COOKIES_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_NO_COOKIES_TEXT)}
            </p>
        </div>
    </div>
`
}
