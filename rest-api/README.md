Showcase Workshop REST API
==========================

See also [Showcase Workshop WebHook API](../webhook-api/README.md)

See also [Analytics API](./analytics-api-v1.md)

The API conforms to [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) design
principles. You interact with API by accessing URIs
using the HTTP verbs (GET, POST, PUT, and DELETE).

The server will always respond with JSON data.

HTTP statuses returned

    200 ok
    401 unauthenticated - username or password is incorrect
    403 unauthorized - user doesn't have correct permissions
    404 not found
    500 server error
    
## Data type

Each data item has a "data_type" attribute which indicates to API users how to understand the data item's content.
The values `form` and `generic` are reserved for use by Showcase Workshop.


## Authorization

Get your developer key from the *Settings/Workshop* tab in Showcase Workshop.

Append `access_token` as a get parameter to every request.  eg:

    $ curl https://app.showcaseworkshop.com/api/v1/data/?access_token=DEV_KEY

If the key is bad you will get an `HTTP 401` error.


## Data

Generic data storage facility.  Designed to be populated via the [../javascript-api/README.md](../javascript-api/README.md)
on a device, then retrieved via your servers via this REST api.

### List Data

    GET /main/api/v1/data/
    curl https://app.showcaseworkshop.com/api/v1/data/?access_token=XXX

    listing

    eg response:

        | Status: 200 OK

        [
            {
                guid: "abcdefsdfsdfdsfdsf434234dfw4rrsd",
                date_inserted: "2013-01-28T13:01:01Z",  /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
                data_name: "Form1",
                data_type: "form",
                showcase_name: "My Showcase"
            },
            ... more items
        ]


#### Parameters

`from_date`: show form data added after the date specified.  If empty all data is returned.

    $ curl https://app.showcaseworkshop.com/api/v1/data/?access_token=XXX&&from_date=2013-11-26T00:26:54Z&page=2

Requests that return multiple items will be paginated to 50 items by default. You can specify further pages with
the `?page` parameter.

    $ curl https://app.showcaseworkshop.com/api/v1/data/?access_token=XXX&page=2

Note, page numbering is 1-based and that omitting the `?page` parameter will return the first page.


### Get data

Get an individual item of data

    GET /api/v1/data/{uuid}
    
    curl https://app.showcaseworkshop.com/api/v1/data/80489c6a-f24e-47c7-a693-aa66bb7aae28?access_token=XXX

    eg response:

        | Status: 200 OK

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


### Add data

Add an individual item of data.

All fields are mandatory

    POST /api/v1/data/
    
    curl --data "data_name=Form1&data_type=form&showcase_id=43&user_email=bob@example.com&content={\"a\":\"string1\"}&date_entered=2013-01-28T13:01:01Z" https://app.showcaseworkshop.com/api/v1/data?access_token=XXX

    eg, request

        {
            data_name: "Form1",
            data_type: "form",
            showcase_id: 1234,
            user_email: "bob@example.com",
            content: "{ a: \"string1\" }",
            date_entered: "2013-01-28T13:01:01Z"   /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
        }

    response

        | Status: 200 OK

        {
            guid: "abcdefsdfsdfdsfdsf434234dfw4rrsd",
            date_inserted: "2013-01-28T13:01:01Z",  /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
            data_name: "Form1",
            data_type: "form",
            user_email: "bob@example.com",
            showcase_name: "My Showcase",
            showcase_id: 1234,
            content: "{ a: \"string1\" }"
        }


### Delete

Delete some data.

    DELETE /api/v1/data/{guid}

    curl -X DELETE https://app.showcaseworkshop.com/api/v1/data/80489c6a-f24e-47c7-a693-aa66bb7aae28?access_token=XXX

    response

        | Status: 200 OK

