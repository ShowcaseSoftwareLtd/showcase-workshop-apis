Showcase Workshop REST API
==========================

See also [Showcase Workshop WebHook API](../webhook-api/README.md)

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
    
## Data type

Each data item has a "data_type" attribute which indicates to API users how to understand the data item's content.
The values `form` and `generic` are reserved for use by Showcase Workshop.


## Authorization

Get your developer key from the *Settings/Workspace* tab in Showcase Workshop.

Append `access_token` as a get parameter to every request.  eg:

    $ curl https://app.showcaseworkshop.com/main/api/v1/data/?access_token=DEV_KEY

If the key is bad you will get an `HTTP 401` error.



## List Data

    GET /main/api/v1/data/
    curl http://127.0.0.1:8000/main/api/v1/data/?access_token=a72b90a1-b35b-435b-8df9-8e97e225d955

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


### Parameters

from_date: show form data added after the date specified.  If empty all data is returned

Requests that return multiple items will be paginated to 50 items by default. You can specify further pages with
the `?page` parameter.

    $ curl https://app.showcaseworkshop.com/main/api/v1/data/?page=2

Note that page numbering is 1-based and that ommiting the ?page parameter will return the first page.


## Get data

Get an individual item of data

    GET /main/api/v1/data/{uuid}
    curl http://127.0.0.1:8000/main/api/v1/data/80489c6a-f24e-47c7-a693-aa66bb7aae28?access_token=a72b90a1-b35b-435b-8df9-8e97e225d955

    get data

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


## Add data

Add an individual item of data.

All fields are mandatory

    POST /main/api/v1/data/
    curl --data "data_name=Form1&data_type=form&showcase_id=43&user_email=bob@example.com&content={\"a\":\"string1\"}&date_entered=2013-01-28T13:01:01Z" http://127.0.0.1:8000/main/api/v1/data?access_token=a72b90a1-b35b-435b-8df9-8e97e225d955


    eg request

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


## Delete

Delete some data.

    DELETE /main/api/v1/data/{guid}
    curl -X DELETE http://127.0.0.1:8000/main/api/v1/data/80489c6a-f24e-47c7-a693-aa66bb7aae28?access_token=a72b90a1-b35b-435b-8df9-8e97e225d955

    response

        | Status: 200 OK

