require('dotenv').config()
const env = process.env
const SECRET_KEY = env.SECRET_KEY
const DATABASE_ID = env.DATABASE_ID

const axios = require('axios')
const url = "https://api.notion.com/v1/pages"

const config = {
    headers: {
        "Authorization": "Bearer " + SECRET_KEY,
        "Content-Type": "application/json",
        "Notion-Version": "2021-05-13"
    }
}

function createJournalPages(day, dayOfWeek) {

    const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Define page data to add
    const data = {
        "parent": { "database_id": DATABASE_ID },
        "properties": {
            "Name": {
                "title": [
                    {
                        "type": "text",
                        "text": {
                            "content": `Sep. ${typeof (day) == "string" ? Number(day) : day}`
                        }
                    }
                ]
            },
            "日付": {
                "date": {
                    "start": `2021-09-${day}`
                }
            },
            "Tags": {
                "multi_select": [
                    {
                        "name": dayList[dayOfWeek]
                    }
                ]
            },
            "天気": {
                "multi_select": [
                    {
                        "name": "☁️"
                    }
                ]
            },
            "気分": {
                "multi_select": [
                    {
                        "name": "⭐️⭐️⭐️⭐️"
                    }
                ]
            },
            "気温": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": "20℃"
                        }
                    }
                ]
            },
            "起床時間": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": "7:00"
                        }
                    }
                ]
            }
        },
        "children": [
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "",
                            }
                        }
                    ]
                }
            },
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "",
                            }
                        }
                    ]
                }
            },
            {
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "text": [
                        {
                            "type": "text",
                            "text": {
                                "content": "Memo",
                            }
                        }
                    ]
                }
            }
        ]

    }

    axios
        .post(url, data, config)
        .then((res) => {
            console.log(res.data)
        })
        .catch((res) => {
            console.log(res)
        })
        .then(() => {
            console.log("Done")
        });

}

// Define month
let month = 9
// Zero padding
if (month < 10) month = "0" + month.toString()

// Define the range of the days for page creation
const startDay = 1
const endDay = 31

// Loop page creation
for (let day = startDay; day <= endDay; day++) {
    // Zero padding
    if (day < 10) day = "0" + day.toString()

    // Create date instance with specified date
    const date = new Date(`2021-${month}-${day}T12:00:00+0900`)

    // Get the day index of the date (0 means Sunday)
    const dayOfWeek = date.getDay()

    createJournalPages(day, dayOfWeek)
}


