
/**
 * HTML Zip API (originally javascript-api)
 *
 * Copyright 2020 Showcase Software Limited
 */
function SHOWCASE_DATA(settings) {
    if (!settings) settings = {testMode: false, dataSubmissionApiConfig: null};

    let testMode = settings.testMode;
    let dataSubmissionApiConfig = settings.dataSubmissionApiConfig;
    let msgListenerSetup = false;
    let getPromises = {};

    // Showcase Windows Store not supported

    // Showcase Windows (electron) listens for messages via window.postMessage
    // Showcase Android listens for messages via window.postMessage

    // Showcase iOS older than v7 is not supported
    // Showcase iOS > v7 injects messageHandlers.showcaseData into the window
    let isIosWkWebview = window && window.webkit && window.webkit.messageHandlers &&
        window.webkit.messageHandlers.showcaseData;

    let scCall = function(type, key, value) {
        if (dataSubmissionApiConfig) {
            let formData = {};
            setTimeout(() => {  // delay a little so we aren't blocked
                let formDataCand = window.localStorage.getItem('scHtmlZipData' + dataSubmissionApiConfig.showcaseId);
                if (formDataCand) formData = JSON.parse(formDataCand);
            });
            const _store = () => {
                let payload = {
                    data_name: key, data_type: 'generic', workspace_id: dataSubmissionApiConfig.workshopId,
                    showcase_id: dataSubmissionApiConfig.showcaseId, content: value, date_entered: new Date().toISOString(),
                    form_data_submission_key: dataSubmissionApiConfig.apiKey
                }
                let formData = new FormData();
                Object.keys(payload).forEach((k) => formData.append(k, payload[k]));
                fetch(`${dataSubmissionApiConfig.baseUrl}/api/no_auth_v1/form-data-submission`, {
                    method: 'POST', body: formData
                }).then(() => {
                    // posted ok
                }).catch((e) => {
                    console.log('Could not post.', e);
                });
            }
            const _put = function() {
                formData[key] = value;
                window.localStorage.setItem('scHtmlZipData' + dataSubmissionApiConfig.showcaseId,
                    JSON.stringify(formData));
            };
            if ( type === 'PUT' ) {
                _put();
            }   else if ( type === 'GET') {
                setTimeout(() => {
                    window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK(key, formData[key]);
                }, 50);
            }   else if ( type === 'GETEMAIL') {
                setTimeout(() => {
                    // we can't identify the user in this context
                    window.SHOWCASE_DATA_EMAIL_GET_CALLBACK(null);
                }, 50);
            }   else if ( type === 'STORE') {
                _store();
            }   else if ( type === 'PUTREMOTE') {
                _put();
                _store();
            }
            // controls do nothing in this mode

        } else if (isIosWkWebview) {
            window.webkit.messageHandlers.showcaseData.postMessage({type: type, key: key, value: value});

        }   else if (window.postMessage) {
            // there is a listener at the higher level that will hear this
            if (!msgListenerSetup) {
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
            let msgWin;
            if (/Electron\//i.test(navigator.userAgent)) msgWin = window;   // for electron obviously
            else if (window.self !== window.parent) msgWin = window.parent;  // for ios
            else msgWin = window;  // for browser and android
            msgWin.postMessage({SHOWCASE_DATA: {type: type, key: key, value: value}}, '*');
        }
    };
    if ( testMode ) {
        let testData = {};
        scCall = function(type, key, value) {
            if ( type === 'PUT' ) {
                testData[key] = value;

            }   else if ( type === 'GET') {
                setTimeout(() => {
                    window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK(key, testData[key]);
                }, 50);

            }   else if ( type === 'GETEMAIL') {
                setTimeout(() => {
                    window.SHOWCASE_DATA_EMAIL_GET_CALLBACK('example@example.com');
                }, 50);

            }   else if ( type === 'STORE') {
                alert('Store remotely ' + key + ' ' + testData[key]);

            }   else if ( type === 'PUTREMOTE') {
                alert('Put first then store remotely ' + key + ' ' + testData[key]);

            }
        }
    }
    return {
        get: function(_key) {
            return new Promise((resolve, reject) => {
               getPromises[_key] = {
                   resolve: resolve, reject: reject
               }
               window.SHOWCASE_DATA_GLOBAL_GET_CALLBACK = (k, v) => {
                   if (timeoutTimer) clearTimeout(timeoutTimer);
                   getPromises[_key].resolve(v);
               };
               let timeoutTimer = setTimeout(() => {
                   getPromises[_key].reject('Timeout waiting for email');
               }, 30 * 1000);  // timeout after 30s
               scCall("GET", _key, "");
            });
        },
        getEmail: function() {
            return new Promise((resolve, reject) => {
               window.SHOWCASE_DATA_EMAIL_GET_CALLBACK = (email) => {
                   if (timeoutTimer) clearTimeout(timeoutTimer);
                   resolve(email);
               };
               let timeoutTimer = setTimeout(() => {
                   reject('Timeout waiting for email');
               }, 30 * 1000);  // timeout after 30s
               scCall("GETEMAIL", "", "");
            });
        },
        put: function(_key, _val) {
            scCall("PUT", _key, _val);
        },
        hideControls: function() {
            scCall("CONTROLSHIDE", "", "");
        },
        showControls: function() {
            scCall("CONTROLSSHOW", "", "");
        },
        back: function() {
            scCall("CONTROLSBACK", "", "");
        },
        home: function() {
            scCall("CONTROLSHOME", "", "");
        },
        share: function() {
            scCall("CONTROLSSHARE", "", "");
        },
        /**
         * @deprecated use putRemote
         */
        store: function(_key) {
            setTimeout(function() {  // delay slightly to give put time to complete
                scCall("STORE", _key, "");
            }, 300);
        },
        putRemote: function(_key, _val) {
            scCall("PUTREMOTE", _key, _val);
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
