# Notification


## Get all notification of user

Retrieve list of notification for current user.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 3,
    "object_count": 3,
    "data": [
        {
            "id": "10",
            "messageTypeId": 2,
            "message": "Writing team request created on project Annihilation  for campaign (:30) TV",
            "link": "/portal/project/34/Buena Vista/47/Annihilation",
            "confirm": 0,
            "createdBy": 1,
            "createdAt": {
                "date": "2018-11-07 19:09:30.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "updatedBy": null,
            "updatedAt": null,
            "data": [
                {
                    "notificationId": "10",
                    "name": "campaignId",
                    "value": "4"
                },
                {
                    "notificationId": "10",
                    "name": "campaignName",
                    "value": "(:30) TV"
                },
                {
                    "notificationId": "10",
                    "name": "projectCampaignId",
                    "value": "156"
                },
                {
                    "notificationId": "10",
                    "name": "projectId",
                    "value": "47"
                },
                {
                    "notificationId": "10",
                    "name": "projectName",
                    "value": "Annihilation"
                },
                {
                    "notificationId": "10",
                    "name": "studioId",
                    "value": "34"
                },
                {
                    "notificationId": "10",
                    "name": "studioName",
                    "value": "Buena Vista\r\n"
                }
            ]
        },
        {
            "id": "6",
            "messageTypeId": 1,
            "message": "Music team request created on project Annihilation  for campaign (:30) TV",
            "link": "/portal/project/34/Buena Vista/47/Annihilation",
            "confirm": 0,
            "createdBy": 1,
            "createdAt": {
                "date": "2018-11-07 19:07:30.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "updatedBy": null,
            "updatedAt": null,
            "data": []
        },
        {
            "id": "4",
            "messageTypeId": 1,
            "message": "Music team request created on project Annihilation  for campaign (:30) TV",
            "link": "/portal/project/34/Buena Vista/47/Annihilation",
            "confirm": 0,
            "createdBy": 1,
            "createdAt": {
                "date": "2018-11-07 19:06:25.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "updatedBy": null,
            "updatedAt": null,
            "data": []
        }
    ]
}
```

### HTTP Request

`GET /notification`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | confirm | int | 0 | notification is already confirmed or not. send 0/1. 0= not confirmed, 1= already confirmed
false | get_details | int | 0 | Get extra info like data and other related info




## Update/confirm nofitication

Update/confirm notification

> Sample request

```javascript
axios.post('/notification/5', {
    confirm: 1
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

`PUT /notification/[:nofitication_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | notification_id | int | null | Notification Id
**true** | confirm | int | 0 | Send 1 to confirm
