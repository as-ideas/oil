import { MANAGED_TAG_IDENTIFIER, MANAGED_TAG_IDENTIFIER_ATTRIBUTE, MANAGED_TAG_PURPOSES_ATTRIBUTE } from './core_constants';
import { getSoiCookie } from './core_cookies';
import { arrayContainsArray } from './core_utils';
import { getPurposeIds } from './core_vendor_information';

export function activateDomElementsWithConsent() {
  findManagedElements()
    .filter(element => hasConsent(element, getSoiCookie()))
    .forEach(element => activateElement(element));
}

function hasConsent(element, cookie) {
  if (cookie.opt_in) {
    let allowedPurposes = cookie.consentData.getPurposesAllowed();
    let necessaryPurposes = getNecessaryPurposes(element);
    return arrayContainsArray(allowedPurposes, necessaryPurposes);
  } else {
    return false;
  }
}

function getNecessaryPurposes(element) {
  let purposesString = element.getAttribute(MANAGED_TAG_PURPOSES_ATTRIBUTE);
  return purposesString ? purposesString.split(/,\s*/) : getPurposeIds();
}

function findManagedElements() {
  let elementNodeList = document.querySelectorAll('[' + MANAGED_TAG_IDENTIFIER_ATTRIBUTE + '=\'' + MANAGED_TAG_IDENTIFIER + '\']');
  let elementArray = [];
  for (let i = 0; i < elementNodeList.length; i++) {
    elementArray.push(elementNodeList[i]);
  }
  return elementArray;
}

function activateElement(element) {
  if (element.tagName === 'SCRIPT') {
    activateScriptElement(element);
  } else {
    activateNonScriptElement(element);
  }
}

function activateScriptElement(element) {
  let newElement = document.createElement('script');

  for (let i = 0; i < element.attributes.length; i++) {
    let attribute = element.attributes[i];
    if (attribute.name.match(/^data-/)) {
      newElement.setAttribute(attribute.name, attribute.value);
    }
  }
  if (element.getAttribute('data-type')) {
    newElement.type = element.getAttribute('data-type');
  }
  if (element.getAttribute('data-src')) {
    newElement.src = element.getAttribute('data-src');
  }
  newElement.innerText = element.innerText;
  newElement.text = element.text;
  newElement.class = element.class;
  newElement.id = element.id;
  newElement.defer = element.defer;
  newElement.async = element.async;
  newElement.charset = element.charset;

  let parent = element.parentElement;
  parent.insertBefore(newElement, element);
  parent.removeChild(element);
}

function activateNonScriptElement(element) {
  let managedAttributes = ['href', 'src', 'title', 'display'];

  for (let managedAttribute of managedAttributes) {
    let managedAttributeValue = element.getAttribute('data-' + managedAttribute);
    if (managedAttributeValue) {
      if (managedAttribute === 'display') {
        element.style.display = managedAttributeValue;
      } else {
        element[managedAttribute] = managedAttributeValue;
      }
    }
  }
}
