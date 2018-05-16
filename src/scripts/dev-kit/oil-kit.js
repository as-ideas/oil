import Cookie from 'js-cookie';
import {loadJS} from './script-loader';

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

export function loadOilJs() {
  loadJS('oil-stub-js', '//oil-integration-cdn.herokuapp.com/oilstub.1.0.35-SNAPSHOT.min.js', () => {
    loadJS('oil-js', '//oil-integration-cdn.herokuapp.com/oil.1.0.35-SNAPSHOT.min.js');
  });

}

export function readOilVersion() {
  let oilTag = document.querySelector('script[src*="oil.1"]');
  if (oilTag) {
    let myRegexp = /oil.([0-9.]*)-/gm;
    let match = myRegexp.exec(oilTag.src);
    return match[1]; // first group, index 0 is the full match
  }
  return undefined;
}

export const cmp = {
  getVendorsConsent: () => __cmp('getVendorsConsent', null, (result) => console.info(result))

};
