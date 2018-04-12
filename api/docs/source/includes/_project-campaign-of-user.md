# Project Campaign of current user


## Project campaign relation list of current user

```javascript
axios.get('/project-campaign-of-user');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 6,
    "object_count": 6,
    "data": [
        {
            "id": 2,
            "projectId": 12,
            "projectName": "Step Sisters",
            "campaignId": 9,
            "campaignName": null,
            "firstPointOfContactId": 4,
            "requestWritingTeam": true,
            "writingTeamNotes": "some note here 111",
            "requestMusicTeam": true,
            "musicTeamNotes": "some note here 222"
        },
        {
            "id": 3,
            "projectId": 12,
            "projectName": "Step Sisters",
            "campaignId": 2,
            "campaignName": "Trailer",
            "firstPointOfContactId": 5,
            "requestWritingTeam": false,
            "writingTeamNotes": null,
            "requestMusicTeam": false,
            "musicTeamNotes": null
        },
        {
            "id": 4,
            "projectId": 9,
            "projectName": "Mr Robot S2",
            "campaignId": 2,
            "campaignName": "Trailer",
            "firstPointOfContactId": 2,
            "requestWritingTeam": false,
            "writingTeamNotes": null,
            "requestMusicTeam": false,
            "musicTeamNotes": null
        },
        {
            "id": 5,
            "projectId": 11,
            "projectName": "Silicon Valley",
            "campaignId": 2,
            "campaignName": "Trailer",
            "firstPointOfContactId": 4,
            "requestWritingTeam": true,
            "writingTeamNotes": "some note here 111",
            "requestMusicTeam": null,
            "musicTeamNotes": null
        },
        {
            "id": 6,
            "projectId": 11,
            "projectName": "Silicon Valley",
            "campaignId": 1,
            "campaignName": "Teaser",
            "firstPointOfContactId": 4,
            "requestWritingTeam": true,
            "writingTeamNotes": "some note here 111",
            "requestMusicTeam": null,
            "musicTeamNotes": null
        },
        {
            "id": 7,
            "projectId": 12,
            "projectName": "Step Sisters",
            "campaignId": 1,
            "campaignName": "Teaser",
            "firstPointOfContactId": 4,
            "requestWritingTeam": true,
            "writingTeamNotes": "some note here 111",
            "requestMusicTeam": true,
            "musicTeamNotes": "some note here 222"
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-of-user`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | project_id | int | null | Project id
false | campaign_id | int | null | Campaign id
false | offset | int | 0 | Offset
false | length | int | 20 | Length of expected result rows