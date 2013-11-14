Showcase Workshop WebHook API
=============================

See also [Showcase Workshop REST API](../rest-api/README.md)

When WebHook URL is entered in `Settings &gt; Workspace` and data arrives via the Showcase Data API, we'll send a HTTP
POST request to the URL you've specified.

If that URL is unavailable or takes too long to respond (more than 15 seconds), we'll cancel the request and try
again later.

The request's POST parameters will contain JSON data relevant to the event that triggered the request.

    HTTP POST

    Body:
    {
            guid: "abcdefsdfsdfdsfdsf434234dfw4rrsd",
            date_inserted: "2013-01-28T13:01:01+00:00",  /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
            date_entered: "2013-01-28T13:01:01+00:00",   /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
            user_email: "bob@example.com",
            form_name: "Form1",
            showcase_name: "My Showcase",
            showcase_id: 1234,
            content: "{ a: \"string1\" }"
    }

To test our Webhooks before setting up scripts, the [RequestBin](http://requestb.in/) tool is an good utility that
helps you see data arrive.  Use the "Test Webhook" function in `Settings &gt; Workspace` with a RequestBin URL to try
this.
