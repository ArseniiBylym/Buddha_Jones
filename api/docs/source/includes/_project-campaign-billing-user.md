# Projects Campaign billing user


## Get billing user associated with project-campaign

Get billing user associated with project-campaign

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

`GET /project-campaign-billing-user/[:project_id]/[:campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project Id
**true** | campaign_id | int | null | campaign Id
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Add Project Campaign Billing user

Add Billing user to project campaign

> Sample request

```javascript
axios.post('/project-campaign-billing-user', {
    project_id:12,
    campaign_id:1,
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

`POST /project-campaign-billing-user`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project id
**true** | campaign_id | int | null | Campaign id
**true** | user_id | int | null | User id
**true** | role | char | null | Billing user type, send 'P' or 'S' (P=Primary, S=Secondary)


## Delete Project to Campaign Billing user

Delete project to campaign billing user


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /project-campaign-billing-user/[:project_id]/[:campaign_id]/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | campaign_id | int | null | Campaign ID
**true* | project_id | int | null | Project ID
**true* | user_id | int | null | User Id

