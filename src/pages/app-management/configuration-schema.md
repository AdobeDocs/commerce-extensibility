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

The `app.commerce.config` file is the central configuration file for your App Builder application. It defines your app [metadata](./app-metadata.md), business configuration schema, and other settings. Based on the `businessConfig` schema, the configuration library generates runtime actions while the App Management renders a configuration form with no custom code required.

<InlineAlert variant="info" slots="text"/>

The configuration file supports both JavaScript (`app.commerce.config.js`) and TypeScript (`app.commerce.config.ts`).

## File structure

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"
export default defineConfig({
  businessConfig: {
    schema: [
      // Field definitions
    ]
  }
});
```

## Schema properties

This schema contains the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique field identifier. Used to retrieve values at runtime. |
| `title` | string | Yes | Display label of a configuration field. |
| `type` | string | Yes | Field type. See [Supported types](#supported-field-types). |
| `default` | varies | No | Default value. Must match the field type. |
| `options` | array | Conditional | Required for `select` and `combobox`. Defines available options. |
| `secret` | boolean | No | Masks input value. Use for API keys and tokens. |
| `description` | string | No | Help text displayed below the field. |

## Supported field types

| Type | Description | Default value type |
|------|-------------|-------------------|
| `text` | Single-line text input | string |
| `select` | Dropdown with predefined options | string |
| `combobox` | Searchable dropdown | string |

## Example

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
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
});
```

## Validate your schema

Run validation before deploying:

```bash
npx @adobe/commerce-lib-config validate schema
```

Validation checks that your configuration matches the expected schema. Common errors include:

* **Type mismatches**–--A `number` field with a string default
* **Missing properties**–--Fields must have `id`, `title`, and `type`
* **Invalid options**–--Select/combobox options must have `label` and `value`

<InlineAlert variant="info" slots="text"/>

By default, schema validation runs automatically during `aio app build` through the `pre-app-build` hook configured by the library.

## Retrieve configuration at runtime

Use `getConfigurationByKey` from the configuration library to access configuration values in your runtime actions:

```js
import { getConfigurationByKey, byCodeAndLevel } from "@adobe/aio-commerce-lib-config";

async function main(params) {
  const storeCode = params.store_code || "default";
  const storeLevel = params.store_level || "store_view";

  // Use values in your app logic
  const { config: { value: endpoint } } = await getConfigurationByKey("api-endpoint", byCodeAndLevel(storeCode, storeLevel));
  const { config: { value: apiKey } } = await getConfigurationByKey("api-key", byCodeAndLevel(storeCode, storeLevel));
}
```

## Tutorial

Watch this video to learn how to define a configuration schema and see the auto-generated Admin UI in action.

[Configuration schema tutorial](https://video.tv.adobe.com/v/3478943)

## Next steps

<DiscoverBlock slots="link, text"/>

[App metadata reference](./app-metadata.md)

Define your app metadata in `app.commerce.config`.

<DiscoverBlock slots="link, text"/>

[Runtime actions reference](./runtime-actions.md)

Initialize the configuration library and understand the generated runtime actions.

<DiscoverBlock slots="link, text"/>

[Associate and configure apps](./associate-apps.md)

Link apps to Commerce instances and configure business settings.
