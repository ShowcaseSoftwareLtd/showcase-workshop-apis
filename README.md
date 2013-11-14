Showcase Workshop Data API
==========================

A simple data storage API for use by web content which has been loaded into a Showcase. At present web content
is only viewable via the Showcase Workshop iPad and iPhone Viewers.

[Showcase Workshop](http://www.showcaseworkshop.com) is an elegant and versatile content management and 
distribution system for business users of iPads and other tablets.

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

See [javascript-api/README.md](javascript-api/README.md)

## REST API

See [rest-api/README.md](rest-api/README.md)

## WebHook API

See [webhook-api/README.md](webhook-api/README.md)
