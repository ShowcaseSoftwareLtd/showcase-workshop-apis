

Showcase HTML Zip API
============================

## Overview

The data API allows storage of key value pairs into the device memory.  This memory is kept only on the current device until the
Showcase app is removed or reinstalled.  Individual keys can be sent to the remote Showcase server.  These remotely
saved keys and values are available from the [rest-api](../rest-api/README.md).

The key value model allows for maximum flexibility to program against as anything that can be serialised to a string
can be stored and retrieved from device memory.

## Install

First, authenticate to github package registry: 
https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#installing-a-package

Then:

    npm install --save @showcasesoftwareltd/html-zip-api


## Setup

    import HtmlZipApi from '@showcasesoftwareltd/html-zip-api';

    var htmlZipApi = HtmlZipApi();


Save or "Put" a value:

    var formData = {'first_name': 'Totoro', 'last_name': 'Ghibli'};
    htmlZipApi.put('current_form_data', JSON.stringify(formData));


Get a value:

    // register a global function for handling returned values
    htmlZipApi.global_get_callback(function(key, val) {
        alert('got value ' + key + ' ' + val);
        if (val) {
            var formData = JSON.parse(val);
            alert(formData);
        }
    }
    htmlZipApi.get('current_form_data');


Send key to remote Showcase Workshop server:

    // snapshot the current form data
    htmlZipApi.put('form_data_20130912_0912', JSON.stringify(form_data));

    // store it remotely
    htmlZipApi.store('form_data_20130912_0912');

Get email of the current logged in user:

    // register a function for handling returned email values
    htmlZipApi.email_get_callback(function(email) {
        alert('got email ' + email);
    });
    htmlZipApi.getEmail();


Hide Showcase Controls:

    // hide the Showcase Controls (Back Button and Tray Slider)
    htmlZipApi.hideControls();

Show Showcase Controls:

    // show the Showcase Controls (Back Button and Tray Slider)
    htmlZipApi.showControls();

Execute Showcase Back Button:

    //navigate back to the previous Showcase screen
    htmlZipApi.back();

Execute Showcase Home Button:

    //navigate to the portfolio listing screen (home)
    htmlZipApi.home();

Execute Showcase Share Button:

    //navigate to the portfolio listing screen (share)
    htmlZipApi.share();


See `simple-example/index.html` for a more practical example.


### Make a Zip in Linux or macOS

Sample command line syntax (assuming `simple-example` has `index.html` in it):

    cd javascript-api/simple-example
    zip -r ../simple-example.html.zip *


Or for the quotes sample:

    cd javascript-api/quotes
    zip -r ../quotes.html.zip *


## Developer Notes

```bash
cd ~/sc/showcase-workshop-apis/html-zip-api
npm run test
npm version patch
npm publish
# commit & push
```