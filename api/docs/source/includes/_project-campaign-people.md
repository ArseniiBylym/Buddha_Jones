# Projects Campaign People


## Get people associated with project-campaign

Get people associated with project-campaign

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
            "userId": 23,
            "username": "ABATES",
            "email": "ALEXB@BUDDHA-JONES.COM",
            "firstName": "ALEXANDRA",
            "lastName": "BATES",
            "image": null,
            "typeId": 6,
            "type": "Creative Manager/Coordinator",
            "roleId": null,
            "role": null,
            "fullName": "ALEXANDRA BATES"
        },
        {
            "projectCampaignId": "156",
            "projectId": 47,
            "campaignId": 4,
            "userId": 97,
            "username": "MLAFONTANT",
            "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
            "firstName": "MARK",
            "lastName": "LAFONTANT",
            "image": null,
            "typeId": 21,
            "type": "Producer",
            "roleId": null,
            "role": null,
            "fullName": "MARK LAFONTANT"
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-people/[:project_campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project campaign Id
false | type | JSON | null | JSON encode array of user type ids, like: [1,2,3,4,5]
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Add Project Campaign User

Add user to project campaign

** It can be used the role_id of user for the project+campaign. sending same project_id+campaign_id+user_id and different role_id will change the role of user for that project+campaign

> Sample request

```javascript
axios.post('/project-campaign-people', {
    project__id:1,
    user_id:5,
    role_id:3
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

`POST /project-campaign-people`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project campaign Campaign id
**true** | user_id | int | null | User id
false | role_id | int | null | Role Id



## Delete Project to Campaign user

Delete project to campaign user


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /project-campaign-people/[:project_campaign_id]/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | project_campaign_id | int | null | Project campaign ID
**true* | user_id | int | null | User Id

