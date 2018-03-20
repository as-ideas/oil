import {
    getLabel
} from '../userview/userview_config.js';
import {OIL_LABELS} from '../userview/userview_constants';
import {DATA_CONTEXT_BACK, DATA_CONTEXT_YES, EVENT_NAME_BACK_TO_MAIN, OIL_GLOBAL_OBJECT_NAME} from '../core/core_constants';
import './poi.group.scss';
import { setGlobalOilObject, getGlobalOilObject } from '../core/core_utils.js';

/**
 * OIL SOI will be only shown, when there is no POI on the advanced settings
 * Returned element is used to ignore Oil completely
 */
const listSnippet = (list) => {
    let listWrapped = list.map((element) => {
        if (typeof element === 'object') {
            return `<div class="as-oil-third-party-list-element">
                <svg class='as-oil-icon-plus' width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.675 4.328H10v1.344H5.675V10h-1.35V5.672H0V4.328h4.325V0h1.35z" fill="#0068FF" fill-rule="evenodd" fill-opacity=".88"/>
                </svg>
                <svg class='as-oil-icon-minus' style='display: none;' width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h10v1.5H0z" fill="#3B7BE2" fill-rule="evenodd" opacity=".88"/>
                </svg>
                <span class='as-oil-third-party-name' onclick='${OIL_GLOBAL_OBJECT_NAME}._toggleViewElements(this)'>${element.name}</span>
                <div class='as-oil-third-party-toggle-part' style='display: none;'>
                <p class='as-oil-third-party-description' >${element.description}</p>
                  <div class='as-oil-third-party-link'>${element.link}</div>
                </div>
              </div>`;
        } else {
            return `<div>${element}</div>`;
        }
    });
    return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
};

function toggleViewElements(element) {
    let iconMinus = element.previousElementSibling;
    let iconPlus = element.previousElementSibling.previousElementSibling;
    let descriptionPart = element.nextElementSibling;

    const styleDisplayInlineBlock = 'display: inline-block; animation: fadein 0.5s';
    const styleDisplayNone = 'display: none';

    if (descriptionPart.style.display === 'none') {
        descriptionPart.setAttribute('style', 'display: block; animation: fadein 0.5s');
        iconMinus.setAttribute('style', styleDisplayInlineBlock);
        iconPlus.setAttribute('style', styleDisplayNone);
    } else {
        descriptionPart.setAttribute('style', styleDisplayNone);
        iconMinus.setAttribute('style', styleDisplayNone);
        iconPlus.setAttribute('style', styleDisplayInlineBlock);
    }
}

setGlobalOilObject('_toggleViewElements',toggleViewElements);

function attachCssToHtmlAndDocument() {
    if (window.matchMedia && window.matchMedia('(max-width: 600px)').matches) {
        setGlobalOilObject('oilCache', {
          documentElementStyle: document.documentElement.getAttribute('style'),
          bodyStyle: document.body.getAttribute('style'),
          remove: removeCssFromHtmlAndDocument
        });

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
    let oilCache = getGlobalOilObject('oilCache');
    if (oilCache) {
        document.documentElement.setAttribute('style', oilCache.documentElementStyle);
        document.body.setAttribute('style', oilCache.bodyStyle);
    }

    setGlobalOilObject('oilCache', undefined);
}

export function oilListTemplate(list) {
    attachCssToHtmlAndDocument();
    return `
<div class="as-oil-content-overlay as-oil-poi-group-list-wrapper" data-qa="oil-poi-list">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT)}
            </p>
            ${listSnippet(list)}
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
    </div>`
}
