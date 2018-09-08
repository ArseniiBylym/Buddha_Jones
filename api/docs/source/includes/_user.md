# User





## Login user

Authorize user using his credentials and get the token.

> Sample request

```javascript
axios.post('/login', {
    username: 'login',
    password: '123456'
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Login successful",
    "data": {
        "user_id": 1,
        "username": "login",
        "email": null,
        "first_name": "login",
        "last_name": null,
        "full_name": "login",
        "image": "http://api.buddhajones.redidemo.com/thumb/profile_image/1.jpeg",
        "type_id": 100,
        "type_name": "Admin",
        "hourly_rate": null,
        "salary_type": null,
        "salary_amount": null,
        "min_hour": null,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBbWVyaUZsZWV0IFBvcnRhbCIsImlhdCI6MTQ4MzAzNDczNywiZXhwIjoxNDgzMTIxMTM3LCJzdWIiOjF9.dSPkafSnhkr6MePnTSLY3YQK80Vg_GEQXnjaBXCVerWhyxV9DwMvl98BJSNV7c7XVjDADG70sqLCErI_mM5X7BhuGplwhnZf8TcjWo7n88PpIgKM-QX1hJwDFiAhpSCXbDpUdyWHwlr00uoCFQJissL_4OOUsGUh_0cli_STgPSBsgGAc--uc8of8asKgcJu1m8FgmrjVahY-F34kKZKlMKHlngfb7KKcktMfXyZUl2j04snraZX0QRqcmxrhigxYFky1mhQh14iCDs3gZk0WdlINTapFeQKorupKB33IpxTy9QDkoqcV-1HmpVShNsZQfqLw2fSB2KRHPyRfE79Tg",
        "status": 1
    }
}
```

> 400: error response - parameters missing

```json
{
    "status": 0,
    "message": "Parameters missing"
}
```

### HTTP Request

`POST /login`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | username | string | null | User provided username
**true** | password | string | null | User provided password



## Login refresh

Extend login session time.

This will return a new token. use the new token for future requests

> 200: success response

```json
{
    "status": 1,
    "message": "User login time extended",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJCdWRkaGEgSm9uZXMiLCJpYXQiOjE0ODA4MTg2MjksImV4cCI6MTQ4MDgyMTAyOSwic3ViIjoxfQ.pWM7CMaP2z_8usMgBefvJ83xTNRVRblEH6IT2a_wcyiMpn9m6e-6U8JxQyymb7bRtRbfSG3X5WGaxcK4HxeK-IangBuxpnlYB0FL89tbD8nONX2h8j8ddNwONaSp6MwHvnchRmHx1L9KgVDJEUcpL7c6lSKPa5bGTZyWMDDm6zI4sGSG5F4-_A1frjmNjOkxkC3ZMTOQOyP-Mmdilk5pj6yKB9Zyh18yOXHLdZJsOU_R4iMw8Nas2tRZN_ORnJbz36_Bu-Jr8xti-c2OJrGEbkIwJjtBT03pNOhKzk7WBwvNew5ExGGrftXBlUMyHnuQSTHVZgXrPq_nJB6N1CM0_g"
    }
}
```

### HTTP Request

`GET /login-refresh`

### Query Parameters

None



## Logout user

Deauthorize user's token and session.

> 200: success response

```json
{
    "status": 1,
    "message": "Logout successful"
}
```

### HTTP Request

`GET /logout`

### Query Parameters
None

















## User project permissions

Get project permissions of loggedin user

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "permissions": [
            {
                "userTypeId": 100,
                "projectPermissionId": 1,
                "projectPermsisionKey": "project-create",
                "projectPermissionLable": "Create project page",
                "canView": 1,
                "canEdit": 1
            },
            {
                "userTypeId": 100,
                "projectPermissionId": 2,
                "projectPermsisionKey": "project-name",
                "projectPermissionLable": "Project name",
                "canView": 1,
                "canEdit": 1
            },
            {
                "userTypeId": 100,
                "projectPermissionId": 3,
                "projectPermsisionKey": "project-release-date",
                "projectPermissionLable": "Project release date",
                "canView": 1,
                "canEdit": 1
            },
            {
                "userTypeId": 100,
                "projectPermissionId": 4,
                "projectPermsisionKey": "project-history",
                "projectPermissionLable": "Project history and changelog",
                "canView": 1,
                "canEdit": 1
            }
            ...
        ]
    }
}
```

### HTTP Request

`GET /user-project-permissions`



## User type project permissions

Get project permissions of any user type (used for project permission management)

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "permissions": [
            {
                "userTypeId": 100,
                "projectPermissionId": 1,
                "projectPermsisionKey": "project-create",
                "projectPermissionLable": "Create project page",
                "canView": 1,
                "canEdit": 1
            },
            {
                "userTypeId": 100,
                "projectPermissionId": 2,
                "projectPermsisionKey": "project-name",
                "projectPermissionLable": "Project name",
                "canView": 1,
                "canEdit": 1
            },
            {
                "userTypeId": 100,
                "projectPermissionId": 3,
                "projectPermsisionKey": "project-release-date",
                "projectPermissionLable": "Project release date",
                "canView": 1,
                "canEdit": 1
            },
            {
                "userTypeId": 100,
                "projectPermissionId": 4,
                "projectPermsisionKey": "project-history",
                "projectPermissionLable": "Project history and changelog",
                "canView": 1,
                "canEdit": 1
            }
            ...
        ]
    }
}
```

### HTTP Request

`GET /user-type-project-permissions`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | user_type_id | int | null |  User type id

Send request like  `GET /user-type-project-permission?user_type_id=1`


## Update user type project permission

Update/Create project permission of user type

> Sample request

```javascript
axios.post('/user-type-project-permissions', {
    user_type_id: 100,
    permissions: [{"project_permission_id":1,"can_view":1,"can_edit":0},{"project_permission_id":2,"can_view":1,"can_edit":0},{"project_permission_id":3,"can_view":1,"can_edit":0},{"project_permission_id":4,"can_view":1,"can_edit":0},{"project_permission_id":5,"can_view":1,"can_edit":0},{"project_permission_id":6,"can_view":1,"can_edit":0},{"project_permission_id":7,"can_view":1,"can_edit":0},{"project_permission_id":8,"can_view":1,"can_edit":0},{"project_permission_id":9,"can_view":1,"can_edit":0},{"project_permission_id":10,"can_view":1,"can_edit":0},{"project_permission_id":11,"can_view":1,"can_edit":0},{"project_permission_id":12,"can_view":1,"can_edit":0},{"project_permission_id":13,"can_view":1,"can_edit":0},{"project_permission_id":14,"can_view":1,"can_edit":0},{"project_permission_id":15,"can_view":1,"can_edit":0},{"project_permission_id":17,"can_view":1,"can_edit":0},{"project_permission_id":18,"can_view":1,"can_edit":0},{"project_permission_id":19,"can_view":1,"can_edit":0},{"project_permission_id":20,"can_view":1,"can_edit":0},{"project_permission_id":21,"can_view":1,"can_edit":0},{"project_permission_id":22,"can_view":1,"can_edit":0},{"project_permission_id":23,"can_view":1,"can_edit":0},{"project_permission_id":24,"can_view":1,"can_edit":0},{"project_permission_id":25,"can_view":1,"can_edit":0},{"project_permission_id":26,"can_view":1,"can_edit":0},{"project_permission_id":27,"can_view":1,"can_edit":0},{"project_permission_id":28,"can_view":1,"can_edit":0},{"project_permission_id":29,"can_view":1,"can_edit":1},{"project_permission_id":30,"can_view":1,"can_edit":1},{"project_permission_id":31,"can_view":1,"can_edit":0},{"project_permission_id":100,"can_view":1,"can_edit":0},{"project_permission_id":200,"can_view":0,"can_edit":1}]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful"
}
```

> 400: error response - parameters missing

```json
{
    "status": 0,
    "message": "Parameters missing"
}
```

### HTTP Request

`POST /user-type-project-permissions`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | user_type_id | int | null |  User type id
**true** | permissions | JSON encoded string | null | array of (project_permission_id, can_view, can_edit)
