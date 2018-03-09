import {
  getLabel
} from '../userview/userview_config.js';
import { OIL_LABELS } from '../userview/userview_constants';
import { DATA_CONTEXT_BACK, DATA_CONTEXT_YES, EVENT_NAME_BACK_TO_MAIN } from '../core/core_constants';
import './poi.group.scss';

/**
 * OIL SOI will be only shown, when there is no POI on the advanced settings
 * Returned element is used to ignore Oil completely
 */
const companyListSnippet = (companyList) => {
  let companyListWrapped = companyList.map((element) => {
    return `<div>${element}</div>`;
  });

  return `<div class="as-oil-poi-group-list">
           ${companyListWrapped.join('')}
          </div>`;
};

function attachCssToHtmlAndDocument() {
  if (window.matchMedia && window.matchMedia('(max-width: 600px)').matches) {
    window.oilCache = {
      documentElementStyle: document.documentElement.getAttribute('style'),
      bodyStyle: document.body.getAttribute('style'),
      remove: removeCssFromHtmlAndDocument
    };

    const styles = 'overflow: hidden; position: relative; height: 100%;';
    document.documentElement.setAttribute('style', styles);
    document.body.setAttribute('style', styles);

    attachRemoveListener();
  }
}

function attachRemoveListener() {
  // Cross browser event handler definition
  let eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  let deventMethod = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
  let messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
  let eventer = window[eventMethod];
  let deventer = window[deventMethod];


  // Callback to be executed when event is fired
  function receiveMessage(event) {
    function eventDataContains(str) {
      return JSON.stringify(event.data).indexOf(str) !== -1;
    }

    if (event && event.data && (eventDataContains(EVENT_NAME_BACK_TO_MAIN))) {
      removeCssFromHtmlAndDocument();
      deventer(messageEvent, receiveMessage, false);
    }
  }

  // Register event handler
  eventer(messageEvent, receiveMessage, false);
}

function removeCssFromHtmlAndDocument() {
  console.info('removeCssFromHtmlAndDocument');
  if (window.oilCache) {
    document.documentElement.setAttribute('style', window.oilCache.documentElementStyle);
    document.body.setAttribute('style', window.oilCache.bodyStyle);
  }

  window.oilCache = undefined;
}

export function oilCompanyListTemplate(companyList) {
  attachCssToHtmlAndDocument();

  return `
<div class="as-oil-content-overlay as-oil-poi-group-list-wrapper" data-qa="oil-company-list">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT)}
            </p>
            ${companyListSnippet(companyList)}
            <button class="as-oil__btn-loi as-js-oilback" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
                <span class="as-js-oilback__text">${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}</span>
                <svg class="as-js-oilback__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fill-rule="evenodd">
                        <circle fill="#757575" cx="11" cy="11" r="11"/>
                        <path d="M15.592 14.217a.334.334 0 0 1 .098.245c0 .098-.033.18-.098.246l-.928.908a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098L11 12.4l-3.2 3.216a.303.303 0 0 1-.22.098.33.33 0 0 1-.244-.098l-.928-.908a.334.334 0 0 1-.098-.246c0-.098.033-.18.098-.245L9.632 11 6.408 7.808c-.163-.164-.163-.327 0-.491l.904-.933a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098L11 9.576l3.2-3.192a.473.473 0 0 1 .244-.098.33.33 0 0 1 .244.098l.904.933c.163.164.163.32 0 .466l-3.224 3.192 3.224 3.242z"
                              fill="#FFF" opacity=".88"/>
                    </g>
                </svg>
            </button>
        </div>
        <div class="as-oil-l-row as-oil-l-buttons">
            <div class="as-oil-l-item">
                <button class="as-oil__btn-soi as-js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
                    ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES)}
                </button>
            </div>
        </div>
    </div>
`
}
