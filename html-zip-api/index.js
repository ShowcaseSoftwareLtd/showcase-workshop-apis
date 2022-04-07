
/**
 * HTML Zip API (originally javascript-api)
 *
 * Copyright 2020 Showcase Software Limited
 */
function SHOWCASE_DATA(settings) {
    if ( typeof settings != 'object' ) settings = {};

    var testMode = settings['testMode'] || false;
    var msgListenerSetup = false;
    var is_windows_webview = /MSAppHost/i.test(navigator.userAgent);

    // Showcase iOS injects messageHandlers.showcaseData into the window
    var is_ios_wkwebview = window && window.webkit && window.webkit.messageHandlers &&
        window.webkit.messageHandlers.showcaseData;
    // worst case, we have to use an iframe to target Showcase iOS older than v7
    var is_ios_uiwebview = !is_ios_wkwebview && !is_windows_webview && !window.postMessage &&
        /AppleWebKit/i.test(navigator.userAgent) && /Safari/i.test(navigator.userAgent);

    var sc_call = function(type, key, value) {
        if (is_ios_wkwebview) {
            window.webkit.messageHandlers.showcaseData.postMessage({type: type, key: key, value: value});

        }   else if (is_ios_uiwebview) {
            var srcValue = key + ":##SC" + type + "##" + value;
            var iframe = document.createElement("IFRAME");
            iframe.setAttribute("src", srcValue);
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;

        }   else if (window.postMessage) {
            // there is a listener at the higher level that will hear this
            if ( ! msgListenerSetup ) {
                msgListenerSetup = true;
                window.addEventListener('message',function(event) {
                    if ( event && event.data && event.data.SHOWCASE_DATA_CALLBACK ) {
                        window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK(event.data.SHOWCASE_DATA_CALLBACK.key,
                            event.data.SHOWCASE_DATA_CALLBACK.value);
                    }
                    if ( event && event.data && event.data.SHOWCASE_DATA_EMAIL_CALLBACK ) {
                        window.SHOWCASE_DATA_EMAIL_GET_CALLBACK(event.data.SHOWCASE_DATA_EMAIL_CALLBACK.value);
                    }
                }, false);
            }
            var msgWin;
            if (/Electron\//i.test(navigator.userAgent)) msgWin = window;   // for electron obviously
            else if (window.self !== window.parent) msgWin = window.parent;  // for ios
            else msgWin = window;  // for browser and android
            msgWin.postMessage({SHOWCASE_DATA: {type: type, key: key, value: value}}, '*');
        }
    };
    if ( testMode ) {
        var testData = {};
        sc_call = function(type, key, value) {
            if ( type == 'PUT' ) {
                testData[key] = value;
            }   else if ( type == 'GET') {
                window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK(key, testData[key]);
            }   else if ( type == 'GETEMAIL') {
                window.SHOWCASE_DATA_EMAIL_GET_CALLBACK('example@example.com');
            }   else if ( type == 'STORE') {
                alert('Store remotely ' + key + ' ' + testData[key]);
            }   else if ( type == 'PUTREMOTE') {
                alert('Put first then store remotely ' + key + ' ' + testData[key]);
            }
        }
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
            window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK = fn;
        },
        'email_get_callback': function(fn) {
            window.SHOWCASE_DATA_EMAIL_GET_CALLBACK = fn;
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
        /**
         * @deprecated use putRemote
         */
        'store': function(_key) {
            setTimeout(function() {  // delay slightly to give put time to complete
                sc_call("STORE", _key, "");
            }, 300);
        },
        'putRemote': function(_key, _val) {
            sc_call("PUTREMOTE", _key, _val);
        }
    };

}
window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK = function() {  // callback registered at the global level
    // nothing by default
};
window.SHOWCASE_DATA_EMAIL_GET_CALLBACK = function() {  // callback registered at the global level
    // nothing by default
};

export default SHOWCASE_DATA;
