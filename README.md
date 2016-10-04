Showcase Workshop APIs
======================

[Showcase Workshop](https://showcaseworkshop.com) is an elegant and versatile app builder and
distribution system for business users of iPads and other tablets.

## Javascript Data API

A simple data storage API for use by web content which has been loaded into a Showcase. At present web content
is only viewable via the Showcase Workshop iPad and iPhone Viewers.

See [javascript-api/README.md](javascript-api/README.md)

## REST API

See [rest-api/README.md](rest-api/README.md)

## WebHook API

See [webhook-api/README.md](webhook-api/README.md)

## HTML Zip File

See [html-zip/README.md](html-zip/README.md)


## Showcase Form

In the target URL of a hotspot enter the following as a URL for a simple email form:

    showcaseform://{"name":"simple1","fields":[{"name":"email","mandatory":"true","label":"Email","description":"Enter your email"}]}

Name and email:

    showcaseform://{"name":"simple2","fields":[{"name":"name","mandatory":"true","label":"Name","description":"Enter your full name"},{"name":"email","mandatory":"true","label":"Email","description":"Enter your email"}]}
    
Name fields must be alphanumeric, i.e. no gaps or special characters.


Note, this feature is enabled on iPad, iPhone, Andrioid, Windows and Chrome App versions of the Showcase Workshop app.


## Showcase App Linking (incoming and outgoing)

See [app-links/README.md](app-links/README.md)

