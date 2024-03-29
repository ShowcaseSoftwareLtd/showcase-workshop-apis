

Showcase Workshop HTML Zip File
===============================

This is a `.zip` file which may contain generic web content (HTML, JavaScript, CSS, etc.). The main applications are for
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

- When an HTML.zip is displayed, the full size of the user's screen will be used (i.e., it will not be constrained to the size of the showcase).
 
- When the HTML Zip is displayed the app will display it using operating system-level browser component:
    - iOS - [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview)
    - Android - [WebView](https://developer.android.com/reference/android/webkit/WebView)
    - Browser - [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) in the browser used (see notes below))
    - Windows - [Electron WebView](https://www.electronjs.org/docs/api/webview-tag)
    - Mac - [Electron WebView](https://www.electronjs.org/docs/api/webview-tag)



### Browser display notes

When uploaded, the html.zip file is extracted on our servers and a mini-website is created.  When the user clicks the link to
view the html.zip in their browser, they are authenticated onto this mini-website, given a unique URL and a 
cookie.  This URL is valid only for this user, for 7 days, so long as the cookie is valid.

The mini-website is displayed in an `iframe` and the code in the html.zip should allow for this.


### How to author HTML .zips for Showcase

1. Put as much layup and graphics into the background png as possible (i.e. create all visual elements in
Photoshop, Illustrator or InDesign.)

2.	Write your HTML, CSS & JavaScript.  Keep in mind that your code may end up running on very old iPhones.  

3. Test your code on iOS Safari, Chrome for Android, Chrome for Windows at any screen size that your end users will be using.


### Make a Zip in Linux or macOS

Sample command line syntax (assuming `simple-example` has `index.html` in it):

    cd html-zip/sample-basic-layout
    zip -r ../sample-basic-layout.html.zip *


### Putting the HTML .zip into Showcase

Your HTML .zip file, once saved correctly with the extension `.html.zip`, needs to be uploaded into the Showcase
Workshop File Library.

To embed an HTML .zip file into a Showcase, choose a hotspot which you'd like to contain the zip; then set the target
content type to be Document; then choose the `.html.zip` file as the target document.

For assistance with any of the above, hit up helpdesk@showcaseworkshop.com.

Happy Showcasing!
