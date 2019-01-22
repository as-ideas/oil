import { getLabel, getTheme } from '../userview/userview_config.js';
import { OIL_LABELS } from '../userview/userview_constants.js';
import { OIL_GLOBAL_OBJECT_NAME, JS_CLASS_BUTTON_OPTIN } from '../core/core_constants.js';
import './poi.group.scss';
import { getGlobalOilObject, setGlobalOilObject } from '../core/core_utils';
import { getGroupList } from './poi.group.list';
import { loadVendorList, getVendorsToDisplay } from '../core/core_vendor_information';
import { BackButton, YesButton } from '../userview/view/components/oil.buttons.js';

export function renderOilGroupListTemplate(renderMethod) {
  getGroupList()
    .then((groupList) => {
      renderMethod(oilGroupListTemplate(groupList))
    });
}

export function renderOilThirdPartyListTemplate(renderMethod) {
  loadVendorList()
    .then(() => {
      // HINT: The GroupList is needed if POI is enabled, because it contains the BLACKLIST/WHITELIST of vendors
      // it will load nothing, if POI is disabled
      getGroupList().then(() => {
        renderMethod(oilThirdPartyListTemplate(getVendorsToDisplay()))
      })
    });
}

export function oilGroupListTemplate(groupList) {
  return oilListTemplate(groupList, getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_HEADING), getLabel(OIL_LABELS.ATTR_LABEL_POI_GROUP_LIST_TEXT));
}

export function oilThirdPartyListTemplate(thirdPartyList) {
  return oilListTemplate(thirdPartyList, getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_HEADING), getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY_LIST_TEXT));
}

/**
 * OIL SOI will be only shown, when there is no POI on the advanced settings
 * Returned element is used to ignore Oil completely
 */
export const listSnippet = (list) => {
  if (!list) {
    list = [];
  }
  let listWrapped = list.map((element) => {
    if (typeof element === 'object') {
      return `<div class="as-oil-third-party-list-element">
                <span onclick='${OIL_GLOBAL_OBJECT_NAME}._toggleViewElements(this)'>
                    <svg class='as-oil-icon-plus' width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.675 4.328H10v1.344H5.675V10h-1.35V5.672H0V4.328h4.325V0h1.35z" fill="#0068FF" fill-rule="evenodd" fill-opacity=".88"/>
                    </svg>
                    <svg class='as-oil-icon-minus' style='display: none;' width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0h10v1.5H0z" fill="#3B7BE2" fill-rule="evenodd" opacity=".88"/>
                    </svg>
                    <span class='as-oil-third-party-name'>${element.name}</span>
                </span>
                <div class='as-oil-third-party-toggle-part' style='display: none;'>
                <p class='as-oil-third-party-description' >${element.description}</p>
                  <div class='as-oil-third-party-link'>${element.link}</div>
                </div>
              </div>`;
    } else {
      return `<div class="as-oil-poi-group-list-element">${element}</div>`;
    }
  });
  return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
};

function toggleViewElements(element) {
  let iconMinus = element.children[0];
  let iconPlus = element.children[1];
  let descriptionPart = element.nextElementSibling;

  const styleDisplayInlineBlock = 'display: inline-block; animation: fadein 0.5s';
  const styleDisplayNone = 'display: none';

  if (descriptionPart.style.display === 'none') {
    descriptionPart.setAttribute('style', 'display: block; animation: fadein 0.5s');
    iconPlus.setAttribute('style', styleDisplayInlineBlock);
    iconMinus.setAttribute('style', styleDisplayNone);
  } else {
    descriptionPart.setAttribute('style', styleDisplayNone);
    iconPlus.setAttribute('style', styleDisplayNone);
    iconMinus.setAttribute('style', styleDisplayInlineBlock);
  }
}

setGlobalOilObject('_toggleViewElements', toggleViewElements);

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

    if (event && event.data && (eventDataContains('oil_'))) {
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

function oilListTemplate(list, heading, text) {
  attachCssToHtmlAndDocument();
  return `<div class="as-oil-fixed">
    <div class="as-oil-content-overlay as-oil-poi-group-list-wrapper" data-qa="oil-poi-list">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${heading}
            </div>
            <p class="as-oil__intro-txt">
                ${text} 
            </p>
            ${listSnippet(list)}
            ${BackButton()}
        </div>
        <div class="as-oil-l-row as-oil-l-buttons-${getTheme()}">
            <div class="as-oil-l-item">
              ${YesButton(`as-oil__btn-optin ${JS_CLASS_BUTTON_OPTIN}`)}
            </div>
        </div>
    </div>
</div>`
}
