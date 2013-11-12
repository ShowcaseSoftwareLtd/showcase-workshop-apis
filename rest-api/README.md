Showcase Workshop REST API
==========================

The API conforms to [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) design
principles. You interact with API by accessing URIs
using the HTTP verbs (GET, POST, PUT, and DELETE).

The server will always respond with JSON data.

HTTP statuses returned

    200 ok
    401 unauthenticated
    403 unauthorized
    404 not found
    500 server error


## Authorization

Get your developer key from the *Settings/Workspace* tab in Showcase Workshop.

Append `access_token` as a get parameter to every request.  eg:

    $ curl https://app.showcaseworkshop.com/main/api/v1/data/?access_token=DEV_KEY

If the key is bad you will get an `HTTP 401` error.



## List Form Data

    GET /main/api/v1/data/

    listing

    eg response:

        | Status: 200 OK

        [
            {
                guid: "abcdefsdfsdfdsfdsf434234dfw4rrsd"
                date_inserted: "2013-01-28T13:01:01+00:00"  /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
                form_name: "Form1"
                showcase_name: "My Showcase"
            },
            ... more items
        ]


### Parameters

from_date: show form data added after the date specified.  If empty all data is returned

Requests that return multiple items will be paginated to 50 items by default. You can specify further pages with
the `?page` parameter.

    $ curl https://app.showcaseworkshop.com/main/api/v1/data/?page=2

Note that page numbering is 1-based and that ommiting the ?page parameter will return the first page.


## Get individual form data

    GET /main/api/v1/data/{uuid}

    get data

    eg response:

        | Status: 200 OK

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


## Add data

Add an individual item of data.

All fields are mandatory

    POST /main/api/v1/data/

    eg request

        {
            form_name: "Form1",
            showcase_id: 1234,
            user_email: "bob@example.com",
            content: "{ a: \"string1\" }",
            date_entered: "2013-01-28T13:01:01+00:00"   /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
        }

    response

        | Status: 200 OK

        {
            guid: "abcdefsdfsdfdsfdsf434234dfw4rrsd",
            date_inserted: "2013-01-28T13:01:01+00:00",  /* date format ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ */
            form_name: "Form1",
            user_email: "bob@example.com",
            showcase_name: "My Showcase",
            showcase_id: 1234,
            content: "{ a: \"string1\" }"
        }


## Delete

Delete some data.

    DELETE /main/api/v1/data/{guid}

    response

        | Status: 200 OK

