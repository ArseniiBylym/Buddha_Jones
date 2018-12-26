# Ratecard Type

## Get Ratecard Type List

Retrieve list of ratecard type.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "ratecardId": 2,
            "studioId": 2,
            "ratecardName": "ab",
            "ratecardNote": "some note"
        },
        {
            "ratecardId": 1,
            "studioId": 2,
            "ratecardName": "My test rate A",
            "ratecardNote": null
        }
    ]
}
```

### HTTP Request

`GET /ratecard-type`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | studio_id | int | null | Studio id

** Send it like `/ratecard-type?studio_id=1` **


## Create Ratecard type

Create a new ratecard type.

> Sample request

```javascript
axios.post('/ratecard-type', {
    studio_id: 3,
    ratecard_name: 'C',
    ratecard_note: 'some notes for test',
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "ratecardId": 8,
            "studioId": 3,
            "ratecardName": "C",
            "ratecardNote": "some notes for test"
        },
        {
            "ratecardId": 7,
            "studioId": 3,
            "ratecardName": "My test rate A",
            "ratecardNote": "some note for test"
        }
    ]
}
```

### HTTP Request

`POST /ratecard-type`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | studio_id | int | null | studio id
**true** | ratecard_name | string | null | ratecard name
false | ratecard_note | string | null | note
false | file | string (Base 64 encoded file) | null | Base 64 encoded file



## Update Ratecard type

Update a new ratecard type.

> Sample request

```javascript
axios.put('/ratecard-type/8', {
    studio_id: 3,
    ratecard_name: 'M',
    ratecard_note: 'some notes for test',
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "ratecardId": 8,
            "studioId": 3,
            "ratecardName": "M",
            "ratecardNote": "some notes for test"
        },
        {
            "ratecardId": 7,
            "studioId": 3,
            "ratecardName": "My test rate A",
            "ratecardNote": "some note for test"
        }
    ]
}
```

### HTTP Request

`PUT /ratecard-type/[:ratecard_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | studio_id | int | null | studio id
false | ratecard_name | string | null | ratecard name
false | ratecard_note | string | null | note
false | file | string (Base 64 encoded file) | null | Base 64 encoded file


## Delete Ratecard type

Delete a ratecard type.

> Sample request

```javascript
axios.delete('/ratecard-type/8');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "ratecardId": 7,
            "studioId": 3,
            "ratecardName": "My test rate A",
            "ratecardNote": "some note for test"
        }
    ]
}
```

### HTTP Request

`DELETE /ratecard-type/[:ratecard_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | ratecard_id | int | null | ratecard id


## Get Studio Ratecard list

Retrieve list of Studio ratecard.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "ratecardType": [
            {
                "ratecardId": 1,
                "studioId": 3,
                "ratecardName": "A",
                "ratecardNote": "some note"
            },
            {
                "ratecardId": 10,
                "studioId": 3,
                "ratecardName": "DD",
                "ratecardNote": "some note"
            }
        ],
        "studio": {
            "id": 3,
            "cardcode": null,
            "studioName": "HBO"
        },
        "selectedRatecardId": 1,
        "studioRateCard": [
            {
                "id": 24,
                "ratecardId": 1,
                "activityId": 1,
                "activityName": "AE Work (NOT Dailies)",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 25,
                "ratecardId": 1,
                "activityId": 4,
                "activityName": "Dailies Assembly",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 26,
                "ratecardId": 1,
                "activityId": 5,
                "activityName": "Dailies Import",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 27,
                "ratecardId": 1,
                "activityId": 8,
                "activityName": "Edit",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 28,
                "ratecardId": 1,
                "activityId": 9,
                "activityName": "Editing on Fiber",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 21,
                "ratecardId": 1,
                "activityId": 10,
                "activityName": "Fiber",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 29,
                "ratecardId": 1,
                "activityId": 10,
                "activityName": "Fiber",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 30,
                "ratecardId": 1,
                "activityId": 11,
                "activityName": "Finish Audio Mix",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 31,
                "ratecardId": 1,
                "activityId": 12,
                "activityName": "Finish Online",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 32,
                "ratecardId": 1,
                "activityId": 13,
                "activityName": "Finish Prep",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 33,
                "ratecardId": 1,
                "activityId": 14,
                "activityName": "Finish Supervision",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 34,
                "ratecardId": 1,
                "activityId": 15,
                "activityName": "Game Capture",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 35,
                "ratecardId": 1,
                "activityId": 17,
                "activityName": "Graphic Design",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 36,
                "ratecardId": 1,
                "activityId": 18,
                "activityName": "Graphic Finish",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 37,
                "ratecardId": 1,
                "activityId": 19,
                "activityName": "Graphic Styleframes/Boards",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 38,
                "ratecardId": 1,
                "activityId": 20,
                "activityName": "Graphic Work in Downtime",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 39,
                "ratecardId": 1,
                "activityId": 27,
                "activityName": "Music Cue Sheets",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 40,
                "ratecardId": 1,
                "activityId": 30,
                "activityName": "Narration Supervision",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 86,
                "ratecardId": 1,
                "activityId": 44,
                "activityName": "test abc123",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            },
            {
                "id": 41,
                "ratecardId": 1,
                "activityId": 37,
                "activityName": "Writing",
                "activityTypeId": 1,
                "activityType": "Billable",
                "trtId": null,
                "runtime": null,
                "revisionInc": null,
                "note": null,
                "type": "H",
                "rate": null
            }
        ]
    }
}
```

### HTTP Request

`GET /studio-ratecard`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | ratecard_id | int | null | ratecard id (send any of the params ratecard_id or studio_id. if ratecard_id is not sent and studio_id is sent one of the ratecard will be selcted by defaule)
**true** | studio_id | int | null | studion id(send any of the params ratecard_id or studio_id. if ratecard_id is not sent and studio_id is sent one of the ratecard will be selcted by defaule)

## Create Studio Ratecard

Create a new row for studio ratecard.

> Sample request

```javascript
axios.post('/studio-ratecard', {
    ratecard_id:1
    activity_id:4
    rate:13
    type:'H'
    trt_id:2
    revision_inc:4
    note:'test note here'
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 24,
            "ratecardId": 1,
            "activityId": 1,
            "activityName": "AE Work (NOT Dailies)",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 25,
            "ratecardId": 1,
            "activityId": 4,
            "activityName": "Dailies Assembly",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 156,
            "ratecardId": 1,
            "activityId": 4,
            "activityName": "Dailies Assembly",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": 2,
            "runtime": ":10",
            "revisionInc": 4,
            "note": "test note here",
            "type": "H",
            "rate": 13
        }
    ]
}
```

### HTTP Request

`POST /studio-ratecard`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | reatecard_id | int | null | rate card id
**true** | activity_id | int | null | activity id
**true** | rate | float | null | rate
false | type | char | null | type (H = hourly, F = flat)
false | trt_id | int | null | trt id
false | revision_inc | int | null | number of revision included
false | note | string | null | note


## Update Studio Ratecard

Update a row for studio ratecard.

> Sample request

```javascript
axios.put('/studio-ratecard/156', {
    ratecard_id:1
    activity_id:4
    rate:23
    type:'H'
    trt_id:2
    revision_inc:4
    note:'test note here'
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 24,
            "ratecardId": 1,
            "activityId": 1,
            "activityName": "AE Work (NOT Dailies)",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 25,
            "ratecardId": 1,
            "activityId": 4,
            "activityName": "Dailies Assembly",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 156,
            "ratecardId": 1,
            "activityId": 4,
            "activityName": "Dailies Assembly",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": 2,
            "runtime": ":10",
            "revisionInc": 4,
            "note": "test note here",
            "type": "H",
            "rate": 23
        }
    ]
}
```

### HTTP Request

`PUT /studio-ratecard/[:studi_rate_card_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | reatecard_id | int | null | rate card id
false | activity_id | int | null | activity id
false | rate | float | null | rate
false | type | char | null | type (H = hourly, F = flat)
false | trt_id | int | null | trt id
false | revision_inc | int | null | number of revision included
false | note | string | null | note


## Delete Studio Ratecard

Delete a row from studio ratecard.

> Sample request

```javascript
axios.delete('/studio-ratecard/156');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 24,
            "ratecardId": 1,
            "activityId": 1,
            "activityName": "AE Work (NOT Dailies)",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 25,
            "ratecardId": 1,
            "activityId": 4,
            "activityName": "Dailies Assembly",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 26,
            "ratecardId": 1,
            "activityId": 5,
            "activityName": "Dailies Import",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        },
        {
            "id": 27,
            "ratecardId": 1,
            "activityId": 8,
            "activityName": "Edit",
            "activityTypeId": 1,
            "activityType": "Billable",
            "trtId": null,
            "runtime": null,
            "revisionInc": null,
            "note": null,
            "type": "H",
            "rate": null
        }
    ]
}
```

### HTTP Request

`DELETE /studio-ratecard/[:studi_rate_card_id]`