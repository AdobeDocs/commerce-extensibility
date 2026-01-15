---
title: Configuration schema reference
description: Define your app configuration schema
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Configuration schema reference

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The `app.commerce.config` file defines your app business configuration schema. Based on this schema, the configuration library auto-generates runtime actions and the App Management UI renders a configuration form—no custom code required.

<InlineAlert variant="info" slots="text"/>

The configuration file supports both JavaScript (`app.commerce.config.js`) and TypeScript (`app.commerce.config.ts`).

## File structure

```js
module.exports = {
  businessConfig: {
    schema: [
      // Field definitions
    ]
  }
};
```

## Schema properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique field identifier. Used to retrieve values at runtime. |
| `title` | string | Yes | Display label in the UI. |
| `type` | string | Yes | Field type. See [Supported types](#supported-field-types). |
| `default` | varies | No | Default value. Must match the field type. |
| `options` | array | Conditional | Required for `select` and `combobox`. Defines available options. |
| `secret` | boolean | No | Masks input value. Use for API keys and tokens. |
| `description` | string | No | Help text displayed below the field. |

## Supported field types

| Type | Description | Default value type |
|------|-------------|-------------------|
| `text` | Single-line text input | string |
| `number` | Numeric input | number |
| `checkbox` | Boolean toggle | boolean |
| `select` | Dropdown with predefined options | string |
| `combobox` | Searchable dropdown | string |

## Example

```js
module.exports = {
  businessConfig: {
    schema: [
      {
        id: 'api-endpoint',
        title: 'API Endpoint',
        type: 'text',
        default: 'https://api.example.com'
      },
      {
        id: 'api-key',
        title: 'API Key',
        type: 'text',
        secret: true
      },
      {
        id: 'threshold',
        title: 'Threshold Amount',
        type: 'number',
        default: 100
      },
      {
        id: 'enabled',
        title: 'Enable Feature',
        type: 'checkbox',
        default: true
      },
      {
        id: 'level',
        title: 'Risk Level',
        type: 'select',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' }
        ],
        default: 'medium'
      }
    ]
  }
};
```

## Validate your schema

Run validation before deploying:

```bash
npx @adobe/commerce-lib-config validate-schema
```

Validation checks for:

* **Type mismatches**–A `number` field with a string default
* **Missing properties**–Fields must have `id`, `title`, and `type`
* **Invalid options**–Select/combobox options must have `label` and `value`

<InlineAlert variant="info" slots="text"/>

Schema validation runs automatically during `aio app build`.

## Retrieve configuration at runtime

```js
const { getConfig } = require('@adobe/commerce-sdk');

async function main(params) {
  const config = await getConfig(params);
  
  const threshold = config.get('threshold');
  const enabled = config.get('enabled');
  
  // Use values in your app logic
}
```

## Tutorial

[Configuration schema tutorial](https://video.tv.adobe.com/v/3478943)

## Next steps

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Initialize the configuration library and understand the generated runtime actions.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.
