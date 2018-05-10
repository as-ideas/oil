import './dev-kit.scss';
import {sidebareTemplate} from './sidebar';
import {showModal} from './modal';
import Cookie from 'js-cookie';
import {isJqueryAvailable, loadJS, loadModules} from "./script-loader";

(function () {
  loadModules();

  function refreshSlider(slider, trigger) {
    window.setTimeout(function () {
      let currentState = getCurrentState();
      $('#as-oil-dev-kit__state-pre').text(JSON.stringify(currentState, null, 1));
      $('#as-oil-dev-kit__config-pre').text(JSON.stringify(readConfig(), 1));

      let btnOil = document.getElementById('as-oil-dev-kit__btn-oil');
      let btnVerbose = document.getElementById('as-oil-dev-kit__btn-verbose');
      let btnPreview = document.getElementById('as-oil-dev-kit__btn-preview');

      (AS_OIL) ? btnOil.className = 'btn btn-enabled' : btnOil.className = 'btn btn-disabled';
      (currentState.oilVerbose) ? btnVerbose.className = 'btn btn-enabled' : btnVerbose.className = 'btn btn-disabled';
      (currentState.oilPreview) ? btnPreview.className = 'btn btn-enabled' : btnPreview.className = 'btn btn-disabled';

      // document.querySelectorAll("script[src*='oil.1']")

    }, 300);
  }

  window.AS_OIL_DEV_KIT = {
    previewModeOn: function () {
      AS_OIL.previewModeOn();
      refreshSlider();
      showModal('previewModeOn', 'Sets the "preview enable cookie" in your browser. The preview mode is useful for testing OIL in a live environment without making it available to your end-users. The <b>preview mode is turned off by default</b>, meaning OIL will be available to all your users. If you <b>turn the preview mode on in the configuration of OIL</b>, OIL won’t be shown at first, but can be enabled for your current session on the browser’s console. When preview mode is turned on some debug information will be seen on the browser console. See also "Verbose Logging" below for more detailed logging.', '');
    },
    previewModeOff: function () {
      AS_OIL.previewModeOff();
      refreshSlider();
      showModal('previewModeOff', 'Deletes the "preview enable cookie" in your browser. The preview mode is useful for testing OIL in a live environment without making it available to your end-users. The preview mode is turned off by default, meaning OIL will be available to all your users. If you turn the preview mode on (please see configuration section), OIL won’t be shown at first, but can be enabled for your current session on the browser’s console When preview mode is turned on some debug information will be seen on the browser console. See also "Verbose Logging" below for more detailed logging.', '');

    },
    verboseModeOn: function () {
      AS_OIL.verboseModeOn();
      refreshSlider();
      showModal('verboseModeOn', 'Sets the "verbose mode enable cookie" in your browser.OIL will show no logs, except in preview mode or verbose mode.\n' +
        'Verbose mode (as kind of debog mode) can be turned on at any time, whereas the similar preview mode can only be enabled in the configuration.\n' +
        'Please note that verbose logging can only be activated for your own browser, all other users won’t see those logs.', '');
    },
    verboseModeOff: function () {
      AS_OIL.verboseModeOff();
      refreshSlider();
      showModal('verboseModeOff', 'Deletes the "verbose mode enable cookie" in your browser.OIL will show no logs, except in preview mode or verbose mode.\n' +
        'Verbose mode (as kind of debog mode) can be turned on at any time, whereas the similar preview mode can only be enabled in the configuration.\n' +
        'Please note that verbose logging can only be activated for your own browser, all other users won’t see those logs.', '');
    },
    reload: function () {
      AS_OIL.reload();
      refreshSlider();
      showModal('reload', 'OIL will reload the configuration from the host’s website. This is like a full reload of OIL.js', '');

    },
    showPreferenceCenter: function () {
      AS_OIL.showPreferenceCenter();
      refreshSlider();
      showModal('reload', 'OIL will inject the Cookie Preference Center into your website. Please see "OIL CPC API" section in the configuration. This call is meant to inline the CPC into a part of your own website.', '');

    },
    status: function () {
      AS_OIL.status();
      refreshSlider();
      showModal('status', 'Returns the value, stored of the cookie, or the default, eg. the current status of OIL', JSON.stringify(AS_OIL.status(), null, 2));
    },
    triggerOptIn: function () {
      AS_OIL.triggerOptIn();
      refreshSlider();
      showModal('triggerOptIn', 'The user will opted in. It’s the same behaviour as when the user is clicking Accept on the layer. It respects the configuration of OIL (eg. is POI enabled?)', '');
    },
    triggerSoiOptIn: function () {
      AS_OIL.triggerSoiOptIn();
      refreshSlider();
      showModal('triggerSoiOptIn', 'The user will opted in. It’s the same behaviour as when the user is clicking Accept on the layer. Forces SOI without regard of the configuration.', '');
    },
    triggerPoiOptIn: function () {
      AS_OIL.triggerPoiOptIn();
      refreshSlider();
      showModal('triggerPoiOptIn', 'The user will opted in. It’s the same behaviour as when the user is clicking Accept on the layer. Forces POI without regard of the configuration.', '');
    },
    triggerOptOut: function () {
      AS_OIL.triggerOptOut();
      refreshSlider();
      showModal('triggerOptOut', 'OIL will remove all cookies if triggered and therefore opt-out the user of everything, even POI.', '');

    },
    // CMP CALLS
    getVendorsConsent: function () {
      // TODO CMP CALL
      __cmp('getVendorsConsent', null, (result) => console.info(result));
      refreshSlider();
      showModal('getVendorsConsent', 'The getVendorsConsent() method returns the consent by purpose and by vendor as well as a flag indicating if the GDPR applies to the current user. <br><br>Here is what the Didomi CMP returned just now for that function (it should match the consents table and change when you updates your consents):', '');

    },
    getConsentData: function () {
      // TODO CMP CALL
      refreshSlider();
      showModal('getConsentData', 'The getConsentData() method returns the consent string which encodes all the consent information (by vendor and by purpose) as well as a flag indicating if the GDPR applies to the current user. <br><br>' +
        'This  should match the consents table and change when you updates your consents:', '');
    },
    ping: function () {
      // TODO CMP CALL
      refreshSlider();
      showModal('ping', 'The ping() is used by vendors to know if the CMP is loaded yet and if the website has decided to apply GDPR globally to all users or only to EU-based users.', '');
    },
    getVendorList: function () {
      // TODO CMP CALL
      refreshSlider();
      showModal('getVendorList', 'The getVendorList() returns the Global Vendor List hosted by the IAB. That list includes all the purposes that are part of the framework, the vendors that support it as well as a list of the consent purposes that each vendor requires. The list is used by CMP to determine what information they need to who the user and what consents to collect.', '');
    }
  };

  function initNavbar() {
    let element1 = sidebareTemplate();
    let element2 = '<div id="as-oil-dev-kit__trigger"></div>';

    $('body').append(element1);
    $('body').append(element2);

    $('#as-oil-dev-kit__slider').slideReveal({
      trigger: $('#as-oil-dev-kit__trigger'),
      position: 'left',
      show: refreshSlider,
      width: 350
    });

    console.info('OIL-DEV-KIT initialized.');
  }
}());
