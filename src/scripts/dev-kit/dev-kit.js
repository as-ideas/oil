import './dev-kit.scss';

(function () {
    function loadJquery() {
        if (!isJqueryAvailable()) {
            let d = document, s = d.createElement('script');
            s.id = 'jquery-js';
            s.src = '//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        }
    }

    function loadJqueryPlugins() {
        console.info('Try to load FooNav...');
        if (isJqueryAvailable()) {
            if (!document.getElementById('slidereveal-js')) {
                // SLIDE-REVEAL
                let d = document, s = d.createElement('script');
                s.id = 'slidereveal-js';
                s.onload = initNavbar;
                s.src = '//cdnjs.cloudflare.com/ajax/libs/slideReveal/1.1.2/jquery.slidereveal.min.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);

                // MODAL JS
                s = d.createElement('script');
                s.id = 'modal-js';
                s.src = '//unpkg.com/sweetalert/dist/sweetalert.min.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);

                // DROPDOWN CSS
                // s = d.createElement('link');
                // s.href = '//cdnjs.cloudflare.com/ajax/libs/jquery-dropdown/2.0.3/jquery.dropdown.min.css';
                // s.rel = 'stylesheet';

                // OUR CSS
                // let css = '';
                // s = d.createElement('style');
                // s.type = 'text/css';
                // if (s.styleSheet) {
                //     s.styleSheet.cssText = css;
                // } else {
                //     s.appendChild(document.createTextNode(css));
                // }
                // (d.head || d.body).appendChild(s);

            }
            console.info('JqueryPlugins loaded.');
        } else {
            window.setTimeout(function () {
                loadJqueryPlugins();
            }, 250);
        }
    }

    function isJqueryAvailable() {
        return !(typeof jQuery === 'undefined');
    }

    function getCurrentState() {
        let oilData = getCookie('oil_data');
        let oilVerbose = getCookie('oil_verbose');
        let oilPreview = getCookie('oil_preview');
        return {
            oilData: oilData ? JSON.parse(oilData) : {},
            oilVerbose: oilVerbose ? oilVerbose : false,
            oilPreview: oilPreview ? oilPreview : false
        }
    }

    function getCookie(cname) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    function refreshSlider(slider, trigger) {
        window.setTimeout(function () {
            $('#as-oil-dev-kit__state-pre').text(JSON.stringify(getCurrentState(), null, 1));
        }, 300);
    }

    window.AS_OIL_DEV_KIT = {
        previewModeOff: function () {
            AS_OIL.previewModeOff();
            refreshSlider();

        },
        previewModeOn: function () {
            AS_OIL.previewModeOn();
            refreshSlider();
            swal({
                title: 'previewModeOn',
                text: 'You clicked the button!',
                button: 'OKAY'
            });
        },
        reload: function () {
            AS_OIL.reload();
            refreshSlider();

        },
        showPreferenceCenter: function () {
            AS_OIL.showPreferenceCenter();
            refreshSlider();
        },
        status: function () {
            AS_OIL.status();
            refreshSlider();
        },
        triggerOptIn: function () {
            AS_OIL.triggerOptIn();
            refreshSlider();
        },
        triggerOptOut: function () {
            AS_OIL.triggerOptOut();
            refreshSlider();
        },
        triggerPoiOptIn: function () {
            AS_OIL.triggerPoiOptIn();
            refreshSlider();

        },
        triggerSoiOptIn: function () {
            AS_OIL.triggerSoiOptIn();
            refreshSlider();
        },
        verboseModeOff: function () {
            AS_OIL.verboseModeOff();
            refreshSlider();
        },
        verboseModeOn: function () {
            AS_OIL.verboseModeOn();
            refreshSlider();
        },
        getVendorsConsent: function () {
            // TODO CMP CALL
            refreshSlider();
        },
        getConsentData: function () {
            // TODO CMP CALL
            refreshSlider();
        },
        ping: function () {
            // TODO CMP CALL
            refreshSlider();
        },
        getVendorList: function () {
            // TODO CMP CALL
            refreshSlider();
        }
    };

    function initNavbar() {
        let element1 = '<div id="as-oil-dev-kit__slider">'
            + '<div class="as-oil-dev-kit__slider-inner">'
            + '<h2>OIL DEV KIT</h2>'
            + '<div class="as-oil-dev-kit__state">Current State:<pre id="as-oil-dev-kit__state-pre"></pre></div>'

            + '<div class="as-oil-dev-kit__button-wrapper">'
            + ' <h6>All JS-API calls are available under AS_OIL (or window.AS_OIL)</h6>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.reload()">reload</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.status()">status</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.previewModeOn()">previewModeOn</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.previewModeOff()">previewModeOff</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerOptIn()">triggerOptIn</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerOptOut()">triggerOptOut</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerPoiOptIn()">triggerPoiOptIn</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.triggerSoiOptIn()">triggerSoiOptIn</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.verboseModeOff()">verboseModeOff</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.verboseModeOn()">verboseModeOn</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.showPreferenceCenter()">showPreferenceCenter</div>'
            + '</div>'

            + '<div class="as-oil-dev-kit__button-wrapper">'
            + ' <h6>CMP-API (aka Transparency & Consent Framework)</h6>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getVendorsConsent()">getVendorsConsent</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getConsentData()">getConsentData</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.ping()">ping</div>'
            + ' <div class="as-oil-dev-kit__button" onclick="AS_OIL_DEV_KIT.getVendorList()">getVendorList</div>'
            + '</div>'

            + '</div>'
            + '</div>';
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

    loadJquery();
    loadJqueryPlugins();
}());
