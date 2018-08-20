# Activity

## Get activity list

Retrieve list of activity.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 10,
    "data": [
        {
            "id": 7,
            "name": "Downtime (add details)",
            "descriptionRequired": 1,
            "billable": 1,
            "projectRequired": true,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                }
            ]
        },
        {
            "id": 21,
            "name": "IT Work",
            "descriptionRequired": 0,
            "billable": 1,
            "projectRequired": true,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                }
            ]
        },
        {
            "id": 22,
            "name": "Lunch Break",
            "descriptionRequired": 0,
            "billable": 1,
            "projectRequired": false,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 18,
                    "typeName": "Music"
                },
                {
                    "id": 19,
                    "typeName": "Music Manager"
                },
                {
                    "id": 20,
                    "typeName": "Owner"
                },
                {
                    "id": 21,
                    "typeName": "Producer"
                },
                {
                    "id": 22,
                    "typeName": "Production Assistant"
                },
                {
                    "id": 23,
                    "typeName": "Production Coordinator"
                },
                {
                    "id": 24,
                    "typeName": "Senior Billing"
                },
                {
                    "id": 25,
                    "typeName": "Senior Management"
                },
                {
                    "id": 26,
                    "typeName": "Writer"
                },
                {
                    "id": 27,
                    "typeName": "Creative Director (Steve)"
                }
            ]
        },
        {
            "id": 23,
            "name": "Meeting (Admin)",
            "descriptionRequired": 1,
            "billable": 1,
            "projectRequired": false,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                },
                {
                    "id": 4,
                    "typeName": "Assistant Editor"
                },
                {
                    "id": 5,
                    "typeName": "Billing Coordinator"
                },
                {
                    "id": 6,
                    "typeName": "Creative Manager/Coordinator"
                },
                {
                    "id": 7,
                    "typeName": "Editor"
                },
                {
                    "id": 8,
                    "typeName": "Editorial Manager"
                },
                {
                    "id": 9,
                    "typeName": "Finishing"
                },
                {
                    "id": 10,
                    "typeName": "Games Capture Artist"
                },
                {
                    "id": 11,
                    "typeName": "Games Manager"
                },
                {
                    "id": 12,
                    "typeName": "Graphic Designer"
                },
                {
                    "id": 13,
                    "typeName": "Graphic Coordinator"
                },
                {
                    "id": 14,
                    "typeName": "Graphic Dept Head"
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
                    "id": 18,
                    "typeName": "Music"
                },
                {
                    "id": 19,
                    "typeName": "Music Manager"
                },
                {
                    "id": 20,
                    "typeName": "Owner"
                },
                {
                    "id": 21,
                    "typeName": "Producer"
                },
                {
                    "id": 22,
                    "typeName": "Production Assistant"
                },
                {
                    "id": 23,
                    "typeName": "Production Coordinator"
                },
                {
                    "id": 24,
                    "typeName": "Senior Billing"
                },
                {
                    "id": 25,
                    "typeName": "Senior Management"
                },
                {
                    "id": 26,
                    "typeName": "Writer"
                },
                {
                    "id": 27,
                    "typeName": "Creative Director (Steve)"
                }
            ]
        },
        {
            "id": 39,
            "name": "test activity90983",
            "descriptionRequired": null,
            "billable": 1,
            "projectRequired": false,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 1,
                    "activityType": "Billable"
                },
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                },
                {
                    "id": 4,
                    "typeName": "Assistant Editor"
                }
            ]
        },
        {
            "id": 40,
            "name": "test activity909832",
            "descriptionRequired": null,
            "billable": 1,
            "projectRequired": false,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 1,
                    "activityType": "Billable"
                },
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                },
                {
                    "id": 4,
                    "typeName": "Assistant Editor"
                }
            ]
        },
        {
            "id": 41,
            "name": "test activity9098322",
            "descriptionRequired": null,
            "billable": 1,
            "projectRequired": true,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 1,
                    "activityType": "Billable"
                },
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                },
                {
                    "id": 4,
                    "typeName": "Assistant Editor"
                }
            ]
        },
        {
            "id": 42,
            "name": "test activity90983221",
            "descriptionRequired": null,
            "billable": 1,
            "projectRequired": true,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 1,
                    "activityType": "Billable"
                },
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                },
                {
                    "id": 4,
                    "typeName": "Assistant Editor"
                }
            ]
        },
        {
            "id": 34,
            "name": "Time Off (Paid)",
            "descriptionRequired": 0,
            "billable": 1,
            "projectRequired": false,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
                }
            ]
        },
        {
            "id": 35,
            "name": "Time Off (Unpaid)",
            "descriptionRequired": 0,
            "billable": 1,
            "projectRequired": false,
            "status": 1,
            "price": null,
            "type": [
                {
                    "id": 3,
                    "activityType": "Internal"
                }
            ],
            "userType": [
                {
                    "id": 1,
                    "typeName": "Admin"
                },
                {
                    "id": 2,
                    "typeName": "Admin Manager"
                },
                {
                    "id": 3,
                    "typeName": "AE/Finishing Manager"
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
false | user_type_id | int / JSON encoded string | null | Send int or JSON encoded string
false | user_type_id | int | null | User type id
false | project_campaign_required | int | null | Send 0/1 for filtering
false | project_campaign_spot_version_required | int | null | Send 0/1 for filtering



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
    user_type_id: 1,
    project_required: 1
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
false | user_type_id | int / JSON encoded string | null | Send int or JSON encoded string
false | status | int | 1 | Status(send 0 or 1)
false | billable | int | 0 | Status(send 0 or 1)
false | description_required | int | null | Description required from worker(send 0 or 1). Required when type_id=2 (timesheet) 
false | project_campaign_required | int | 0 | send 0/1 
false | project_campaign_spot_version_required | int | 0 | send 0/1 
false | files_included | int | 0 | send 0/1 
false | allowed_in_future | int | 0 | send 0/1 


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
false | project_campaign_required | int | null | send 0/1 to updated
false | project_campaign_spot_version_required | int | null | send 0/1 to updated
false | files_included | int | null | send 0/1 to updated
false | allowed_in_future | int | null | send 0/1 

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
