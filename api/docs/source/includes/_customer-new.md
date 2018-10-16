# Customer New

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
