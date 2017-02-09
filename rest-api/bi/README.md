
# Showcase Workshop BI API

Extract the raw data from your workshop so that you can include it in your for Business Intelligence Systems.


## General

Root URL is `https://app.showcaseworkshop.com`

### Authentication

All API calls are over HTTPS and are for a single Workshop.  With each request a `workshop_uid` and an `access_token ` must be supplied. These will be used to identify the workshop and authenticate the request.

eg `GET https://app.showcaseworkshop.com/api/v1/bi/users?workshop_uid=xxx&access_token=yyy`

### Formats

The APIs will always return JSON.  Dates will be returns as strings in ISO 8601 format: `YYYY-MM-DDTHH:MM:SS.SSSSSSZ` eg `2015-01-21T00:51:48.000000Z`

Blank fields are returned as `null` instead of being excluded.

`deleted_at` fields that are not null, indicate that this object is deleted.

### Errors

Standard HTTP errors are returned under error conditions.  

  - `400` Invalid request 
  - `404` Not found 
  - `401` Authentication incorrect
  - `403` You do not have enough permissions
  - `500` Server had an error 

Note, every response object will have a status field that will denote if the request was successful.  At present it is reserved for future use, so that we can report more complex errors than HTTP status codes.  When checking the response to an API call is valid you must always check that the HTTP response code is `200`.


### Pagination

For simplification result lists are returned in sets of 100 or 1,000 (documented with each endpoint) and can 
be a `start` parameter can be used to move through the result set. 

If the results were returned in batches of 100 then omitting the `start` parameter will return from 1-100. `?start=100` will return from 100-200.


## API Paths

### /api/v1/bi/users

Output an array of all users (100 per request) within the workshop with the user information.
It will also provide info on the groups they are in and showcases that they have access to.

```
{
    "status": "ok",
    "users": [{
        "id": 62141,
        "first_name": "Frznk”,
        "last_name": "Zappa",
        "email": "frankzappa@example.com",
        "country": "New Zealand",
        "role": "Editor",  /* one of Admin, Editor, Viewer */
        "groups": [525, 523],
        "can_access_showcases": [123, 34],
        "inserted_at": "2016-10-05T16:10:44.000000Z",
        "deleted_at": null,
    }]
}
```

### /api/v1/bi/groups

Output an array of all groups (1,000 per request) for the workshop.
Group ID’s are unique to groups across all workshops.

```
{
	"status": "ok",
    "groups": [{
	"id": 525,
		"name": "USA",
		"inserted_at": "2016-10-05T16:10:44.000000Z",
		"deleted_at": null
	},{
		"id": 523,
		"name": "CAN",
		"inserted_at": "2016-10-05T16:10:44.000000Z",		
		"deleted_at": "2016-10-05T16:12:44.000000Z"
	}]
}
```

### /api/v1/bi/files

Output an array of the files (1,000 per request) in the workshop with information.
File ID’s are unique to files across all workshops.

```
{
	"status": "ok",
	"files":[{
		"id": 1,
		"name": "Lorem.mp4",
		"type": "movie",
		"bytesize": 2000,
		"inserted_at": "2016-10-05T16:10:44.000000Z",
		"deleted_at": null
	},{
		"id": 2,
		"name":"Ipsum.xls",
		"type":"document",
		"bytesize": 1234,
		"inserted_at":"2016-10-05T16:10:44.000000Z",
		"deleted_at":null
	}]
}
```

### /api/v1/bi/detailed_showcases

Output an array of all showcases (100 per request) in a workshop with information about the showcase and slides.
It will also show files available to be shared and the files that are on the slides
Showcase ID’s are unique to showcases across all workshops. Slide ID’s are unique to slides across all workshops.

```
{
	"status": "ok",
	"showcases": [{
        "id": 525,
		"title": "Showcase ICT",
		"inserted_at": "2016-10-05T16:10:44.000000Z",
		"deleted_at": null,
		"opening_video_file_id": 23,
		"opening_slideshow_id": 43,
		"slides": [{
			"id": 525,
			"slideshow_id": 43,
			"name": "hello",
            "sort_order": 0,
			"inserted_at": "2016-10-05T16:10:44.000000Z",
			"deleted_at": null
			"target_file_ids: [1153, 3753],
			"target_slide_ids: [2, 6, 99]
		},{
			"id": 523,
			"slideshow_id": 44,
			"name": "world",
			"sort_order": 0,
			"inserted_at": "2016-10-05T16:10:44.000000Z",
			"deleted_at": "2016-10-05T16:12:44.000000Z"
			"target_file_ids": []
			"target_slide_ids: []
		}],
		"shareable_files": [23, 45]
	}]
}
```

Notes:

  - `showcases[x].opening_video_file_id`: Denotes the video (if any) that will play when the showcase is first opened.
  - `showcases[x].opening_slideshow_id`: Denotes the slideshow that will show when the showcase is first opened.  A slideshow is simply a group of slides sorted by `sort_order`.
  - `showcases[x].shareable_files`: Lists file id's that are shareable from the sharing dialog inside that showcase.  Showcases can also be configured to allow sharing of any PDF file that is included as a `target_file_id`.
  - `showcases[x].slides[y].sort_order`: Integer representing order to present the slides in.  
  - `showcases[x].slides[y].target_file_ids`: Slides can optionally link to files, these are listed in this array of file_ids.  
  - `showcases[x].slides[y].target_slide_ids`: Slides can optionally link to other slides, these are listed in this array of slide_ids.  


### /api/v1/bi/shared?from={date}

Output an array of information for the files have been shared (100 per request), including the time and recipient.
Shared ID’s are unique to shares across all workshops.

Optionally you can specify results from a certain date (`from` parameter specified as a ISO 8601 string)

```
{
	"status": "ok",
	"shared": [{
		"id": 263,
		"inserted_at": "2016-10-05T16:10:44.000000Z",
		"shared_file_ids": [251, 2],
		"user_id": 2,
		"recipient_email": "mrt_ateam@example.com",
		"recipient_name": "Mr T"
	},{
		"id": 256,
		"inserted_at": "2016-10-05T16:10:44.000000Z",
		"shared_file_ids": [251, 2],
		"user_id": 5,
		"recipient_email": "ang_airbender@example.com",
		"recipient_name": "Ang"
	},{
		"id": 6253,
		"inserted_at": "2016-10-05T16:10:44.000000Z",
		"shared_file_ids": [251, 2],
		"user_id": 1,
		"recipient_email": "MulanMulan@example.com",
		"recipient_name": "Fa Mulan"
	}]
}
```

Notes:

  - `shared[x].recipient_name`: may be empty or `null` if the user did not specify it.


## /api/v1/bi/analytics_events?from={date}

Output an array of all events (1,000 per request) from a certain date (`from` parameter specified as a ISO 8601 string) like workshop id, user id, showcase id etc.

Event ID’s are unique to events across all workshops.

Event types:

  - `slide_view`: User views a slide
  - `file_view`: User views a file
  - `showcase_open`: User opens a showcase
  - `share_send`: User sends files via sharing function
  - `share_page_view`: Shared user views the sharing page
  - `share_file_download`: Shared user downloads file from sharing page
  - `email_open`: sharing email was opened (where the email client tells the server it has done this)


```
{
	"status": "ok",
	"analytics_events": [{
		"id": 6814681351,
		"event_type": "file_view",
		"event_occurred_at": "2016-10-05T16:10:44.000000Z",
		"event_duration_ms": 310,
		"showcase_id": 525,
		"slide_id": 51,
		"file_id": 624,
		"user_id": 123,   /* null if related to a shared user */
		"shared_id": 123,  /* null unless related to a shared user */
		"inserted_at": "2016-10-05T16:10:44.000000Z"
	},{
		"id": 6814681351,
		"event_type": "something",
		"event_occurred_at": "2016-10-05T16:10:44.000000Z",
		"event_duration_ms": 240,
		"showcase_id": 525,
		"slide_id": 51,
		"file_id": 624,
		"user_id": null,
		"shared_id": null,
		"inserted_at": "2016-10-05T16:10:44.000000Z"
	},{
		"id": 6814681351,
		"event_type": "something",
		"event_occurred_at": "2016-10-05T16:10:44.000000Z",
		"event_duration_ms: 300,
		"showcase_id": 525,
		"slide_id": 51,
		"file_id": 624,
		"user_id": null,
		"shared_id": null,
		"inserted_at": "2016-10-05T16:10:44.000000Z"
	}]
}
```

