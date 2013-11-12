

Showcase Javascript Data API
============================

The data API allows storage of key value pairs into the device memory.  This memory is kept only on the current device until the
Showcase app is removed or reinstalled.  Individual keys can be sent to the remote Showcase server.  These remotely
saved keys and values are available from the server API.

The key value model allows for maximum flexibility to program against as anything that can be serialised to a string
can be stored and retrieved from device memory.


Setup:

    // make sure the showcase-data.js file is included

    var sc_data = SHOWCASE_DATA();


Save or "Put" a value:

    var form_data = {'first_name': 'Bill', 'last_name': 'Cosby'};
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


See `examples/simple.html` for a more practical example.


