# Staff


## Get Staff list

Retrieve list of Staff.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 3,
    "object_count": 3,
    "data": [
        {
            "id": 1,
            "name": "Assistant editor",
            "rate": 9,
            "min_hour": 8
        },
        {
            "id": 2,
            "name": "Senior editor",
            "rate": 15,
            "min_hour": 8
        },
        {
            "id": 3,
            "name": "staff one",
            "rate": 0,
            "min_hour": 8
        }
    ]
}
```

### HTTP Request

`GET /staff`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | length | int | 10 | Limit number of returned results
false | offset | int | 0 | Offset returned results
false | search | string | null | search string which will match with: name


## Get Single Staff

Retrieve single staff info by staff id.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 2,
        "name": "Senior editor",
        "rate": 15,
        "min_hour": 8
    }
}
```

### HTTP Request

`GET /staff/[:staff_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | staff_id | int | null | Bill id


## Create Staff

Create a new staff.

> Sample request

```javascript
axios.post('/staff', {
    name:"test staff",
    rate:3.50,
    min_hour: 8
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "staff_id": 18
    }
}
```

### HTTP Request

`POST /staff`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string | null | Staff name
false | rate | float | null | rate
false | min_hour | int | 8 | min hour (to calculate total for the staff)


## Update Staff

Update existing staff.


> Sample request

```javascript
axios.put('/staff/1', {
    name: 'New staff',
    rate: 8
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Staff updated successfully."
}
```

### HTTP Request

`PUT /staff`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | name | string | null | Staff name
false | rate | float | null | Rate
false | min_hour | int | null | min hour (to calculate total for the staff)
