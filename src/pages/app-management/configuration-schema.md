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

See [Initialize your app](./initialize-app.md) for setup instructions and [Build and deploy](./build-deploy.md) for information about generated runtime actions and project structure.

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

![Rendered schema](../_images/app-management/schema-render.png)

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

Password fields are automatically encrypted using `AES-256-GCM` when stored and decrypted when retrieved.

To validate that your encryption key is properly configured, run:

```bash
npx aio-commerce-lib-config encryption validate
```

This command is executed automatically during the `pre-app-build` hook.

To manually generate an encryption key, use:

```bash
npx aio-commerce-lib-config encryption setup
```

This generates a secure 256-bit encryption key and adds `AIO_COMMERCE_CONFIG_ENCRYPTION_KEY` to your `.env` file.

<InlineAlert variant="warning" slots="text"/>

Never commit the `.env` file to version control. Keep the encryption key secure and only accessible in the app runtime context. Operations fail if the key is not configured. Passwords are never stored in plain text.

See [Password Field Encryption](https://github.com/adobe/aio-commerce-sdk/blob/main/packages/aio-commerce-lib-config/docs/password-encryption.md) for more information.

### Multiple selection list fields

For fields that allow multiple selections, set `selectionMode` to `multiple` and the `default` value must be an array of strings, even if only one option is selected by default.

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

## Schema requirements

Your `app.commerce.config` is validated each time you run a generate command (for example, `npx aio-commerce-lib-app generate all`). The schema validation checks for:

* **Required properties**. Fields must have `name`, `label`, and `type`.
* **Type-matched defaults**. Default values must match the field type (for example, a `text` field cannot have a `number` default).
* **Encryption key for passwords**. If your schema contains password fields, configure an encryption key. See [Password field encryption](#password-field-encryption) for more information.

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
