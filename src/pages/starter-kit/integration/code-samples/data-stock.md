---
title: Data Stock
description: Stock data samples for the Adobe Commerce integration starter kit.
---

<CodeBlock slots="heading, code" repeat="1" languages="JSON" />

#### update

```json
{
  "type": "array",
  "items": {
    "properties": {
      "sku": { "type": "string" },
      "source": { "type": "string" },
      "quantity": { "type":  "number" },
      "outOfStock": { "type": "boolean" }
    },
    "required": [ "sku", "source", "quantity", "outOfStock" ],
    "additionalProperties": true
  }
}
```
