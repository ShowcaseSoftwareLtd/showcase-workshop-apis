/**
 * Showcase Data API v3
 *
 * Copyright 2015 Showcase Software Limited
 */
function SHOWCASE_DATA(settings) {
    if ( typeof settings != 'object' ) settings = {};

    var testMode = settings['testMode'] || false;
    var chromeCallbackSetup = false;
    var is_windows_webview = /MSAppHost/i.test(navigator.userAgent);
    var is_chrome_uiwebview = !is_windows_webview && /Chrome\/[\d+]/i.test(navigator.userAgent);
    var is_ios_uiwebview = !is_chrome_uiwebview && !is_windows_webview && /AppleWebKit/i.test(navigator.userAgent);

    var sc_call = function(type, key, value) {
        if ( is_windows_webview ) {
            if ( typeof window.external.notify )
            SHOWCASE_DATA_WIN_BRIDGE_PUSH({type: type, key: key, value: value});

        }   else if (is_ios_uiwebview) {
            var srcValue = key + ":##SC" + type + "##" + value;
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", srcValue);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;

        }   else if (is_chrome_uiwebview) {
            // there is a listener at the higher level that will hear this
            if ( ! chromeCallbackSetup ) {
                chromeCallbackSetup = true;
                window.addEventListener('message',function(event) {
                    if ( event && event.data && event.data.SHOWCASE_DATA_CALLBACK ) {
                        SHOWCASE_DATA_GLOBAL_GET_CALLBACK(event.data.SHOWCASE_DATA_CALLBACK.key,
                                                          event.data.SHOWCASE_DATA_CALLBACK.value);
                    }
                    if ( event && event.data && event.data.SHOWCASE_DATA_EMAIL_CALLBACK ) {
                        SHOWCASE_DATA_EMAIL_GET_CALLBACK(event.data.SHOWCASE_DATA_EMAIL_CALLBACK.value);
                    }
                }, false);
            }
            window.postMessage({SHOWCASE_DATA: {type: type, key: key, value: value}}, '*');
        }
    };
    if ( testMode ) {
        var testData = {};
        sc_call = function(type, key, value) {
            if ( type == 'PUT' ) {
                testData[key] = value;
            }   else if ( type == 'GET') {
                SHOWCASE_DATA_GLOBAL_GET_CALLBACK(key, testData[key]);
            }   else if ( type == 'GETEMAIL') {
                SHOWCASE_DATA_EMAIL_GET_CALLBACK('example@example.com');
            }   else if ( type == 'STORE') {
                alert('Store remotely ' + key + ' ' + testData[key]);
            }
        }
    }
    if (is_chrome_uiwebview && typeof $ == 'function'){
        // for chrome only hack in support for showcaseworkshop://*
        $(document).on('touchstart click', "a[href^='showcaseworkshop://']", function(evt) {
            "use strict";
            evt.preventDefault();
            if ( $(this).attr('href') == 'showcaseworkshop://back' ) {
                sc_call("CONTROLSBACK", "", "");
            }   else if ( $(this).attr('href') == 'showcaseworkshop://home' ) {
                sc_call("CONTROLSHOME", "", "");
            }   else if ( $(this).attr('href') == 'showcaseworkshop://share' ) {
                sc_call("CONTROLSSHARE", "", "");
            }
        })
    }

    return {
        'get': function(_key) {
            sc_call("GET", _key, "");
        },
        'getEmail': function() {
            sc_call("GETEMAIL", "", "");
        },
        'put': function(_key, _val) {
            sc_call("PUT", _key, _val);
        },
        'global_get_callback': function(fn) {
            SHOWCASE_DATA_GLOBAL_GET_CALLBACK = fn;
        },
        'email_get_callback': function(fn) {
            SHOWCASE_DATA_EMAIL_GET_CALLBACK = fn;
        },
        'hideControls': function() {
            sc_call("CONTROLSHIDE", "", "");
        },
        'showControls': function() {
            sc_call("CONTROLSSHOW", "", "");
        },
        'back': function() {
            sc_call("CONTROLSBACK", "", "");
        },
        'home': function() {
            sc_call("CONTROLSHOME", "", "");
        },
        'share': function() {
            sc_call("CONTROLSSHARE", "", "");
        },
        'store': function(_key) {
            sc_call("STORE", _key, "");
        }
    };

}
var SHOWCASE_DATA_GLOBAL_GET_CALLBACK = function(key, value) {  // callback registered at the global level
    // nothing by default
};
var SHOWCASE_DATA_EMAIL_GET_CALLBACK = function(email) {  // callback registered at the global level
    // nothing by default
};

var SHOWCASE_DATA_WIN_BRIDGE = [];
var SHOWCASE_DATA_WIN_BRIDGE_PUSH = function(data) {
    SHOWCASE_DATA_WIN_BRIDGE.push(JSON.stringify(data));
};
var SHOWCASE_DATA_WIN_BRIDGE_POP = function() {
    return SHOWCASE_DATA_WIN_BRIDGE.pop();
};
