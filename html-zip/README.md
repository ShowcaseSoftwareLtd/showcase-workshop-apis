

Showcase Workshop HTML Zip File
===============================

This is a .zip file which may contain generic web content (HTML, JavaScript, CSS, etc.). The main applications are for
branded forms that capture data, or for calculators that return an output to the user.

The file's contents will be loaded within the custom browser container within the Showcase App. User experience is
therefore seamless and appears to be a natural extension of the App.


### Requirements

- The only required file is `index.html` at the root of the .zip file. The custom browser container will initialize
with this file.

- The file name of the zip must end in `.html.zip` to be recognized by Showcase Workshop.

- If your application needs to use the Showcase data API, it must include `showcase-data.js` (see examples here: 
https://github.com/ShowcaseSoftwareLtd/showcase-workshop-apis/tree/master/javascript-api).

- If subfolders are included in your web content, references to content must use relative
paths (e.g. `<script language='javascript' src='lib/jquery.js'>`).

- As with showcase menu screens, active fields or buttons should be kept away from the ‘dead zones’ of the top left, top
 right and bottom left corner.

- When an HTML.zip is display the full size of the users screen will be used (ie, it will not be constrained to the size
 of the showcase.
 
- When the HTML Zip is displayed the app will display it using operating system level browser component:
    - iOS - [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)
    - Android - [WebView](https://developer.android.com/reference/android/webkit/WebView)
    - Browser - [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in the browser used
    - Windows - [Electron WebView](https://www.electronjs.org/docs/api/webview-tag)
    - Mac - [Electron WebView](https://www.electronjs.org/docs/api/webview-tag)


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

3. As the supported apps are for iOS, Android, Windows and Browsers, any HTML you author could be effectively running in 
Mobile Safari, Android Webview, Chrome, Firefox or Edge.


### Make a Zip in Linux or macOS

Sample command line syntax (assuming `simple-example` has `index.html` in it):

    cd html-zip/sample-basic-layout
    zip -r ../sample-basic-layout.html.zip *


### Putting the HTML .zip into Showcase

Your HTML .zip file, once saved correctly with the extension `.html.zip`, needs to be uploaded into the Showcase
Workshop File Library.

To embed an HTML .zip file into a Showcase, choose the hotspot which will contain the web content, then set the target
content type to be Document, then choose the `.html.zip` file as the target document.

For assistance with any of the above, hit up helpdesk@showcaseworkshop.com.

Happy Showcasing!
