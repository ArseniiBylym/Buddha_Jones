# Projects Campaign People


## Get people associated with project-campaign

Get people associated with project-campaign

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 4,
    "object_count": 4,
    "data": [
        {
            "projectId": 12,
            "campaignId": 1,
            "userId": 5,
            "username": "AlexKroll",
            "email": null,
            "firstName": "Alex",
            "lastName": "Kroll",
            "image": null,
            "typeId": 1,
            "type": "Editor",
            "roleId": 3,
            "role": "Producer",
            "fullName": "Alex Kroll"
        },
        {
            "projectId": 12,
            "campaignId": 1,
            "userId": 4,
            "username": "AndyAustin",
            "email": null,
            "firstName": "Andy",
            "lastName": "Austin",
            "image": null,
            "typeId": 1,
            "type": "Editor",
            "roleId": 3,
            "role": "Producer",
            "fullName": "Andy Austin"
        },
        {
            "projectId": 12,
            "campaignId": 1,
            "userId": 3,
            "username": "webhkp",
            "email": "webhkp@gmail.com",
            "firstName": "Rizwan",
            "lastName": "Kader",
            "image": "http://buddhajonesapi.localhost/thumb/profile_image/three.png",
            "typeId": 1,
            "type": "Editor",
            "roleId": 3,
            "role": "Producer",
            "fullName": "Rizwan Kader"
        },
        {
            "projectId": 12,
            "campaignId": 1,
            "userId": 1,
            "username": "suda",
            "email": "suda.sampath@indydutch.com",
            "firstName": "Suda",
            "lastName": "Sampath",
            "image": "http://buddhajonesapi.localhost/thumb/profile_image/1.jpeg",
            "typeId": 100,
            "type": "Super Admin",
            "roleId": 3,
            "role": "Producer",
            "fullName": "Suda Sampath"
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-people/[:project_id]/[:campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project Id
**true** | campaign_id | int | null | campaign Id
false | type | JSON | null | JSON encode array of user type ids, like: [1,2,3,4,5]
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Add Project Campaign User

Add user to project campaign

** It can be used the role_id of user for the project+campaign. sending same project_id+campaign_id+user_id and different role_id will change the role of user for that project+campaign

> Sample request

```javascript
axios.post('/project-campaign-people', {
    project_id:12,
    campaign_id:1,
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
**true** | project_id | int | null | Project id
**true** | campaign_id | int | null | Campaign id
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

`DELETE /project-campaign-people/[:project_id]/[:campaign_id]/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | campaign_id | int | null | Campaign ID
**true* | project_id | int | null | Project ID
**true* | user_id | int | null | User Id

