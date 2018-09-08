# Time entry permission


## Get time entry permission of user type

Retrieve list of time entry permission of user type.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 7,
    "object_count": 7,
    "data": [
        {
            "id": 2,
            "typeName": "Admin Manager"
        },
        {
            "id": 8,
            "typeName": "Editorial Manager"
        },
        {
            "id": 11,
            "typeName": "Games Manager"
        },
        {
            "id": 15,
            "typeName": "HR"
        },
        {
            "id": 16,
            "typeName": "IT"
        },
        {
            "id": 17,
            "typeName": "IT Manager"
        },
        {
            "id": 25,
            "typeName": "Senior Management"
        }
    ]
}
```

### HTTP Request

`GET /time-entry-permission`


## Add/change time entry permission

Add or change time entry permission of user type

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful"
}
```

### HTTP Request

`POST /time-entry-permission`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
true | user_type_ids | JSON string | null | JSON encoded string of ids (like [2,8,11,15,16,17,25])