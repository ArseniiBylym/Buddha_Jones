# Projects Campaign editor


## Get editor associated with project-campaign

Get editor associated with project-campaign

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 2,
    "object_count": 2,
    "data": [
        {
            "projectCampaignId": "156",
            "projectId": 47,
            "campaignId": 4,
            "userId": 44,
            "username": "JMOSKOW",
            "email": "jacobm@buddha-jones.com",
            "firstName": "JACOB LAWRENCE",
            "lastName": "MOSKOW",
            "image": null,
            "typeId": 7,
            "type": "Editor",
            "fullName": "JACOB LAWRENCE MOSKOW"
        },
        {
            "projectCampaignId": "156",
            "projectId": 47,
            "campaignId": 4,
            "userId": 55,
            "username": "CMYERS",
            "email": "christopherm@buddha-jones.com",
            "firstName": "CHRISTOPHER KYLO",
            "lastName": "MYERS",
            "image": null,
            "typeId": 10,
            "type": "Games Capture Artist",
            "fullName": "CHRISTOPHER KYLO MYERS"
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-editor/[:project_id]/[:campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project campaign Id
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Add Project Campaign editor

Add editor to project campaign

> Sample request

```javascript
axios.post('/project-campaign-editor', {
    project_campaign_id:1,
    user_id:5
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

`POST /project-campaign-editor`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project Campaign id
**true** | user_id | int | null | User id


## Delete Project to Campaign editor

Delete project to campaign editor


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /project-campaign-editor/[:project_campaign_id]/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | project_campaign_id | int | null | Project campaign ID
**true* | user_id | int | null | User Id

