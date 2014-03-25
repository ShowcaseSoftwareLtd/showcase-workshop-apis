Showcase Workshop Web Embed API
===============================

The **Web Embed API** was introduced in Showcase Workshop Webapp version 3.3. to enable Showcases to be embedded
in public web pages much the same way as YouTube videos can be.

Make sure you have the doctype set so the browser doesn't run in quirks mode:

    <!DOCTYPE html>

Dependant on JQuery (a reasonably modern copy of version 1 or 2):

    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

The plugin source:

    <script src="https://app.showcaseworkshop.com/static/web-embed-api/loader.min.js"></script>

Plugin

    <div class="showcase-web-embed"
          data-showcase-display-first-page="true"
          data-showcase-uuid="sad7-68cc-76cd-78c6-sd7c"></div>


## Options

On any `div` element with the class `showcase-web-embed` the following attributes are recognised.

  - `data-showcase-uuid`: the showcase identifier from the "manage access" screen in the workshop webapp
  - `data-showcase-icon-color`: white or black (defaults to black)
  - `data-showcase-display-first-page`: true or false (defaults to true)


Happy Showcasing!