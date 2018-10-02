import Cookie from 'js-cookie';
import { loadJS } from './script-loader';

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
  let oldScript = document.getElementById('oil-configuration');
  if (!oldScript) {
    let config = {
      publicPath: '//unpkg.com/@ideasio/oil.js/release/current/'
    };
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');

    script.id = 'oil-configuration';
    script.type = 'application/configuration';
    script.text = JSON.stringify(config);

    head.appendChild(script);
  }

  loadJS('oil-stub-js', '//unpkg.com/@ideasio/oil.js/release/current/oilstub.min.js', () => {
    loadJS('oil-js', '//unpkg.com/@ideasio/oil.js/release/current/oil.min.js', () => {
      let btnOil = document.getElementById('as-oil-dev-kit__btn-oil');
      btnOil.className = 'btn btn-enabled';
    });
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
  getVendorsConsent: () => window.__cmp('getVendorsConsent', null, (result) => console.info(result))

};
