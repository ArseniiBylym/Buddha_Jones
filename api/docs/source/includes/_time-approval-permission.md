# Time approval permission


## Get time approval permission of user type

Retrieve list of time approval permission of user type.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 11,
    "object_count": 11,
    "data": [
        {
            "approverUserTypeId": 2,
            "approverUserTypeName": "Admin Manager",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 1,
                    "submittingUserTypeName": "Admin"
                },
                {
                    "submittingUserTypeId": 22,
                    "submittingUserTypeName": "Production Assistant"
                }
            ]
        },
        {
            "approverUserTypeId": 3,
            "approverUserTypeName": "AE/Finishing Manager",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 4,
                    "submittingUserTypeName": "Assistant Editor"
                },
                {
                    "submittingUserTypeId": 9,
                    "submittingUserTypeName": "Finishing"
                },
                {
                    "submittingUserTypeId": 23,
                    "submittingUserTypeName": "Production Coordinator"
                }
            ]
        },
        {
            "approverUserTypeId": 5,
            "approverUserTypeName": "Billing Coordinator",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 6,
                    "submittingUserTypeName": "Creative Manager/Coordinator"
                },
                {
                    "submittingUserTypeId": 21,
                    "submittingUserTypeName": "Producer"
                }
            ]
        },
        {
            "approverUserTypeId": 8,
            "approverUserTypeName": "Editorial Manager",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 7,
                    "submittingUserTypeName": "Editor"
                },
                {
                    "submittingUserTypeId": 26,
                    "submittingUserTypeName": "Writer"
                }
            ]
        },
        {
            "approverUserTypeId": 11,
            "approverUserTypeName": "Games Manager",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 10,
                    "submittingUserTypeName": "Games Capture Artist"
                }
            ]
        },
        {
            "approverUserTypeId": 13,
            "approverUserTypeName": "Graphic Coordinator",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 12,
                    "submittingUserTypeName": "Graphic Designer"
                }
            ]
        },
        {
            "approverUserTypeId": 14,
            "approverUserTypeName": "Graphic Dept Head",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 12,
                    "submittingUserTypeName": "Graphic Designer"
                }
            ]
        },
        {
            "approverUserTypeId": 15,
            "approverUserTypeName": "HR",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 1,
                    "submittingUserTypeName": "Admin"
                },
                {
                    "submittingUserTypeId": 22,
                    "submittingUserTypeName": "Production Assistant"
                }
            ]
        },
        {
            "approverUserTypeId": 19,
            "approverUserTypeName": "Music Manager",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 18,
                    "submittingUserTypeName": "Music"
                }
            ]
        },
        {
            "approverUserTypeId": 24,
            "approverUserTypeName": "Senior Billing",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 6,
                    "submittingUserTypeName": "Creative Manager/Coordinator"
                },
                {
                    "submittingUserTypeId": 21,
                    "submittingUserTypeName": "Producer"
                }
            ]
        },
        {
            "approverUserTypeId": 100,
            "approverUserTypeName": "Super Administrator",
            "submittingUserType": [
                {
                    "submittingUserTypeId": 1,
                    "submittingUserTypeName": "Admin"
                },
                {
                    "submittingUserTypeId": 4,
                    "submittingUserTypeName": "Assistant Editor"
                },
                {
                    "submittingUserTypeId": 6,
                    "submittingUserTypeName": "Creative Manager/Coordinator"
                },
                {
                    "submittingUserTypeId": 7,
                    "submittingUserTypeName": "Editor"
                },
                {
                    "submittingUserTypeId": 9,
                    "submittingUserTypeName": "Finishing"
                },
                {
                    "submittingUserTypeId": 10,
                    "submittingUserTypeName": "Games Capture Artist"
                },
                {
                    "submittingUserTypeId": 12,
                    "submittingUserTypeName": "Graphic Designer"
                },
                {
                    "submittingUserTypeId": 18,
                    "submittingUserTypeName": "Music"
                },
                {
                    "submittingUserTypeId": 21,
                    "submittingUserTypeName": "Producer"
                },
                {
                    "submittingUserTypeId": 22,
                    "submittingUserTypeName": "Production Assistant"
                },
                {
                    "submittingUserTypeId": 23,
                    "submittingUserTypeName": "Production Coordinator"
                },
                {
                    "submittingUserTypeId": 26,
                    "submittingUserTypeName": "Writer"
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /time-approval-permission`


## Add/change time approval permission

Add or change time approval permission of user type

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful"
}
```

### HTTP Request

`POST /time-approval-permission`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
true | permissions | JSON string | null | JSON encoded string data (like [{"approverUserTypeId":2,"submittingUserTypeId":[1,22]},{"approverUserTypeId":3,"submittingUserTypeId":[4,9,10]},{"approverUserTypeId":5,"submittingUserTypeId":[6,21]}])