# Channel

## Channel List

Get list of channels

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 24,
    "object_count": 24,
    "data": [
        {
            "channelId": 1,
            "channelName": "Digital"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 2,
            "channelName": "AV"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 2,
            "channelName": "AV"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 2,
            "channelName": "AV"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 2,
            "channelName": "AV"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 2,
            "channelName": "AV"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 3,
            "channelName": "Broadcast"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 2,
            "channelName": "AV"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 4,
            "channelName": "Games"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 5,
            "channelName": "Graphics"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 6,
            "channelName": "Theatrical Streaming"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        },
        {
            "channelId": 7,
            "channelName": "TV Streaming"
        },
        {
            "channelId": 8,
            "channelName": "Narration"
        }
    ]
}
```


### HTTP Request

`GET /channel`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | campaign_id | int | null | Send campaign id to get channels for that campaign only (like: `/channel?campaign_id=2`)
