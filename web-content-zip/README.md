

Showcase Workshop Web Content Zip File
======================================

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




### Make a Zip in Linux or OSX

Sample command line syntax (assumming `simple-example` has `index.html` in it):

    cd javascript-api/simple-example
    zip -r sample.html.zip *



Happy Showcasing.

