# Projects Campaign designer


## Get designer associated with project-campaign

Get designer associated with project-campaign

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
            "userId": 67,
            "username": "KPANG",
            "email": "KEITHP@BUDDHA-JONES.COM",
            "firstName": "KEITH",
            "lastName": "PANG",
            "image": null,
            "typeId": 12,
            "type": "Graphic Designer",
            "fullName": "KEITH PANG"
        },
        {
            "projectCampaignId": "156",
            "projectId": 47,
            "campaignId": 4,
            "userId": 64,
            "username": "BBERLING",
            "email": "BRADB@BUDDHA-JONES.COM",
            "firstName": "BRADFORD",
            "lastName": "BERLING",
            "image": null,
            "typeId": 14,
            "type": "Graphic Dept Head",
            "fullName": "BRADFORD BERLING"
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-designer/[:project_campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project campaign Id
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Add Project Campaign designer

Add designer to project campaign

> Sample request

```javascript
axios.post('/project-campaign-designer', {
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

`POST /project-campaign-designer`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | Project campaign id
**true** | user_id | int | null | User id


## Delete Project to Campaign designer

Delete project to campaign designer


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /project-campaign-designer/[:project_campaign_id]/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | project_campaign_id | int | null | Project campaign ID
**true* | user_id | int | null | User Id

