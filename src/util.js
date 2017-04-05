/**
 * Checks if given element is a DOM element
 * Source: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
 * @param  a DOM element or any other value 
 * @return true if DOM element, otherwise false
 */
export function isDOMElement(o) {
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : // DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

/**
 * Simple add click handler util function
 * @param element: DOM element
 * @param func: callback function
 */
export function addClickHandler(element, func) {
  if (isDOMElement(element) && typeof(func) === 'function') {
    element.addEventListener('click', func);
  }
}