

Showcase Workshop HTML Zip File
===============================

This is a .zip file which may contain generic web content (HTML, JavaScript, CSS, etc.). The main applications are for
branded forms that capture data, or for calculators that return an output to the user.

The file's contents will be loaded within the custom browser container within the Showcase App. User experience is
therefore seamless and appears to be a natural extension of the App.


### Requirements

- At present, HTML .zips work on the Showcase iOS, Android, Windows, and Chrome Apps.

- The only required file is `index.html` at the root of the .zip file. The custom browser container will initialize
with this file.

- The file name of the zip must end in `.html.zip` to be recognized by Showcase Workshop.

- HTML .zips can only be previewed in one of the apps (iOS, Android, Windows, or the Chrome App), once the content is correctly
linked and the showcase is published. The website won't show .zips via Preview or the Showcases tab, even if the HTML
.zip has been correctly linked and published.

- If your application needs to use the Showcase data API, it must include `showcase-data-api.js` (see examples here: https://github.com/ShowcaseSoftwareLtd/showcase-workshop-apis/blob/master/javascript-api/simple-example/index.html ).

- If subfolders are included in your web content, references to content must use relative
paths (e.g. `<script language='javascript' src='lib/jquery.js'>`).

- As with showcase menu screens, active fields or buttons should be kept away from the ‘dead zones’ of the top left, top right and bottom left corner.

- The orientation of the .zip’s appearance needs to be consistent with the orientation of the showcase – e.g., an
HTML page cannot appear portrait within a landscape showcase, and vice versa.


### How to author HTML .zips for Showcase

1. Put as much layup and graphics into the background png as possible (i.e. create all visual elements in
Photoshop, Illustrator or InDesign.)

2.	Write your HTML, CSS & JavaScript.  When creating layout, it's important to note that the container width may vary
in width across devices. To get around this problem we have found it best to use the Viewport Width css unit (vw) and
not pixels (px).

   Use as little JavaScript as possible.

   Use animation sparingly.

   Use only minimal lightweight frameworks such as: JQuery, Underscore, numeral.js, velocity, bootstrap js
(don't rely on CSS classes from bootstrap, as they are not based on VW units!).

3. As the supported apps are for iOS, Android, Chrome, and Windows, any HTML you author is effectively running in Mobile Safari, Android Webview, Chrome and IE 11.

   Any Javascript or CSS you create should work with these browsers.

   Test *everything* on:
   - Chrome
   - Mobile Safari
   - Internet Explorer 11


### Make a Zip in Linux or macOS

Sample command line syntax (assuming `simple-example` has `index.html` in it):

    cd html-zip/sample-basic-layout
    zip -r ../sample-basic-layout.html.zip *


### Putting the HTML .zip into Showcase

Your HTML .zip file, once saved correctly with the extension `.html.zip`, needs to be uploaded into the Showcase
Workshop File Library.

To embed an HTML .zip file into a Showcase, choose the hotspot which will contain the web content, then set the target
content type to be Document, then choose the `.html.zip` file as the target document.

Remember, HTML .zips can only be previewed in one of the apps (iOS, Android, Windows, or the Chrome App), once the content
is correctly linked and the showcase is published. The website won't show .zips via Preview or the Showcases tab,
even if the HTML .zip has been correctly linked and published.

For assistance with any of the above, hit up helpdesk@showcaseworkshop.com.

Happy Showcasing!
