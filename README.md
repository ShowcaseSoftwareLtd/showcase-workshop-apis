Showcase Workshop Data API
==========================

A simple data storage API for use by web content which has been loaded into a Showcase. At present web content
is only viewable via the Showcase Workshop iPad and iPhone Viewers.


## Web Content Zip File

This is a zip file which may contain generic web content (html, javascript, css, etc.). This file's contents
will be loaded within the custom browser container within the Viewer App.

The only required file is `index.html` at the root of the zip file. The custom browser container will 
initialize with this file.

If your application needs to use the showcase data api, it must include `showcase-data-api.js` (see examples).

If subfolders are included in your web content, references to content must use relative 
paths (e.g. `<script language='javascript' src='lib/jquery.js'>`).

The file name of the zip must end in `.html.zip` to be recognized by Showcase Workshop. These files need to be
uploaded into the Showcase Workshop File Library.

To embed a web content zip file into a Showcase, choose the button which will contain the web content, then set
the target content type to be Document, then choose the `.html.zip` file as the target document.


## Javascript Data API

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

