import { MANAGED_TAG_IDENTIFIER, MANAGED_TAG_IDENTIFIER_ATTRIBUTE, MANAGED_TAG_PURPOSES_ATTRIBUTE } from './core_constants';
import { getSoiCookie } from './core_cookies';
import { arrayContainsArray } from './core_utils';
import { getPurposeIds } from './core_vendor_information';
import { getCustomPurposeIds } from './core_config';

export function manageDomElementActivation() {
  let managedElements = findManagedElements();
  let cookie = getSoiCookie();

  for (let i = 0; i < managedElements.length; i++) {
    manageElement(managedElements[i], cookie);
  }
}

function getNecessaryPurposes(element) {
  let purposesString = element.getAttribute(MANAGED_TAG_PURPOSES_ATTRIBUTE);
  return purposesString ? purposesString.split(/,\s*/) : getPurposeIds().concat(getCustomPurposeIds());
}

function findManagedElements() {
  return document.querySelectorAll('[' + MANAGED_TAG_IDENTIFIER_ATTRIBUTE + '=\'' + MANAGED_TAG_IDENTIFIER + '\']');
}

function manageElement(element, cookie) {
  if (element.tagName === 'SCRIPT') {
    manageScriptElement(element, cookie);
  } else {
    manageNonScriptElement(element, cookie);
  }
}

function manageScriptElement(element, cookie) {
  let newElement = document.createElement('script');

  for (let i = 0; i < element.attributes.length; i++) {
    let attribute = element.attributes[i];
    if (attribute.name.match(/^data-/)) {
      newElement.setAttribute(attribute.name, attribute.value);
    }
  }
  if (hasConsent(element, cookie)) {
    if (element.getAttribute('data-type')) {
      newElement.type = element.getAttribute('data-type');
    }
    if (element.getAttribute('data-src')) {
      newElement.src = element.getAttribute('data-src');
    }
  } else {
    // we must set a (dummy) type for script tags without consent - otherwise they will be executed
    newElement.type = MANAGED_TAG_IDENTIFIER;
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

function manageNonScriptElement(element, cookie) {
  let managedAttributes = ['href', 'src', 'title', 'display'];

  if (hasConsent(element, cookie)) {
    for (let managedAttribute of managedAttributes) {
      let managedAttributeValue = element.getAttribute('data-' + managedAttribute);
      if (managedAttribute === 'display') {
        element.style.display = managedAttributeValue ? managedAttributeValue : '';
      } else {
        if (managedAttributeValue) {
          element.setAttribute(managedAttribute, managedAttributeValue);
        }
      }
    }
  } else {
    for (let managedAttribute of managedAttributes) {
      if (managedAttribute === 'display') {
        element.style.display = 'none';
      } else if (element.hasAttribute(managedAttribute)) {
        element.removeAttribute(managedAttribute);
      }
    }
  }
}

function hasConsent(element, cookie) {
  if (cookie.opt_in) {
    let necessaryPurposes = getNecessaryPurposes(element);
    let allowedPurposes = cookie.consentData.getPurposesAllowed();
    allowedPurposes = allowedPurposes ? allowedPurposes.concat(cookie.customPurposes) : cookie.customPurposes;

    return arrayContainsArray(allowedPurposes, necessaryPurposes);
  } else {
    return false;
  }
}
