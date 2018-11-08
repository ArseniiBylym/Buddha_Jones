# Project Customer Contact

## Get customer contact list for a project

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
            "mobilePhone": null,
            "projectId": 47,
            "projectCampaignIds": [
                156
            ]
        },
        {
            "id": 3,
            "customerId": 3,
            "name": "Dave Dore\r\n",
            "title": null,
            "email": null,
            "mobilePhone": null,
            "projectId": 47,
            "projectCampaignIds": [
                156
            ]
        }
    ]
}
```

### HTTP Request

`GET /project-customer-customer/[:project_id]`

### Query Parameters˝

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | project id