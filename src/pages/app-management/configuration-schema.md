---
title: Business configuration
description: Define your app business configuration
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Business configuration

Based on the `businessConfig` schema that you defined in the `app.commerce.config`, the configuration library generates the runtime actions that the App Management UI uses to render a configuration form with no custom code required.

See the **[Configure your project](./runtime-actions.md)** topic for more information about initializing the configuration library to generate the required runtime actions, and project structure.

## Example

The following example shows a complete configuration schema with various field types:

```js
import { defineConfig } from "@adobe/aio-commerce-lib-app/config"

export default defineConfig({
  businessConfig: {
    schema: [
      {
        name: "api-name",
        label: "API name",
        type: "text",
        default: "",
      },
      {
        name: "api-endpoint",
        label: "API Endpoint",
        type: "url",
        default: "https://api.example.com",
      },
      {
        name: "api-key",
        label: "API Key",
        type: "password",
      },
      {
        name: "level",
        label: "Risk Level",
        type: "list",
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ],
        default: "medium",
        selectionMode: "single",
      },
    ],
  },
});
```

![Renderized schema](../_images/app-management/schema-render.png)

## Schema properties

This `businessConfig` schema contains the following properties:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Unique field identifier. Used to retrieve values at runtime. |
| `label` | string | Yes | Display label of a configuration field. |
| `type` | string | Yes | Field type. See [Supported types](#supported-field-types). |
| `default` | varies | No | Default value. Must match the field type. |
| `description` | string | No | Help text displayed below the field. |
| `options` | array | Conditional | Required for `list`. Defines available options to be displayed in the dropdown list. |
| `selectionMode` | string | Conditional | Required for `list`. Set to `single` for standard dropdown or `multiple` to allow multiple selections. |

## Supported field types

The following field types are available for your `businessConfig` schema:

| Field type | Type | Description |
|------------|------|-------------|
| `text` | string | Single-line text input |
| `password` | string | Masked input for sensitive values like API keys and tokens. See [Password field encryption](#password-field-encryption). |
| `email` | string | Email address input with validation |
| `tel` | string | Phone number input with format validation |
| `url` | string | URL input with validation |
| `list` | string | Dropdown with preconfigured options |

### Password field encryption

Password fields are automatically encrypted using `AES-256-GCM` when stored and decrypted when retrieved. When you [validate your schema](#validate-your-schema), the encryption key is automatically generated if not already configured.

The validation process:

1. Generates a secure 256-bit encryption key.

1. Adds a `CONFIG_ENCRYPTION_KEY` to your `.env` file.

1. Sets the key in your environment for immediate use.

<InlineAlert variant="warning" slots="text"/>

Never commit the `.env` file to version control. Keep the encryption key secure and only accessible in the app runtime context.

See the [Password Field Encryption](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-config/docs/password-encryption.md) topic for more detailed information.

### List field with multiple selection

For fields that allow multiple selections:

1. Set `selectionMode` to `multiple`. 

1. Provide the `default` value as an array:

```js
{
  name: "paymentMethods",
  label: "Enabled Payment Methods",
  type: "list",
  selectionMode: "multiple",
  options: [
    { label: "Credit Card", value: "credit_card" },
    { label: "PayPal", value: "paypal" },
    { label: "Apple Pay", value: "apple_pay" },
  ],
  default: ["credit_card"]
}
```

<InlineAlert variant="info" slots="text"/>

For `selectionMode: "multiple"`, the `default` value must be an array of strings, even if only one option is selected by default.

## Validate your schema

Run validation before deploying:

```bash
npx @adobe/aio-commerce-lib-config validate schema
````

<InlineAlert variant="info" slots="text"/>

This will only function properly if `@adobe/aio-commerce-lib-config` is installed and included in your `package.json` file.

Validation checks that your configuration matches the expected schema. Common errors include:

* **Type mismatches**. A `text` field with a `number` default
* **Missing properties**. Fields must have `name`, `label`, and `type`
* **Missing encryption key**. If your schema contains password fields without a configured encryption key, the validation automatically generates one. See [Password field encryption](#password-field-encryption) for details.

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
