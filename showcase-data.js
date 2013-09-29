/**
 * Showcase Data API
 *
 * Copyright 2013 Showcase Software Limited
 */
function SHOWCASE_DATA(settings) {
    if ( typeof settings != 'object' ) settings = {};

    var testMode = settings['testMode'] || false;

    var sc_call = function(type, key, value) {
        var srcValue = key + ":##SC" + type + "##" + value;
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("src", srcValue);
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    };
    if ( testMode ) {
        var testData = {};
        sc_call = function(type, key, value) {
            if ( type == 'PUT' ) {
                testData[key] = value;
            }   else if ( type == 'GET') {
                global_callback_fn(key, testData[key]);
            }   else if ( type == 'STORE') {
                alert('Store remotely ' + key + ' ' + testData[key]);
            }
        }
    }

    var global_callback_fn = function(key, value) {
        // do nothing by default
    };

    return {
        'get': function(_key) {
            sc_call("GET", _key, "");
        },

        'put': function(_key, _val) {
            sc_call("PUT", _key, _val);
        },

        'global_get_callback': function(fn) {
            global_callback_fn = fn;
        },

        'store': function(_key) {
          sc_call("STORE", _key, "");
        }
    };

}
