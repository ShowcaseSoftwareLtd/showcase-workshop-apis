# Showcase Workshop BI API

Extract the raw data from your workshop so that you can include it in your for Business Intelligence Systems.

## General

Root URL is `https://app.showcaseworkshop.com`

### Authentication

All API calls are over HTTPS and are for a single Workshop.  With each request a `workshop_uid` and an `access_token` must be supplied. These will be used to identify the workshop and authenticate the request.

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

For simplification result lists are returned in sets of 100 or 1,000 (documented with each endpoint).

**Most endpoints** use offset-based pagination with a `start` parameter:

- If the results were returned in batches of 100 then omitting the `start` parameter will return from 1-100. `?start=100` will return from 100-200.

**Analytics events endpoint** uses cursor-based pagination with an `after_id` parameter for better performance:

- See the `/api/v1/bi/analytics_events` section for details on cursor-based pagination.

## API Paths: GET

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
For which groups and users can access each showcase, see `/api/v1/bi/presentations` and `/api/v1/bi/presentations/{id}`.

#### Parameters

| Parameter     | Type   | Details                                                                                                                                                                                                                                                                  |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| start         | number | Determines where to start (offset) when listing showcases. Defaults to 0 if omitted                                                                                                                                                                                      |
| per_page      | number | Determines the amount of showcases to return. Defaults to 50 if omitted or if provided with a negative value. Cannot exceed 100                                                                                                                                          |
| updated_since | string | Filter by updated_date inclusive lower bound. ISO-8601 timestamp (e.g., 2025-08-18T00:00:00Z). Missing timezone is treated as UTC                                                                                                                                        |
| updated_until | string | Filter by updated_date inclusive upper bound. ISO-8601 timestamp. Missing timezone is treated as UTC                                                                                                                                                                     |
| sort          | string | Field to sort by. Allowed: `updated_date`, `id`. Defaults to `id` ascending. If any updated_* filter is provided and sort is omitted, defaults to `updated_date` descending. When sorting by `updated_date`, ties are broken by `id` ascending to keep pagination stable |

Behavior notes

- If a record has a null `updated_date`, it won't be returned when filtering by `updated_since` or `updated_until`.
- All timestamps must be ISO-8601. If timezone is missing, values are treated as UTC.
- If only one bound is provided (`updated_since` or `updated_until`), filtering is one-sided.
- If neither `sort` nor `updated_*` filters are provided, default ordering is by `id` ascending.
- If any `updated_*` filter is provided and `sort` is omitted, default ordering is by `updated_date` descending with a stable tie-break on `id` ascending.

```
{
 "status": "ok",
 "showcases": [{
        "id": 525,
  "title": "Showcase ICT",
  "thumbnail": "https://sample.showcaseworkshop.com/sample/thumbnail/url.png",
  "inserted_at": "2016-10-05T16:10:44.000000Z",
  "updated_at": "2016-10-05T16:12:44.000000Z",
  "deleted_at": null,
  "opening_video_file_id": 23,
  "opening_slideshow_id": 43,
  "slides": [{
   "id": 525,
   "slideshow_id": 43,
   "name": "hello",
   "thumbnail": "https://sample.showcaseworkshop.com/sample/slide/thumbnail/url.png",
            "sort_order": 0,
   "inserted_at": "2016-10-05T16:10:44.000000Z",
   "updated_at": "2016-10-05T16:10:44.000000Z",
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
 }],
 "labels": {
     "72": {"bg_color": "#EABE5D", "presentation_ids": [525, 523], "id": 72, "name": "I am a label"},
     "71": {"bg_color": "#69835E", "presentation_ids": [525], "id": 71, "name": "I am a label too"}
    }
    "count": 123,
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

### /api/v1/bi/tags

Output an array of all tags (50 per request by default) in the workshop with information about each tag, its creator, and associated slides.
Results are ordered by `last_tag_date` descending.

#### Parameters

| Parameter | Type   | Details                                                                                                          |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| start     | number | Determines where to start (offset) when listing tags. Defaults to 0 if omitted                                   |
| per_page  | number | Determines the amount of tags to return. Defaults to 50 if omitted or if provided with a negative value. Cannot exceed 100 |

```
{
    "status": "ok",
    "count": 42,
    "tags": [{
        "presentation_id": 525,
        "title": "Showcase ICT",
        "tag_uid": "abc123-def456",
        "tag_name": "Important Slides",
        "last_tag_date": "2016-10-05T16:10:44.000000Z",
        "creator_email": "frankzappa@example.com",
        "creator_name": "Frank Zappa",
        "slide_count": 3,
        "slide_ids": [101, 102, 103]
    },{
        "presentation_id": 523,
        "title": "Showcase Sales",
        "tag_uid": "ghi789-jkl012",
        "tag_name": "Q4 Review",
        "last_tag_date": "2016-10-05T16:10:44.000000Z",
        "creator_email": "ang_airbender@example.com",
        "creator_name": "ang_airbender@example.com",
        "slide_count": 0,
        "slide_ids": []
    }]
}
```

Notes:

- `tags[x].presentation_id`: The showcase this tag belongs to.
- `tags[x].last_tag_date`: The most recent date a slide was added to the tag, or the tag's own updated date if no slides have been added.
- `tags[x].creator_name`: The name of the user who created the tag.  Falls back to the creator's email if no name is available.
- `tags[x].slide_ids`: List of slide IDs associated with this tag, ordered by sort order.
- `count`: The total number of tags in the workshop (useful for pagination).

### /api/v1/bi/tag_slides?tag_uid={tag_uid}

Output an array of slides for a specific tag, ordered by sort order ascending.

#### Parameters

| Parameter | Type   | Details                                            |
| --------- | ------ | -------------------------------------------------- |
| tag_uid   | string | **Required.** The unique identifier of the tag      |

```
{
    "status": "ok",
    "tag_uid": "abc123-def456",
    "slides": [{
        "slide_id": 101,
        "slide_name": "Introduction",
        "slide_uid": "slide-uid-001",
        "sort_order": 0,
        "added_at": "2016-10-05T16:10:44.000000Z",
        "thumbnail": "https://sample.showcaseworkshop.com/sample/slide/thumbnail/url.png"
    },{
        "slide_id": 102,
        "slide_name": "Overview",
        "slide_uid": "slide-uid-002",
        "sort_order": 1,
        "added_at": "2016-10-05T16:12:44.000000Z",
        "thumbnail": null
    }]
}
```

Notes:

- `slides[x].sort_order`: Integer representing the order of the slide within the tag.
- `slides[x].thumbnail`: URL for the slide thumbnail.  May be `null` if the thumbnail is unavailable.

### /api/v1/bi/presentations

Output an array of all showcases (50 per request by default) in the workshop with their access type and counts of slides and explicit access grants.
Results are ordered by `id` ascending. For the full group and user access lists of one showcase, see `/api/v1/bi/presentations/{id}` below.

#### Parameters

| Parameter         | Type    | Details                                                                                                                        |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| start             | number  | Determines where to start (offset) when listing showcases. Defaults to 0 if omitted                                            |
| per_page          | number  | Determines the amount of showcases to return. Defaults to 50 if omitted or if provided with a negative value. Cannot exceed 100 |
| include_deleted   | boolean | Include deleted showcases (non-null `deleted_at`). Defaults to false                                                           |
| include_templates | boolean | Include template showcases. Defaults to false                                                                                  |
| updated_since     | string  | Filter by updated_date inclusive lower bound. ISO-8601 timestamp (e.g., 2026-08-18T00:00:00Z). Missing timezone is treated as UTC |
| updated_until     | string  | Filter by updated_date inclusive upper bound. ISO-8601 timestamp. Missing timezone is treated as UTC                           |

```
{
    "status": "ok",
    "count": 42,
    "presentations": [{
        "id": 525,
        "title": "Showcase ICT",
        "publish_status": "published",
        "access_type": "restricted",
        "edit_access_type": "all_editors",
        "slide_count": 42,
        "group_count": 3,
        "user_count": 7,
        "inserted_at": "2016-10-05T16:10:44.000000Z",
        "updated_at": "2016-10-05T16:10:44.000000Z",
        "deleted_at": null
    }]
}
```

Notes:

- `presentations[x].access_type`: `all_users` means every user in the workshop can view the showcase. `restricted` means viewing is limited to the explicit group/user grants (plus users whose role always allows viewing, see `/presentations/{id}`).
- `presentations[x].edit_access_type`: `all_editors` means every Editor (and Admin) can edit. `restricted` means editing is limited to explicit grants (plus Admins).
- `presentations[x].group_count` / `user_count`: The number of groups / users with an explicit *view* grant. Reported as 0 when `access_type` is `all_users`, because explicit grants are ignored in that state and access is everyone.
- `presentations[x].publish_status`: Unpublished (draft) showcases are included; filter on this field if you only want published content.
- `presentations[x].updated_at` reflects changes to the showcase itself; changes to access grants alone do not update it, so do not rely on `updated_since` to detect access changes.
- `count`: The total number of showcases matching the filters (useful for pagination).

### /api/v1/bi/presentations/{id}

Output a single showcase with the full lists of groups and users that have access to it, and its slides.
Returns HTTP 404 if the showcase does not exist in the workshop. Deleted and template showcases are returned (check `deleted_at` / `template`).

#### Parameters

| Parameter      | Type    | Details                                                     |
| -------------- | ------- | ----------------------------------------------------------- |
| access         | string  | Which access rule set to report: `view` (default) or `edit` |
| include_groups | boolean | Include the `groups` array. Defaults to true                |
| include_users  | boolean | Include the `users` array. Defaults to true                 |
| include_slides | boolean | Include the `slides` array. Defaults to true                |

```
{
    "status": "ok",
    "presentation": {
        "id": 525,
        "title": "Showcase ICT",
        "publish_status": "published",
        "template": false,
        "access_type": "restricted",
        "edit_access_type": "all_editors",
        "access": "view",
        "inserted_at": "2016-10-05T16:10:44.000000Z",
        "updated_at": "2016-10-05T16:10:44.000000Z",
        "deleted_at": null,
        "groups": [{
            "id": 12,
            "name": "Sales NZ",
            "via": "direct",
            "user_count": 9,
            "granted_at": "2016-10-05T16:10:44.000000Z"
        }],
        "users": [{
            "id": 88,
            "first_name": "Fa",
            "last_name": "Mulan",
            "email": "MulanMulan@example.com",
            "role": "Viewer",
            "status": "active",
            "via": "group",
            "has_direct_grant": false,
            "group_ids": [12],
            "granted_at": null
        }],
        "slides": [{
            "id": 101,
            "name": "Welcome",
            "sort_order": 0,
            "slide_uid": "slide-uid-001",
            "slideshow_id": 5
        }]
    }
}
```

Notes:

- `users` is the list of users who can *effectively* access the showcase under the requested `access` rule set, one entry per user.
- `users[x].via`: Why the user has access. One of:
  - `role`: The user's role always grants this access (for `view`: Admin, Manager, Editor and Reporter; for `edit`: Admin only).
  - `all_users`: Granted by the showcase-wide flag (`access_type` = `all_users` grants Viewers viewing; `edit_access_type` = `all_editors` grants Editors editing).
  - `direct`: An explicit per-user grant.
  - `group`: Membership of a group with an explicit grant.
  When several reasons apply, the first matching one in the order above is reported.
- `users[x].has_direct_grant` / `group_ids`: The raw explicit assignments for the requested `access`, reported even when the user's access already comes from `role`. Use these if you only want the explicitly-assigned users ("users given access outside of a group" have `has_direct_grant` = true).
- `users[x].granted_at`: Timestamp of the user's direct grant; `null` when there is no direct grant.
- `users[x].status`: `invited` users have not yet activated their account but are counted, matching the in-app manage-access dialog.
- `groups[x].via`: `direct` for an explicit group grant; `all_users` when the showcase-wide flag is set (every workshop group is then listed, with `granted_at` = `null`).
- When the showcase-wide flag is set (`all_users` / `all_editors`), explicit grants are ignored by the app, so `via` never reports `direct`/`group` in that state even if stale grant rows exist.
- Access lists for deleted showcases describe who *would* have access; the app itself denies access to deleted showcases.
- `slides` is a lightweight list; for full slide detail (thumbnails, links, files) use `/api/v1/bi/detailed_showcases`.

## /api/v1/bi/analytics_events?from={date}&after_id={id}

Output an array of all events (1,000 per request) from a certain date (`from` parameter specified as a ISO 8601 string) like workshop id, user id, showcase id etc.

Event ID's are unique to events across all workshops.

#### Parameters

| Parameter | Type   | Details                                                                                                                                                  |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| from      | string | Filter by event_date inclusive lower bound. ISO-8601 timestamp (e.g., 2025-03-01T00:00:00.000000Z). Defaults to 1970-01-01 if omitted                  |
| after_id  | number | For pagination: returns events with id greater than this value. Pass the last `id` from the previous batch to get the next page. Defaults to 0 if omitted |

#### Pagination

Results are ordered by `id` ascending and limited to 1,000 events per request. To paginate:

1. First request: `?workshop_uid=xxx&access_token=yyy&from=2025-03-01T00:00:00.000000Z`
2. Subsequent requests: Use the last `id` from the previous batch as `after_id`
   - Example: `?workshop_uid=xxx&access_token=yyy&from=2025-03-01T00:00:00.000000Z&after_id=6814681351`

**Note:** For optimal performance, always specify a `from` date to limit the date range. Queries without a date filter may timeout on workshops with large analytics datasets.

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
