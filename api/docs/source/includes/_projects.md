# Projects

## Get projects list

Retrieve list of projects.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 19,
    "object_count": 5,
    "data": [
        {
            "id": 48,
            "projectName": null,
            "projectCode": null,
            "customerId": null,
            "customerName": null,
            "cardcode": null,
            "notes": null,
            "projectRelease": {
                "date": "2018-02-23 00:00:00.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "lastUpdatedAt": null,
            "lastUpdateUser": [],
            "campaign": [],
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        },
        {
            "id": 47,
            "projectName": "Annihilation",
            "projectCode": null,
            "customerId": 134,
            "customerName": "Paramount\r\n",
            "cardcode": null,
            "notes": "Job # 5195\nadding Customer Contact here: Anu Bhatia",
            "projectRelease": {
                "date": "2018-02-23 00:00:00.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "lastUpdatedAt": "2018-05-17 20:04:31",
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "campaign": [
                {
                    "projectCampaignId": 156,
                    "campaignId": 4,
                    "campaignName": "Krystle said this was questioning, which is odd, since she's omniscient.",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": true,
                    "writingTeamNotes": "both conceptual ideas and copy",
                    "requestMusicTeam": true,
                    "musicTeamNotes": "cue sheets only as we're using cleared music from theatrical campaign to start",
                    "note": "Krystle said this was questioning, which is odd, since she's omniscient.",
                    "budget": "0",
                    "budgetNote": "budget per spot",
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": "2018-05-05 07:00:00",
                    "user": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 23,
                            "username": "ABATES",
                            "email": "ALEXB@BUDDHA-JONES.COM",
                            "firstName": "ALEXANDRA",
                            "lastName": "BATES",
                            "image": null,
                            "typeId": 6,
                            "type": "Creative Manager/Coordinator",
                            "roleId": null,
                            "role": null,
                            "fullName": "ALEXANDRA BATES"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 97,
                            "username": "MLAFONTANT",
                            "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
                            "firstName": "MARK",
                            "lastName": "LAFONTANT",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": null,
                            "role": null,
                            "fullName": "MARK LAFONTANT"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 67,
                            "username": "KPANG",
                            "email": "KEITHP@BUDDHA-JONES.COM",
                            "firstName": "KEITH",
                            "lastName": "PANG",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "KEITH PANG"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 64,
                            "username": "BBERLING",
                            "email": "BRADB@BUDDHA-JONES.COM",
                            "firstName": "BRADFORD",
                            "lastName": "BERLING",
                            "image": null,
                            "typeId": 14,
                            "type": "Graphic Dept Head",
                            "fullName": "BRADFORD BERLING"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 44,
                            "username": "JMOSKOW",
                            "email": "jacobm@buddha-jones.com",
                            "firstName": "JACOB LAWRENCE",
                            "lastName": "MOSKOW",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "JACOB LAWRENCE MOSKOW"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 48,
                            "username": "WNEIL",
                            "email": "BILLN@BUDDHA-JONES.COM",
                            "firstName": "WILLIAM",
                            "lastName": "NEIL",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "WILLIAM NEIL"
                        }
                    ],
                    "billingUser": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 9,
                            "username": "JDAVIS",
                            "email": "JULIED@BUDDHA-JONES.COM",
                            "firstName": "JULIE",
                            "lastName": "DAVIS",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "billingRole": null,
                            "fullName": "JULIE DAVIS"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 40,
                            "username": "JDADON",
                            "email": "jessicad@buddha-jones.com",
                            "firstName": "JESSICA",
                            "lastName": "DADON",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "billingRole": null,
                            "fullName": "JESSICA DADON"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 97,
                            "username": "MLAFONTANT",
                            "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
                            "firstName": "MARK",
                            "lastName": "LAFONTANT",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "billingRole": null,
                            "fullName": "MARK LAFONTANT"
                        }
                    ]
                },
                {
                    "projectCampaignId": 157,
                    "campaignId": 2,
                    "campaignName": "Trailer",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": true,
                    "writingTeamNotes": "just a blurb",
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": 45000,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": "2018-01-18 08:00:00",
                    "user": [
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": null,
                            "role": null,
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 11,
                            "username": "MBYRNES",
                            "email": "MARIEB@BUDDHA-JONES.COM",
                            "firstName": "MARIE",
                            "lastName": "BYRNES",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": null,
                            "role": null,
                            "fullName": "MARIE BYRNES"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 66,
                            "username": "BSALZANO",
                            "email": "bobs@buddha-jones.com",
                            "firstName": "BOBBY",
                            "lastName": "SALZANO",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "BOBBY SALZANO"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 32,
                            "username": "MWINBUSH",
                            "email": "MEKOW@BUDDHA-JONES.COM",
                            "firstName": "MEKO",
                            "lastName": "WINBUSH",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "MEKO WINBUSH"
                        }
                    ],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 158,
                    "campaignId": 71,
                    "campaignName": "(:15) TV",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": true,
                    "writingTeamNotes": "once upon a time",
                    "requestMusicTeam": true,
                    "musicTeamNotes": "do ta do",
                    "note": "(:15) TV",
                    "budget": "0",
                    "budgetNote": "on spec; billable if revised",
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": "2017-12-02 08:00:00",
                    "user": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 19,
                            "username": "ACAPUTO",
                            "email": "ASHLEYC@BUDDHA-JONES.COM",
                            "firstName": "ASHLEY",
                            "lastName": "CAPUTO",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": null,
                            "role": null,
                            "fullName": "ASHLEY CAPUTO"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 89,
                            "username": "KKATAMBWA",
                            "email": "KAZADIK@BUDDHA-JONES.COM",
                            "firstName": "KAZADI",
                            "lastName": "KATAMBWA",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": null,
                            "role": null,
                            "fullName": "KAZADI KATAMBWA"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 69,
                            "username": "HFORSSTROM",
                            "email": "HALF@BUDDHA-JONES.COM",
                            "firstName": "HEINO",
                            "lastName": "FORSSTROM",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "HEINO FORSSTROM"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 70,
                            "username": "JREYES",
                            "email": "JONATHANR@BUDDHA-JONES.COM",
                            "firstName": "JONATHAN",
                            "lastName": "REYES",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "JONATHAN REYES"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 26,
                            "username": "JONEIL",
                            "email": "JOHNNYO@BUDDHA-JONES.COM",
                            "firstName": "JOHN",
                            "lastName": "ONEIL",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "JOHN ONEIL"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 86,
                            "username": "DASMA",
                            "email": "dan@buddha-jones.com",
                            "firstName": "DANIEL",
                            "lastName": "ASMA",
                            "image": null,
                            "typeId": 28,
                            "type": "Co-owner",
                            "fullName": "DANIEL ASMA"
                        }
                    ],
                    "billingUser": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 15,
                            "username": "TFANG",
                            "email": "TONYF@BUDDHA-JONES.COM",
                            "firstName": "TONY",
                            "lastName": "FANG",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "billingRole": null,
                            "fullName": "TONY FANG"
                        }
                    ]
                },
                {
                    "projectCampaignId": 160,
                    "campaignId": 1,
                    "campaignName": "Teaser",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 161,
                    "campaignId": 68,
                    "campaignName": "TV 30 Stanford",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": "TV 30 Stanford",
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        },
        {
            "id": 1,
            "projectName": "Babysitter",
            "projectCode": "BAB",
            "customerId": 1,
            "customerName": "NBC Universal",
            "cardcode": null,
            "notes": "Project has no description",
            "projectRelease": {
                "date": "2018-06-05 00:00:00.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "lastUpdatedAt": "2018-05-02 16:47:33",
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "campaign": [
                {
                    "projectCampaignId": 105,
                    "campaignId": 4,
                    "campaignName": "(:30) TV Campaign",
                    "firstPointOfContactId": 7,
                    "requestWritingTeam": false,
                    "writingTeamNotes": null,
                    "requestMusicTeam": true,
                    "musicTeamNotes": "This is the place for notes",
                    "note": "(:30) TV Campaign",
                    "budget": 5000,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 10,
                            "username": "JFAGAN",
                            "email": "JOHNF@BUDDHA-JONES.COM",
                            "firstName": "JOHN",
                            "lastName": "FAGAN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 7,
                            "role": "Graphics Coordinator",
                            "fullName": "JOHN FAGAN"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 87,
                            "username": "JGODFREY",
                            "email": "jordang@buddha-jones.com",
                            "firstName": "JORDAN MICHAEL",
                            "lastName": "GODFREY",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": 8,
                            "role": "Editorial Manager",
                            "fullName": "JORDAN MICHAEL GODFREY"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 101,
                            "username": "EDELK",
                            "email": "emilyd@buddha-jones.com",
                            "firstName": "EMILY COLETTE",
                            "lastName": "DELK",
                            "image": null,
                            "typeId": 22,
                            "type": "Production Assistant",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "EMILY COLETTE DELK"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 9,
                            "username": "JDAVIS",
                            "email": "JULIED@BUDDHA-JONES.COM",
                            "firstName": "JULIE",
                            "lastName": "DAVIS",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "fullName": "JULIE DAVIS"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 87,
                            "username": "JGODFREY",
                            "email": "jordang@buddha-jones.com",
                            "firstName": "JORDAN MICHAEL",
                            "lastName": "GODFREY",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "fullName": "JORDAN MICHAEL GODFREY"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 89,
                            "username": "KKATAMBWA",
                            "email": "KAZADIK@BUDDHA-JONES.COM",
                            "firstName": "KAZADI",
                            "lastName": "KATAMBWA",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "fullName": "KAZADI KATAMBWA"
                        }
                    ],
                    "billingUser": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 13,
                            "username": "SSISSON",
                            "email": "SOPHIAS@BUDDHA-JONES.COM",
                            "firstName": "SOPHIA",
                            "lastName": "SISSON",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "billingRole": null,
                            "fullName": "SOPHIA SISSON"
                        }
                    ]
                },
                {
                    "projectCampaignId": 149,
                    "campaignId": 1,
                    "campaignName": "Teaser",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 155,
                    "campaignId": 2,
                    "campaignName": "Trailer",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        },
        {
            "id": 2,
            "projectName": "Before I Wake",
            "projectCode": null,
            "customerId": 2,
            "customerName": "Warner Bros.",
            "cardcode": null,
            "notes": null,
            "projectRelease": {
                "date": "2018-06-05 00:00:00.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "lastUpdatedAt": "2018-05-29 13:22:27",
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "campaign": [
                {
                    "projectCampaignId": 162,
                    "campaignId": 72,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 164,
                    "campaignId": 73,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "comment": {
                "count": 1,
                "unread": 1
            },
            "user": []
        },
        {
            "id": 3,
            "projectName": "Bravo 14",
            "projectCode": null,
            "customerId": 3,
            "customerName": "HBO",
            "cardcode": null,
            "notes": null,
            "projectRelease": {
                "date": "2018-06-05 00:00:00.000000",
                "timezone_type": 3,
                "timezone": "US/Eastern"
            },
            "lastUpdatedAt": "2018-05-29 16:16:11",
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "campaign": [
                {
                    "projectCampaignId": 163,
                    "campaignId": 72,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 165,
                    "campaignId": 73,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 172,
                    "campaignId": 2,
                    "campaignName": "Trailer",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 173,
                    "campaignId": 70,
                    "campaignName": "How",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        }
    ]
}
```


> 200: detailed success response (when detailed=1 is sent)

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 19,
    "object_count": 5,
    "data": [
        {
            "id": 48,
            "projectName": null,
            "projectCode": null,
            "customerId": 0,
            "projectRelease": "2018-02-23 00:00:00",
            "customerName": null,
            "cardcode": null,
            "notes": null,
            "lastUpdatedAt": null,
            "lastUpdateUserId": null,
            "lastUpdateUserName": "",
            "historyCount": 0,
            "campaign": [],
            "lastUpdateUser": [],
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        },
        {
            "id": 47,
            "projectName": "Annihilation",
            "projectCode": null,
            "customerId": 134,
            "projectRelease": "2018-02-23 00:00:00",
            "customerName": "Paramount\r\n",
            "cardcode": null,
            "notes": "Job # 5195\nadding Customer Contact here: Anu Bhatia",
            "lastUpdatedAt": "2018-05-17 20:04:31",
            "lastUpdateUserId": 1,
            "lastUpdateUserName": "Demo User",
            "historyCount": 460,
            "campaign": [
                {
                    "projectCampaignId": 156,
                    "campaignId": 4,
                    "campaignName": "Krystle said this was questioning, which is odd, since she's omniscient.",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": true,
                    "writingTeamNotes": "both conceptual ideas and copy",
                    "requestMusicTeam": true,
                    "musicTeamNotes": "cue sheets only as we're using cleared music from theatrical campaign to start",
                    "note": "Krystle said this was questioning, which is odd, since she's omniscient.",
                    "budget": "0",
                    "budgetNote": "budget per spot",
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": "2018-05-05 07:00:00",
                    "user": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 23,
                            "username": "ABATES",
                            "email": "ALEXB@BUDDHA-JONES.COM",
                            "firstName": "ALEXANDRA",
                            "lastName": "BATES",
                            "image": null,
                            "typeId": 6,
                            "type": "Creative Manager/Coordinator",
                            "roleId": null,
                            "role": null,
                            "fullName": "ALEXANDRA BATES"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 97,
                            "username": "MLAFONTANT",
                            "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
                            "firstName": "MARK",
                            "lastName": "LAFONTANT",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": null,
                            "role": null,
                            "fullName": "MARK LAFONTANT"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 67,
                            "username": "KPANG",
                            "email": "KEITHP@BUDDHA-JONES.COM",
                            "firstName": "KEITH",
                            "lastName": "PANG",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "KEITH PANG"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 64,
                            "username": "BBERLING",
                            "email": "BRADB@BUDDHA-JONES.COM",
                            "firstName": "BRADFORD",
                            "lastName": "BERLING",
                            "image": null,
                            "typeId": 14,
                            "type": "Graphic Dept Head",
                            "fullName": "BRADFORD BERLING"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 44,
                            "username": "JMOSKOW",
                            "email": "jacobm@buddha-jones.com",
                            "firstName": "JACOB LAWRENCE",
                            "lastName": "MOSKOW",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "JACOB LAWRENCE MOSKOW"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 48,
                            "username": "WNEIL",
                            "email": "BILLN@BUDDHA-JONES.COM",
                            "firstName": "WILLIAM",
                            "lastName": "NEIL",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "WILLIAM NEIL"
                        }
                    ],
                    "billingUser": [
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 9,
                            "username": "JDAVIS",
                            "email": "JULIED@BUDDHA-JONES.COM",
                            "firstName": "JULIE",
                            "lastName": "DAVIS",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "billingRole": null,
                            "fullName": "JULIE DAVIS"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 40,
                            "username": "JDADON",
                            "email": "jessicad@buddha-jones.com",
                            "firstName": "JESSICA",
                            "lastName": "DADON",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "billingRole": null,
                            "fullName": "JESSICA DADON"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 4,
                            "userId": 97,
                            "username": "MLAFONTANT",
                            "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
                            "firstName": "MARK",
                            "lastName": "LAFONTANT",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "billingRole": null,
                            "fullName": "MARK LAFONTANT"
                        }
                    ]
                },
                {
                    "projectCampaignId": 157,
                    "campaignId": 2,
                    "campaignName": "Trailer",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": true,
                    "writingTeamNotes": "just a blurb",
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": 45000,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": "2018-01-18 08:00:00",
                    "user": [
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": null,
                            "role": null,
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 11,
                            "username": "MBYRNES",
                            "email": "MARIEB@BUDDHA-JONES.COM",
                            "firstName": "MARIE",
                            "lastName": "BYRNES",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": null,
                            "role": null,
                            "fullName": "MARIE BYRNES"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 66,
                            "username": "BSALZANO",
                            "email": "bobs@buddha-jones.com",
                            "firstName": "BOBBY",
                            "lastName": "SALZANO",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "BOBBY SALZANO"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 47,
                            "campaignId": 2,
                            "userId": 32,
                            "username": "MWINBUSH",
                            "email": "MEKOW@BUDDHA-JONES.COM",
                            "firstName": "MEKO",
                            "lastName": "WINBUSH",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "MEKO WINBUSH"
                        }
                    ],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 158,
                    "campaignId": 71,
                    "campaignName": "(:15) TV",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": true,
                    "writingTeamNotes": "once upon a time",
                    "requestMusicTeam": true,
                    "musicTeamNotes": "do ta do",
                    "note": "(:15) TV",
                    "budget": "0",
                    "budgetNote": "on spec; billable if revised",
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": "2017-12-02 08:00:00",
                    "user": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 19,
                            "username": "ACAPUTO",
                            "email": "ASHLEYC@BUDDHA-JONES.COM",
                            "firstName": "ASHLEY",
                            "lastName": "CAPUTO",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": null,
                            "role": null,
                            "fullName": "ASHLEY CAPUTO"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 89,
                            "username": "KKATAMBWA",
                            "email": "KAZADIK@BUDDHA-JONES.COM",
                            "firstName": "KAZADI",
                            "lastName": "KATAMBWA",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": null,
                            "role": null,
                            "fullName": "KAZADI KATAMBWA"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 69,
                            "username": "HFORSSTROM",
                            "email": "HALF@BUDDHA-JONES.COM",
                            "firstName": "HEINO",
                            "lastName": "FORSSTROM",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "HEINO FORSSTROM"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 70,
                            "username": "JREYES",
                            "email": "JONATHANR@BUDDHA-JONES.COM",
                            "firstName": "JONATHAN",
                            "lastName": "REYES",
                            "image": null,
                            "typeId": 12,
                            "type": "Graphic Designer",
                            "fullName": "JONATHAN REYES"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 26,
                            "username": "JONEIL",
                            "email": "JOHNNYO@BUDDHA-JONES.COM",
                            "firstName": "JOHN",
                            "lastName": "ONEIL",
                            "image": null,
                            "typeId": 7,
                            "type": "Editor",
                            "fullName": "JOHN ONEIL"
                        },
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 86,
                            "username": "DASMA",
                            "email": "dan@buddha-jones.com",
                            "firstName": "DANIEL",
                            "lastName": "ASMA",
                            "image": null,
                            "typeId": 28,
                            "type": "Co-owner",
                            "fullName": "DANIEL ASMA"
                        }
                    ],
                    "billingUser": [
                        {
                            "projectId": 47,
                            "campaignId": 71,
                            "userId": 15,
                            "username": "TFANG",
                            "email": "TONYF@BUDDHA-JONES.COM",
                            "firstName": "TONY",
                            "lastName": "FANG",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "billingRole": null,
                            "fullName": "TONY FANG"
                        }
                    ]
                },
                {
                    "projectCampaignId": 160,
                    "campaignId": 1,
                    "campaignName": "Teaser",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 161,
                    "campaignId": 68,
                    "campaignName": "TV 30 Stanford",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": "TV 30 Stanford",
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        },
        {
            "id": 1,
            "projectName": "Babysitter",
            "projectCode": "BAB",
            "customerId": 1,
            "projectRelease": "2018-06-05 00:00:00",
            "customerName": "NBC Universal",
            "cardcode": null,
            "notes": "Project has no description",
            "lastUpdatedAt": "2018-05-02 16:47:33",
            "lastUpdateUserId": 1,
            "lastUpdateUserName": "Demo User",
            "historyCount": 321,
            "campaign": [
                {
                    "projectCampaignId": 105,
                    "campaignId": 4,
                    "campaignName": "(:30) TV Campaign",
                    "firstPointOfContactId": 7,
                    "requestWritingTeam": false,
                    "writingTeamNotes": null,
                    "requestMusicTeam": true,
                    "musicTeamNotes": "This is the place for notes",
                    "note": "(:30) TV Campaign",
                    "budget": 5000,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 10,
                            "username": "JFAGAN",
                            "email": "JOHNF@BUDDHA-JONES.COM",
                            "firstName": "JOHN",
                            "lastName": "FAGAN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 7,
                            "role": "Graphics Coordinator",
                            "fullName": "JOHN FAGAN"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 87,
                            "username": "JGODFREY",
                            "email": "jordang@buddha-jones.com",
                            "firstName": "JORDAN MICHAEL",
                            "lastName": "GODFREY",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "roleId": 8,
                            "role": "Editorial Manager",
                            "fullName": "JORDAN MICHAEL GODFREY"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 101,
                            "username": "EDELK",
                            "email": "emilyd@buddha-jones.com",
                            "firstName": "EMILY COLETTE",
                            "lastName": "DELK",
                            "image": null,
                            "typeId": 22,
                            "type": "Production Assistant",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "EMILY COLETTE DELK"
                        }
                    ],
                    "designer": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 9,
                            "username": "JDAVIS",
                            "email": "JULIED@BUDDHA-JONES.COM",
                            "firstName": "JULIE",
                            "lastName": "DAVIS",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "fullName": "JULIE DAVIS"
                        }
                    ],
                    "editor": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 87,
                            "username": "JGODFREY",
                            "email": "jordang@buddha-jones.com",
                            "firstName": "JORDAN MICHAEL",
                            "lastName": "GODFREY",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "fullName": "JORDAN MICHAEL GODFREY"
                        },
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 89,
                            "username": "KKATAMBWA",
                            "email": "KAZADIK@BUDDHA-JONES.COM",
                            "firstName": "KAZADI",
                            "lastName": "KATAMBWA",
                            "image": null,
                            "typeId": 21,
                            "type": "Producer",
                            "fullName": "KAZADI KATAMBWA"
                        }
                    ],
                    "billingUser": [
                        {
                            "projectId": 1,
                            "campaignId": 4,
                            "userId": 13,
                            "username": "SSISSON",
                            "email": "SOPHIAS@BUDDHA-JONES.COM",
                            "firstName": "SOPHIA",
                            "lastName": "SISSON",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "billingRole": null,
                            "fullName": "SOPHIA SISSON"
                        }
                    ]
                },
                {
                    "projectCampaignId": 149,
                    "campaignId": 1,
                    "campaignName": "Teaser",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 155,
                    "campaignId": 2,
                    "campaignName": "Trailer",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        },
        {
            "id": 2,
            "projectName": "Before I Wake",
            "projectCode": null,
            "customerId": 2,
            "projectRelease": "2018-06-05 00:00:00",
            "customerName": "Warner Bros.",
            "cardcode": null,
            "notes": null,
            "lastUpdatedAt": "2018-05-29 13:22:27",
            "lastUpdateUserId": 1,
            "lastUpdateUserName": "Demo User",
            "historyCount": 22,
            "campaign": [
                {
                    "projectCampaignId": 162,
                    "campaignId": 72,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 72,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 164,
                    "campaignId": 73,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 2,
                            "campaignId": 73,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "comment": {
                "count": 1,
                "unread": 1
            },
            "user": []
        },
        {
            "id": 3,
            "projectName": "Bravo 14",
            "projectCode": null,
            "customerId": 3,
            "projectRelease": "2018-06-05 00:00:00",
            "customerName": "HBO",
            "cardcode": null,
            "notes": null,
            "lastUpdatedAt": "2018-05-29 16:16:11",
            "lastUpdateUserId": 1,
            "lastUpdateUserName": "Demo User",
            "historyCount": 52,
            "campaign": [
                {
                    "projectCampaignId": 163,
                    "campaignId": 72,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 72,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 165,
                    "campaignId": 73,
                    "campaignName": "test campaign1",
                    "firstPointOfContactId": 1,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 2,
                            "username": "AZEIGLER",
                            "email": "ashleyz@buddha-jones.com",
                            "firstName": "ASHLEY",
                            "lastName": "ZEIGLER",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "ASHLEY ZEIGLER"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 3,
                            "username": "KBOTHWELL",
                            "email": "katrinab@buddha-jones.com",
                            "firstName": "KATRINA",
                            "lastName": "BOTHWELL",
                            "image": null,
                            "typeId": 1,
                            "type": "Admin",
                            "roleId": 1,
                            "role": "Lead Producer",
                            "fullName": "KATRINA BOTHWELL"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 6,
                            "username": "JZAKOSKI",
                            "email": "JAMIEZ@BUDDHA-JONES.COM",
                            "firstName": "JAMIE",
                            "lastName": "ZAKOSKI",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 2,
                            "role": "Producer",
                            "fullName": "JAMIE ZAKOSKI"
                        },
                        {
                            "projectId": 3,
                            "campaignId": 73,
                            "userId": 7,
                            "username": "MALBORN",
                            "email": "MAXA@BUDDHA-JONES.COM",
                            "firstName": "MAXWELL",
                            "lastName": "ALBORN",
                            "image": null,
                            "typeId": 4,
                            "type": "Assistant Editor",
                            "roleId": 4,
                            "role": "Creative Manager",
                            "fullName": "MAXWELL ALBORN"
                        }
                    ],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 172,
                    "campaignId": 2,
                    "campaignName": "Trailer",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                },
                {
                    "projectCampaignId": 173,
                    "campaignId": 70,
                    "campaignName": "How",
                    "firstPointOfContactId": null,
                    "requestWritingTeam": null,
                    "writingTeamNotes": null,
                    "requestMusicTeam": null,
                    "musicTeamNotes": null,
                    "note": null,
                    "budget": null,
                    "budgetNote": null,
                    "por": null,
                    "invoiceContact": null,
                    "materialReceiveDate": null,
                    "user": [],
                    "designer": [],
                    "editor": [],
                    "billingUser": []
                }
            ],
            "lastUpdateUser": {
                "userId": 1,
                "name": "Demo User",
                "image": null
            },
            "comment": {
                "count": 0,
                "unread": 0
            },
            "user": []
        }
    ]
}
```

### HTTP Request

`GET /project`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | search | string | null | Search query to narrow returned results by their name
false | customer_id | int | null | Customer ID for filter
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results
false | detailed | int | null | Send 0 or 1. If 1 is sent response will contain more information
false | sort | string | null | Send "last_update_date" or "name" if needed . By default sorting will be done by id
false | get_user | int | 0 | Send 0 or 1. Send 1 to get user, editor, designer and billing user for campaigns in project



## Get Single project

Retrieve single project information.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 47,
        "projectName": "Annihilation",
        "projectCode": null,
        "customerId": 134,
        "customerName": "Paramount\r\n",
        "cardcode": null,
        "notes": "Job # 5195\nadding Customer Contact here: Anu Bhatia",
        "projectRelease": {
            "date": "2018-02-23 00:00:00.000000",
            "timezone_type": 3,
            "timezone": "US/Eastern"
        },
        "lastUpdatedAt": "2018-05-17 20:04:31",
        "lastUpdateUser": {
            "userId": 1,
            "name": "Demo User",
            "image": null
        },
        "campaign": [
            {
                "projectCampaignId": 156,
                "campaignId": 4,
                "campaignName": "Krystle said this was questioning, which is odd, since she's omniscient.",
                "firstPointOfContactId": null,
                "requestWritingTeam": true,
                "writingTeamNotes": "both conceptual ideas and copy",
                "requestMusicTeam": true,
                "musicTeamNotes": "cue sheets only as we're using cleared music from theatrical campaign to start",
                "note": "Krystle said this was questioning, which is odd, since she's omniscient.",
                "budget": "0",
                "budgetNote": "budget per spot",
                "por": null,
                "invoiceContact": null,
                "materialReceiveDate": "2018-05-05 07:00:00",
                "spot": [
                    {
                        "id": "78",
                        "spotName": "#1 Theory",
                        "revisionNotCounted": null,
                        "notes": "Kris Brown cut v.1",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "11000.00",
                        "internalDeadline": null,
                        "clientDeadline": "2018-05-14 00:00:00",
                        "version": [
                            {
                                "id": 1,
                                "versionName": "1",
                                "seq": 1,
                                "active": 1,
                                "createdUserId": null,
                                "createdAt": null,
                                "updatedUserId": null,
                                "updatedAt": null
                            },
                            {
                                "id": 4,
                                "versionName": "1 Alt",
                                "seq": 4,
                                "active": 1,
                                "createdUserId": null,
                                "createdAt": null,
                                "updatedUserId": null,
                                "updatedAt": null
                            },
                            {
                                "id": 6,
                                "versionName": "2",
                                "seq": 6,
                                "active": 1,
                                "createdUserId": null,
                                "createdAt": null,
                                "updatedUserId": null,
                                "updatedAt": null
                            },
                            {
                                "id": 11,
                                "versionName": "3",
                                "seq": 11,
                                "active": 1,
                                "createdUserId": null,
                                "createdAt": null,
                                "updatedUserId": null,
                                "updatedAt": null
                            }
                        ]
                    },
                    {
                        "id": "79",
                        "spotName": "#2 Saved",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "11000.00",
                        "internalDeadline": null,
                        "clientDeadline": "2018-05-14 00:00:00",
                        "version": []
                    },
                    {
                        "id": "80",
                        "spotName": "#3 Need",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "11000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "81",
                        "spotName": "#4 Inside",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "11000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "82",
                        "spotName": "#5 Threat",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "11000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "83",
                        "spotName": "#6 Rescue",
                        "revisionNotCounted": null,
                        "notes": "OT billable",
                        "revisions": 2,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "9000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "92",
                        "spotName": "New test spot",
                        "revisionNotCounted": null,
                        "notes": "Edit sample note",
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "0.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "95",
                        "spotName": "Test3",
                        "revisionNotCounted": null,
                        "notes": null,
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "0.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "96",
                        "spotName": "Test2",
                        "revisionNotCounted": null,
                        "notes": null,
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "0.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    }
                ],
                "user": [
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 23,
                        "username": "ABATES",
                        "email": "ALEXB@BUDDHA-JONES.COM",
                        "firstName": "ALEXANDRA",
                        "lastName": "BATES",
                        "image": null,
                        "typeId": 6,
                        "type": "Creative Manager/Coordinator",
                        "roleId": null,
                        "role": null,
                        "fullName": "ALEXANDRA BATES"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 97,
                        "username": "MLAFONTANT",
                        "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
                        "firstName": "MARK",
                        "lastName": "LAFONTANT",
                        "image": null,
                        "typeId": 21,
                        "type": "Producer",
                        "roleId": null,
                        "role": null,
                        "fullName": "MARK LAFONTANT"
                    }
                ],
                "designer": [
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 67,
                        "username": "KPANG",
                        "email": "KEITHP@BUDDHA-JONES.COM",
                        "firstName": "KEITH",
                        "lastName": "PANG",
                        "image": null,
                        "typeId": 12,
                        "type": "Graphic Designer",
                        "fullName": "KEITH PANG"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 64,
                        "username": "BBERLING",
                        "email": "BRADB@BUDDHA-JONES.COM",
                        "firstName": "BRADFORD",
                        "lastName": "BERLING",
                        "image": null,
                        "typeId": 14,
                        "type": "Graphic Dept Head",
                        "fullName": "BRADFORD BERLING"
                    }
                ],
                "editor": [
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 44,
                        "username": "JMOSKOW",
                        "email": "jacobm@buddha-jones.com",
                        "firstName": "JACOB LAWRENCE",
                        "lastName": "MOSKOW",
                        "image": null,
                        "typeId": 7,
                        "type": "Editor",
                        "fullName": "JACOB LAWRENCE MOSKOW"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 48,
                        "username": "WNEIL",
                        "email": "BILLN@BUDDHA-JONES.COM",
                        "firstName": "WILLIAM",
                        "lastName": "NEIL",
                        "image": null,
                        "typeId": 7,
                        "type": "Editor",
                        "fullName": "WILLIAM NEIL"
                    }
                ],
                "billingUser": [
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 9,
                        "username": "JDAVIS",
                        "email": "JULIED@BUDDHA-JONES.COM",
                        "firstName": "JULIE",
                        "lastName": "DAVIS",
                        "image": null,
                        "typeId": 4,
                        "type": "Assistant Editor",
                        "billingRole": null,
                        "fullName": "JULIE DAVIS"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 40,
                        "username": "JDADON",
                        "email": "jessicad@buddha-jones.com",
                        "firstName": "JESSICA",
                        "lastName": "DADON",
                        "image": null,
                        "typeId": 7,
                        "type": "Editor",
                        "billingRole": null,
                        "fullName": "JESSICA DADON"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 4,
                        "userId": 97,
                        "username": "MLAFONTANT",
                        "email": "MARK.LAFONTANT@BUDDHA-JONES.COM",
                        "firstName": "MARK",
                        "lastName": "LAFONTANT",
                        "image": null,
                        "typeId": 21,
                        "type": "Producer",
                        "billingRole": null,
                        "fullName": "MARK LAFONTANT"
                    }
                ]
            },
            {
                "projectCampaignId": 157,
                "campaignId": 2,
                "campaignName": "Trailer",
                "firstPointOfContactId": null,
                "requestWritingTeam": true,
                "writingTeamNotes": "just a blurb",
                "requestMusicTeam": null,
                "musicTeamNotes": null,
                "note": null,
                "budget": 45000,
                "budgetNote": null,
                "por": null,
                "invoiceContact": null,
                "materialReceiveDate": "2018-01-18 08:00:00",
                "spot": [
                    {
                        "id": "84",
                        "spotName": "#1 Interrogation",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 5,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "45000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "91",
                        "spotName": "Test",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "0.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    }
                ],
                "user": [
                    {
                        "projectId": 47,
                        "campaignId": 2,
                        "userId": 6,
                        "username": "JZAKOSKI",
                        "email": "JAMIEZ@BUDDHA-JONES.COM",
                        "firstName": "JAMIE",
                        "lastName": "ZAKOSKI",
                        "image": null,
                        "typeId": 4,
                        "type": "Assistant Editor",
                        "roleId": null,
                        "role": null,
                        "fullName": "JAMIE ZAKOSKI"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 2,
                        "userId": 11,
                        "username": "MBYRNES",
                        "email": "MARIEB@BUDDHA-JONES.COM",
                        "firstName": "MARIE",
                        "lastName": "BYRNES",
                        "image": null,
                        "typeId": 4,
                        "type": "Assistant Editor",
                        "roleId": null,
                        "role": null,
                        "fullName": "MARIE BYRNES"
                    }
                ],
                "designer": [
                    {
                        "projectId": 47,
                        "campaignId": 2,
                        "userId": 66,
                        "username": "BSALZANO",
                        "email": "bobs@buddha-jones.com",
                        "firstName": "BOBBY",
                        "lastName": "SALZANO",
                        "image": null,
                        "typeId": 12,
                        "type": "Graphic Designer",
                        "fullName": "BOBBY SALZANO"
                    }
                ],
                "editor": [
                    {
                        "projectId": 47,
                        "campaignId": 2,
                        "userId": 32,
                        "username": "MWINBUSH",
                        "email": "MEKOW@BUDDHA-JONES.COM",
                        "firstName": "MEKO",
                        "lastName": "WINBUSH",
                        "image": null,
                        "typeId": 7,
                        "type": "Editor",
                        "fullName": "MEKO WINBUSH"
                    }
                ],
                "billingUser": []
            },
            {
                "projectCampaignId": 158,
                "campaignId": 71,
                "campaignName": "(:15) TV",
                "firstPointOfContactId": null,
                "requestWritingTeam": true,
                "writingTeamNotes": "once upon a time",
                "requestMusicTeam": true,
                "musicTeamNotes": "do ta do",
                "note": "(:15) TV",
                "budget": "0",
                "budgetNote": "on spec; billable if revised",
                "por": null,
                "invoiceContact": null,
                "materialReceiveDate": "2017-12-02 08:00:00",
                "spot": [
                    {
                        "id": "85",
                        "spotName": "#1 Reason",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "5000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "86",
                        "spotName": "#2 Creation",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "5000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "87",
                        "spotName": "#3 Everywhere",
                        "revisionNotCounted": null,
                        "notes": "null",
                        "revisions": 3,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "5000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "88",
                        "spotName": "#4 Need",
                        "revisionNotCounted": null,
                        "notes": "based on digital :15 v.6",
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "5000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "89",
                        "spotName": "#3 Everywhere",
                        "revisionNotCounted": null,
                        "notes": "based on digital 15 v.6",
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "0.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    },
                    {
                        "id": "90",
                        "spotName": "#5 Succeed/YouTube",
                        "revisionNotCounted": null,
                        "notes": "based on digital 15 v.3",
                        "revisions": 0,
                        "graphicsRevisions": 0,
                        "firstRevisionCost": "5000.00",
                        "internalDeadline": null,
                        "clientDeadline": null,
                        "version": []
                    }
                ],
                "user": [
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 19,
                        "username": "ACAPUTO",
                        "email": "ASHLEYC@BUDDHA-JONES.COM",
                        "firstName": "ASHLEY",
                        "lastName": "CAPUTO",
                        "image": null,
                        "typeId": 21,
                        "type": "Producer",
                        "roleId": null,
                        "role": null,
                        "fullName": "ASHLEY CAPUTO"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 89,
                        "username": "KKATAMBWA",
                        "email": "KAZADIK@BUDDHA-JONES.COM",
                        "firstName": "KAZADI",
                        "lastName": "KATAMBWA",
                        "image": null,
                        "typeId": 21,
                        "type": "Producer",
                        "roleId": null,
                        "role": null,
                        "fullName": "KAZADI KATAMBWA"
                    }
                ],
                "designer": [
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 69,
                        "username": "HFORSSTROM",
                        "email": "HALF@BUDDHA-JONES.COM",
                        "firstName": "HEINO",
                        "lastName": "FORSSTROM",
                        "image": null,
                        "typeId": 12,
                        "type": "Graphic Designer",
                        "fullName": "HEINO FORSSTROM"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 70,
                        "username": "JREYES",
                        "email": "JONATHANR@BUDDHA-JONES.COM",
                        "firstName": "JONATHAN",
                        "lastName": "REYES",
                        "image": null,
                        "typeId": 12,
                        "type": "Graphic Designer",
                        "fullName": "JONATHAN REYES"
                    }
                ],
                "editor": [
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 26,
                        "username": "JONEIL",
                        "email": "JOHNNYO@BUDDHA-JONES.COM",
                        "firstName": "JOHN",
                        "lastName": "ONEIL",
                        "image": null,
                        "typeId": 7,
                        "type": "Editor",
                        "fullName": "JOHN ONEIL"
                    },
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 86,
                        "username": "DASMA",
                        "email": "dan@buddha-jones.com",
                        "firstName": "DANIEL",
                        "lastName": "ASMA",
                        "image": null,
                        "typeId": 28,
                        "type": "Co-owner",
                        "fullName": "DANIEL ASMA"
                    }
                ],
                "billingUser": [
                    {
                        "projectId": 47,
                        "campaignId": 71,
                        "userId": 15,
                        "username": "TFANG",
                        "email": "TONYF@BUDDHA-JONES.COM",
                        "firstName": "TONY",
                        "lastName": "FANG",
                        "image": null,
                        "typeId": 4,
                        "type": "Assistant Editor",
                        "billingRole": null,
                        "fullName": "TONY FANG"
                    }
                ]
            },
            {
                "projectCampaignId": 160,
                "campaignId": 1,
                "campaignName": "Teaser",
                "firstPointOfContactId": null,
                "requestWritingTeam": null,
                "writingTeamNotes": null,
                "requestMusicTeam": null,
                "musicTeamNotes": null,
                "note": null,
                "budget": null,
                "budgetNote": null,
                "por": null,
                "invoiceContact": null,
                "materialReceiveDate": null,
                "spot": [],
                "user": [],
                "designer": [],
                "editor": [],
                "billingUser": []
            },
            {
                "projectCampaignId": 161,
                "campaignId": 68,
                "campaignName": "TV 30 Stanford",
                "firstPointOfContactId": null,
                "requestWritingTeam": null,
                "writingTeamNotes": null,
                "requestMusicTeam": null,
                "musicTeamNotes": null,
                "note": "TV 30 Stanford",
                "budget": null,
                "budgetNote": null,
                "por": null,
                "invoiceContact": null,
                "materialReceiveDate": null,
                "spot": [],
                "user": [],
                "designer": [],
                "editor": [],
                "billingUser": []
            }
        ],
        "comment": {
            "count": 0,
            "unread": 0
        },
        "user": [],
        "history": [
            {
                "id": "425",
                "message": "Version \"3\" was added to spot \"#1 Theory\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 20:04:31"
            },
            {
                "id": "423",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 20:00:45"
            },
            {
                "id": "424",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 20:00:45"
            },
            {
                "id": "421",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 20:00:09"
            },
            {
                "id": "422",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 20:00:09"
            },
            {
                "id": "420",
                "message": "Billing user \"MAXWELL ALBORN\" was removed from campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:47:50"
            },
            {
                "id": "419",
                "message": "Billing user \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:47:34"
            },
            {
                "id": "417",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:42:50"
            },
            {
                "id": "418",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:42:50"
            },
            {
                "id": "415",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:42:49"
            },
            {
                "id": "416",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:42:49"
            },
            {
                "id": "413",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:41:47"
            },
            {
                "id": "414",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:41:47"
            },
            {
                "id": "411",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:41:46"
            },
            {
                "id": "412",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:41:46"
            },
            {
                "id": "409",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:40:33"
            },
            {
                "id": "410",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-17 19:40:33"
            },
            {
                "id": "408",
                "message": "Campaign \"Why\" was added to project \"Annihilation\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-16 16:35:06"
            },
            {
                "id": "406",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-16 16:34:06"
            },
            {
                "id": "407",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-16 16:34:06"
            },
            {
                "id": "405",
                "message": "Campaign \"Teaser\" was added to project \"Annihilation\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-16 16:27:10"
            },
            {
                "id": "403",
                "message": "Music team request was changed on campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-16 16:17:51"
            },
            {
                "id": "404",
                "message": "Writing team request was changed on campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-16 16:17:51"
            },
            {
                "id": "402",
                "message": "Spot \"Test2\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 23:38:42"
            },
            {
                "id": "401",
                "message": "Spot \"Test\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 23:34:23"
            },
            {
                "id": "397",
                "message": "Spot \"New test spot\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:45:06"
            },
            {
                "id": "395",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:06:47"
            },
            {
                "id": "396",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:06:47"
            },
            {
                "id": "393",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:06:18"
            },
            {
                "id": "394",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:06:18"
            },
            {
                "id": "389",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:03:11"
            },
            {
                "id": "390",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:03:11"
            },
            {
                "id": "391",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:03:11"
            },
            {
                "id": "392",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:03:11"
            },
            {
                "id": "387",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:01:03"
            },
            {
                "id": "388",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:01:03"
            },
            {
                "id": "385",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:01:02"
            },
            {
                "id": "386",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-14 06:01:02"
            },
            {
                "id": "384",
                "message": "Version \"2\" was added to spot \"#1 Theory\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-11 13:03:44"
            },
            {
                "id": "383",
                "message": "Version \"1 Alt\" was added to spot \"#1 Theory\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-11 13:03:41"
            },
            {
                "id": "382",
                "message": "Version \"1\" was added to spot \"#1 Theory\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-11 13:03:40"
            },
            {
                "id": "381",
                "message": "Spot \"Test\" was added to \"Trailer\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-11 05:00:08"
            },
            {
                "id": "380",
                "message": "Version \"1\" was removed from spot \"#1 Theory\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-11 03:32:55"
            },
            {
                "id": "379",
                "message": "Version \"1\" was added to spot \"#1 Theory\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-11 03:28:39"
            },
            {
                "id": "378",
                "message": "Spot \"#5 Succeed/YouTube\" was added to \"Test\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 17:21:25"
            },
            {
                "id": "377",
                "message": "Spot \"#3 Everywhere\" was added to \"Test\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:49:33"
            },
            {
                "id": "376",
                "message": "Spot \"#4 Need\" was added to \"Test\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:48:38"
            },
            {
                "id": "375",
                "message": "Spot \"#3 Everywhere\" was added to \"Test\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:47:48"
            },
            {
                "id": "374",
                "message": "Spot \"#2 Creation\" was added to \"Test\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:46:22"
            },
            {
                "id": "373",
                "message": "Spot \"#1 Reason\" was added to \"Test\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:46:04"
            },
            {
                "id": "372",
                "message": "Writing team request was changed on campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:45:33"
            },
            {
                "id": "371",
                "message": "Music team request was changed on campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:45:32"
            },
            {
                "id": "370",
                "message": "Music team request was changed on campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:45:24"
            },
            {
                "id": "369",
                "message": "Designer \"JONATHAN REYES\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:45:15"
            },
            {
                "id": "368",
                "message": "Designer \"HEINO FORSSTROM\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:45:05"
            },
            {
                "id": "367",
                "message": "Editor \"JOHN ONEIL\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:32:43"
            },
            {
                "id": "366",
                "message": "Editor \"DANIEL ASMA\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:32:34"
            },
            {
                "id": "365",
                "message": "Billing user \"TONY FANG\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:32:19"
            },
            {
                "id": "364",
                "message": "User \"ASHLEY CAPUTO\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:32:13"
            },
            {
                "id": "363",
                "message": "User \"KAZADI KATAMBWA\" was added to campaign \"Test\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:32:09"
            },
            {
                "id": "362",
                "message": "Spot \"#1 Interrogation\" was added to \"Trailer\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:26:26"
            },
            {
                "id": "361",
                "message": "Writing team request was changed on campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:25:46"
            },
            {
                "id": "360",
                "message": "Designer \"BOBBY SALZANO\" was added to campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:25:30"
            },
            {
                "id": "359",
                "message": "Editor \"MEKO WINBUSH\" was added to campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:25:17"
            },
            {
                "id": "358",
                "message": "Billing user \"JULIE DAVIS\" was added to campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:24:48"
            },
            {
                "id": "357",
                "message": "Billing user \"JESSICA DADON\" was added to campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:24:25"
            },
            {
                "id": "356",
                "message": "User \"MARIE BYRNES\" was added to campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:23:57"
            },
            {
                "id": "355",
                "message": "User \"JAMIE ZAKOSKI\" was added to campaign \"Trailer\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:23:47"
            },
            {
                "id": "351",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:19:39"
            },
            {
                "id": "352",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:19:39"
            },
            {
                "id": "353",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:19:39"
            },
            {
                "id": "354",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:19:39"
            },
            {
                "id": "350",
                "message": "Spot \"#6 Rescue\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:17:55"
            },
            {
                "id": "349",
                "message": "Spot \"#5 Threat\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:17:20"
            },
            {
                "id": "348",
                "message": "Spot \"#4 Inside\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:17:03"
            },
            {
                "id": "347",
                "message": "Spot \"#3 Need\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:16:40"
            },
            {
                "id": "346",
                "message": "Spot \"#2 Saved\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:15:31"
            },
            {
                "id": "345",
                "message": "Spot \"#1 Theory\" was added to \"(:30) TV\" campaign",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:13:31"
            },
            {
                "id": "343",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:09:23"
            },
            {
                "id": "344",
                "message": "Writing team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:09:23"
            },
            {
                "id": "342",
                "message": "Music team request was changed on campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:08:58"
            },
            {
                "id": "341",
                "message": "Designer \"KEITH PANG\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:08:14"
            },
            {
                "id": "340",
                "message": "Designer \"BRADFORD BERLING\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:08:08"
            },
            {
                "id": "339",
                "message": "Billing user \"MAXWELL ALBORN\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:07:45"
            },
            {
                "id": "338",
                "message": "Editor \"JACOB LAWRENCE MOSKOW\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:01:41"
            },
            {
                "id": "337",
                "message": "Editor \"WILLIAM NEIL\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 16:00:04"
            },
            {
                "id": "336",
                "message": "User \"ALEXANDRA BATES\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 15:58:32"
            },
            {
                "id": "335",
                "message": "User \"MARK LAFONTANT\" was added to campaign \"(:30) TV\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 15:58:26"
            },
            {
                "id": "334",
                "message": "Campaign \"Test\" was added to project \"Annihilation\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 15:35:05"
            },
            {
                "id": "333",
                "message": "Campaign \"Trailer\" was added to project \"Annihilation\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 15:34:46"
            },
            {
                "id": "332",
                "message": "Campaign \"(:30) TV\" was added to project \"Annihilation\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 15:34:38"
            },
            {
                "id": "331",
                "message": "Project \"Annihilation\" created for client \"Paramount\r\n\"",
                "userId": 1,
                "username": "demo",
                "firstName": "Demo",
                "lastName": "User",
                "fullName": "Demo User",
                "image": null,
                "createdAt": "2018-05-03 15:34:28"
            }
        ]
    }
}
```


> 200: detailed success response (when detailed=1 is sent)

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": 42,
        "projectName": "test 1q",
        "customerId": 1,
        "customerName": "NBC Universal",
        "cardcode": null,
        "notes": null,
        "lastUpdatedAt": "2018-01-22 15:37:25",
        "lastUpdateUserId": 51,
        "lastUpdateUserName": "Sample Producer",
        "historyCount": 1,
        "campaign": [],
        "lastUpdateUser": {
            "userId": 51,
            "name": "Sample Producer",
            "image": null
        },
        "comment": {
            "count": 0,
            "unread": 0
        },
        "user": [
            {
                "userId": 2,
                "firstName": "Hans",
                "lastName": "Kant",
                "roleId": 2,
                "role": "Designer",
                "image": "http://buddhajonesapi.localhost/thumb/profile_image/2.jpeg",
                "fullName": "Hans Kant"
            },
            {
                "userId": 3,
                "firstName": "Rizwan",
                "lastName": "Kader",
                "roleId": 1,
                "role": "Editor",
                "image": "http://buddhajonesapi.localhost/thumb/profile_image/three.png",
                "fullName": "Rizwan Kader"
            },
            {
                "userId": 6,
                "firstName": "Alex",
                "lastName": "Wagner",
                "roleId": 2,
                "role": "Designer",
                "image": null,
                "fullName": "Alex Wagner"
            },
            {
                "userId": 7,
                "firstName": "Balinda",
                "lastName": "Huang",
                "roleId": 4,
                "role": "Writer",
                "image": null,
                "fullName": "Balinda Huang"
            }
        ],
        "history": [
            {
                "id": "236",
                "message": "Project \"test 1q\" created for client \"NBC Universal\"",
                "userId": 51,
                "username": "producer",
                "firstName": "Sample",
                "lastName": "Producer",
                "fullName": "Sample Producer",
                "image": null,
                "createdAt": "2018-01-22 15:37:25"
            }
        ]
    }
}
```

### HTTP Request

`GET /project/[:project_id]`

** send detailed param if required

`GET /project/[:project_id]?detailed=1`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project ID
false | detailed | int | 0 | Send 0 or 1


## Create project

Create a new project.

> Sample request

```javascript
axios.post('/project', {
    name: 'test project',
    customer_id: 1,
    notes: 'some notes for project',
    user: [{"id":2,"role_id":2},{"id":3,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "project_id": 18
    }
}
```

### HTTP Request

`POST /project`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string | null | Project name (one of project_name or project_code is required)
**true** | customer_id | int | null | Customer id
false | notes | string | null | Project note
**true** | project_code | string | null | Project Code (one of project_name or project_code is required)
false | project_release | date string | null | Project release date (2018-01-01)
false | user | JSON | null | users associated to this project(manager, producer). Send JSON encoded array of user ids, like : [{"id":2,"role_id":2},{"id":3,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]



## Update Project

Update existing project.


> Sample request

```javascript
axios.put('/project/18', {
    name: 'changed project name',
    customer_id: 9,
    notes: 'some changed note',
    user: [{"id":2,"role_id":2},{"id":3,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Project updated successfully."
}
```

### HTTP Request

`PUT /project`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | name | string | null | Project name
false | customer_id | int | null | Customer id
false | notes | string | null | Project note
false | project_code | string | null | Project Code
false | project_release | date string | null | Project release date (2018-01-01)
false | user | JSON | null | users associated to this project(manager, producer). Send JSON encoded array of user ids, like : [{"id":2,"role_id":2},{"id":3,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]


## Get campaigns list

Retrieve list of campaigns.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 55,
    "object_count": 5,
    "data": [
        {
            "id": "51",
            "campaignName": "test campaign1",
            "description": "test desc",
            "project": []
        },
        {
            "id": "52",
            "campaignName": "test campaign1",
            "description": "test desc",
            "project": []
        },
        {
            "id": "53",
            "campaignName": "test campaign1",
            "description": "test desc",
            "project": [
                {
                    "id": 2,
                    "projectName": "Before I Wake",
                    "manager": [],
                    "producer": []
                }
            ]
        },
        {
            "id": "54",
            "campaignName": "test campaign1",
            "description": "test desc",
            "project": [
                {
                    "id": 2,
                    "projectName": "Before I Wake",
                    "manager": [
                        3,
                        4
                    ],
                    "producer": [
                        6,
                        8
                    ]
                }
            ]
        },
        {
            "id": "55",
            "campaignName": "test campaign1",
            "description": "test desc",
            "project": [
                {
                    "id": 2,
                    "projectName": "Before I Wake",
                    "manager": [
                        3,
                        4
                    ],
                    "producer": [
                        6,
                        8
                    ]
                },
                {
                    "id": 3,
                    "projectName": "Bravo 14",
                    "manager": [
                        13,
                        14
                    ],
                    "producer": [
                        16,
                        18
                    ]
                }
            ]
        }
    ]
}
```

### HTTP Request

`GET /campaign`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | project_id | int | null | Narrow returned campaigns to a relation with specific single project
false | search | string | null | Search query to narrow returned results by their name
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Create campaign

Create a new campaign.

> Sample request

```javascript
axios.post('/campaign', {
    name: 'test campaign',
    description: 'some notes for campaign',
    project: '[{"project_id":2,"first_point_of_contact_id":1,"user":[{"id":2,"role_id":2},{"id":3,"first_point_of_contact_id":1,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]},{"project_id":3,"first_point_of_contact_id":1,"user":[{"id":2,"role_id":2},{"id":3,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]}]'
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "campaign_id": 18
    }
}
```

### HTTP Request

`POST /campaign`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string | null | Campaign name
false | description | string | null | Campaign description
false | editor_req | string | null | Editor request
false | material_received | date string | null | Material received date
false | project | JSON | null | Project and manager & producer (send like: [{"project_id":2,"user":[3,4]},{"project_id":3,"user":[13,14]}])

## Update campaign

Update existing campaign.

> Sample request

```javascript
axios.put('/campaign', {
    name: 'test campaign',
    description: 'some notes for campaign',
    project: '[{"project_id":2,"first_point_of_contact_id":1,"user":[{"id":2,"role_id":2},{"id":3,"first_point_of_contact_id":1,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]},{"project_id":3,"first_point_of_contact_id":1,"user":[{"id":2,"role_id":2},{"id":3,"role_id":1},{"id":6,"role_id":2},{"id":7,"role_id":4}]}]'
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

`PUT /campaign/[:campaign_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false| name | string | null | Campaign name
false | description | string | null | Campaign description
false | editor_req | string | null | Editor request
false | material_received | date string | null | Material received date
false | project | JSON | null | Project and manager & producer (send like: [{"project_id":2,"user":[3,4]},{"project_id":3,"user":[13,14]}])


## Get spots list

Retrieve list of spots.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "total_count": 19,
    "object_count": 4,
    "data": [
        {
            "id": "32",
            "spotName": "Deashot :60",
            "projectId": 2,
            "campaignId": 1,
            "revisionNotCounted": null,
            "notes": null,
            "revisions": null,
            "graphicsRevisions": null,
            "firstRevisionCost": null
        },
        {
            "id": "35",
            "spotName": "sp1",
            "projectId": 2,
            "campaignId": 9,
            "revisionNotCounted": null,
            "notes": null,
            "revisions": null,
            "graphicsRevisions": 0,
            "firstRevisionCost": null
        },
        {
            "id": "36",
            "spotName": "sp1",
            "projectId": 2,
            "campaignId": 9,
            "revisionNotCounted": null,
            "notes": null,
            "revisions": 3,
            "graphicsRevisions": 0,
            "firstRevisionCost": null
        },
        {
            "id": "37",
            "spotName": "sp1",
            "projectId": 2,
            "campaignId": 9,
            "revisionNotCounted": null,
            "notes": null,
            "revisions": 3,
            "graphicsRevisions": 0,
            "firstRevisionCost": "90.50"
        }
    ]
}
```

### HTTP Request

`GET /spot`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | project_id | int | null | Narrow returned spots to a relation with specific single project
false | campaign_id | int | null | Narrow returned spots to a relation with specific single campaign
false | project_campaign_id | int | null | Narrow returned spots to a relation with specific single project campaign id
false | search | string | null | Search query to narrow returned results by their name
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Delete Project to Campaign Relation

Delete project to campaign relation. if no other relation left betweent he campaing and any other project, then the campaign will be deleted.


> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /campaign/[:campaign_id]/[:project_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true* | campaign_id | int | null | Campaign ID
**true* | project_id | int | null | Project ID


## Get single Spot

Retrieve single spot data.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": {
        "id": "37",
        "spotName": "sp1",
        "projectId": 2,
        "campaignId": 9,
        "revisionNotCounted": null,
        "notes": null,
        "revisions": 3,
        "graphicsRevisions": 0,
        "firstRevisionCost": "90.50"
    }
}
```

### HTTP Request

`GET /spot/[:spot_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | spot_id | int | null | Spot id


## Create spot

Create a new spot.

> Sample request

```javascript
axios.post('/spot', {
    name: 'test spot',
    project_id: 1,
    campaign_id: 1,
    notes: 'some notes for spot'
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "spot_id": 18
    }
}
```

### HTTP Request

`POST /spot`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string | null | Spot name
**true** | project_campaign_id | int | null | Project campaign id
false | notes | string | null | Spot note
false | revisions | int | null | Number of revisions (null=revision not included, 0=unlimited, any other number to set number of revision)
false | graphics_revisions | int | 0 | Is it a Graphics Revision or not. Send 0 or 1 (0=not a graphics revision, 1=it is a graphics revision)
false | first_revision_cost | float | null | Cost of version 1 of the spot
false | internal_deadline | Date string | null | Internal deadline
false | client_deadline | Date string | null | Client deadline
false | billing_type | char | null | Billing type. Send B/N/S/R. B = Billable, N = Non-billable, S = Spec unless revised, R = Spec revised billable
false | billing_note | string | null | billing note



## Update spot

Update existing spot.

> Sample request

```javascript
axios.put('/spot/[:spot_id]', {
    name: 'test spot',
    project_id: 1,
    campaign_id: 1,
    notes: 'some notes for spot'
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

`PUT /spot/[:spot_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | name | string | null | Spot name
false | project_campaign_id | int | null | Project campaign id
false | notes | string | null | Spot note
false | revisions | int | null | Number of revisions (null=revision not included, 0=unlimited, any other number to set number of revision)
false | graphics_revisions | int | 0 | Is it a Graphics Revision or not. Send 0 or 1 (0=not a graphics revision, 1=it is a graphics revision)
false | first_revision_cost | float | null | Cost of version 1 of the spot
false | billing_type | char | null | Billing type. Send B/N/S/R. B = Billable, N = Non-billable, S = Spec unless revised, R = Spec revised billable
false | billing_note | string | null | billing note


## Delete spot

Delete existing spot.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /spot/[:spot_id]`



## Get sent spot via method list

Retrieve list of sent spot via method list.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 5,
            "name": "Post"
        },
        {
            "id": 6,
            "name": "Fiber"
        },
        {
            "id": 7,
            "name": "Email"
        },
        {
            "id": 8,
            "name": "Messenger",
            "children": [
                {
                    "id": 9,
                    "name": "Post"
                },
                {
                    "id": 10,
                    "name": "Fedex"
                },
                {
                    "id": 11,
                    "name": "Pickup"
                }
            ]
        }
    ]
}
```

## Validate Spot Sent 

Validate spot sent entry.

> Sample request

```javascript
axios.put('/spot-sent-validate/:spot_sent_id', {
    final:1,
    status:5,
    spot_version:[{"spot_id":1,"version_id":2,"worker":[1,2,3]},{"spot_id":2,"version_id":3,"worker":[4]}],
    work_stage:[2,3,4],
    file:[{"name":"file one","description":"some file desc"},{"name":"file two"}]
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

`PUT /spot-sent-validate/:spot_sent_id`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | final | integer | null | Final or not (send 0 or 1, or leave blank for null)
false | status | string | null | Status id (from /status GET api)
false | spot_version | JSON encoded string | null | Spot version information (send array of spot_id, version_id and array of designer or editor like: [{"spot_id":1,"version_id":2,"worker":[1,2,3]},{"spot_id":2,"version_id":3,"workder":[4]}])  
false | work_stage | JSON encoded string | null | Work stage id from /work-stage (GET) api (sent value like: [1,2,3])
false | file | JSON encoded string | null | Files name and/or description (sent value like: [{"name":"file one","description":"some file desc"},{"name":"file two"}])



## Get versions list

Retreive list of versions.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "versionName": "1"
        },
        {
            "id": 2,
            "versionName": "1a"
        },
        {...}
    ]
}
```

### HTTP Request

`GET /version`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | spot_id | number | null | Spot ID to get only versions assigned to specific spot
false | custom | number | null | Get custom or standard version. send custom=0 for standard version, send custom=1 for custom versions. send null or dont send value for getting all.
false | search | string | null | Search query to narrow returned results by their name
false | length | int | null | Limit number of returned results
false | offset | int | null | Offset returned results


## Create version

Create a new version.

> Sample request

```javascript
axios.post('/version', {
    name: 'test version',
    spot_id: [2,3,6]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "version_id": 18
    }
}
```

### HTTP Request

`POST /version`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | name | string | null | Version name
false | spot_id | int or JSON string| null | Spot id. send integer or JSON encoded string of spot id(like 10 or [9,4,3])
false | custom | 1 | only available for user user
false | billing_type | string | null | Billing type


## Update version

update version.

> Sample request

```javascript
axios.put('/version', {
    name: 'test version',
    spot_id: [2,3,6]
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
    "data": {
        "version_id": 18
    }
}
```

### HTTP Request

`PUT /version/[:version_id]`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | name | string | null | Version name (it will not be chnaged if version is already used in any time entry)
false | spot_id | int or JSON string| null | Spot id. send integer or JSON encoded string of spot id(like 10 or [9,4,3])
false | custom | 1 | only available for user user
false | billing_type | string | null | Billing type


# Delete version

delete version.

> Sample request

```javascript
axios.delete('/version/52');
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful.",
}
```

### HTTP Request

`DELETE /version/[:version_id]`

** version will not be deleted if it is already used in any time entry


## Assign Campaign to Project

Assign Campaign to Project

```javascript
axios.post('/assign-campaign-to-project', {
    project_id: 1,
    campaign_id: 2
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

## Get versions  status list

Retrieve list of version status.

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "name": "Finished"
        },
        {
            "id": 2,
            "name": "Graphics work in progress"
        },
        {
            "id": 3,
            "name": "Need to Assign"
        },
        {
            "id": 4,
            "name": "On Hold/or spot killed"
        },
        {
            "id": 5,
            "name": "Prepping"
        },
        {
            "id": 6,
            "name": "Ready to send"
        },
        {
            "id": 7,
            "name": "Sent"
        },
        {
            "id": 8,
            "name": "Waiting on Producer"
        },
        {
            "id": 9,
            "name": "Work in progress"
        }
    ]
}
```

### HTTP Request

`GET /version-status`

### Query Parameters

NONE



### HTTP Request

`POST /assign-campaign-to-project`

### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project ID
**true** | campaign_id | int | null | Campaign ID
false | first_point_of_contact_id | int | null | First point of contact id
false | request_writing_team | boolean | null | Request to writing team, send 0 or 1
false | request_music_team | boolean | null | Request to music team, send 0 or 1
false | writing_team_notes | string | null | Note for writing team
false | music_team_notes | string | null | Note for music team


## Assign Spot to Campaign

Assign Spot to Campaign

> Sample request

```javascript
axios.post('/assign-spot-to-campaign', {
    project_id: 1,
    campaign_id: 2,
    spot_id: 3
});
```


### HTTP Request

`POST /assign-spot-to-campaign`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project ID
**true** | campaign_id | int | null | Campaign ID



## Assign Version to Spot

Assign Version to Spot

> Sample request

```javascript
axios.post('/assign-version-to-spot', {
    spot_id: 1,
    version_id: 2
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

`POST /assign-version-to-spot`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | spot_id | int | null | Spot ID
**true** | version_id | int | null | Version ID
false | version_status_id | int | null | Version status id
false | version_note | string | null | Version ID


## Delete Version to Spot association

Delete Version to Spot association

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful."
}
```

### HTTP Request

`DELETE /assign-version-to-spot/[:version_id]/[:spot_id]`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | spot_id | int | null | Spot ID
**true** | version_id | int | null | Version ID



## Editor Project Status

Get list of project status for editor

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "id": 1,
            "statusName": "Watching"
        },
        {
            "id": 2,
            "statusName": "Screening"
        },
        {
            "id": 3,
            "statusName": "Breaking down"
        },
        {
            "id": 4,
            "statusName": "Revising spot"
        },
        {
            "id": 5,
            "statusName": "Cutting NEW spot"
        },
        {
            "id": 6,
            "statusName": "ON fiber"
        },
        {
            "id": 7,
            "statusName": "Downtime"
        },
        {
            "id": 8,
            "statusName": "Waiting"
        }
    ]
}
```

### HTTP Request

`GET /editor-project-status`



## Editor Project Progress

Create editor project progress

> Sample request

```javascript
axios.post('/editor-project-progress', {
    project_id: 1,
    campaign_id: 2,
    spot_id: 3,
    notes: 'some note',
    status_id: 3
});
```


### HTTP Request

`POST /editor-project-progress`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | project_id | int | null | Project ID
**true** | campaign_id | int | null | Campaign ID
**true** | status_id | int | null | Status ID
false | spot_id | int | null | Spot ID
false | notes | string | null | Notes
false | watched | int | null | Send 0 or 1.
false | broken_down | int | null | Send 0 or 1
false | due | string | null | Due as string
false | due_date | date | null | Due date (send one of due or due_string)




## Editor Project Spot assign

Assign spot to editor

> Sample request

```javascript
axios.post('/editor-project', {
    spot_id: 3,
    editor_id: 1
});
```

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful"
}
```

### HTTP Request

`POST /editor-project`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | spot_id | int | null | Spot ID
**true** | editor_id | int | null | Editor user  ID



## All Editor Project List

Get project, campaign, spot, and progress of all editor

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "projectId": 1,
            "projectName": "Babysitter",
            "campaignId": "1",
            "campaignName": "AV Campaign",
            "spotId": "5",
            "spotName": "Boomer",
            "editorUserId": 1,
            "editorUserName": "suda",
            "editorFullName": null,
            "notes": null,
            "watched": null,
            "brokenDown": null,
            "due": null,
            "dueDate": null,
            "statusId": null,
            "statusName": null,
            "updatedAt": null
        },
        {
            "projectId": 10,
            "projectName": "Quarry",
            "campaignId": "9",
            "campaignName": "AV Campaign",
            "spotId": "9",
            "spotName": "Enchantress",
            "editorUserId": 1,
            "editorUserName": "suda",
            "editorFullName": null,
            "notes": "some note plusddddd11",
            "watched": null,
            "brokenDown": null,
            "due": null,
            "dueDate": "2017-01-04",
            "statusId": 3,
            "statusName": "Breaking down",
            "updatedAt": "2017-02-26 20:22:39"
        }
    ]
}
```

### HTTP Request

`GET /editor-project`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
false | offset | int | 0 | Offset
false | length | int | 20 | Length of expected result rows


## Editor Project List(single editor)

Get project, campaign, spot, and progress of editor

> 200: success response

```json
{
    "status": 1,
    "message": "Request successful",
    "data": [
        {
            "projectId": 1,
            "projectName": "Babysitter",
            "campaignId": "1",
            "campaignName": "AV Campaign",
            "spotId": "5",
            "spotName": "Boomer",
            "editorUserId": 1,
            "editorUserName": "suda",
            "editorFullName": null,
            "notes": null,
            "watched": null,
            "brokenDown": null,
            "due": null,
            "dueDate": null,
            "statusId": null,
            "statusName": null,
            "updatedAt": null
        },
        {
            "projectId": 10,
            "projectName": "Quarry",
            "campaignId": "9",
            "campaignName": "AV Campaign",
            "spotId": "9",
            "spotName": "Enchantress",
            "editorUserId": 1,
            "editorUserName": "suda",
            "editorFullName": null,
            "notes": "some note plusddddd11",
            "watched": null,
            "brokenDown": null,
            "due": null,
            "dueDate": "2017-01-04",
            "statusId": 3,
            "statusName": "Breaking down",
            "updatedAt": "2017-02-26 20:22:39"
        }
    ]
}
```

### HTTP Request

`GET /editor-project/[:editor_user_id]`


### Query Parameters

Required | Parameter | Type | Default | Description
-------- | --------- | ---- | ------- | -----------
**true** | editor_user_id | int | null | User id of editor
false | offset | int | 0 | Offset
false | length | int | 20 | Length of expected result rows
