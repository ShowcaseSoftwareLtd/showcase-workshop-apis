"use strict";

/**
 * Listen for when local storage is initialised.  LocalStorage is either built-in
 * or supplied by the Showcase Container.
 */
var onLocalStorageReady = function() {
    "use strict";

    var ls = window.localStorage;
    if ( window.showcaseLocalStorage ) ls = window.showcaseLocalStorage;

    if ((navigator.userAgent.match(/Trident/i))) {  // add a class for ie11
        document.documentElement.className = document.documentElement.className + " trident";
    }
    if ((navigator.userAgent.match(/MSIE 10\./i))) {  // add a class for ie11
        document.documentElement.className = document.documentElement.className + " ie10";
    }



    //
    //
    //
    // we are loaded and ready to go, use `ls` for local storage
    //
    //
    //



};


document.addEventListener('showcaseLocalStorage.loaded', onLocalStorageReady);
$(function() {
    if (window.localStorage) onLocalStorageReady();
    // if local storage built in start now otherwise delay loading until the  container localstorage is ready to go
});

