# Customer Price Management


## Get customer price list

Retrieve list of customer price.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "activityId": 1,
            "activityName": "AE Work (NOT Dailies)",
            "activityTypeId": 1,
            "activityType": "Billable",
            "customerId": 2,
            "price": 100
        },
        {
            "activityId": 4,
            "activityName": "Dailies Assembly",
            "activityTypeId": 1,
            "activityType": "Billable",
            "customerId": 2,
            "price": 101
        },
        {
            "activityId": 5,
            "activityName": "Dailies Import",
            "activityTypeId": 1,
            "activityType": "Billable",
            "customerId": 2,
            "price": null
        },
        {
            "activityId": 8,
            "activityName": "Edit",
            "activityTypeId": 1,
            "activityType": "Billable",
            "customerId": 2,
            "price": 22
        },
        {
            "activityId": 9,
            "activityName": "Editing on Fiber",
            "activityTypeId": 1,
            "activityType": "Billable",
            "customerId": 2,
            "price": null
        }
        ......
    ]
}
```

### HTTP Request

`GET /customer-price`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | customer_id | int | null | Customer id
false | type | char | null | Send 'A' OR 'B'. dont send if all result from both type is needed

#### Send request like bellow
`GET /customer-price?customer_id=1`


## Create/update Customer price

Use this request to create or update customer price. if entry exists with customer_id and activity_id, then entry will be updated, otherwise a new entry will be created.

> Sample request

```javascript
axios.post('/customer-price', {
    customer_id:1,
    activity_id:1,
    price: 100
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

`POST /customer-price`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | customer_id | int | null | Customer ID
**true** | activity_id | int | null | Activity Id
**true** | price | float | null | price
false | type | char | 'A' | Type - send 'A' or 'B'
