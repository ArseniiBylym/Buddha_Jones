# Filter

## Get filter list

Retrieve list of filters.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        "project"
    ]
}
```

### HTTP Request

`GET /filter`

**only filter for 'project' is available for now**


## Get filter data

Retrieve data for a filter

> 200: success response

```json
{
  "status": 1,
  "message": "Request successful",
  "data": [
    {
      "projectId": 47,
      "campaign": [
        {
          "campaignId": 4,
          "projectCampaignId": 181,
          "campaignName": "(:30) TV",
          "spot": [
            {
              "spotId": 78,
              "spotName": "#1 Theory aka \"Truce\"",
              "version": [
                {
                  "versionId": 1,
                  "spotVersionId": 34,
                  "versionName": "1"
                },
                {
                  "versionId": 4,
                  "spotVersionId": 35,
                  "versionName": "1Alt"
                }
              ]
            },
            {
              "spotId": 79,
              "spotName": "#2 Saved",
              "version": [
                {
                  "versionId": 1,
                  "spotVersionId": 46,
                  "versionName": "1"
                }
              ]
            }
          ]
        }
      ],
      "projectName": "Annihilation",
      "projectCode": null
    },
    {
      "projectId": 1,
      "campaign": [
        {
          "campaignId": 4,
          "projectCampaignId": 105,
          "campaignName": "(:30) TV",
          "spot": [
            {
              "spotId": 55,
              "spotName": "\"Busy\"",
              "version": [
                {
                  "versionId": 1,
                  "spotVersionId": 3,
                  "versionName": "1"
                },
                {
                  "versionId": 46,
                  "spotVersionId": 31,
                  "versionName": "10"
                }
              ]
            },
            {
              "spotId": 73,
              "spotName": "Spot #2\"Really Tired\"",
              "version": [
                {
                  "versionId": 1,
                  "spotVersionId": 21,
                  "versionName": "1"
                },
                {
                  "versionId": 48,
                  "spotVersionId": 33,
                  "versionName": "10B"
                }
              ]
            },
            {
              "spotId": 77,
              "spotName": "Third spot for Babysitter project",
              "version": [
                {
                  "versionId": 1,
                  "spotVersionId": 30,
                  "versionName": "1"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### HTTP Request

`GET /filter/:filter_name`

**for proejct make requst like bellow**

`GET /filter/project`

** this will give back filter data for project => campaign => spot => version