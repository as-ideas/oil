export function sidebareTemplate() {
  return `
<div id="as-oil-dev-kit__slider" class="as-oil-dev-kit">
    <div class="as-oil-dev-kit__slider-inner">
        <h2>OIL DEV KIT</h2>
        <div>
          <a href="https://oil.axelspringer.com/docs/" target="_blank">Documentation</a>
          <a href="">Version: <span></span></a>
        </div>
        <hr>
        <div>
          <span id="as-oil-dev-kit__btn-oil" class="btn "><i/>OIL loaded</span>
          <span id="as-oil-dev-kit__btn-verbose" class="btn "><i/>Verbose Mode</span>
          <span id="as-oil-dev-kit__btn-preview" class="btn "><i/>Preview Mode</span>
        </div>
        <hr>
        <div class="as-oil-dev-kit__config">Current Config:<pre id="as-oil-dev-kit__config-pre"></pre></div>
        <div class="as-oil-dev-kit__state">Current State:<pre id="as-oil-dev-kit__state-pre"></pre></div>
        <hr>
          <div class="as-oil-dev-kit__button-wrapper">
            <h6>All JS-API calls are available under AS_OIL (or window.AS_OIL)</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.reload()">reload</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.status()">status</div>
          </div>
        <hr>
        <div class="as-oil-dev-kit__button-wrapper">
            <h6>API for triggerin functions of OIL:</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.previewModeOn()">previewModeOn</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.previewModeOff()">previewModeOff</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerOptIn()">triggerOptIn</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerOptOut()">triggerOptOut</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerPoiOptIn()">triggerPoiOptIn</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerSoiOptIn()">triggerSoiOptIn</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.verboseModeOff()">verboseModeOff</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.verboseModeOn()">verboseModeOn</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.showPreferenceCenter()">showPreferenceCenter</div>
        </div>

        <div class="as-oil-dev-kit__button-wrapper">
            <h6>CMP-API (aka Transparency & Consent Framework)</h6>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getVendorsConsent()">getVendorsConsent</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getConsentData()">getConsentData</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.ping()">ping</div>
            <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getVendorList()">getVendorList</div>
        </div>

    </div>
</div>
`
}
