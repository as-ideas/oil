export function showModal(title, headerText, contentText) {
  let text = `
    <hr class="modal-hr">
    <div class="modal-header-text">${headerText}</div>
    <pre class="modal-pre">${contentText}</pre>
    <hr class="modal-hr">
    `;
  window.swal({
    title: title,
    html: text,
    button: 'OKAY'
  });
}
