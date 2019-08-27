import '../../../styles/cpc_tabs.scss';
import { OIL_LABELS } from '../userview_constants';
import { forEach } from '../userview_modal';
import { getLabel, getLabelWithDefault } from '../userview_config';
import { getCustomPurposes, getCustomVendorListUrl } from '../../core/core_config';
import { JS_CLASS_BUTTON_OPTIN, OIL_GLOBAL_OBJECT_NAME } from '../../core/core_constants';
import { getCustomVendorList, getPurposes, getVendorList, getVendorsToDisplay } from '../../core/core_vendor_lists';
import { BackButton, YesButton } from './components/oil.buttons';
import { setPendingPurpose } from '../../core/core_pending_purposes';

export function oilAdvancedSettingsTemplate() {
  return `
    <div id="as-oil-cpc" class="as-oil-content-overlay" data-qa="oil-cpc-overlay">
      ${oilAdvancedSettingsInlineTemplate()}
    </div>
  `;
}

export function oilAdvancedSettingsInlineTemplate() {
  return `
    <div class="as-oil-l-wrapper-layout-max-width as-oil-tabs-cpc__wrapper">
      <div class="as-oil-tabs-cpc__headline as-oil-center">
        ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_HEADING)}
      </div>
      <p class="as-oil-center as-oil-margin-top">
        ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_TEXT)}
      </p>
      <hr/>
      ${BackButton()}
      ${ContentSnippet()}
    </div>
  `;
}

export function attachCpcHandlers() {
  forEach(document.querySelectorAll('.as-js-purpose-slider'), (domNode) => {
    domNode && domNode.addEventListener('change', event => toggleFeatureTextsMarks(event.target || event.srcElement), false);
  });
  forEach(document.querySelectorAll('.as-js-tab-label'), (domNode) => {
    domNode && domNode.addEventListener('click', event => toggleTab(event.target || event.srcElement), false);
  });
  const thirdPartiesLinkDomNode = document.getElementById('as-js-third-parties-link');
  thirdPartiesLinkDomNode && thirdPartiesLinkDomNode.addEventListener('click', toggleThirdPartyVisibility, false);
}

const ContentSnippet = () => {
  return `
    <div class="as-oil-tabs-cpc__purpose-description as-oil-center as-oil-margin-top" id="as-oil-cpc-purposes">
      ${getLabel(OIL_LABELS.ATTR_LABEL_CPC_PURPOSE_DESC)}
    </div>
    <div class="as-oil-cpc__middle">
      ${buildPurposeEntries(getPurposes().concat(getCustomPurposes()))}
      <div class="as-oil-margin-top">
        <div class="as-oil-tabs-cpc__third-parties-link" id="as-js-third-parties-link"><span>i</span>${getLabel(OIL_LABELS.ATTR_LABEL_THIRD_PARTY)}</a></div>

        <div id="as-js-third-parties-list" class="as-oil-tabs-cpc__third-parties-list" style="display: none;">
           ${buildVendorEntries()}

          ${IsCustomVendorsEnables() ? `
          <div id="as-oil-custom-third-parties-list">
            ${buildCustomVendorEntries()}
          </div>
           ` : ''}
        </div>


      </div>
    </div>
    <hr>
      <div class="as-oil-l-item">
        ${YesButton(`as-oil__btn-optin ${JS_CLASS_BUTTON_OPTIN}`)}
      </div>
  `;
};

const PurposeFeatureTextsSnippet = (featureText) => {
  return `
    <li>
      <span class="checkmark checkmark-off"></span><span>${featureText}</span>
    </li>
  `;
};

const PurposeTabLabelElement = ({id, label}) => {
  return `
    <span data-id="${id}" class="as-js-tab-label ${id === 1 ? 'as-oil-tabs-cpc__purpose-label-active' : 'as-oil-tabs-cpc__purpose-label-inactive'}">${label}</span>
  `;
};

const PurposeTabContentSnippet = ({id, text, featureTexts, isSelected}) => {
  return `
    <section id="as-js-tab-section-${id}" class="as-oil-margin-top as-js-tab-section">
      <div>
        <p>${text}</p>
        <label class="as-oil-tabs-cpc__switch">
          <input data-id="${id}" id="as-js-purpose-slider-${id}" class="as-js-purpose-slider" type="checkbox" name="oil-cpc-purpose-${id}" value="${isSelected}">
          <span class="as-oil-cpc__slider"></span>
        </label>
      </div>
      <div class="as-oil-tabs-cpc__purpose-feature-texts as-oil-margin-top" id="purpose-feature-texts-${id}">
        ${featureTexts.length > 0 ? buildPurposeFeatureTextsSnippet(featureTexts) : ''}
      </div>
    </section>
  `
};
const buildPurposeFeatureTextsSnippet = (featureTexts) => {
  return `
    <ul>
      ${featureTexts.map(featureText => PurposeFeatureTextsSnippet(featureText)).join('')}
    </ul>
  `;
};

const buildPurposeTabLabelElements = (purposes) => {
  return purposes.map(purpose => PurposeTabLabelElement({
    id: purpose.id,
    label: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_text`, purpose.name || `Error: Missing text for purpose with id ${purpose.id}!`)
  })).join('');
};

const buildPurposeTabContentElements = (purposes) => {
  return purposes.map(purpose => PurposeTabContentSnippet({
    id: purpose.id,
    text: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_desc`, purpose.description || ''),
    featureTexts: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_features`, []),
    isSelected: false
  })).join('');
};

const formatPurposeId = (id) => {
  return id < 10 ? `0${id}` : id;
};

const buildPurposeEntries = (purposes) => {
  return `
    <div class="as-oil-tabs-cpc__purpose-labels as-oil-margin-top">
      ${buildPurposeTabLabelElements(purposes)}
    </div>
    <div class="as-oil-tabs-cpc__purpose-text as-oil-margin-top">
      ${buildPurposeTabContentElements(purposes)}
    </div>
  `;
};

const buildVendorEntries = () => {
  let vendorList = getVendorList();

  if (vendorList && !vendorList.isDefault) {
    let listWrapped = getVendorsToDisplay().map((element) => {
      if (element.name) {
        return buildVendorEntry(element);
      }
    });
    return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
  } else {
    return 'Missing vendor list! Maybe vendor list retrieval has failed! Please contact web administrator!';
  }
};

const buildCustomVendorEntries = () => {
  let vendorList = getCustomVendorList();

  if (vendorList && !vendorList.isDefault && vendorList.vendors) {
    let listWrapped = vendorList.vendors.map((element) => {
      if (element.name) {
        return buildVendorEntry(element);
      }
    });
    return `<div class="as-oil-poi-group-list">${listWrapped.join('')}</div>`;
  } else {
    return 'Missing custom vendor list! Maybe custom vendor list retrieval has failed! Please contact web administrator!';
  }
};

const IsCustomVendorsEnables = () => {
  return !!getCustomVendorListUrl();
};

const buildVendorEntry = (vendor) => {
  return `
          <div class="as-oil-third-party-list-element">
            <span onclick='${OIL_GLOBAL_OBJECT_NAME}._toggleViewElements(this)'>
                <svg class='as-oil-icon-plus' width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.675 4.328H10v1.344H5.675V10h-1.35V5.672H0V4.328h4.325V0h1.35z" fill="#0068FF" fill-rule="evenodd" fill-opacity=".88"/>
                </svg>
                <svg class='as-oil-icon-minus' style='display: none;' width="10" height="5" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h10v1.5H0z" fill="#3B7BE2" fill-rule="evenodd" opacity=".88"/>
                </svg>
                <span class='as-oil-third-party-name'>${vendor.name}</span>
            </span>
            <div class='as-oil-third-party-toggle-part' style='display: none;'>
              <a class='as-oil-third-party-link' href='${vendor.policyUrl}'>${vendor.policyUrl}</a>
            </div>
          </div>
        `;
};


function toggleThirdPartyVisibility() {
  let view = document.getElementById('as-js-third-parties-list');
  view.style.display = view.style.display === 'none' ? 'block' : 'none';
}

function toggleFeatureTextsMarks(checkbox) {
  let id = checkbox.getAttribute('data-id');
  let listElement = document.getElementById(`purpose-feature-texts-${id}`);
  let checkmarkElements = listElement.getElementsByClassName('checkmark');

  setPendingPurpose(id, checkbox.checked);

  if (checkbox.checked) {
    for (let i = 0; i < checkmarkElements.length; i++) {
      checkmarkElements[i].classList.remove('checkmark-off');
      checkmarkElements[i].classList.add('checkmark-on');
    }
  } else {
    for (let i = 0; i < checkmarkElements.length; i++) {
      checkmarkElements[i].classList.remove('checkmark-on');
      checkmarkElements[i].classList.add('checkmark-off');
    }
  }
}

function toggleTab(tab) {
  let tabLabelElements = document.getElementsByClassName('as-js-tab-label');
  for (let i = 0; i < tabLabelElements.length; i++) {
    tabLabelElements[i].classList.remove('as-oil-tabs-cpc__purpose-label-active');
    tabLabelElements[i].classList.add('as-oil-tabs-cpc__purpose-label-inactive');
  }
  tab.classList.remove('as-oil-tabs-cpc__purpose-label-inactive');
  tab.classList.add('as-oil-tabs-cpc__purpose-label-active');

  let tabSectionElements = document.getElementsByClassName('as-js-tab-section');
  for (let i = 0; i < tabSectionElements.length; i++) {
    tabSectionElements[i].style.display = 'none';
  }

  let id = tab.getAttribute('data-id');
  let sectionElement = document.getElementById(`as-js-tab-section-${id}`);
  sectionElement.style.display = 'block';
}

