# Try it out!

`docker-compose up`

Example query:


```json
{
  "order": {
    "ElectionAnswers.updatedAt": "asc"
  },
  "dimensions": [
    "ElectionAnswers.age",
    "ElectionAnswers.answer_content"
  ],
  "filters": [
    {
      "member": "ElectionAnswers.question_variable",
      "operator": "equals",
      "values": [
        "vote"
      ]
    }
  ],
  "measures": [
    "ElectionAnswers.uniqueUserCount",
    "ElectionAnswers.userCountPercentage",
    "ElectionAnswers.totalUsersByQ"
  ]
}
```