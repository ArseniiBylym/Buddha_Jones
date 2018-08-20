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
    "message": "Request successful",
    "data": {
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
    framerate_id:11
    framerate_note:test note 1
    raster_size_id:22
    raster_size_note:some noe 222
    music_cue_sheet:1
    audio_prep:1
    video_prep:1
    spec_note:some note
    spec_sheet_file:["file 1.jpg","file2.jpg"]
    tag_chart:
    delivery_to_client_id:8
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
**true** | sent_via_method | string| null | Sent via method id. comman separated ids like "1,2,3,4"
**true** | finish_option | string| null | Sent finish option, comman separated ids like "1,2,3,4"
false | notes | string | null | Notes
false | status_id | string | null | Status id 
false | spot_version | JSON encoded string | null | Spot version information (send array of spot_id, version_id,  like: [{"spot_id":10,"version_id":2},{"spot_id":11}])  
false | full_lock |  | null | send 0/1
false | deadline | string | null | deadline date
false | finishing_house | string | null | Finishing house
false | framerate_id | int | null | Finishing house
false | framerate_note | string | null | Finishing house
false | raster_size_id | int | null | Finishing house
false | raster_size_note | string | null | Finishing house
false | music_cue_sheet | int | null | send 0/1
false | audio_prep | int | null | send 0/1
false | video_prep | int | null | send 0/1
false | spec_note | string | null | Finishing house
false | spec_sheet_file | JSON encoded list base64 of file | null | json encoded array of base64 encoded of file. like ["data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE.......","data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE......."]
false | tag_chart | string | null | Tag chart
false | delivery_to_client_id | int | null | Delivery to client ID 
false | delivery_note | string | null | Delivery note
