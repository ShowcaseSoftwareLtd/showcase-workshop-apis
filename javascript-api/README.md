

Showcase Javascript Data API
============================

The data API allows storage of key value pairs into the device memory.  This memory is kept only on the current device until the
Showcase app is removed or reinstalled.  Individual keys can be sent to the remote Showcase server.  These remotely
saved keys and values are available from the [rest-api](../rest-api/README.md).

The key value model allows for maximum flexibility to program against as anything that can be serialised to a string
can be stored and retrieved from device memory.


Setup:

    // make sure the showcase-data.js file is included

    var sc_data = SHOWCASE_DATA();


Save or "Put" a value:

    var form_data = {'first_name': 'Totoro', 'last_name': 'Ghibli'};
    sc_data.put('current_form_data', JSON.stringify(form_data));


Get a value:

    // register a global function for handling returned values
    sc_data.global_get_callback(function(key, val) {
        alert('got value ' + key + ' ' + val);
        if (val) {
            var form_data = JSON.parse(val);
            alert(form_data);
        }
    }
    sc_data.get('current_form_data');


Send key to remote Showcase Workshop server:

    // snapshot the current form data
    sc_data.put('form_data_20130912_0912', JSON.stringify(form_data));

    // store it remotely
    sc_data.store('form_data_20130912_0912');

Get email of the current logged in user:

    // register a function for handling returned email values
    sc_data.email_get_callback(function(email) {
        alert('got email ' + email);
    });
    sc_data.getEmail();


Hide Showcase Controls:

    // hide the Showcase Controls (Back Button and Tray Slider)
    sc_data.hideControls();

Show Showcase Controls:

    // show the Showcase Controls (Back Button and Tray Slider)
    sc_data.showControls();

Execute Showcase Back Button:

    //navigate back to the previous Showcase screen
    sc_data.back();

Execute Showcase Home Button:

    //navigate to the portfolio listing screen (home)
    sc_data.home();

Execute Showcase Share Button:

    //navigate to the portfolio listing screen (share)
    sc_data.share();


See `simple-example/index.html` for a more practical example.


### Make a Zip in Linux or macOS

Sample command line syntax (assuming `simple-example` has `index.html` in it):

    cd javascript-api/simple-example
    zip -r ../simple-example.html.zip *


Or for the quotes sample:

    cd javascript-api/quotes
    zip -r ../quotes.html.zip *
