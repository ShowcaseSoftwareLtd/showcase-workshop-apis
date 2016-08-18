#DRAFT

# Showcase Workshop Analytics API

An endpoint to retrieve Showcase Analytics data which has been captured by Showcase client apps and delivered to the Showcase Workshop web app.

All datetime parameters are formatted using ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ

## Authorization

Get your developer key from the *Settings/Workshop* tab in Showcase Workshop.

Append `access_token` as a get parameter to every request.  eg:

    $ curl https://app.showcaseworkshop.com/api/v1/analytics/?access_token=DEV_KEY

If the key is bad you will get an `HTTP 401` error.

##Request

### List Analytics End Point
  > GET /api/v1/analytics

### Parameters

- **since_received_date:** (String, optional) Limits analytics data to that received by Showcase web app since the provided date, inclusive. If this parameter is not provided, a default date of 30 days ago is used.

### Example: 
```json 
{
  "since_received_date" : "2013-01-28T13:01:01Z"
}
```

##Response

###Status
  > 200 Ok
  
Returns a limit of 1000 analytics events. Queries and orders by event_date inclusive.

Note different **event_type** values cause different event data fields to be populated.

###Parameters

- **since_received_date:** (String) The *since_received_date* used in the query. Will be either that provided by the client, or an inferred one.
- **next_since_received_date:** (String, optional) If there is additional analytics data to return, i.e. all 1000 events were returned but more remain, then the value here should be used as the *since_received_date* in the follow-up query.
- **events:** (Array) Events sorted by *event_received_date*.
  - **event_type:** (String) One of 'showcase_view', 'page_view', 'resource_view'.
  - **event_received_date:** (String) When the event was received by Showcase web app (this may differ substantially from *event_date*, because devices may be offline when Showcase is in use).
  - **event_date:** (String) When the event occurred, according to each devices clock.
  - **event_id:** (Integer) Unique identifier for the event.
  - **user_id:** (Integer) Identifier of the user.
  - **user_email:** (String) Email of the user.
  - **showcase_id:** (Integer) Unique identifier of the Showcase.
  - **showcase_name:** (String) Name of the Showcase.
  - **showcase_version:** (Integer) Version of the Showcase.
  - **slide_alphanum_name:** (String, optional) E.g. A1, A2, B6. Populated for *page_view* and *resource_view* events.
  - **slide_name:** (String, optional) E.g. "glam_rock.png" - if the slide has a background image. Populated for *page_view* and *resource_view* events if the slide's background image exists.
  - **resource_id:** (Integer, optional) Unique identifier for the resource. Populated for *resource_view* events.
  - **resource_name:** (String, optional) E.g. "Pricelist.pdf". Populated for *resource_view* events.

###Example

```json
{
	"since_received_date" : "2013-01-28T13:01:01Z",
	"next_since_received_date" : "2013-04-30T00:00:00Z",
	"events" : [
		{
			"event_type" : "resource_view",
			"event_received_date" : "2013-01-28T13:01:01Z",
			"event_date" : "2013-01-28T13:01:01Z",
			"event_id" : 5552324,
			"user_id" : 67823,
			"user_email" : "bob.smith@company.com",
			"showcase_id" : 72820,
			"showcase_name" : "Sales Showcase",
			"showcase_version" : 12,
			"slide_alphanum_name" : "B6",
			"slide_name" : "glam_rock.png",
			"resource_id" : 387826,
			"resource_name" : "Pricelist.pdf"
		},
		...
	]
}
```  