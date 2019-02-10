# Spot Billing

## Get Spot list for billing

> 200: success response

```json
{
    "status": 1,
    "message": "Request Successful",
    "length": 10,
    "offset": 0,
    "total_count": 3,
    "object_count": 3,
    "data": [
        {
            "projectId": 47,
            "projectName": "Annihilation",
            "studioId": 2,
            "studioName": "Warner Bros.",
            "campaignId": 4,
            "campaignName": "Theatrical Teaser/Trai",
            "projectCampaignId": 156,
            "spotId": 84,
            "spotName": "#1 Interrogation",
            "updatedAt": {
                "date": "2018-11-13 18:16:27.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            }
        },
    ]
}
```

### HTTP Request

`GET /spot-billing`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | search | string | null | Search string
false | studio_id | int | null | Studio id
false | offset | string | 0 | pagination offset
false | length | string | 10 | pagination length



## Get Spot information for billing

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 78,
        "spotName": "#1 Theory aka \"Truce\"",
        "projectCampaignId": 156,
        "revisionNotCounted": null,
        "notes": "Kris Brown cut v.1",
        "revisions": 3,
        "graphicsRevisions": 0,
        "firstRevisionCost": "11000.00",
        "internalDeadline": {
            "date": "2018-05-11 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "clientDeadline": {
            "date": "2018-05-14 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "billingType": "R",
        "billingNote": "Spec revised, is billable",
        "trtId": null,
        "runtime": null,
        "projectId": 47,
        "campaignId": 4,
        "projectName": "Annihilation",
        "studioId": 2,
        "studioName": "Warner Bros.",
        "campaignName": "Theatrical Teaser/Trai",
        "nonBillableProjectActivity": "38.00",
        "nonBillableCamapignActivity": "25.30",
        "timeEntry": {
            "2018-06-06": [
                {
                    "id": 50,
                    "projectCampaignId": 156,
                    "spotId": 78,
                    "versionId": 1,
                    "startDate": {
                        "date": "2018-06-06 14:00:00.000000",
                        "timezone_type": 3,
                        "timezone": "US/Eastern"
                    },
                    "duration": "1.30",
                    "straightTime": null,
                    "overTime": null,
                    "doubleTime": null,
                    "status": 3,
                    "statusName": "APPROVED",
                    "activityId": 8,
                    "activityDescription": "",
                    "notes": null,
                    "activityName": "Edit",
                    "activityTypeId": 1,
                    "activityTypeName": "Billable",
                    "userId": 1,
                    "userFirstName": "Demo",
                    "userLastName": "User",
                    "date": "2018-06-06"
                }
            ],
            "2018-07-06": [
                {
                    "id": 63,
                    "projectCampaignId": 156,
                    "spotId": null,
                    "versionId": null,
                    "startDate": {
                        "date": "2018-07-06 12:30:00.000000",
                        "timezone_type": 3,
                        "timezone": "US/Eastern"
                    },
                    "duration": "1.00",
                    "straightTime": null,
                    "overTime": null,
                    "doubleTime": null,
                    "status": 1,
                    "statusName": "DRAFT",
                    "activityId": 1,
                    "activityDescription": "omf",
                    "notes": null,
                    "activityName": "AE Work (NOT Dailies)",
                    "activityTypeId": 1,
                    "activityTypeName": "Billable",
                    "userId": 6,
                    "userFirstName": "JAMIE",
                    "userLastName": "ZAKOSKI",
                    "date": "2018-07-06"
                }
            ],
        }
    }
}
```


### HTTP Request

`GET /spot-billing/[:spot_id]`