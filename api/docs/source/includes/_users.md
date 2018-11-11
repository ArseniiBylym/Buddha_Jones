# Users (or workers)

** Only Admin can send GET (to get all user list), POST (to create user)and DELETE (to delete user)
** Only Admin or user himself can call GET (get single user data)



## All User

Get list of all user

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 2,
    "object_count": 2,
    "data": [
        {
            "id": 16,
            "username": "TJENG",
            "firstName": "TRACY",
            "lastName": "JENG",
            "nickName": "TRACY",
            "image": null,
            "email": "TRACYJ@BUDDHA-JONES.COM",
            "initials": "TJ",
            "typeId": 5,
            "typeName": "Billing Coordinator",
            "class": null,
            "hourlyRate": "10.00",
            "salaryType": null,
            "salaryAmount": null,
            "minHour": null,
            "lastLoginDate": {
                "date": "2018-10-21 19:40:41.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "createdDate": null,
            "status": 1,
            "fullName": "TRACY JENG"
        },
        {
            "id": 17,
            "username": "GKUSUMA",
            "firstName": "GREGORIUS KENETH",
            "lastName": "KUSUMA",
            "nickName": "GREGORIUS KENETH",
            "image": null,
            "email": "gregk@buddha-jones.com",
            "initials": "GK",
            "typeId": 5,
            "typeName": "Billing Coordinator",
            "class": null,
            "hourlyRate": "10.00",
            "salaryType": null,
            "salaryAmount": null,
            "minHour": null,
            "lastLoginDate": null,
            "createdDate": null,
            "status": 1,
            "fullName": "GREGORIUS KENETH KUSUMA"
        }
    ]
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

`GET /users`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**false** | search   | string | null | search string (this will search in first_name, last_name, initials)
**false** | class    | char or JSON Array   | null | E - Editor section, G - Graphics section, C - Creative section, B- Billing contact selection
**false** | type  | int or JSON Array   | null | Type id
**false** | ids      | int or JSON Array   | null | User id
**false** | offset   | int    | 0    | offset to start
**false** | length   | int    | 10   | length/count of data that will be returned

### Send request like bellow
/users?search=a&type=1&offset=0&length=20


## Get user/worker

Get a single user

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 29,
        "username": "JanSachs",
        "first_name": "Jan",
        "last_name": "Sachs",
        "full_name": "Jan Sachs",
        "image": "http://api.buddhajones.redidemo.com/thumb/profile_image/1.jpeg",
        "initials": "JS",
        "type_id": 1,
        "type_name": "Editor",
        "hourly_rate": "45.00",
        "salary_type": null,
        "salary_amount": null,
        "min_hour": null,
        "status": 1
    }
}
```

### HTTP Request

`GET /users/[:user_id]`

### Query Parameters

user_id

### Send request like

/users/1



## Create User

Create a new user with user entered data.

> Sample request

```javascript
axios.post('/users', {
     "status": 1,
     "message": "Request successful",
     "data": {
         "id": 1,
         "username": "suda",
         "first_name": "Suda",
         "last_name": null,
         "full_name": null,
         "image": "http://api.buddhajones.redidemo.com/thumb/profile_image/1.jpeg",
         "initials": null,
         "type_id": 100,
         "type_name": "Admin",
         "hourly_rate": null,
         "salary_type": null,
         "salary_amount": null,
         "min_hour": null,
         "status": 1
     }
 });
```

> 200: success response

```json
{
    "status": 1,
    "message": "User created successfully",
    "data": {
        "user_id": 49
    }
}
```

### HTTP Request

`POST /users`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | username | string | null | user name
**true** | password | string | null | password
**true** | first_name | string | null | first name
**true** | last_name | string | null | last name
**true** | email | string | null | email
**true** | type_id | int | null | user type id
**true** | status | int | 0 | user status. send 0(inactive) or 1(active)
false | hourly_rate | float | null | hourly rate
false | salary_type | char | null | salary type. send 'h' (hourly) or 's' salary
false | salary_amount | float | null | salary amount
false | min_hour | int | null | min hour
false | image | string | null | base64 encode string of the image
false | nick_name | string | null | nick name
false | initials | string | null | initials
false | generate_password | int | send 1 to auto generate password, in that case 'password' param is not required

## Update User

Update an existing user with provided data.

> Sample request

```javascript
axios.post('/users/2', {
    username: "webhkp",
    password: "secretpass",
    old_password: "newsecretpassword",
    first_name: "web",
    last_name: "hkp",
    email: "webhkp@gmail.com",
    type_id:2
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 2,
        "username": "webhkp",
        "first_name": "webhkp",
        "last_name": null,
        "full_name": "webhkp",
        "image": "http://api.buddhajones.redidemo.com/thumb/profile_image/1.jpeg",
        "initials": null,
        "type_id": 100,
        "type_name": "Admin",
        "hourly_rate": null,
        "salary_type": null,
        "salary_amount": null,
        "min_hour": null,
        "status": 1
    }
}
```

### HTTP Request

`PUT /users/[:user_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | user_id | int | null | user id
false | password | string | null | password
false | old_password | string | null | current password of the user (only provide if user wants to change his own password)
false | first_name | string | null | first name
false | last_name | string | null | last name
false | email | string | null | email
false | type_id | int | null | user type id
false | status | int | null | user status. send 0(inactive) or 1(active)
false | hourly_rate | float | null | hourly rate
false | salary_type | char | null | salary type. send 'h' (hourly) or 's' salary
false | salary_amount | float | null | salary amount
false | min_hour | int | null | min hour
false | image | string | null | base64 encode string of the image
false | nick_name | string | null | nick name
false | initials | string | null | initials
false | generate_password | int | send 1 to auto generate password, in that case 'password' param is not required
