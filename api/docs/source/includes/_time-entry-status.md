# Time entry status options


## Get time entry status list

Retrieve list of time entry status .

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "status": "DRAFT"
        },
        {
            "id": 2,
            "status": "UNDER REVIEW"
        },
        {
            "id": 3,
            "status": "APPROVED"
        }
    ]
}
```

### HTTP Request

`GET /time-entry-status`


##### Send request like

`/time-entry-status`



## Get time entry status list for billing

Retrieve list of time entry status for billing.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "status": "Bill"
        },
        {
            "id": 2,
            "status": "In Approval"
        },
        {
            "id": 3,
            "status": "Approved"
        },
        {
            "id": 4,
            "status": "Bill Sent"
        }
    ]
}
```

### HTTP Request

`GET /time-entry-billing-status`


##### Send request like

`/time-entry-billing-status`

