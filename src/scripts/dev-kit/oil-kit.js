import Cookie from "js-cookie";

export function getCurrentState() {
  let oilData = Cookie.get('oil_data');
  let oilVerbose = Cookie.get('oil_verbose');
  let oilPreview = Cookie.get('oil_preview');
  return {
    oilData: oilData ? JSON.parse(oilData) : {},
    oilVerbose: oilVerbose ? oilVerbose : false,
    oilPreview: oilPreview ? oilPreview : false
  }
}

export function readOilConfig() {
  let configElement = document.querySelector('script[type="application/configuration"]#oil-configuration');
  if (configElement && configElement.text) {
    return JSON.parse(configElement.text);
  }
  return {};
}

export function readOilVersion() {

}

export const cmp = {
  getVendorsConsent: () => __cmp('getVendorsConsent', null, (result) => console.info(result)),

};