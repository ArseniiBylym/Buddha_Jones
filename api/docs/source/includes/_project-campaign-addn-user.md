# Projects Campaign additional user


## Get additional user associated with project-campaign

Get additional user associated with project-campaign

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 4,
    "object_count": 4,
    "data": [
        {
            "projectId": 9,
            "campaignId": 2,
            "userId": 5,
            "username": "AlexKroll",
            "email": null,
            "firstName": "Alex",
            "lastName": "Kroll",
            "image": null,
            "typeId": 1,
            "type": "Editor",
            "fullName": "Alex Kroll"
        },
        {
            "projectId": 9,
            "campaignId": 2,
            "userId": 4,
            "username": "AndyAustin",
            "email": null,
            "firstName": "Andy",
            "lastName": "Austin",
            "image": null,
            "typeId": 1,
            "type": "Editor",
            "fullName": "Andy Austin"
        },
        {
            "projectId": 9,
            "campaignId": 2,
            "userId": 3,
            "username": "webhkp",
            "email": "webhkp11889@gmail.com",
            "firstName": "Rizwan",
            "lastName": "Kader",
            "image": "http://buddhajonesapi.localhost/thumb/profile_image/three.png",
            "typeId": 1,
            "type": "Editor",
            "fullName": "Rizwan Kader"
        },
        {
            "projectId": 9,
            "campaignId": 2,
            "userId": 1,
            "username": "suda",
            "email": "suda.sampath@indydutch.com",
            "firstName": "Suda",
            "lastName": "Sampath",
            "image": "http://buddhajonesapi.localhost/thumb/profile_image/1.jpeg",
            "typeId": 100,
            "type": "Super Administrator",
            "fullName": "Suda Sampath"
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-addn-user/[:project_campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_camapign_id | int | null | Project Id


## Add Project Campaign Additional user

Add Additional user to project campaign

> Sample request

```javascript
axios.post('/project-campaign-addn-user', {
    project_campaign_id: 156
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

`POST /project-campaign-addn-user`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_camapign_id | int | null | Project canpaign id
**true** | user_id | int | null | User id


## Delete Project to Campaign Additional user

Delete project to campaign additional user


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /project-campaign-addn-user/[:project_campaign_id]/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | project_campaign_id | int | null | Project campaign ID
**true* | user_id | int | null | User Id

