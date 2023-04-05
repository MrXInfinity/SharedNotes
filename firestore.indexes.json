{
  "indexes": [
    {
      "collectionGroup": "Private",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "dateCreated",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "favorite",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "Reminder",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "favorite",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "startTime",
          "order": "ASCENDING"
        }
      ]
    },
    {
      "collectionGroup": "Shared",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "author",
          "order": "ASCENDING"
        },
        {
          "fieldPath": "favorite",
          "order": "DESCENDING"
        }
      ]
    },
    {
      "collectionGroup": "Shared",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "dateCreated",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "author",
          "order": "ASCENDING"
        }
      ]
    },
    {
      "collectionGroup": "Task",
      "queryScope": "COLLECTION",
      "fields": [
        {
          "fieldPath": "favorite",
          "order": "DESCENDING"
        },
        {
          "fieldPath": "dueDateTime",
          "order": "ASCENDING"
        }
      ]
    }
  ],
  "fieldOverrides": [
    {
      "collectionGroup": "Shared",
      "fieldPath": "dateCreated",
      "ttl": false,
      "indexes": [
        {
          "order": "ASCENDING",
          "queryScope": "COLLECTION"
        },
        {
          "order": "DESCENDING",
          "queryScope": "COLLECTION"
        },
        {
          "arrayConfig": "CONTAINS",
          "queryScope": "COLLECTION"
        },
        {
          "order": "ASCENDING",
          "queryScope": "COLLECTION_GROUP"
        },
        {
          "order": "DESCENDING",
          "queryScope": "COLLECTION_GROUP"
        }
      ]
    }
  ]
}
