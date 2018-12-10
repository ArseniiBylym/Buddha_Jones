# Customer Contact for a project campaign

## Get customer contact list for a project campaign

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 2,
            "customerId": 2,
            "name": "Danielle Wright",
            "title": null,
            "email": null,
            "mobilePhone": null
        },
        {
            "id": 3,
            "customerId": 3,
            "name": "Dave Dore\r\n",
            "title": null,
            "email": null,
            "mobilePhone": null
        }
    ]
}
```

### HTTP Request

`GET /project-campaign-customer-contact/[:project_campaign_id]`

### Query Parameters˝

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_campaign_id | int | null | project campaign id