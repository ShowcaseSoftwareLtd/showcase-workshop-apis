/**
 * Showcase Data API
 *
 * Copyright 2014 Showcase Software Limited
 */
function SHOWCASE_DATA(settings) {
    if ( typeof settings != 'object' ) settings = {};

    var testMode = settings['testMode'] || false;

    var sc_call = function(type, key, value) {
        var is_windows_webview = /MSAppHost/i.test(navigator.userAgent);
        var is_ios_uiwebview = /AppleWebKit/i.test(navigator.userAgent);
        if ( is_windows_webview ) {
            SHOWCASE_DATA_WIN_BRIDGE_PUSH({type: type, key: key, value: value});
        }
        if (is_ios_uiwebview) {
            var srcValue = key + ":##SC" + type + "##" + value;
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", srcValue);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        }
    };
    if ( testMode ) {
        var testData = {};
        sc_call = function(type, key, value) {
            if ( type == 'PUT' ) {
                testData[key] = value;
            }   else if ( type == 'GET') {
                SHOWCASE_DATA_GLOBAL_GET_CALLBACK(key, testData[key]);
            }   else if ( type == 'STORE') {
                alert('Store remotely ' + key + ' ' + testData[key]);
            }
        }
    }

    return {
        'get': function(_key) {
            sc_call("GET", _key, "");
        },

        'put': function(_key, _val) {
            sc_call("PUT", _key, _val);
        },

        'global_get_callback': function(fn) {
            SHOWCASE_DATA_GLOBAL_GET_CALLBACK = fn;
        },

        'store': function(_key) {
          sc_call("STORE", _key, "");
        }
    };

}
var SHOWCASE_DATA_GLOBAL_GET_CALLBACK = function(key, value) {  // callback registered at the global level
    // nothing by default
};

var SHOWCASE_DATA_WIN_BRIDGE = [];
var SHOWCASE_DATA_WIN_BRIDGE_PUSH = function(data) {
    SHOWCASE_DATA_WIN_BRIDGE.push(JSON.stringify(data));
};
var SHOWCASE_DATA_WIN_BRIDGE_POP = function() {
    return SHOWCASE_DATA_WIN_BRIDGE.pop();
};
