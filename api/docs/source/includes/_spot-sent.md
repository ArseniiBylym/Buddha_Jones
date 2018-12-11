## Get sent spot Options

Retrieve list of sent spot Options.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "delivery_to_client_option": [
            {
                "id": 1,
                "name": "TV/Streaming",
                "sort": 1,
                "children": [
                    {
                        "id": 3,
                        "name": "Wiredrive",
                        "sort": 1
                    },
                    {
                        "id": 4,
                        "name": "HBO Aspera",
                        "sort": 2
                    },
                    {
                        "id": 5,
                        "name": "USA MediaSilo",
                        "sort": 3
                    }
                ]
            },
            {
                "id": 2,
                "name": "Gaming",
                "sort": 2,
                "children": [
                    {
                        "id": 3,
                        "name": "Wiredrive",
                        "sort": 1
                    },
                    {
                        "id": 6,
                        "name": "Microsoft Aspera",
                        "sort": 2
                    }
                ]
            }
        ],
        "finishing_option": [
            {
                "id": 1,
                "name": "OOH Finish Prep",
                "sort": 1,
                "children": [
                    {
                        "id": 3,
                        "name": "Theatrical",
                        "sort": 1
                    },
                    {
                        "id": 4,
                        "name": "TV Streaming",
                        "sort": 2
                    }
                ]
            },
            {
                "id": 2,
                "name": "In-House Finish",
                "sort": 2,
                "children": [
                    {
                        "id": 3,
                        "name": "Theatrical",
                        "sort": 1
                    },
                    {
                        "id": 4,
                        "name": "TV Streaming",
                        "sort": 2
                    },
                    {
                        "id": 5,
                        "name": "Games",
                        "sort": 3
                    }
                ]
            }
        ],
        "framerate_option": [
            "29.98p",
            "29.97i",
            "29.97p",
            "25p"
        ],
        "raster_size_option": [
            "16x9",
            "9x16",
            "1x1"
        ],
        "sent_via_method": [
            {
                "id": 1,
                "name": "Aspera",
                "sort": 1
            },
            {
                "id": 2,
                "name": "FTP / Transmit",
                "sort": 2
            },
            {
                "id": 3,
                "name": "Wiredrive",
                "sort": 3
            },
            {
                "id": 4,
                "name": "Hard Drive / Physical",
                "sort": 4
            },
            {
                "id": 5,
                "name": "Post",
                "sort": 5
            },
            {
                "id": 6,
                "name": "Fiber",
                "sort": 6
            },
            {
                "id": 7,
                "name": "Email",
                "sort": 7
            },
            {
                "id": 8,
                "name": "Messenger",
                "sort": 8
            },
            {
                "id": 9,
                "name": "Post",
                "sort": 9
            },
            {
                "id": 10,
                "name": "Fedex",
                "sort": 10
            },
            {
                "id": 11,
                "name": "Pickup",
                "sort": 11
            }
        ],
        "status": [
            {
                "id": 1,
                "name": "Producer draft",
                "sort": 1
            },
            {
                "id": 2,
                "name": "Producer final",
                "sort": 2
            }
        ]
    }
}
```

### HTTP Request

`GET /spot-sent-options`



## Get sent spot single option

Retrieve list of sent spot single option.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "key": "delivery_to_client_option",
        "value": [
            {
                "id": 1,
                "name": "TV/Streaming",
                "sort": 1,
                "children": [
                    {
                        "id": 3,
                        "name": "Wiredrive",
                        "sort": 1
                    },
                    {
                        "id": 4,
                        "name": "HBO Aspera",
                        "sort": 2
                    },
                    {
                        "id": 5,
                        "name": "USA MediaSilo",
                        "sort": 3
                    }
                ]
            },
            {
                "id": 2,
                "name": "Gaming",
                "sort": 2,
                "children": [
                    {
                        "id": 3,
                        "name": "Wiredrive",
                        "sort": 1
                    },
                    {
                        "id": 6,
                        "name": "Microsoft Aspera",
                        "sort": 2
                    }
                ]
            }
        ]
    }
}
```

### HTTP Request

`GET /spot-sent-options/:option_key`

#### Send reqeust like
`GET /spot-sent-options/delivery_to_client_option`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | option_key | string | null | Key of the option



## Get Spot Sent list 

get spot sent entry.


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 3,
    "object_count": 3,
    "data": [
        {
            "id": 4,
            "projectId": 1,
            "fullLock": 1,
            "sentViaMethod": "3,4,5",
            "finishOption": "1,2,3",
            "notes": "some note",
            "deadline": "9/3/2018",
            "finishingHouse": "test finishing house",
            "framerateId": 11,
            "framerateNote": "test note 1",
            "rasterSizeId": 22,
            "rasterSizeNote": "some noe 222",
            "musicCueSheet": 1,
            "audioPrep": 1,
            "videoPrep": 1,
            "specNote": "some note",
            "specSheetFile": "[\"file 1.jpg\",\"file2.jpg\"]",
            "tagChart": null,
            "deliveryToClientId": 8,
            "deliveryNote": "some note",
            "statusId": 2,
            "createdBy": 1,
            "updatedBy": null,
            "createdAt": {
                "date": "2018-08-05 18:30:21.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "projectSpotVersion": [],
            "sentViaMethodList": [
                {
                    "id": 3,
                    "name": "Wiredrive",
                    "sort": 3
                },
                {
                    "id": 4,
                    "name": "Hard Drive / Physical",
                    "sort": 4
                },
                {
                    "id": 5,
                    "name": "Post",
                    "sort": 5
                }
            ],
            "finishOptionList": [
                {
                    "id": 1,
                    "name": "OOH Finish Prep",
                    "sort": 1,
                    "children": [
                        {
                            "id": 3,
                            "name": "Theatrical",
                            "sort": 1
                        },
                        {
                            "id": 4,
                            "name": "TV Streaming",
                            "sort": 2
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Theatrical",
                    "sort": 1
                },
                {
                    "id": 2,
                    "name": "In-House Finish",
                    "sort": 2,
                    "children": [
                        {
                            "id": 3,
                            "name": "Theatrical",
                            "sort": 1
                        },
                        {
                            "id": 4,
                            "name": "TV Streaming",
                            "sort": 2
                        },
                        {
                            "id": 5,
                            "name": "Games",
                            "sort": 3
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Theatrical",
                    "sort": 1
                }
            ]
        },
        {
            "id": 6,
            "projectId": 1,
            "fullLock": 1,
            "sentViaMethod": "3,4,5",
            "finishOption": "1,2,3",
            "notes": "some note",
            "deadline": "9/3/2018",
            "finishingHouse": "test finishing house",
            "framerateId": 11,
            "framerateNote": "test note 1",
            "rasterSizeId": 22,
            "rasterSizeNote": "some noe 222",
            "musicCueSheet": 1,
            "audioPrep": 1,
            "videoPrep": 1,
            "specNote": "some note",
            "specSheetFile": "[\"file 1.jpg\",\"file2.jpg\"]",
            "tagChart": null,
            "deliveryToClientId": 8,
            "deliveryNote": "some note",
            "statusId": 2,
            "createdBy": 1,
            "updatedBy": null,
            "createdAt": {
                "date": "2018-08-05 18:32:23.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "projectSpotVersion": [
                {
                    "spotId": "10",
                    "spotName": "Katana",
                    "versionId": "2",
                    "versionName": "1A",
                    "projectId": 1,
                    "campaignId": "1",
                    "campaignName": "Teaser",
                    "projectName": "Babysitter"
                },
                {
                    "spotId": "11",
                    "spotName": "Waller",
                    "versionId": null,
                    "versionName": null,
                    "projectId": 1,
                    "campaignId": "1",
                    "campaignName": "Teaser",
                    "projectName": "Babysitter"
                }
            ],
            "sentViaMethodList": [
                {
                    "id": 3,
                    "name": "Wiredrive",
                    "sort": 3
                },
                {
                    "id": 4,
                    "name": "Hard Drive / Physical",
                    "sort": 4
                },
                {
                    "id": 5,
                    "name": "Post",
                    "sort": 5
                }
            ],
            "finishOptionList": [
                {
                    "id": 1,
                    "name": "OOH Finish Prep",
                    "sort": 1,
                    "children": [
                        {
                            "id": 3,
                            "name": "Theatrical",
                            "sort": 1
                        },
                        {
                            "id": 4,
                            "name": "TV Streaming",
                            "sort": 2
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Theatrical",
                    "sort": 1
                },
                {
                    "id": 2,
                    "name": "In-House Finish",
                    "sort": 2,
                    "children": [
                        {
                            "id": 3,
                            "name": "Theatrical",
                            "sort": 1
                        },
                        {
                            "id": 4,
                            "name": "TV Streaming",
                            "sort": 2
                        },
                        {
                            "id": 5,
                            "name": "Games",
                            "sort": 3
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Theatrical",
                    "sort": 1
                }
            ]
        },
        {
            "id": 7,
            "projectId": 1,
            "fullLock": 1,
            "sentViaMethod": "3,4,5",
            "finishOption": "1,2,3",
            "notes": "some note",
            "deadline": "9/3/2018",
            "finishingHouse": "test finishing house",
            "framerateId": 11,
            "framerateNote": "test note 1",
            "rasterSizeId": 22,
            "rasterSizeNote": "some noe 222",
            "musicCueSheet": 1,
            "audioPrep": 1,
            "videoPrep": 1,
            "specNote": "some note",
            "specSheetFile": "[\"file 1.jpg\",\"file2.jpg\"]",
            "tagChart": null,
            "deliveryToClientId": 8,
            "deliveryNote": "some note",
            "statusId": 2,
            "createdBy": 1,
            "updatedBy": null,
            "createdAt": {
                "date": "2018-08-05 18:33:20.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "projectSpotVersion": [
                {
                    "spotId": "10",
                    "spotName": "Katana",
                    "versionId": "2",
                    "versionName": "1A",
                    "projectId": 1,
                    "campaignId": "1",
                    "campaignName": "Teaser",
                    "projectName": "Babysitter"
                },
                {
                    "spotId": "11",
                    "spotName": "Waller",
                    "versionId": null,
                    "versionName": null,
                    "projectId": 1,
                    "campaignId": "1",
                    "campaignName": "Teaser",
                    "projectName": "Babysitter"
                }
            ],
            "sentViaMethodList": [
                {
                    "id": 3,
                    "name": "Wiredrive",
                    "sort": 3
                },
                {
                    "id": 4,
                    "name": "Hard Drive / Physical",
                    "sort": 4
                },
                {
                    "id": 5,
                    "name": "Post",
                    "sort": 5
                }
            ],
            "finishOptionList": [
                {
                    "id": 1,
                    "name": "OOH Finish Prep",
                    "sort": 1,
                    "children": [
                        {
                            "id": 3,
                            "name": "Theatrical",
                            "sort": 1
                        },
                        {
                            "id": 4,
                            "name": "TV Streaming",
                            "sort": 2
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Theatrical",
                    "sort": 1
                },
                {
                    "id": 2,
                    "name": "In-House Finish",
                    "sort": 2,
                    "children": [
                        {
                            "id": 3,
                            "name": "Theatrical",
                            "sort": 1
                        },
                        {
                            "id": 4,
                            "name": "TV Streaming",
                            "sort": 2
                        },
                        {
                            "id": 5,
                            "name": "Games",
                            "sort": 3
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Theatrical",
                    "sort": 1
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /spot-sent`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | status | string | null | Status id
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results
false | sort | string | 'update' | By default it will sort by updated date DESC. send sort=priority to sort to show draft first and it will order by updated date after status

## Get Single Spot Sent 

Get single spot sent entry.


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "requestId": 35,
        "projectId": 47,
        "fullLock": 1,
        "finishOption": {
            "parent": 2,
            "child": 3
        },
        "notes": "some note",
        "deadline": {
            "date": "2018-03-09 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "finishingHouse": 2,
        "framerate": "29.97i",
        "framerateNote": "test note 1",
        "rasterSize": "1x1",
        "rasterSizeNote": "some noe 222",
        "musicCueSheet": 1,
        "gfxFinish": 1,
        "audioPrep": 1,
        "audio": [
            1,
            2,
            5,
            4
        ],
        "audioNote": "",
        "videoPrep": 1,
        "graphicsFinish": 1,
        "specNote": "some note",
        "specSheetFile": null,
        "tagChart": null,
        "deliveryToClient": {
            "parent": 2,
            "child": 1
        },
        "deliveryNote": "some note",
        "spotResend": 1,
        "statusId": 2,
        "editor": "12,4,5,3,4",
        "customerContact": [
            2,
            4,
            6
        ],
        "createdBy": 1,
        "updatedBy": null,
        "createdAt": {
            "date": "2018-10-12 17:30:57.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "updatedAt": null,
        "createdByUser": "Demo User",
        "updatedByUser": "",
        "statusName": "Producer final",
        "spotData": [
            {
                "campaignId": 4,
                "campaignName": "(:30) TV",
                "projectCampaignId": 156,
                "spotId": 97,
                "spotName": "Water",
                "versionId": 6,
                "versionName": "2",
                "spotVersionId": 40,
                "sentViaMethod": null,
                "finishRequest": 0,
                "spotResend": 1,
                "lineStatusId": 2,
                "lineStatusName": "Producer final"
            },
            {
                "campaignId": 2,
                "campaignName": "Trailer",
                "projectCampaignId": 157,
                "spotId": 99,
                "spotName": "eau",
                "versionId": 2,
                "versionName": "1A",
                "spotVersionId": 0,
                "sentViaMethod": "1,2,4",
                "finishRequest": 1,
                "spotResend": 0,
                "lineStatusId": 1,
                "sentViaMethodList": [
                    {
                        "id": 1,
                        "name": "Fiber/Flex",
                        "sort": 1
                    },
                    {
                        "id": 2,
                        "name": "Post",
                        "sort": 2
                    },
                    {
                        "id": 4,
                        "name": "Internal Link",
                        "sort": 4
                    }
                ],
                "lineStatusName": "Producer draft"
            }
        ],
        "finishOptionList": {
            "id": 2,
            "name": "In-House Finish",
            "sort": 2,
            "children": [
                {
                    "id": 3,
                    "name": "Games",
                    "sort": 3
                }
            ]
        },
        "audioList": [
            {
                "id": 1,
                "name": "Broadcast Stereo"
            },
            {
                "id": 2,
                "name": "Broadcast 5.1"
            },
            {
                "id": 4,
                "name": "Event Stereo"
            },
            {
                "id": 5,
                "name": "Event 5.1"
            }
        ],
        "deliveryToClientList": {
            "id": 2,
            "name": "TV/Streaming",
            "sort": 1,
            "children": [
                {
                    "id": 1,
                    "name": "Wiredrive",
                    "sort": 1
                }
            ]
        },
        "projectName": "Annihilation"
    }
}
```

### HTTP Request

`GET /spot-sent/[:spot_sent_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | spot_sent_id | int | null | Spot sent ID



## Create Spot Sent 

Create a new spot sent entry.

> Sample request

```javascript
axios.post('/spot-sent', {
    sent_via_method:3,4,5
    notes:some note
    status:5
    spot_version:[{"spot_id":10,"version_id":2},{"spot_id":11}]
    finish_option:1,2,3
    project_id:1
    full_lock:1
    notes:some note
    deadline:9/3/2018
    finishing_house:test finishing house
    framerate:11
    framerate_note:test note 1
    raster_size:22
    raster_size_note:some noe 222
    music_cue_sheet:1
    audio_prep:1
    video_prep:1
    spec_note:some note
    spec_sheet_file:["file 1.jpg","file2.jpg"]
    tag_chart:
    delivery_to_client:2,3
    delivery_note:some note
    status_id:2
});
```

> 200: success response

```json
{
  "status": 1,
  "message": "Request successful.",
  "data": {
    "spot_sent_id": 4
  }
}
```

### HTTP Request

`POST /spot-sent`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | project id
**true** | spot_version | JSON encoded string | null | Spot version information (send array of spot_id, version_id,  like: [[{"campaign_id":4,"spot_version_id":40,"editors":[12,4,5,3,4],"spot_resend":1,"finish_request":0,"line_status_id":2},{"campaign_id":2,"spot_id":99,"version_id":2,"editors":[1,3,2],"spot_resend":0,"finish_request":1,"sent_via_method":[1,2,4]}]) .  for each element send either (spot_id, version_id) or just send spot_version_id,  also need to send campaign_id (or you can send project_campaign_id). spot_resend, finish_request are boolean - send 0/1
false | finish_option | string| null | Sent finish option, json encoded ids of parent and client, like "{"parent":1,"child":2}"
false | notes | string | null | Notes
false | status | string | null | Status id 
false | full_lock | int | 0 | send 0/1
false | deadline | date | null | deadline date in Y-M-D format (2018-03-09)
false | finishing_house | string | null | Finishing house id
false | framerate | string | null | framerate string, like '29.97i'
false | framerate_note | string | null | Finishing note
false | raster_size | int | null | raster size ,like '1x1'
false | raster_size_note | string | null | raster size note
false | music_cue_sheet | int | 0 | send 0/1
false | audio_prep | int | 0 | send 0/1
false | video_prep | int | 0 | send 0/1
false | spec_note | string | null | Finishing house
false | spec_sheet_file | JSON encoded list base64 of file | null | json encoded array of base64 encoded of file. like ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE.......","data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE......."]
false | tag_chart | string | null | Tag chart
false | delivery_to_client | string| null | Sent delivery to client option, json encoded ids of parent and client, like "{"parent":1,"child":2}" 
false | delivery_note | string | null | Delivery note
false | audio | string | null | Sent audio option, json encoded  array ids like "[1,2,3,4]"
false | audio_note | string | null | audio note
false | graphics_finish | int | 0 | send 0/1
false | gfx_finish | int | 0 | send 0/1
false | customer_contact | string| null | customer contact ids json encoded array ids like "[1,2,3,4]"
false | internal_note | string| null | internal note
false | studio_note | string| null |  studio note
false | spot_sent_date | date| null | spot sent date



### Spot version Parameters

`spot_version` is array of objects. each object element will have following element

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | campaign_id | int | null | campaign id
**true** | spot_id | int | null | spot id
false | version_id | int| null | Version Id
false | spot_resend | int | 0 | send 0/1
false | prod_accept | int | 0 | send 0/1
false | finish_accept | int | 0 | send 0/1
false | editors | JSON encoded array | null | list of editor ids (Like: [12,4,5,3,4])

### sample spot version data

```json
[{"campaign_id":1,"spot":40,"versoin_id":1,"editors":[12,4,5,3,4],"spot_resend":1,"finish_request":0,"prod_accept":1,"finish_accept":1},{"campaign_id":4,"spot_id":99,"version_id":2,"editors":[1,3,2],"spot_resend":0,"finish_request":1},{"campaign_id":68,"spot_id":40,"version_id":2,"editors":[12,4],"spot_resend":1,"finish_request":0}]
```

## spot_sent array form above has follwoing params

campaign_id, spot_version_id, editors, spot_resend, finish_request, line_status_id, sent_via_method

## Update Spot Sent 

Create a new spot sent entry.

> Sample request

```javascript
axios.put('/spot-sent/1', {
    sent_via_method:3,4,5
    notes:some note
    status:5
    spot_version:[{"spot_id":10,"version_id":2},{"spot_id":11}]
    finish_option:1,2,3
    project_id:1
    full_lock:1
    notes:some note
    deadline:9/3/2018
    finishing_house:test finishing house
    framerate:11
    framerate_note:test note 1
    raster_size:22
    raster_size_note:some noe 222
    music_cue_sheet:1
    audio_prep:1
    video_prep:1
    spec_note:some note
    spec_sheet_file:["file 1.jpg","file2.jpg"]
    tag_chart:
    delivery_to_client:2,3
    delivery_note:some note
    status_id:2
});
```

> 200: success response

```json
{
  "status": 1,
  "message": "Request successful.",
  "data": {
    "spot_sent_id": 4
  }
}
```

### HTTP Request

`PUT /spot-sent/:spot_sent_id`

### Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | project id
**true** | spot_version | JSON encoded string | null | Spot version information (send array of spot_id, version_id,  like: [[{"campaign_id":4,"spot_version_id":40,"editors":[12,4,5,3,4],"spot_resend":1,"finish_request":0,"line_status_id":2},{"campaign_id":2,"spot_id":99,"version_id":2,"editors":[1,3,2],"spot_resend":0,"finish_request":1,"sent_via_method":[1,2,4]}]) .  for each element send either (spot_id, version_id) or just send spot_version_id,  also need to send campaign_id (or you can send project_campaign_id). spot_resend, finish_request are boolean - send 0/1
false | finish_option | string| null | Sent finish option, json encoded ids of parent and client, like "{"parent":1,"child":2}"
false | notes | string | null | Notes
false | status | string | null | Status id 
false | full_lock | int | 0 | send 0/1
false | deadline | date | null | deadline date in Y-M-D format (2018-03-09)
false | finishing_house | string | null | Finishing house id
false | framerate | string | null | framerate string, like '29.97i'
false | framerate_note | string | null | Finishing note
false | raster_size | int | null | raster size ,like '1x1'
false | raster_size_note | string | null | raster size note
false | music_cue_sheet | int | 0 | send 0/1
false | audio_prep | int | 0 | send 0/1
false | video_prep | int | 0 | send 0/1
false | spec_note | string | null | Finishing house
false | spec_sheet_file | JSON encoded list base64 of file | null | json encoded array of base64 encoded of file. like ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE.......","data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE......."]
false | tag_chart | string | null | Tag chart
false | delivery_to_client | string| null | Sent delivery to client option, json encoded ids of parent and client, like "{"parent":1,"child":2}" 
false | delivery_note | string | null | Delivery note
false | audio | string | null | Sent audio option, json encoded  array ids like "[1,2,3,4]"
false | audio_note | string | null | audio note
false | graphics_finish | int | 0 | send 0/1
false | gfx_finish | int | 0 | send 0/1
false | customer_contact | string| null | customer contact ids json encoded array ids like "[1,2,3,4]"
false | internal_note | string| null | internal note
false | studio_note | string| null |  studio note
false | spot_sent_date | date| null | spot sent date

**In update send all data, full dataset is requred as prevoius entry will be deleted and new entry will be created in db**

## Get all finishing house

Retrieve list of finishing house.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 4,
    "object_count": 4,
    "data": [
        {
            "id": 1,
            "name": "fin house 1"
        },
        {
            "id": 2,
            "name": "fin house 2"
        },
        {
            "id": 3,
            "name": "fin house 3"
        },
        {
            "id": 4,
            "name": "fin house 4"
        }
    ]
}
```

### HTTP Request

`GET /finishing-house`

**use who has spot permission can view this list**


## Create finishing option

Create a new finishing option.

> Sample request

```javascript
axios.post('/finishing-option', {
    name: fin house 1
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 1,
            "name": "fin house 1"
        },
        {
            "id": 2,
            "name": "fin house 2"
        },
        {
            "id": 3,
            "name": "fin house 3"
        },
        {
            "id": 5,
            "name": "fin house 10"
        }
    ]
}
```

### HTTP Request

`POST /finishing-house`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string| null | Finishing house namne

**only admin and user who has spot permission can add new finishing hosue**


## Update finishing option

Update finishing option.

> Sample request

```javascript
axios.put('/finishing-option/5', {
    name: fin house 100
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": [
        {
            "id": 1,
            "name": "fin house 1"
        },
        {
            "id": 2,
            "name": "fin house 2"
        },
        {
            "id": 3,
            "name": "fin house 3"
        },
        {
            "id": 5,
            "name": "fin house 100"
        }
    ]
}
```

### HTTP Request

`PUT /finishing-house/:id`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string| null | Finishing house namne

**only admin and user who has spot permission can update new finishing hosue**
