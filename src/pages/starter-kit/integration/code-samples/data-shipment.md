<CodeBlock slots="heading, code" repeat="2" languages="JSON, JSON" />

#### create

```json
{
  "type": "object",
  "properties": {
    "orderId": { "type":  "string" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "orderItemId": { "type":  "number" },
          "qty": { "type":  "number" }
        },
        "required": ["orderItemId", "qty"],
        "additionalProperties": false
      }
    },
    "tracks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "trackNumber": { "type":  "string" },
          "title": { "type":  "string" },
          "carrierCode": { "type":  "string" }
        },
        "required": ["trackNumber", "title", "carrierCode"],
        "additionalProperties": false
      }
    },
    "comments" : {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "notifyCustomer": { "type":  "boolean" },
          "comment": { "type":  "string" },
          "visibleOnFront": { "type":  "boolean" }
        },
        "required": ["notifyCustomer", "comment", "visibleOnFront"],
        "additionalProperties": false
      }
    },
    "stockSourceCode": { "type":  "string" }
  },
  "required": ["orderId", "items", "tracks", "comments", "stockSourceCode"],
  "additionalProperties": false
}
```

#### update

```json
{
  "type": "object",
  "properties": {
    "id": { "type":  "number" },
    "orderId": { "type":  "number" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "entityId": { "type":  "number" },
          "orderItemId": { "type":  "number" },
          "qty": { "type":  "number" }
        },
        "required": ["entityId", "orderItemId", "qty"],
        "additionalProperties": false
      }
    },
    "tracks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "entityId": { "type":  "number" },
          "trackNumber": { "type":  "string" },
          "title": { "type":  "string" },
          "carrierCode": { "type":  "string" }
        },
        "required": ["entityId", "trackNumber", "title", "carrierCode"],
        "additionalProperties": false
      }
    },
    "comments" : {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "entityId": { "type":  "number" },
          "notifyCustomer": { "type":  "boolean" },
          "comment": { "type":  "string" },
          "visibleOnFront": { "type":  "boolean" }
        },
        "required": ["entityId", "notifyCustomer", "comment", "visibleOnFront"],
        "additionalProperties": false
      }
    },
    "stockSourceCode": { "type":  "string" }
  },
  "required": ["id", "orderId", "items", "tracks", "comments", "stockSourceCode"],
  "additionalProperties": false
}
```
