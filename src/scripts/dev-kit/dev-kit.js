import './dev-kit.scss';
import {refreshSlider, sidebareTemplate} from './sidebar';
import {showModal} from './modal';
import Cookie from 'js-cookie';
import {isJqueryAvailable, loadJS, loadModules} from './script-loader';
import {getCurrentState, readOilConfig} from './oil-kit';

(function () {
  loadModules();

  window.AS_OIL_DEV_KIT = {
    showConfig: function () {
      let exampleScriptTag = '<script id="oil-configuration" type="application/configuration">\n'
        + '{\n'
        + '  "poi_group_name": "axelSpringerSe_01"\n'
        + '}\n'
        + '</script>';

      let desc = 'OIL comes with a wide range of customisation features which can be configured via a configuration block. Put the configuration object somewhere in the upper part of your page. Please disable the preview mode for the first production test. The preview mode hides the OIL layer except you enable it on your browser session. See the parameter section below for more details.<br><br>'
        + 'OIL also comes with a default configuration, that will support Single Opt-In with a German standard text.'
        + '<pre class="modal-pre">' + escapeHtml(exampleScriptTag) + '</pre>'
        + '<br><br>Current configuration:';
      showModal('Current OIL Config', desc, JSON.stringify(readOilConfig(), null, 1));

    },
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
    getVendorConsents: function () {
      // TODO CMP CALL
      __cmp('getVendorConsents', null, (result) => {
        refreshSlider();
        showModal('getVendorConsents', 'The getVendorConsents() method returns the consent by purpose and by vendor as well as a flag indicating if the GDPR applies to the current user. <br><br>Here is what the Didomi CMP returned just now for that function (it should match the consents table and change when you updates your consents):', JSON.stringify(result, null, 2));
      });


    },
    getConsentData: function () {
      // TODO CMP CALL
      __cmp('getConsentData', null, (result) => {
        refreshSlider();
        showModal('getConsentData', 'The getConsentData() method returns the consent string which encodes all the consent information (by vendor and by purpose) as well as a flag indicating if the GDPR applies to the current user. <br><br>' +
          'This  should match the consents table and change when you updates your consents:', JSON.stringify(result, null, 2));
      });

    },
    ping: function () {
      // TODO CMP CALL
      __cmp('ping', null, (result) => {
        refreshSlider();
        showModal('ping', 'The ping() is used by vendors to know if the CMP is loaded yet and if the website has decided to apply GDPR globally to all users or only to EU-based users.', JSON.stringify(result, null, 2));
      });

    },
    getVendorList: function () {
      // TODO CMP CALL
      __cmp('getVendorList', null, (result) => {
        refreshSlider();
        showModal('getVendorList', 'The getVendorList() returns the Global Vendor List hosted by the IAB. That list includes all the purposes that are part of the framework, the vendors that support it as well as a list of the consent purposes that each vendor requires. The list is used by CMP to determine what information they need to who the user and what consents to collect.', JSON.stringify(result, null, 2));
      });

    }
  };

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}());
