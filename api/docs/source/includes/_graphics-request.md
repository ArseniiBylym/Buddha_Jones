# Graphics Request


## Get All Graphics Request Status

Retrieve list of graphics request status.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "name": "Draft"
        },
        {
            "id": 2,
            "name": "Approved"
        },
        {
            "id": 3,
            "name": "Accepted"
        }
    ]
}
```

### HTTP Request

`GET /graphics-request-status`


## Get Graphics Request list

Retrieve list of graphics request.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 2,
    "object_count": 2,
    "data": [
        {
            "id": 3,
            "projectId": 1,
            "projectName": "Babysitter",
            "campaignId": 2,
            "campaignName": "Trailer",
            "spotId": 3,
            "spotName": "Puddin",
            "versionId": 4,
            "versionName": "1 Alt",
            "resolution": "some reg",
            "resolutionNote": "res note",
            "frameRate": "fr",
            "priority": "pr",
            "priorityDate": "2017-04-05 00:00:00",
            "burnIn": null,
            "finisherId": null,
            "finisher": "",
            "formatComped": null,
            "formatTextless": null,
            "formatKeyable": null,
            "checkerDue": null,
            "checkerDueDate": null,
            "finalRendersDue": null,
            "finalRendersDueDate": null,
            "finishingAt": null,
            "finishingContact": null,
            "projectCollect": null,
            "projectCollectNote": null,
            "stereoFinish": null,
            "stereoFinishNote": null,
            "note": "some note",
            "statusId": 1,
            "status": "Draft",
            "createdByUserId": 1,
            "createdByUser": "Suda Sampath",
            "createdAt": "2017-07-19 17:23:59",
            "updatedAt": null
        },
        {
            "id": 5,
            "projectId": 1,
            "projectName": "Babysitter",
            "campaignId": 2,
            "campaignName": "Trailer",
            "spotId": 3,
            "spotName": "Puddin",
            "versionId": 4,
            "versionName": "1 Alt",
            "resolution": "some reg",
            "resolutionNote": "res note",
            "frameRate": null,
            "priority": null,
            "priorityDate": null,
            "burnIn": null,
            "finisherId": null,
            "finisher": "",
            "formatComped": null,
            "formatTextless": null,
            "formatKeyable": null,
            "checkerDue": null,
            "checkerDueDate": null,
            "finalRendersDue": null,
            "finalRendersDueDate": null,
            "finishingAt": null,
            "finishingContact": null,
            "projectCollect": null,
            "projectCollectNote": null,
            "stereoFinish": null,
            "stereoFinishNote": null,
            "note": "some note",
            "statusId": 1,
            "status": "Draft",
            "createdByUserId": 1,
            "createdByUser": "Suda Sampath",
            "createdAt": "2017-07-19 17:29:26",
            "updatedAt": null
        }
    ]
}
```

### HTTP Request

`GET /graphics-request`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | length | int | 10 | Limit number of returned results
false | offset | int | 0 | Offset returned results
false | status_id | int | null | Status id for filter
false | sort | string | status | Sort by (send 'status', 'createdat')
false | sort_order | string | ASC | Sort order (send 'ASC', 'DESC')


## Get single Graphics Request

Retrieve single graphics request based on its ID.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 6,
        "projectId": 1,
        "campaignId": 2,
        "spotId": 3,
        "versionId": 4,
        "resolution": "some reg",
        "resolutionNote": "res note",
        "frameRate": null,
        "priority": null,
        "priorityDate": null,
        "burnIn": null,
        "finisherId": "1",
        "formatComped": "fc",
        "formatTextless": "ftl",
        "formatKeyable": "fka",
        "checkerDue": "cd",
        "checkerDueDate": "2017-03-09 00:00:00",
        "finalRendersDue": "frd",
        "finalRendersDueDate": "2017-09-08 00:00:00",
        "finishingAt": "fa",
        "finishingContact": "fc",
        "projectCollect": null,
        "projectCollectNote": "pcn",
        "stereoFinish": null,
        "stereoFinishNote": "sfn",
        "note": "some note",
        "statusId": 1,
        "createdByUserId": 1,
        "createdAt": "2017-07-19 17:30:31",
        "updatedAt": null,
        "files": [
            "file 1",
            "file 2",
            "file 5"
        ]
    }
}
```


### HTTP Request

`GET /graphics-request/[:graphics_request_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | graphics_request_id | int | null | Narrow response to single Graphics with specific ID





## Create Graphics Request

Create a new graphics request with user entered data.

> Sample request

```javascript
axios.post('/graphics-request', {
    project_id:1,
    campaign_id:2,
    spot_id:3,
    version_id:4,
    resolution:'some reg',
    resolution_note:"res note",
    status_id:1,
    note:"some note",
    finisher_id:1,
    format_comped:fc,
    format_textless:ftl,
    format_keyable:fka,
    checker_due:cd,
    checker_due_date:'2017-03-09',
    final_renders_due:frd,
    final_renders_due_date:'2017-09-08',
    finishing_at:fa,
    finishing_contact:fc,
    project_collect:0,
    project_collect_note:pcn,
    stereo_finish:1,
    stereo_finish_note:sfn,
    files:["file 1","file 2","file 5"] ,
    urgent: 0
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "id": 8,
        "projectId": 1,
        "campaignId": 2,
        "spotId": 3,
        "versionId": 4,
        "resolution": "some reg",
        "resolutionNote": "res note",
        "frameRate": null,
        "priority": null,
        "priorityDate": null,
        "burnIn": null,
        "finisherId": "1",
        "formatComped": "fc",
        "formatTextless": "ftl",
        "formatKeyable": "fka",
        "checkerDue": "cd",
        "checkerDueDate": "2017-03-09 00:00:00",
        "finalRendersDue": "frd",
        "finalRendersDueDate": "2017-09-08 00:00:00",
        "finishingAt": "fa",
        "finishingContact": "fc",
        "projectCollect": null,
        "projectCollectNote": "pcn",
        "stereoFinish": 1,
        "stereoFinishNote": "sfn",
        "note": "some note",
        "statusId": 1,
        "createdByUserId": 1,
        "createdAt": "2017-07-19 18:25:37",
        "updatedAt": null,
        "files": [
            "file 1",
            "file 2",
            "file 5"
        ]
    }
}
```

### HTTP Request

`POST /graphics-request`

### Query Parameters

#### Common param for Design and Finishing

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project Id
false | campaign_id | int | null | Campaign Id
false | spot_id | int | null | Spot Id
false | version_id | int | null | Version Id
false | resolution | string | null | Resolution
false | resolution_note | string | null | Resolution note
false | note | string | null | Note
false | status_id | int | 1 | Status
false | files | string | null | File names (JSON encoded string of file name)
false | urgent | int | 0 | Urgent or not(1=urgent, 0=not urgnet)
false | in_house | int | 1 | In house or not


#### Param for Design

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | frame_rate | string | null | Frame Rate
false | priority | string | null | Priority (send either priority or priority_date)
false | priority_date | string | null | Priority Date (send either priority or priority_date)
false | burn_in | string | null | Burn in


#### Param for Finishing

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true*** | finisher_id | int | null | Finisher user id
false | format_comped | string | null | Format comped
false | format_textless | string | null | Format textless
false | format_keyable | string | null | Format keyable
false | checker_due | string | null | Checker due (send one of checker_due or checker_due_date)
false | checker_due_date | date | null | Checker due date (send one of checker_due or checker_due_date)
false | final_renders_due | string | null | Final renders due (send either final_renders_due or final_renders_due_date)
false | final_renders_due_date | date | null | Final renders due date (send either final_renders_due or final_renders_due_date)
false | finishing_at | string | null | Finishing at
false | finishing_contact | string | null | Finishing contact
false | project_collect | boolean | null | Project collect (send 0 or 1)
false | project_collect_note | string | null | Project collect note
false | stereo_finish | boolean | null | Stereo finish (send 0 or 1)
false | stereo_finish_note | string | null | Stereo finish note


## Update Graphics Request

Update an existing graphics request with user entered data.

> Sample request

```javascript
axios.put('/graphics-request/2', {
       project_id:1,
       campaign_id:2,
       spot_id:3,
       version_id:4,
       resolution:'some reg',
       resolution_note:"res note",
       status_id:1,
       note:"some note",
       finisher_id:1,
       format_comped:fc,
       format_textless:ftl,
       format_keyable:fka,
       checker_due:cd,
       checker_due_date:'2017-03-09',
       final_renders_due:frd,
       final_renders_due_date:'2017-09-08',
       finishing_at:fa,
       finishing_contact:fc,
       project_collect:0,
       project_collect_note:pcn,
       stereo_finish:1,
       stereo_finish_note:sfn,
       files:["file 1","file 2","file 5"] 
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "id": 2,
        "projectId": 1,
        "projectName": "Babysitter",
        "campaignId": 2,
        "campaignName": "Trailer",
        "spotId": 3,
        "spotName": "Puddin",
        "versionId": 4,
        "versionName": "1 Alt",
        "resolution": "some reg",
        "resolutionNote": "res note",
        "frameRate": null,
        "priority": null,
        "priorityDate": null,
        "burnIn": null,
        "finisherId": "1",
        "finisher": "Suda Sampath",
        "formatComped": "fc",
        "formatTextless": "ftl",
        "formatKeyable": "fka",
        "checkerDue": "cd",
        "checkerDueDate": "2017-03-09 00:00:00",
        "finalRendersDue": "frd",
        "finalRendersDueDate": "2017-09-08 00:00:00",
        "finishingAt": "fa",
        "finishingContact": "fc",
        "projectCollect": null,
        "projectCollectNote": "pcn",
        "stereoFinish": 1,
        "stereoFinishNote": "sfn",
        "note": "some note",
        "statusId": 1,
        "status": "Draft",
        "createdByUserId": 1,
        "createdByUser": "Suda Sampath",
        "createdAt": "2017-07-19 20:42:12",
        "updatedAt": null,
        "files": [
            "file 1",
            "file 2",
            "file 5"
        ]
    }
}
```

### HTTP Request

`PUT /graphics-request/[:graphics_reqeust_id]`

### Query Parameters


#### Common param for Design and Finishing

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | graphics_request_id | int | null | Graphics reqeust id
false | project_id | int | null | Project Id
false | campaign_id | int | null | Campaign Id
false | spot_id | int | null | Spot Id
false | version_id | int | null | Version Id
false | resolution | string | null | Resolution
false | resolution_note | string | null | Resolution note
false | note | string | null | Note
false | status_id | int | 1 | Status
false | files | string | null | File names (JSON encoded string of file name)
false | urgent | int | 0 | Urgent or not(1=urgent, 0=not urgnet)
false | in_house | int | 1 | In house or not

#### Param for Design

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | frame_rate | string | null | Frame Rate
false | priority | string | null | Priority (send either priority or priority_date)
false | priority_date | string | null | Priority Date (send either priority or priority_date)
false | burn_in | string | null | Burn in


#### Param for Finishing

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | finisher_id | int | null | Finisher user id
false | format_comped | string | null | Format comped
false | format_textless | string | null | Format textless
false | format_keyable | string | null | Format keyable
false | checker_due | string | null | Checker due (send one of checker_due or checker_due_date)
false | checker_due_date | date | null | Checker due date (send one of checker_due or checker_due_date)
false | final_renders_due | string | null | Final renders due (send either final_renders_due or final_renders_due_date)
false | final_renders_due_date | date | null | Final renders due date (send either final_renders_due or final_renders_due_date)
false | finishing_at | string | null | Finishing at
false | finishing_contact | string | null | Finishing contact
false | project_collect | boolean | null | Project collect (send 0 or 1)
false | project_collect_note | string | null | Project collect note
false | stereo_finish | boolean | null | Stereo finish (send 0 or 1)
false | stereo_finish_note | string | null | Stereo finish note


## Assign graphics request to designer

Assign graphics request to designer.

> Sample request

```javascript
axios.post('/graphics-request-assign', {
    graphics_request_id: 14,
    assigned_to_user_id: [1,2,4,10]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`POST /graphics-request-assign`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | graphics_request_id | int | null | Graphics request id
**true** | assigned_to_user_id | int/JSON encoded string | null | Send single user id or JSON encode string of usre ids


## Delete Graphics request assign

Delete existing graphics request assignment.


> Sample request

```javascript
axios.delete('/graphics-request-assign/21');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successfully."
}
```

### HTTP Request

`PUT /graphics-request-asign/[:graphics_requst_assign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | graphics_request_assign_id | int | null | Graphics request assign id

## Accept graphics request(for designer)

Accept an assigned graphice request.

> Sample request

```javascript
axios.post('/graphics-request-accept', {
    graphics_request_id: [14,16]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`POST /graphics-request-accept`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | graphics_request_id | int/JSON encoded string | null | Graphics request id
