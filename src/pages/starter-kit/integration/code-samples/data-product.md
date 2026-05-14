---
title: Data Product
description: Product data samples for the Adobe Commerce integration starter kit.
---

<CodeBlock slots="heading, code" repeat="3" languages="JSON, JSON, JSON" />

#### create

```json
{
  "type": "object",
  "properties": {
    "sku": { "type": "string" },
    "name": { "type": "string" },
    "price": {"type":  "number"},
    "description": {"type":  "string"}
  },
  "required": ["sku", "name", "description"],
  "additionalProperties": true
}
```

#### update

```json
{
  "type": "object",
  "properties": {
    "sku": { "type": "string" },
    "name": { "type": "string" },
    "price": {"type":  "number"},
    "description": {"type":  "string"}
  },
  "required": ["sku", "name", "price", "description"],
  "additionalProperties": true
}
```

#### delete

```json
{
  "type": "object",
  "properties": {
    "sku": { "type": "string" }
  },
  "required": ["sku"],
  "additionalProperties": false
}
```
