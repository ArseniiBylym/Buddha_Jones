# Customer New

## Get new customer list

Retrieve list of new customer.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 2,
    "object_count": 2,
    "data": [
        {
            "id": 10,
            "studioId": 38,
            "studioName": "CD Projekt\r\n",
            "name": "some name",
            "street": "test street",
            "city": "tes city",
            "state": "test st",
            "zip": "9229",
            "email": "ab@ab.com",
            "phone": "888888",
            "billingContact": "abc dk",
            "billingEmail": "ab@bb.com",
            "billingPhone": "99933333",
            "completed": 0,
            "createdBy": 1,
            "updatedBy": null,
            "createdAt": {
                "date": "2018-11-03 06:24:35.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "updatedAt": null
        },
        {
            "id": 11,
            "studioId": 36,
            "studioName": "CBS Films\r\n",
            "name": "some name",
            "street": "test street",
            "city": "tes city",
            "state": "test st",
            "zip": "9229",
            "email": "ab@ab.com",
            "phone": "888888",
            "billingContact": "abc dk",
            "billingEmail": "ab@bb.com",
            "billingPhone": "99933333",
            "completed": 0,
            "createdBy": 1,
            "updatedBy": null,
            "createdAt": {
                "date": "2018-11-03 06:24:44.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "updatedAt": null
        }
    ]
}
```

### HTTP Request

`GET /customer-new`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | length | int | 10 | Limit number of returned results
false | offset | int | 0 | Offset returned results
false | completed | int | null | Completed or not (send 0/1 if needed)


## Get Single new Cusotmer

Retrieve single new customer info by id.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 11,
        "studioId": 36,
        "studioName": "CBS Films\r\n",
        "name": "some name",
        "street": "test street",
        "city": "tes city",
        "state": "test st",
        "zip": "9229",
        "email": "ab@ab.com",
        "phone": "888888",
        "billingContact": "abc dk",
        "billingEmail": "ab@bb.com",
        "billingPhone": "99933333",
        "completed": 0,
        "createdBy": 1,
        "updatedBy": null,
        "createdAt": {
            "date": "2018-11-03 06:24:44.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "updatedAt": null
    }
}
```

### HTTP Request

`GET /customer-new/[:id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | id | int | null | id


## Create Customer

Create customer

> Sample request

```javascript
axios.post('/customer-new', {
    studio_id: 38
    name: some name
    street: test street
    city: tes city
    state: test st
    zip: 9229
    email: ab@ab.com
    phone: 888888
    billing_contact: abc dk
    billing_email: ab@bb.com
    billing_phone: 99933333
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "id": 5,
        "studioId": 38,
        "studioName": "CD Projekt",
        "name": "some name",
        "street": "test street",
        "city": "tes city",
        "state": "test st",
        "zip": "9229",
        "email": "ab@ab.com",
        "phone": "888888",
        "billingContact": "abc dk",
        "billingEmail": "ab@bb.com",
        "billingPhone": "99933333",
        "createdBy": 1,
        "createdAt": {
            "date": "2018-10-16 18:25:29.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        }
    }
}
```

### HTTP Request

`POST /customer-new`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | studio_id | int | null | CusStudio ID
**true** | name | string | null | Name
false | street | string | null | Street
false | city | string | null | City
false | state | string | null | State
false | zip | string | null | Zip
false | email | string | null | Email address
false | phone | string | null | Phone number
false | billing_contact | string | null | Billing contact name
false | billing_phone | string | null | Billing phone number
false | billing_email | string | null | Billing email


## Update Customer

Update customer

> Sample request

```javascript
axios.put('/customer-new', {
    studio_id: 38
    name: some name
    completed: 1
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "id": 11,
        "studioId": 36,
        "studioName": "CBS Films\r\n",
        "name": "some name",
        "street": "test street",
        "city": "tes city",
        "state": "test st",
        "zip": "9229",
        "email": "ab@ab.com",
        "phone": "888888",
        "billingContact": "abc dk",
        "billingEmail": "ab@bb.com",
        "billingPhone": "99933333",
        "completed": 1,
        "createdBy": 1,
        "updatedBy": 1,
        "createdAt": {
            "date": "2018-11-03 06:24:44.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "updatedAt": {
            "date": "2018-11-03 06:28:15.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        }
    }
}
```

### HTTP Request

`PUT /customer-new/[:id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | studio_id | int | null | CusStudio ID
false | name | string | null | Name
false | street | string | null | Street
false | city | string | null | City
false | state | string | null | State
false | zip | string | null | Zip
false | email | string | null | Email address
false | phone | string | null | Phone number
false | billing_contact | string | null | Billing contact name
false | billing_phone | string | null | Billing phone number
false | billing_email | string | null | Billing email
false | completed | int | null | Completed or not (send 0/1)
