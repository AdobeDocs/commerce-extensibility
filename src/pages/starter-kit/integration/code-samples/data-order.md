---
title: Data Order
description: Order data samples for the Adobe Commerce integration starter kit.
---

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### update

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "status": { "type": "string" },
    "notifyCustomer": { "type":  "boolean"}
  },
  "required": ["id", "status"],
  "additionalProperties": true
}
```
