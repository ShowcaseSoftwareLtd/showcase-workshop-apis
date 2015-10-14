

Showcase Workshop HTML Zip File
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

Forms can only be previewed in one of the apps (iOS, Windows, or the Chrome Web App), once the content is correctly
linked and the showcase is published. The web portal won't show forms via Preview or the Showcases tab.


### Make a Zip in Linux or OSX

Sample command line syntax (assumming `simple-example` has `index.html` in it):

    cd javascript-api/simple-example
    zip -r sample.html.zip *



### HTML Authoring

HTML Zips are supported in Showcase client apps for iOS, Chrome and Windows.  As such HTML you author is 
effectively running in Mobile Safari, Chrome and IE 11.  Any Javascript or CSS you create should work with these
browsers.

When creating layout it's important to note that the container width may vary in width across devices. To get 
around this problem we have found it best to use the Viewport Width css unit (vw) and not pixels (px). 

Quick tips:

  - Always use css VW units.  (px will result in inconsistent rendering across device types.
  - Use animation sparingly, devices with slow CPUs will not handle this well
  - Use as little JavaScript as possible 
  - Put as layup into background PNGs as possible (eg, put all visual elements into Photoshop)

  - Use only minimal lightweight frameworks such as: JQuery, Underscore, numeral.js, velocity, 
  bootstrap js (don't rely on CSS classes from bootstrap as they are not based on VW units!)

Test *everything* on: 

  - Chrome
  - Mobile Safari
  - Internet Explorer 11




Happy Showcasing.
