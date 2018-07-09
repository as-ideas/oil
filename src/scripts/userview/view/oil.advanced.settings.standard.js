import '../../../styles/cpc_standard.scss';
import { OIL_LABELS } from '../userview_constants.js';
import { forEach } from '../userview_modal.js';
import { getLabel, getLabelWithDefault, getTheme } from '../userview_config.js';
import { getCustomPurposes } from '../../core/core_config.js';
import { DATA_CONTEXT_BACK, DATA_CONTEXT_YES, OIL_GLOBAL_OBJECT_NAME } from '../../core/core_constants.js';
import { setGlobalOilObject } from '../../core/core_utils.js';
import { getPurposes, getVendorList, getVendors } from '../../core/core_vendor_information.js';


const CLASS_NAME_FOR_ACTIVE_MENU_SECTION = 'as-oil-standard-cpc__category-link--active';

const PurposeContainerSnippet = ({id, header, text, value}) => {
  return `
<div class="as-oil-standard-cpc__purpose">
    <div class="as-oil-standard-cpc__purpose-container">
        <div class="as-oil-standard-cpc__purpose-header">${header}</div>
        <div class="as-oil-standard-cpc__purpose-text">${text}</div>
        <label class="as-oil-standard-cpc__switch">
            <input data-id="${id}" id="as-js-purpose-slider-${id}" class="as-js-purpose-slider" type="checkbox" name="oil-cpc-purpose-${id}" value="${value}"/>
            <span class="as-oil-cpc__status"></span>
            <span class="as-oil-cpc__slider"></span>
        </label>
    </div>
</div>`
};

const buildVendorEntries = () => {
  let vendorList = getVendorList();

  if (vendorList && !vendorList.isDefault) {
    let listWrapped = getVendors().map((element) => {
      if (element.name) {
        return `
          <div class="as-oil-third-party-list-element">
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
                <a class='as-oil-third-party-link' href='${element.policyUrl}'>${element.policyUrl}</a>
              </div>
            </div>
          `;
      }
    });
    return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
  } else {
    return 'Missing vendor list! Maybe vendor list retrieval has been failed! Please contact web administrator!';
  }
};

const BackButtonSnippet = () => {
  return `
<button class="as-oil-back-button as-js-oilback" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
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

const ActivateButtonSnippet = () => {
  return `
  <div class="as-oil-standard-cpc__activation-buttons">
        <span class="as-js-btn-deactivate-all as-oil__btn-grey">${getLabel(OIL_LABELS.ATTR_LABEL_CPC_DEACTIVATE_ALL)}</span>
        <span class="as-js-btn-activate-all as-oil__btn-blue">${getLabel(OIL_LABELS.ATTR_LABEL_CPC_ACTIVATE_ALL)}</span>
      </div>
  `
};

const buildPurposeEntries = (list) => {
  return list.map(element => PurposeContainerSnippet({
    id: element.id,
    header: getLabelWithDefault(`label_cpc_purpose_0${element.id}_text`, element.name || `Error: Missing text for purpose with id ${element.id}!`),
    text: getLabelWithDefault(`label_cpc_purpose_0${element.id}_desc`, element.description || ''),
    value: false
  })).join('');
};

const ContentSnippet = () => {
  return `
<div data-qa="cpc-snippet" class="as-oil-l-row as-oil-standard-cpc__content">
    <div class="as-oil-standard-cpc__left">
        <a href="#as-oil-cpc-purposes" onclick='${OIL_GLOBAL_OBJECT_NAME}._switchLeftMenuClass(this)' class="as-oil-standard-cpc__category-link ${CLASS_NAME_FOR_ACTIVE_MENU_SECTION}">
          ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC)}
        </a>
        <a href="#as-oil-cpc-third-parties" onclick='${OIL_GLOBAL_OBJECT_NAME}._switchLeftMenuClass(this)' class="as-oil-standard-cpc__category-link">
          ${getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY)}  
        </a>
    </div>
    <div class="as-oil-cpc__middle as-js-purposes">
        <div class="as-oil-standard-cpc__section-title" id="as-oil-cpc-purposes">
            ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC)}
        </div>
        ${buildPurposeEntries(getPurposes())}
        ${buildPurposeEntries(getCustomPurposes())}
        <div class="as-oil-standard-cpc__section-title" id="as-oil-cpc-third-parties">
            ${getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY)}
        </div>
       <div id="as-js-third-parties-list">
         ${buildVendorEntries()}
       </div>
    </div>
    <div class="as-oil-standard-cpc__right">
     <div class="as-oil-l-row as-oil-l-buttons-${getTheme()}">
      <div class="as-oil-l-item">
        <button class="as-oil__btn-optin as-js-optin" data-context="${DATA_CONTEXT_YES}" data-qa="oil-YesButton">
          ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_YES)}
        </button>
      </div>
    </div>
  </div>
</div>`;
};

export function oilAdvancedSettingsInlineTemplate() {
  return `<div class="as-oil-l-wrapper-layout-max-width as-oil-standard-cpc__wrapper">
    <div class="as-oil__heading">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_HEADING)}
    </div>
    <p class="as-oil__intro-txt">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_TEXT)}
    </p>
    ${ActivateButtonSnippet()}
    ${BackButtonSnippet()}
    ${ContentSnippet()}
  </div>`
}

export function oilAdvancedSettingsTemplate() {
  return `
  <div id="as-oil-cpc" class="as-oil-content-overlay" data-qa="oil-cpc-overlay">
    ${oilAdvancedSettingsInlineTemplate()}
  </div>`
}

export function attachCpcHandlers() {
  forEach(document.querySelectorAll('.as-js-btn-activate-all'), (domNode) => {
    domNode && domNode.addEventListener('click', activateAll, false);
  });
  forEach(document.querySelectorAll('.as-js-btn-deactivate-all'), (domNode) => {
    domNode && domNode.addEventListener('click', deactivateAll, false);
  });
}

function activateAll() {
  let elements = document.querySelectorAll('.as-js-purpose-slider');
  forEach(elements, (domNode) => {
    domNode && (domNode.checked = true);
  });
}


function deactivateAll() {
  forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
    domNode && (domNode.checked = false);
  });
}

function switchLeftMenuClass(element) {
  let allElementsInMenu = element.parentNode.children;

  forEach(allElementsInMenu, (el) => {
    el.className = el.className.replace(new RegExp(`\\s?${CLASS_NAME_FOR_ACTIVE_MENU_SECTION}\\s?`, 'g'), '');
  });
  element.className += ` ${CLASS_NAME_FOR_ACTIVE_MENU_SECTION}`;
}

setGlobalOilObject('_switchLeftMenuClass', switchLeftMenuClass);
