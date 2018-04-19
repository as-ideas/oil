import {OIL_LABELS} from '../userview_constants.js'
import {forEach} from '../userview_modal';
import {getLabel, getTheme} from '../userview_config.js';
import {getPoiGroupName} from '../../core/core_config';
import {logError} from '../../core/core_log';
import {DATA_CONTEXT_YES, DATA_CONTEXT_BACK} from '../../core/core_constants.js';

const PurposeContainerSnippet = ({id, header, text, value}) => {
  return `
<div class="as-oil-cpc__purpose">
    <div class="as-oil-cpc__purpose-container">
        <div class="as-oil-cpc__purpose-header">${header}</div>
        <div class="as-oil-cpc__purpose-text">${text}</div>
        <label class="as-oil-cpc__switch">
            <input id="as-js-purpose-slider-${id}" class="as-js-purpose-slider" type="checkbox" name="oil-cpc-purpose-${header}" value="${value}"/>
            <span class="as-oil-cpc__status"></span>
            <span class="as-oil-cpc__slider"></span>
        </label>
    </div>
</div>`
};

const BackButtonSnippet = () => {
  return `
<button class="as-js-oilback" data-context="${DATA_CONTEXT_BACK}" data-qa="oil-back-button">
                <span class="as-js-oilback__text">
                  ${getLabel(OIL_LABELS.ATTR_LABEL_BUTTON_BACK)}
                </span>
    <svg class="as-js-oilback__icon" width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
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
  <div class="as-oil-cpc__row-btn-all">
        <span class="as-js-btn-deactivate-all as-oil__btn-grey">${getLabel(OIL_LABELS.ATTR_LABEL_CPC_DEACTIVATE_ALL)}</span>
        <span class="as-js-btn-activate-all as-oil__btn-blue">${getLabel(OIL_LABELS.ATTR_LABEL_CPC_ACTIVATE_ALL)}</span>
      </div>
  `
};

const ContentSnippet = () => {
  return `
<div data-qa="cpc-snippet" class="as-oil-l-row as-oil-cpc__content">
    <div class="as-oil-cpc__left">
    <!--ToDo: need to implement active/not active logic-->
        <a href="#as-oil-cpc-purposes">
          <div class="as-oil-cpc__category-link as-oil-cpc__category-link--active">Purposes</div>
        </a>
        <a href="#as-oil-cpc-third-parties">
          <div class="as-oil-cpc__category-link">3rd Parties</div>   
        </a>
    </div>
    <div class="as-oil-cpc__middle">
        <div class="as-oil-cpc__row-title" id="as-oil-cpc-purposes">
            Purposes
        </div>
     
        ${PurposeContainerSnippet({
    id: '01',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_01_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_01_DESC),
    value: false
  })}
                
        ${PurposeContainerSnippet({
    id: '02',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_02_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_02_DESC),
    value: false
  })}
                          
        ${PurposeContainerSnippet({
    id: '03',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_03_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_03_DESC),
    value: false
  })}
                                                                  
        ${PurposeContainerSnippet({
    id: '04',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_04_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_04_DESC),
    value: false
  })}
                                                                                      
        ${PurposeContainerSnippet({
    id: '05',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_05_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_05_DESC),
    value: false
  })}
                                                                                                          
        ${PurposeContainerSnippet({
    id: '06',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_06_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_06_DESC),
    value: false
  })}
        
        ${PurposeContainerSnippet({
    id: '07',
    header: getLabel(OIL_LABELS.ATTR_LABEL_CPC_07_TEXT),
    text: getLabel(OIL_LABELS.ATTR_LABEL_CPC_07_DESC),
    value: false
  })}
        <div class="as-oil-cpc__row-title" id="as-oil-cpc-third-parties">
            3rd Parties
        </div>
       <div id="as-js-third-parties-list"></div>
    </div>
    <div class="as-oil-cpc__right">
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

export function oilAdvancedSettingsTemplate() {
  return `
  <div id="as-oil-cpc" class="as-oil-content-overlay as-oil-cpc-wrapper" data-qa="oil-poi-list">
    <div class="as-oil-l-wrapper-layout-max-width">
      <div class="as-oil__heading">
        ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_HEADING)}
      </div>
      <p class="as-oil__intro-txt">
        ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_TEXT)}
      </p>
      ${ActivateButtonSnippet()}
      ${BackButtonSnippet()}
      ${ContentSnippet()}
      ${getOilThirdPartiesList()}  
    </div>
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

function getOilThirdPartiesList() {
  System.import(`../../poi-list/lists/poi-info_${getPoiGroupName()}.js`)
    .then(poiList => {
      document.querySelector('#as-js-third-parties-list').innerHTML = poiList.listSnippet(poiList.thirdPartyList);
    })
    .catch((e) => {
      logError(`POI 'group ${getPoiGroupName()}' could not be loaded.`, e);
    });
  return '';
}
