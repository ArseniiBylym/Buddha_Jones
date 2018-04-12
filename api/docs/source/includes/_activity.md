# Activity





## Get activity list

Retrieve list of activity.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 31,
    "data": [
        {
            "id": 1,
            "name": "Assistant Editorial Work",
            "userTypeId": null,
            "descriptionRequired": null,
            "status": 1,
            "type": [
                {
                    "id": 1,
                    "activityType": "Billing"
                }
            ]
        },
        {
            "id": 2,
            "name": "Breakdown Movie",
            "userTypeId": null,
            "descriptionRequired": null,
            "status": 0,
            "type": [
                {
                    "id": 2,
                    "activityType": "Timesheet"
                }
            ]
        },
        {
            "id": 12,
            "name": "Design / Create Graphics",
            "userTypeId": null,
            "descriptionRequired": null,
            "status": 0,
            "type": [
                {
                    "id": 1,
                    "activityType": "Billing"
                }
            ]
        },
        {
            "id": 3,
            "name": "Digitize / Assemble Dailies",
            "userTypeId": null,
            "descriptionRequired": null,
            "status": 1,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ]
        },
        {
            "id": 4,
            "name": "Downtime",
            "userTypeId": null,
            "descriptionRequired": null,
            "status": 1,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ]
        },
        {
            "id": 5,
            "name": "Editorial",
            "userTypeId": null,
            "descriptionRequired": null,
            "status": 1,
            "type": [
                {
                    "id": 2,
                    "activityType": "Timesheet"
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /activity?search=a&type_id=[2,5,8]`

##### Call request like:

`GET /activity`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | search | string | null | search string which will match with: label
false | customer_id | int | null | Customer ID. If provided customer price will be returned
false | type_id | int / JSON encoded string | null | Send int or JSON encoded string
false | user_type_id | int | null | User type id




## Get activity type/level list

Retrieve list of activity type/level.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "activityType": "Billing"
        },
        {
            "id": 2,
            "activityType": "Timesheet"
        },
        {
            "id": 3,
            "activityType": "Internal"
        }
    ]
}
```

### HTTP Request

`GET /activity-level`





## Create activity

Create a new activity.

> Sample request

```javascript
axios.post('/activity', {
    type_id: [1],
    name: 'Test Activity',
    user_type_id: 1
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "activity_id": 18
    }
}
```

### HTTP Request

`POST /activity`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string | null | Activity name
**true** | type_id | JSON encoded string | null | Activity type id. Send JSON encoded string [1,2,3] 
false | user_type_id | int | null | User type id
false | status | int | 1 | Status(send 0 or 1)
false | billable | int | 0 | Status(send 0 or 1)
false | description_required | int | null | Description required from worker(send 0 or 1). Required when type_id=2 (timesheet) 


## Update Activity

Update existing activity.


> Sample request

```javascript
axios.put('/activity/1', {
    type_id: [2],
    name: 'Test Activity',
    user_type_id: 3
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Activity updated successfully."
}
```

### HTTP Request

`PUT /activity`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | name | string | null | Activity name
false | type_id | JSON encoded string | null | Activity type id. Send JSON encoded string [1,2,3]
false | user_type_id | int | null | User type id
false | status | int | null | Status(send 0 or 1)
false | billable | int | null | Status(send 0 or 1)
false | description_required | int | null | Description required from worker(send 0 or 1). needed when type_id=2 (timesheet)

## Create activity price

Create a new activity price for customer

> Sample request

```javascript
axios.post('/activity-price', {
    type_id: 1,
    name: 'Test Activity'
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

`POST /activity-price`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | customer_id | int | null | Customer id
**true** | activity_id | int | null | Activity id
**true** | price | float / null | null | Price. Send float value or send 'null' for null

** If entry (with cusotmer_id and activity_id) already exists then price will be updated
