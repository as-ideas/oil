export function triggerEvent(eventName) {
  let event = document.createEvent('Event');
  event.initEvent(eventName, true, true);
  window.document.dispatchEvent(event);
}
