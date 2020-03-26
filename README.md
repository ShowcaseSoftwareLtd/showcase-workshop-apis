Showcase Workshop APIs
======================

[Showcase Workshop](https://showcaseworkshop.com) is an elegant and versatile presentation builder and
distribution system for business users of iPads, iPhones, Windows, Mac OS and Android.


## Javascript Data API

A simple data storage API for use by web content which has been loaded into a Showcase.

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


Note, this feature is enabled on browser, iPad, iPhone, Android, Windows and Mac versions of the Showcase Workshop app.


## Hotspot URL special variables

In the target of a hotspot, the following variables are supported:

  - `${userEmail}` - When the Showcase is previewed or viewed on a device, this variable will be replaced with the email of 
  the currently logged in user.
  - `${userInfoJwt}` - When the Showcase is previewed or viewed on a device, this variable will be replaced with a 
  [JSON Web Token](https://jwt.io) (JWT).  The JWT contains the keys `email`, `first_name` and `last_name`.  The
  'secret', used to verify the payload of the token, can be found on your workshop settings page.

This is supported progressively for clients that have had releases since February 2020.


## Showcase App Linking (incoming and outgoing)

See [app-links/README.md](app-links/README.md)

