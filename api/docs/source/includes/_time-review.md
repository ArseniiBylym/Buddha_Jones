# Time review


## Get project list

Get project list for time review.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 4,
    "object_count": 3,
    "data": [
        {
            "projectId": 1,
            "projectName": "Babysitter",
            "studioId": 1,
            "studioName": "NBC Universal",
            "totalDuration": "5.30",
            "campaign": [
                {
                    "campaignId": 1,
                    "campaignName": "Theatrical Digital",
                    "projectCampaignId": 149,
                    "activityTypeId": "1",
                    "totalDuration": "5.30"
                }
            ]
        },
        {
            "projectId": 47,
            "projectName": "Annihilation",
            "studioId": 2,
            "studioName": "Warner Bros.",
            "totalDuration": "24.15",
            "campaign": [
                {
                    "campaignId": 2,
                    "campaignName": "Theatrical Radio",
                    "projectCampaignId": 157,
                    "activityTypeId": "2",
                    "totalDuration": "7.45"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 156,
                    "activityTypeId": "1",
                    "totalDuration": "5.0"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 156,
                    "activityTypeId": "2",
                    "totalDuration": "8.30"
                },
                {
                    "campaignId": 6,
                    "campaignName": "Theatrical Work",
                    "projectCampaignId": 207,
                    "activityTypeId": "2",
                    "totalDuration": "1.0"
                },
                {
                    "campaignId": 7,
                    "campaignName": "Broadcast",
                    "projectCampaignId": 182,
                    "activityTypeId": "1",
                    "totalDuration": "2.0"
                }
            ]
        },
        {
            "projectId": 49,
            "projectName": "Aquaman",
            "studioId": 1,
            "studioName": "NBC Universal",
            "totalDuration": "23.30",
            "campaign": [
                {
                    "campaignId": 1,
                    "campaignName": "Theatrical Digital",
                    "projectCampaignId": 169,
                    "activityTypeId": "2",
                    "totalDuration": "6.0"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 162,
                    "activityTypeId": "1",
                    "totalDuration": "2.0"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 162,
                    "activityTypeId": "2",
                    "totalDuration": "1.0"
                },
                {
                    "campaignId": 7,
                    "campaignName": "Broadcast",
                    "projectCampaignId": 163,
                    "activityTypeId": "1",
                    "totalDuration": "14.30"
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /time-review`



## Get time details for project

Retrieve list of time entry for a project.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 4,
    "object_count": 3,
    "data": [
        {
            "projectId": 1,
            "projectName": "Babysitter",
            "studioId": 1,
            "studioName": "NBC Universal",
            "totalDuration": "5.30",
            "campaign": [
                {
                    "campaignId": 1,
                    "campaignName": "Theatrical Digital",
                    "projectCampaignId": 149,
                    "activityTypeId": "1",
                    "totalDuration": "5.30"
                }
            ]
        },
        {
            "projectId": 47,
            "projectName": "Annihilation",
            "studioId": 2,
            "studioName": "Warner Bros.",
            "totalDuration": "24.15",
            "campaign": [
                {
                    "campaignId": 2,
                    "campaignName": "Theatrical Radio",
                    "projectCampaignId": 157,
                    "activityTypeId": "2",
                    "totalDuration": "7.45"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 156,
                    "activityTypeId": "1",
                    "totalDuration": "5.0"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 156,
                    "activityTypeId": "2",
                    "totalDuration": "8.30"
                },
                {
                    "campaignId": 6,
                    "campaignName": "Theatrical Work",
                    "projectCampaignId": 207,
                    "activityTypeId": "2",
                    "totalDuration": "1.0"
                },
                {
                    "campaignId": 7,
                    "campaignName": "Broadcast",
                    "projectCampaignId": 182,
                    "activityTypeId": "1",
                    "totalDuration": "2.0"
                }
            ]
        },
        {
            "projectId": 49,
            "projectName": "Aquaman",
            "studioId": 1,
            "studioName": "NBC Universal",
            "totalDuration": "23.30",
            "campaign": [
                {
                    "campaignId": 1,
                    "campaignName": "Theatrical Digital",
                    "projectCampaignId": 169,
                    "activityTypeId": "2",
                    "totalDuration": "6.0"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 162,
                    "activityTypeId": "1",
                    "totalDuration": "2.0"
                },
                {
                    "campaignId": 4,
                    "campaignName": "Theatrical Teaser/Trai",
                    "projectCampaignId": 162,
                    "activityTypeId": "2",
                    "totalDuration": "1.0"
                },
                {
                    "campaignId": 7,
                    "campaignName": "Broadcast",
                    "projectCampaignId": 163,
                    "activityTypeId": "1",
                    "totalDuration": "14.30"
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /time-review/[:project_id]`



