---
title: Configuration schema reference
description: Learn how to define your app's configuration schema
keywords:
  - App Builder
  - Extensibility
  - App Management
edition: beta
---

# Configuration schema reference

<InlineAlert variant="warning" slots="text" />

**Adobe Commerce App Management is for Beta users only and is not yet accessible to all customers.**

The `extensibility.config.js` file is the central configuration file for App Management. It defines your app's business configuration schema, specifying the settings that merchants can customize.

Based on this schema, the configuration library **automatically generates the runtime actions** required for App Management. These [auto-generated runtime actions](./runtime-actions.md) handle all configuration operations, and the App Management UI uses them to render a user-friendly configuration form in the Commerce Admin.

You define the fields declaratively—specifying types, labels, defaults, and validation rules—and the system handles the rest without requiring custom code.

Currently, `extensibility.config.js` supports business configuration. Future versions will also support events and webhooks configuration.

## File structure

The `extensibility.config.js` file exports a configuration object with a `businessConfig` property:

```javascript
module.exports = {
  businessConfig: {
    schema: [
      // Field definitions
    ]
  }
};
```

## Schema properties

Each field in the schema array supports the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier for the field. Used to retrieve the value at runtime. |
| `title` | string | Yes | Display label shown in the App Management UI. |
| `type` | string | Yes | Field type. See [Supported field types](#supported-field-types). |
| `default` | varies | No | Default value. Must match the field type. |
| `options` | array | Conditional | Required for `select` and `combobox` types. Defines available options. |
| `secret` | boolean | No | When `true`, masks the input value. Use for API keys and tokens. |
| `description` | string | No | Help text displayed below the field. |

## Supported field types

| Type | Description | Default value type |
|------|-------------|-------------------|
| `text` | Single-line text input | string |
| `number` | Numeric input | number |
| `checkbox` | Boolean toggle | boolean |
| `select` | Dropdown selection with predefined options | string (option value) |
| `combobox` | Searchable dropdown selection | string (option value) |

## Field examples

### Text field

```javascript
{
  id: 'api-endpoint',
  title: 'API Endpoint',
  type: 'text',
  default: 'https://api.example.com',
  description: 'The base URL for the external API'
}
```

### Number field

```javascript
{
  id: 'threshold-amount',
  title: 'Threshold Amount',
  type: 'number',
  default: 50
}
```

### Checkbox field

```javascript
{
  id: 'enable-feature',
  title: 'Enable Feature',
  type: 'checkbox',
  default: true
}
```

### Select field

```javascript
{
  id: 'sync-frequency',
  title: 'Sync Frequency',
  type: 'select',
  options: [
    { label: 'Every hour', value: 'hourly' },
    { label: 'Every 6 hours', value: '6hours' },
    { label: 'Daily', value: 'daily' }
  ],
  default: 'daily'
}
```

### Secret field

```javascript
{
  id: 'api-key',
  title: 'API Key',
  type: 'text',
  secret: true,
  description: 'Your API key for authentication'
}
```

## Complete example

```javascript
module.exports = {
  businessConfig: {
    schema: [
      {
        id: 'api-endpoint',
        title: 'API Endpoint',
        type: 'text',
        default: 'https://api.example.com',
        description: 'The base URL for the external API'
      },
      {
        id: 'api-key',
        title: 'API Key',
        type: 'text',
        secret: true,
        description: 'Your API key for authentication'
      },
      {
        id: 'threshold-amount',
        title: 'Threshold Amount',
        type: 'number',
        default: 100
      },
      {
        id: 'enable-risk-check',
        title: 'Enable Risk Check',
        type: 'checkbox',
        default: true
      },
      {
        id: 'risk-level',
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

## Schema validation

Before deploying your app, validate the configuration schema to ensure it is correctly defined:

```bash
npx @adobe/commerce-lib-config validate-schema
```

This command checks for:

- **Type mismatches** - For example, a `number` field with a string default value
- **Missing required properties** - Fields must have `id`, `title`, and `type`
- **Invalid option definitions** - Select/combobox options must have `label` and `value`

### Example validation error

If you define a number field with an invalid default:

```javascript
{
  id: 'threshold',
  title: 'Threshold',
  type: 'number',
  default: 'one hundred'  // Invalid: string instead of number
}
```

The validation command returns:

```text
Error at position 0: property 'default' expected a number but got string
```

<InlineAlert variant="info" slots="text"/>

Schema validation runs automatically during the build process (`aio app build`) to ensure only valid configurations are deployed.

## Retrieving configuration at runtime

After merchants configure your app, retrieve the values at runtime using the Commerce configuration library:

```javascript
const { getConfig } = require('@adobe/commerce-sdk');

async function main(params) {
  const config = await getConfig(params);
  
  const threshold = config.get('threshold-amount');
  const riskCheckEnabled = config.get('enable-risk-check');
  
  // Use configuration values in your app logic
}
```
