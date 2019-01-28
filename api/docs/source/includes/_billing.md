# Billing


## Get Billing list

Retrieve list of billing.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 14,
    "object_count": 4,
    "data": [
        {
            "id": 11,
            "spotId": 2,
            "spotName": "Vertical Footage",
            "projectId": 2,
            "projectName": "Before I Wake",
            "customerId": 2,
            "customerName": "Warner Bros.",
            "campaignId": 56,
            "campaignName": null,
            "statusId": 1,
            "billStatus": "Draft",
            "createdAt": "2017-03-11 19:04:34",
            "total": 671.6,
            "approver": []
        },
        {
            "id": 12,
            "spotId": 2,
            "spotName": "Vertical Footage",
            "projectId": 2,
            "projectName": "Before I Wake",
            "customerId": 2,
            "customerName": "Warner Bros.",
            "campaignId": 56,
            "campaignName": null,
            "statusId": 1,
            "billStatus": "Draft",
            "createdAt": "2017-03-11 19:05:36",
            "total": 2920.72,
            "approver": []
        },
        {
            "id": 13,
            "spotId": 2,
            "spotName": "Vertical Footage",
            "projectId": 2,
            "projectName": "Before I Wake",
            "customerId": 2,
            "customerName": "Warner Bros.",
            "campaignId": 56,
            "campaignName": null,
            "statusId": 1,
            "billStatus": "Draft",
            "createdAt": "2017-12-10 14:21:17",
            "total": 2920.72,
            "approver": []
        },
        {
            "id": 14,
            "spotId": 2,
            "spotName": "Vertical Footage",
            "projectId": 39,
            "projectName": "change name1",
            "customerId": 2,
            "customerName": "Warner Bros.",
            "campaignId": 4,
            "campaignName": "(:30) TV",
            "statusId": 1,
            "billStatus": "Draft",
            "createdAt": "2017-12-10 14:22:21",
            "total": 2920.72,
            "approver": [
                {
                    "userId": 2,
                    "approved": 0
                },
                {
                    "userId": 3,
                    "approved": 0
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /billing`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | length | int | 10 | Limit number of returned results
false | offset | int | 0 | Offset returned results
false | spot_id | int | null | spot id
false | project_id | int | null | project_id
false | status_id | int | null | billing status id
false | campaign_id | int | null | campaign id
false | customer_id | int | null | customer id/client id
false | approver_id | int | null | Approver id(send id of user to check if the user id is in the approver list)
false | approver_status | int | null | approver status(approved status 0 or 1). (say, you want to get not approved bills that are pending approvel for user)
false | search | string | null | search string which will match with: spot name, project name, campaign name
false | sort | string | date | send one of the following values: 'date' or 'priority' . Default is 'date'








## Get Single Billing

Retrieve single billing info by bill id.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 9,
        "spotId": 2,
        "spotName": "Vertical Footage",
        "projectId": 2,
        "projectName": "Before I Wake",
        "customerId": 2,
        "customerName": "Test Customer 2",
        "campaignId": 55,
        "campaignName": "test campaign1",
        "statusId": 1,
        "billStatus": "Draft",
        "createdAt": "2017-03-11 18:10:17",
        "total": 2633.6,
        "approver": {
            "manager": [
                {
                    "managerId": 3,
                    "approved": 0
                },
                {
                    "managerId": 4,
                    "approved": 1
                }
            ],
            "producer": [
                {
                    "producerId": 6,
                    "approved": 0
                },
                {
                    "producerId": 8,
                    "approved": 1
                }
            ]
        },
        "estimate": [
            {
                "id": "2",
                "spotId": 1,
                "versionId": 2,
                "multiplier": 2,
                "notes": "some note",
                "workTypeId": 1,
                "statusId": 2,
                "totalAmount": "0.00"
            },
            {
                "id": "8",
                "spotId": 1,
                "versionId": 8,
                "multiplier": 2,
                "notes": "some note",
                "workTypeId": 1,
                "statusId": 1,
                "totalAmount": "999.00"
            }
        ],
        "activity": [
            {
                "id": 5,
                "name": "Editorial",
                "typeId": 2,
                "activityType": "Timesheet",
                "status": 1,
                "price": "90.80",
                "hour": "7.00"
            }
        ]
    }
}
```

### HTTP Request

`GET /billing/[:bill_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | bill_id | int | null | Bill id



## Create Billing

Create a new billing.

> Sample request

```javascript
axios.post('/billing', {
    project_campaign_id:2
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "billId": 2
    }
}
```

### HTTP Request

`POST /billing`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project campaign id


## Update Billing

Create a new billing.

> Sample request

```javascript
axios.put('/billing/2', {
    billing_line: [
  {
    "line_desc": "Editing v1",
    "line_type": "RT",
    "hours": 9.3,
    "rate": 50.5,
    "disc_perc": 0,
    "disc_amt": 100,
    "total_disc": 100,
    "total_bef_disc": 100,
    "net_amount": 500,
    "time_entry": [
      {
        "time_entry_id": 111,
        "time_entry_hours": 9.4,
        "non_billable_hours": 2.45,
        "lost_hours": 2,
        "rt": 2,
        "ot": 3,
        "dt": 2
      },
      {
        "time_entry_id": 122,
        "time_entry_hours": 9.4,
        "lost_hours": 2,
        "rt": 2,
        "ot": 3,
        "dt": 2
      }
    ]
  },
  {
    "line_desc": "Editing v1",
    "line_type": "OT",
    "hours": 9.3,
    "rate": 50.5,
    "disc_perc": 0,
    "disc_amt": 100,
    "total_disc": 100,
    "net_amount": 500,
    "time_entry": [
      {
        "time_entry_id": 33,
        "time_entry_hours": 9.4,
        "lost_hours": 2,
        "rt": 2,
        "ot": 3,
        "dt": 2
      },
      {
        "time_entry_id": 22,
        "time_entry_hours": 9.4,
        "lost_hours": 2,
        "rt": 2,
        "ot": 3,
        "dt": 2
      }
    ]
  },
  {
    "line_desc": "Editing v3",
    "line_type": "DT",
    "hours": 9.3,
    "rate": 50.5,
    "disc_perc": 0,
    "disc_amt": 100,
    "total_disc": 100,
    "net_amount": 500,
    "time_entry": [
      {
        "time_entry_id": 55,
        "time_entry_hours": 9.4,
        "lost_hours": 2,
        "rt": 2,
        "ot": 3,
        "dt": 2
      }
    ]
  }
]
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

`POST /billing`

### Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | billing_line | JSON | null | billing line array
false | status | int | null | status id for billing
false | ratecard_id | int | null | ratecard id
false | ratecard_template_id | int | null | ratecard template id


### Params for `billing_line`


Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | hours | float | null | hours
**true** | rate | float | null | rate
**true** | disc_perc | float | null | discount percent
**true** | disc_amt | float | null | discount amount 
**true** | total_disc | float | null | total discount
**true** | total_bef_disc | float | null | total before discount
**true** | net_amount | float | null | net amount
**true** | time_entry | JSON | null | time entry array


### Params for `time_entry` for `billing_line`


Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | time_entry_id | int | null | time entry id
**true** | time_entry_hours | float | null | time entry hours
**true** | non_billable_hours | float | null | not billable hours
**true** | lost_hours | float | null | lost hours
**true** | rt | float | null | regular time hours
**true** | ot | float | null | over time hours
**true** | dt | float | null | double time hours


## Get Billing Status list

Get all status list for billing

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 1,
            "billStatus": "Draft"
        },
        {
            "id": 2,
            "billStatus": "Sent For Approval"
        },
        {
            "id": 3,
            "billStatus": "Final"
        }
    ]
}
```

### HTTP Request

`GET /billing-status`



