# TRT

## Get total run time list

Retrieve list of TRT.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 11,
    "object_count": 11,
    "data": [
        {
            "id": 1,
            "runtime": ":06"
        },
        {
            "id": 2,
            "runtime": ":10"
        },
        {
            "id": 3,
            "runtime": ":15"
        },
        {
            "id": 4,
            "runtime": ":20"
        },
        {
            "id": 5,
            "runtime": ":30"
        },
        {
            "id": 6,
            "runtime": ":45"
        },
        {
            "id": 7,
            "runtime": ":60"
        },
        {
            "id": 8,
            "runtime": ":90"
        },
        {
            "id": 9,
            "runtime": "2:00"
        },
        {
            "id": 10,
            "runtime": "2:30"
        },
        {
            "id": 11,
            "runtime": "Other"
        }
    ]
}
```


> 200: detailed success response (when detailed=1 is sent)

```

### HTTP Request

`GET /trt`