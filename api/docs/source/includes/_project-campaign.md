# Project Campaign


## Project campaign relation list

```javascript
axios.get('/project-campaign');
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

`GET /project-campaign`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | project_id | int | null | Project id
false | campaign_id | int | null | Campaign id
false | request_writing_team | int | null | Send 0 or 1 to filter
false | request_music_team | int | null | Send 0 or 1 to filter
false | offset | int | 0 | Offset
false | length | int | 20 | Length of expected result rows
false | get_user | int | 0 | Send 0 or 1. Send 1 to get user, editor, designer and billing user for project+campaign



## Project campaign single entry

```javascript
axios.get('/project-campaign/156');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 156,
        "projectId": 47,
        "projectName": "Annihilation",
        "campaignId": 4,
        "campaignName": "Krystle said this was questioning, which is odd, since she's omniscient.",
        "firstPointOfContactId": null,
        "requestWritingTeam": true,
        "writingTeamNotes": "both conceptual ideas and copy",
        "requestMusicTeam": true,
        "musicTeamNotes": "cue sheets only as we're using cleared music from theatrical campaign to start",
        "maxHistoryCreatedAt": "2018-05-17 20:00:45",
        "note": "Krystle said this was questioning, which is odd, since she's omniscient.",
        "budget": "0",
        "budgetNote": "budget per spot",
        "por": null,
        "invoiceContact": null,
        "materialReceiveDate": {
            "date": "2018-05-05 07:00:00.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        }
    }
}
```

### HTTP Request

`GET /project-campaign/[:project_campaign_id]`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | Project campaign relation id
false | por | string | null | POR
false | invoice_contact | string | null | Invoice contact



## Update Project campaign

Create/Update Campaign to Project

** if entry with project and campaign exists then it will be updated or a new entry with the project and campaign id will be created


```javascript
axios.put('/project-campaign/156', {
    first_point_of_contact_id:4,
    request_writing_team:1,
    writing_team_notes:"some note here 111",
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "id": 7
    }
}
```

### HTTP Request

`PUT /project-campaign/[:project_campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | Project Campaign ID
false | first_point_of_contact_id | int | null | First point of contact id
false | request_writing_team | boolean | null | Request to writing team, send 0 or 1
false | request_music_team | boolean | null | Request to music team, send 0 or 1
false | writing_team_notes | string | null | Note for writing team
false | music_team_notes | string | null | Note for music team
false | note | string | null | Note for project campaign
false | budget | string | null | Budget
false | material_receive_date | string | null | material receive date


** if entry with project and campaign exists then it will be updated or a new entry with the project and campaign id will be created


## Delete Project campaign

Delete Campaign to Project

```javascript
axios.delete('/project-campaign/156');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /project-campaign/[:project_campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | Project campaign ID
