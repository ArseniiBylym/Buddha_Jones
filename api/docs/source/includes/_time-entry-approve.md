# Time entry to approve


## Get time entry to approve

Retrieve list of time entry of user in a date range.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "date": "2017-01-05",
            "users": [
                {
                    "userId": 7,
                    "userName": "MALBORN",
                    "userInitials": "MA",
                    "userFullName": "MAXWELL ALBORN",
                    "userMinHours": null,
                    "entries": [
                        {
                            "id": 36,
                            "projectId": 2,
                            "projectName": "Before I Wake",
                            "campaignId": 7,
                            "campaignName": "Digital",
                            "spotId": null,
                            "spotName": null,
                            "versionId": null,
                            "versionName": null,
                            "activityTypeId": 1,
                            "activityValue": "AE Work (NOT Dailies)",
                            "activityDescription": null,
                            "startDate": "2017-01-05 16:29:14",
                            "duration": "9.45",
                            "approvedBy": null,
                            "approvedAt": null,
                            "notes": null,
                            "status": 3,
                            "statusName": "Under Review",
                            "files": [
                                {
                                    "fileName": "test20.jpg",
                                    "description": "some description 100",
                                    "duration": "13.20"
                                },
                                {
                                    "fileName": "test3.jpg",
                                    "description": null,
                                    "duration": "121.20"
                                },
                                {
                                    "fileName": "test4.jpg",
                                    "description": null,
                                    "duration": null
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "date": "2017-01-10",
            "users": [
                {
                    "userId": 49,
                    "userName": "JDUPPER",
                    "userInitials": "JD",
                    "userFullName": "JORDAN DUPPER",
                    "userMinHours": null,
                    "entries": [
                        {
                            "id": 22,
                            "projectId": null,
                            "projectName": null,
                            "campaignId": null,
                            "campaignName": null,
                            "spotId": null,
                            "spotName": null,
                            "versionId": null,
                            "versionName": null,
                            "activityTypeId": 22,
                            "activityValue": "Lunch Break",
                            "activityDescription": "",
                            "startDate": "2017-01-10 20:30:13",
                            "duration": "1.00",
                            "approvedBy": null,
                            "approvedAt": null,
                            "notes": "",
                            "status": 3,
                            "statusName": "Under Review",
                            "files": []
                        }
                    ]
                },
                {
                    "userId": 7,
                    "userName": "MALBORN",
                    "userInitials": "MA",
                    "userFullName": "MAXWELL ALBORN",
                    "userMinHours": null,
                    "entries": [
                        {
                            "id": 23,
                            "projectId": null,
                            "projectName": null,
                            "campaignId": null,
                            "campaignName": null,
                            "spotId": null,
                            "spotName": null,
                            "versionId": null,
                            "versionName": null,
                            "activityTypeId": 4,
                            "activityValue": "Dailies Assembly",
                            "activityDescription": "",
                            "startDate": "2017-01-10 20:45:03",
                            "duration": "1.00",
                            "approvedBy": null,
                            "approvedAt": null,
                            "notes": "",
                            "status": 3,
                            "statusName": "Under Review",
                            "files": []
                        }
                    ]
                }
            ]
        },
        {
            "date": "2017-01-13",
            "users": [
                {
                    "userId": 7,
                    "userName": "MALBORN",
                    "userInitials": "MA",
                    "userFullName": "MAXWELL ALBORN",
                    "userMinHours": null,
                    "entries": [
                        {
                            "id": 28,
                            "projectId": null,
                            "projectName": null,
                            "campaignId": null,
                            "campaignName": null,
                            "spotId": null,
                            "spotName": null,
                            "versionId": null,
                            "versionName": null,
                            "activityTypeId": 22,
                            "activityValue": "Lunch Break",
                            "activityDescription": "",
                            "startDate": "2017-01-13 04:45:02",
                            "duration": "2.15",
                            "approvedBy": null,
                            "approvedAt": null,
                            "notes": "",
                            "status": 3,
                            "statusName": "Under Review",
                            "files": []
                        }
                    ]
                }
            ]
        },
        {
            "date": "2017-01-16",
            "users": [
                {
                    "userId": 7,
                    "userName": "MALBORN",
                    "userInitials": "MA",
                    "userFullName": "MAXWELL ALBORN",
                    "userMinHours": null,
                    "entries": [
                        {
                            "id": 30,
                            "projectId": 1,
                            "projectName": "Babysitter",
                            "campaignId": null,
                            "campaignName": null,
                            "spotId": null,
                            "spotName": null,
                            "versionId": null,
                            "versionName": null,
                            "activityTypeId": 21,
                            "activityValue": "IT Work",
                            "activityDescription": "",
                            "startDate": "2017-01-16 15:30:18",
                            "duration": "2.00",
                            "approvedBy": null,
                            "approvedAt": null,
                            "notes": "",
                            "status": 3,
                            "statusName": "Under Review",
                            "files": []
                        }
                    ]
                }
            ]
        },
        {
            "date": "2018-05-03",
            "users": [
                {
                    "userId": 7,
                    "userName": "MALBORN",
                    "userInitials": "MA",
                    "userFullName": "MAXWELL ALBORN",
                    "userMinHours": null,
                    "entries": [
                        {
                            "id": 33,
                            "projectId": 47,
                            "projectName": "Annihilation",
                            "campaignId": 2,
                            "campaignName": "Trailer",
                            "spotId": 84,
                            "spotName": "#1 Interrogation",
                            "versionId": null,
                            "versionName": null,
                            "activityTypeId": 2,
                            "activityValue": "Breakdown Movie",
                            "activityDescription": "",
                            "startDate": "2018-05-03 14:15:18",
                            "duration": "1.00",
                            "approvedBy": null,
                            "approvedAt": null,
                            "notes": "",
                            "status": 3,
                            "statusName": "Under Review",
                            "files": []
                        }
                    ]
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /time-entry-approve`


##### Send request like

`/time-entry-approve`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | start_date | date | null | Start date
false | end_date | date | null | End date
false | project_id | int | null | project id
false | user_id | int | null | user id
false | activity_id | int | null | Activity id


## Approve/Reopen time entry

Approve/Reopen time entry

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful"
}
```

### HTTP Request

`POST /time-entry-approve`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | ids | JSON string | null | JSON encoded string of ids (ids=[36,23,28])
false | status | int | null | Approve/Reopen status ids (approve=4, reopen=6)
