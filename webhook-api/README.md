Showcase Workshop WebHook API
=============================

See also [Showcase Workshop REST API](../rest-api/README.md)

When WebHook URL is entered in `Settings > Workspace` and data arrives via the Showcase Data API, we'll send a HTTP
POST request to the URL you've specified.

If that URL is unavailable or takes too long to respond (more than 15 seconds), we'll cancel the request, then try again a few times. You can always access the data via the REST API.

The request's POST parameters will contain JSON data relevant to the event that triggered the request.

    HTTP POST

    Body:
    {
            guid: "abcdefsdfsdfdsfdsf434234dfw4rrsd",
            date_inserted: "2013-01-28T13:01:01Z",  /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
            date_entered: "2013-01-28T13:01:01Z",   /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
            user_email: "bob@example.com",
            data_name: "Form1",
            data_type: "form",
            showcase_name: "My Showcase",
            showcase_id: 1234,
            content: "{ a: \"string1\" }"
    }

To test our Webhooks before setting up scripts, the [PostCatcher](http://postcatcher.in/) tool is an good utility that
helps you see data arrive.  Use the "Test Webhook" function in `Settings > Workspace` with a PostCatcher URL to try
this.
