#DRAFT

# Showcase Workshop Analytics API

An endpoint to retrieve Showcase Analytics data which has been captured by Showcase client apps and delivered to the Showcase Workshop web app.

All datetime parameters are formatted using ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ

Clients should anticipate new fields being added to the API in the future. However, existing fields will not be removed.

Events share a number of fields in common, however several fields may only be populated for a subset of events. The common fields are:

* Event Type
* Received Date
* Event Identifier
* User Identifier
* User Email
* Showcase Identifier
* Showcase Name

The following unique event types may be returned, along with additional fields which may be populated.

* **showcase_open** - A Showcase was opened.
	* Event Date
	* Showcase Version
* **slide_view** - A slide was viewed.
	* Event Date
	* Showcase Version
	* Slide Name
* **file_view** - A file (e.g. pdf, video, or document) was viewed.
	* Event Date
	* Showcase Version
	* File Identifier
	* File Name
* **file_share** - A File was shared.
	* File Identifier
	* File Name
	* Shared To Email
	* Shared To Name
* **showcase_share** - A Showcase was shared for viewing online.	* Shared To Email
	* Shared To Name
* **shared_showcase_view** - A Shared Showcase was viewed.
	* Event Date
	* Shared To Email
	* Shared To Name
* **shared_file_view** - A Shared File or Showcase was viewed.
	* Event Date
	* File Identifier
	* File Name
	* Shared To Email
	* Shared To Name
* **shared_file_download** - A Shared File was downloaded.
	* Event Date
	* File Identifier
	* File Name
	* Shared To Email
	* Shared To Name


## Authorization

Get your developer key from the *Settings/Workshop* tab in Showcase Workshop.

Append `access_token` as a get parameter to every request.  eg:

    $ curl https://app.showcaseworkshop.com/api/v1/analytics/?access_token=DEV_KEY

If the key is bad you will get an `HTTP 401` error.

##Request

### List Analytics End Point
  > GET /api/v1/analytics

### Parameters

- **since_received_date:** (String, optional) Limits analytics data to that received by Showcase web app since the provided date, inclusive. Defaults to 30 days ago if ommitted or a future date. If greater than 1 year ago, changed to being 1 year ago.
- **results_limit:** (Integer, optional) Provide an upper limit to number of events returned. If not present, defaults to 1000. Values greater than 1000 are ignored.

### Example: 

    $ curl https://app.showcaseworkshop.com/api/v1/analytics/?access_token=DEV_KEY&since_received_date=2013-01-28T13:01:01Z&results_limit=100

##Response

###Status
  > 200 Ok
  
Gathers analytic events, ordered by **event_received_date** inclusive, and returns results.

###Parameters

- **since_received_date:** (String) The *since_received_date* used in the query. Will be either that provided by the caller, or an inferred one.
- **next_since_received_date:** (String, optional) Acts as a paging key. If the number of returned results is the *results_limit* and there is additional data to return, then the value here should be used as the *since_received_date* in the follow-up query.
- **events:** (Array) Events sorted by *event_received_date*.
  - **event_type:** (String) One of the event types listed in this API description. E.g. *showcase_view, slide_view*, etc.
  - **event_received_date:** (String) The time when the event was received by Showcase web app (this may differ substantially from *event_date*, because devices may be offline when Showcase is in use).
  - **event_date:** (String, optional) The time when the event occurred, according to each devices clock. Not available for all events.
  - **event_id:** (String) Unique identifier for the event.
  - **user_id:** (Integer) Identifier of the user.
  - **user_email:** (String) Email of the user.
  - **showcase_id:** (Integer) Unique identifier of the Showcase.
  - **showcase_name:** (String) Name of the Showcase.
  - **showcase_version:** (Integer, optional) Version of the Showcase. Populated for *showcase_view*, *slide_view* and *file_view* events.
  - **slide_name:** (String, optional) E.g. "glam_rock.png" - if the slide has a background image. Populated for *slide_view* events if the slide's background image exists.
  - **file_id:** (Integer, optional) Unique identifier for the resource. Populated for *file_view*, *file_share*, *shared_file_view* and *shared_file_download* events.
  - **file_name:** (String, optional) E.g. "Pricelist.pdf". Populated whenever **file_id** is populated.
  - **shared_to_email:** (String, optional) The email address of the sharing event recipient. Populated for *file_share*, *showcase_share*, *shared_showcase_view*, *shared_file_view*, *shared_file_download*.
  - **shared_to_name:** (String, optional) The name of the email address recipient, if available. May be populated for the same event types as **shared_to_email**.

###Example

```json
{
	"since_received_date" : "2013-01-28T13:01:01Z",
	"next_since_received_date" : "2013-04-30T00:00:00Z",
	"events" : [
		{
			"event_type" : "file_view",
			"event_received_date" : "2013-02-28T13:01:01Z",
			"event_date" : "2013-01-28T13:01:01Z",
			"event_id" : "CD0ABF7D-FB62-4558-92E6-225323DC9227",
			"user_id" : 67823,
			"user_email" : "bob.smith@company.com",
			"showcase_id" : 72820,
			"showcase_name" : "Sales Showcase",
			"showcase_version" : 12,
			"slide_name" : "glam_rock.png",
			"file_id" : 387826,
			"file_name" : "Pricelist.pdf"
		},
		{
			"event_type" : "shared_file_view",
			"event_received_date" : "2013-04-28T13:06:01Z",
			"event_date" : "2013-03-30T21:01:01Z",
			"event_id" : "B858B7E9-9B06-48D3-9F4C-D3E1E94BA334",
			"user_id" : 67823,
			"user_email" : "bob.smith@company.com",
			"showcase_id" : 72820,
			"showcase_name" : "Sales Showcase",
			"file_id" : 387826,
			"file_name" : "Pricelist.pdf",
			"shared_to_email" : "john.black@company.com",
			"shared_to_name": "John Black"
		},
		...
	]
}
```  

###Status
  > 400 Bad Request
  
The format of the request, or the data in the parameters, was invalid. For example **since_received_date** was unparseable.

####Parameters

None

