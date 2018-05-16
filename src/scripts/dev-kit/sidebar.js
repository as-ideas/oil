import {getCurrentState, loadOilJs, readOilConfig, readOilVersion} from './oil-kit';

export function initNavbar() {
  let element1 = sidebareTemplate();
  let element2 = '<div id="as-oil-dev-kit__trigger"></div>';

  $('body').append(element1);
  $('body').append(element2);

  $('#as-oil-dev-kit__slider').slideReveal({
    trigger: $('#as-oil-dev-kit__trigger'),
    position: 'left',
    show: refreshSliderFnc,
    width: 360
  });

  console.info('OIL-DEV-KIT initialized.');

  AS_OIL_DEV_KIT.toogleVerbose = function toogleVerbose() {
    (getCurrentState().oilVerbose) ? AS_OIL.verboseModeOff() : AS_OIL.verboseModeOn();
    refreshSliderFnc();
  };

  AS_OIL_DEV_KIT.tooglePreview = function tooglePreview() {
    (getCurrentState().oilPreview) ? AS_OIL.previewModeOff() : AS_OIL.previewModeOn();
    refreshSliderFnc();
  }
}

let refreshSliderFnc = function (slider, trigger) {
  window.setTimeout(function () {
    let currentState = getCurrentState();
    $('#as-oil-dev-kit__state-pre').text(JSON.stringify(currentState, null, 1));
    // $('#as-oil-dev-kit__config-pre').text(JSON.stringify(readOilConfig(), null, 1));

    let btnOil = document.getElementById('as-oil-dev-kit__btn-oil');
    let btnVerbose = document.getElementById('as-oil-dev-kit__btn-verbose');
    let btnPreview = document.getElementById('as-oil-dev-kit__btn-preview');

    if (window.AS_OIL) {
      btnOil.className = 'btn btn-enabled';
    } else {
      btnOil.className = 'btn btn-disabled';
      btnOil.onclick = loadOilJs;
    }

    if (currentState.oilVerbose) {
      btnVerbose.className = 'btn btn-enabled';
    } else {
      btnVerbose.className = 'btn btn-disabled';
    }

    if (currentState.oilPreview) {
      btnPreview.className = 'btn btn-enabled';
    } else {
      btnPreview.className = 'btn btn-disabled';
    }

    document.getElementById('as-oil-dev-kit__oil-version').innerText = readOilVersion();
  }, 300);
};
export {refreshSliderFnc as refreshSlider};

export function sidebareTemplate() {
  return `
<div id="as-oil-dev-kit__slider" class="as-oil-dev-kit">
    <div class="as-oil-dev-kit__slider-inner">
        <h2>OIL DEV KIT</h2>
        <div>
          <a href="https://oil.axelspringer.com/docs/" target="_blank">Documentation</a>
          <a href="https://oil.axelspringer.com/release/">Version: <span id="as-oil-dev-kit__oil-version"></span></a>
        </div>
        <hr>
        <div>
          <span id="as-oil-dev-kit__btn-oil" class="btn "><i/>OIL loaded</span>
          <span id="as-oil-dev-kit__btn-verbose" onclick="AS_OIL_DEV_KIT.toogleVerbose()" class="btn "><i/>Verbose Mode</span>
          <span id="as-oil-dev-kit__btn-preview" onclick="AS_OIL_DEV_KIT.tooglePreview()" class="btn "><i/>Preview Mode</span>
        </div>
        <hr>
        <div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.showConfig()">Show Config</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.status()">???y</div>
        </div>
        <div class="as-oil-dev-kit__state">Current State:<pre id="as-oil-dev-kit__state-pre"></pre></div>
        <hr>
          <div class="as-oil-dev-kit__button-wrapper">
            <h6>All JS-API calls are available under AS_OIL (or window.AS_OIL)</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.reload()">reload()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.status()">status()</div>
          </div>
        <div class="as-oil-dev-kit__button-wrapper">
            <h6>API for triggerin functions of OIL:</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.previewModeOn()">previewModeOn()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.previewModeOff()">previewModeOff()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerOptIn()">triggerOptIn()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerOptOut()">triggerOptOut()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerPoiOptIn()">triggerPoiOptIn()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerSoiOptIn()">triggerSoiOptIn()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.verboseModeOff()">verboseModeOff()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.verboseModeOn()">verboseModeOn()</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.showPreferenceCenter()">showPreferenceCenter()</div>
        </div>

        <div class="as-oil-dev-kit__button-wrapper">
            <h6>CMP-API (aka Transparency & Consent Framework)</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getConsentData()">getConsentData</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getVendorConsents()">getVendorConsents</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.ping()">ping</div>
            <h6>Optional calls</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getVendorList()">getVendorList</div>
        </div>

    </div>
</div>
`
}
