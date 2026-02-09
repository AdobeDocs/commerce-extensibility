<CodeBlock slots="heading, code" repeat="3" languages="JSON, JSON, JSON" />

#### create

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "lastname": {"type":  "string"},
    "email": {"type":  "string"}
  },
  "required": ["name", "lastname", "email"],
  "additionalProperties": true
}
```

#### update

```json
{
  "type": "object",
  "properties": {
    "id": {"type": "number"},
    "name": { "type": "string" },
    "lastname": {"type": "string"},
    "email": {"type":  "string"}
  },
  "required": ["id", "name", "lastname", "email"],
  "additionalProperties": true
}
```

#### delete

```json
{
  "type": "object",
  "properties": {
    "id": { "type": "number" }
  },
  "required": ["id"],
  "additionalProperties": false
}
```
