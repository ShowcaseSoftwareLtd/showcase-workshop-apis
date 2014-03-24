Showcase Workshop Data API
==========================

A simple data storage API for use by web content which has been loaded into a Showcase. At present web content
is only viewable via the Showcase Workshop iPad and iPhone Viewers.

[Showcase Workshop](http://www.showcaseworkshop.com) is an elegant and versatile content management and 
distribution system for business users of iPads and other tablets.

## Web Content Zip File

See [web-content-zip/README.md](web-content-zip/README.md)

## Javascript Data API

See [javascript-api/README.md](javascript-api/README.md)

## REST API

See [rest-api/README.md](rest-api/README.md)

## WebHook API

See [webhook-api/README.md](webhook-api/README.md)

## Pop Up Form

In the target of a hotspot enter the following as a URL for a simple email form:

    showcaseform://{"name":"simple1","fields":[{"name":"email","mandatory":"true","label":"Email","description":"Enter your email"}]}

Name and email:

    showcaseform://{"name":"simple2","fields":[{"name":"name","mandatory":"true","label":"Name","description":"Enter your full name"},{"name":"email","mandatory":"true","label":"Email","description":"Enter your email"}]}


Note, this feature is enabled on iPad and iPhone versions of the viewer app.