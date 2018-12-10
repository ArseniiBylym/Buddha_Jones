# Spot Version Editor

## Get editor list for spot version

Retrieve list of editor for a spot + version combination.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 4,
    "object_count": 4,
    "data": [
        {
            "id": 3,
            "username": "KBOTHWELL",
            "initials": "KB",
            "name": "KATRINA BOTHWELL"
        },
        {
            "id": 4,
            "username": "DFRASER",
            "initials": "DF",
            "name": "DAVID LEITH FRASER"
        },
        {
            "id": 5,
            "username": "MBACHMAN",
            "initials": "MB",
            "name": "MOLLY BACHMAN"
        },
        {
            "id": 12,
            "username": "BHILL",
            "initials": "BH",
            "name": "BLAKE HILL"
        }
    ]
}
```

### HTTP Request

`GET /spot-verison-editor/[:spot_id]/[:version_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | spot_id | int | 0 | spot id
**ture** | version_id | int | 0 | version id


### Call it like

`GET /spot-version-editor/97/6`