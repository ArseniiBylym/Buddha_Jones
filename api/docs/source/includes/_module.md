# Modules

## All Modules

Get list of all modules

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 2,
            "moduleName": "Rate Card",
            "subModule": []
        },
        {
            "id": 1,
            "moduleName": "Spot Sent",
            "subModule": [
                {
                    "id": 5,
                    "subModuleName": "EDL for Spot"
                },
                {
                    "id": 3,
                    "subModuleName": "Finish spot sent"
                },
                {
                    "id": 4,
                    "subModuleName": "Graphics for Spot"
                },
                {
                    "id": 1,
                    "subModuleName": "Initiate Spot Sent"
                },
                {
                    "id": 2,
                    "subModuleName": "Post spot sent"
                },
                {
                    "id": 6,
                    "subModuleName": "Spot Billing"
                }
            ]
        }
    ]
}
```

> 400: error response - parameters missing

```json
{
    "status": 0,
    "message": "Parameters missing"
}
```

### HTTP Request

`GET /module`

## Get Module access

Get a module access for a user type

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 2,
            "moduleName": "Rate Card",
            "subModule": []
        },
        {
            "id": 1,
            "moduleName": "Spot Sent",
            "subModule": [
                {
                    "id": 5,
                    "subModuleName": "EDL for Spot",
                    "canAccess": true
                },
                {
                    "id": 3,
                    "subModuleName": "Finish spot sent",
                    "canAccess": false
                },
                {
                    "id": 4,
                    "subModuleName": "Graphics for Spot",
                    "canAccess": true
                },
                {
                    "id": 1,
                    "subModuleName": "Initiate Spot Sent",
                    "canAccess": true
                },
                {
                    "id": 2,
                    "subModuleName": "Post spot sent",
                    "canAccess": false
                },
                {
                    "id": 6,
                    "subModuleName": "Spot Billing",
                    "canAccess": false
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /module-access`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | user_type_id | int | null | user type id 
false | user_id | int | null | user id


### Send request like

`/module-access?user_type_id=3`



## Change user type moduel access



> Sample request

```javascript
axios.post('/module-access', {
     "user_type_id": 1,
     "sub_module_id": [1,4,5,7]
 });
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 2,
            "moduleName": "Rate Card",
            "subModule": []
        },
        {
            "id": 1,
            "moduleName": "Spot Sent",
            "subModule": [
                {
                    "id": 5,
                    "subModuleName": "EDL for Spot",
                    "canAccess": true
                },
                {
                    "id": 3,
                    "subModuleName": "Finish spot sent",
                    "canAccess": false
                },
                {
                    "id": 4,
                    "subModuleName": "Graphics for Spot",
                    "canAccess": true
                },
                {
                    "id": 1,
                    "subModuleName": "Initiate Spot Sent",
                    "canAccess": true
                },
                {
                    "id": 2,
                    "subModuleName": "Post spot sent",
                    "canAccess": false
                },
                {
                    "id": 6,
                    "subModuleName": "Spot Billing",
                    "canAccess": false
                }
            ]
        }
    ]
}
```

### HTTP Request

`POST /module-access`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | user_type_id | int | null | user type id
**true** | sub_module_id | JSON | null | json encoded string of sub module id (like: [1,4,5,7])
