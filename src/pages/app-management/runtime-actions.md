---
title: Configure your project
description: Initialize the configuration library and understand auto-generated runtime actions
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Configure your project

The `@adobe/aio-commerce-lib-config` library auto-generates runtime actions based on the `businessConfig` section in your [configuration schema](./configuration-schema.md). An additional action is generated for app metadata by the `@adobe/aio-commerce-lib-app` library.

These actions power the App Management UI with no required boilerplate code.

## Initialize the library

Run the following command to set up your App Builder project. This command creates the required files, installs dependencies, and generates runtime actions based on your `app.commerce.config` file.

```bash
npx @adobe/aio-commerce-lib-app init
```

The initialization process:

* Creates `app.commerce.config` with a template (prompts you to choose format and features if the file doesn't exist)
* Installs required dependencies (`@adobe/aio-commerce-lib-app`, `@adobe/aio-commerce-sdk`, and `@adobe/aio-commerce-lib-config` when business configuration is enabled)
* Adds a `postinstall` hook to `package.json`
* Generates all required artifacts (`commerce/configuration/1` resources are only generated when `businessConfig` is defined)
* Updates `app.config.yaml` and `install.yaml` with the appropriate extension references

The command automatically detects your package manager (npm, pnpm, yarn, or bun) and uses the appropriate commands.

## Environment variables

The generated runtime actions require environment variables for authentication. Add these to your `.env` file based on your Commerce instance type.

### SaaS instances (IMS authentication)

```bash
LOG_LEVEL=info

AIO_COMMERCE_API_BASE_URL=https://your-commerce-instance.com

AIO_COMMERCE_AUTH_IMS_CLIENT_ID=your-client-id
AIO_COMMERCE_AUTH_IMS_CLIENT_SECRETS=your-client-secrets
AIO_COMMERCE_AUTH_IMS_TECHNICAL_ACCOUNT_ID=your-technical-account-id
AIO_COMMERCE_AUTH_IMS_TECHNICAL_ACCOUNT_EMAIL=your-technical-account-email
AIO_COMMERCE_AUTH_IMS_ORG_ID=your-ims-org-id
AIO_COMMERCE_AUTH_IMS_SCOPES=your-ims-scopes
```

<InlineAlert variant="info" slots="text"/>

Run `npx @adobe/aio-commerce-lib-auth sync-ims-credentials` to automatically sync IMS credentials from your Adobe I/O workspace context to the `.env` file.

### PaaS instances (Integration authentication)

```bash
LOG_LEVEL=info

AIO_COMMERCE_API_BASE_URL=https://your-commerce-instance.com

AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_KEY=your-consumer-key
AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_SECRET=your-consumer-secret
AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN=your-access-token
AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN_SECRET=your-access-token-secret
```

## Making API calls

Use `@adobe/aio-commerce-lib-api` to make authenticated API calls to Adobe Commerce from your custom runtime actions.

### Resolving client parameters

Use `resolveCommerceHttpClientParams` to automatically resolve client parameters from action inputs:

```js
import {
  resolveCommerceHttpClientParams,
  AdobeCommerceHttpClient,
} from "@adobe/aio-commerce-lib-api/commerce";

export const main = async function (params) {
  const clientParams = resolveCommerceHttpClientParams(params);
  const client = new AdobeCommerceHttpClient(clientParams);
  
  return await client.get("products").json();
};
```

The resolver automatically detects the Commerce flavor from the URL and authentication type from the provided parameters.

### Forwarding IMS authentication

When your action receives a pre-existing IMS token, forward it to downstream API calls:

```js
export const main = async function (params) {
  const clientParams = resolveCommerceHttpClientParams(params, {
    tryForwardAuthProvider: true,
  });
  const client = new AdobeCommerceHttpClient(clientParams);

  return await client.get("products").json();
};
```

## Generated files

The initialization process creates files organized by extension point:

**`commerce/extensibility/1`** - App management:

| File | Description |
|------|-------------|
| `src/commerce-extensibility-1/.generated/app.commerce.manifest.json` | Validated JSON representation of your app config |
| `src/commerce-extensibility-1/.generated/actions/app-management/` | Runtime actions for app config and installation |
| `src/commerce-extensibility-1/ext.config.yaml` | Extension manifest with `pre-app-build` hook |

**`commerce/configuration/1`** - Business configuration (when `businessConfig` is defined):

| File | Description |
|------|-------------|
| `src/commerce-configuration-1/.generated/configuration-schema.json` | Validated JSON representation of your schema |
| `src/commerce-configuration-1/.generated/actions/business-configuration/` | Runtime actions for config and scope management |
| `src/commerce-configuration-1/ext.config.yaml` | Extension manifest with `pre-app-build` hook |

## Generated runtime actions

The libraries generate runtime actions organized by extension point.

### App management actions (`commerce/extensibility/1`)

| Action | Description |
|--------|-------------|
| `app-config` | Serves the app configuration to the App Management UI. |
| `installation` | Drives the installation flow, including custom installation steps. |

### Business configuration actions (`commerce/configuration/1`)

These actions handle configuration and scope operations (generated when `businessConfig` is defined):

| Action | Description |
|--------|-------------|
| `config` | Handles retrieving and updating configuration values across scopes. |
| `scope-tree` | Handles scope hierarchy management for Commerce and custom scopes. |

<InlineAlert variant="info" slots="text"/>

The scope tree action supports syncing scopes from Adobe Commerce (requires `commerceBaseUrl`), setting custom scope hierarchies for external systems, and unsyncing Commerce scopes.

<InlineAlert variant="warning" slots="text"/>

Do not manually edit files in `.generated` folders. These are auto-generated directories and any manual changes can be lost during regeneration.

## Build and deploy

After initializing the library, build and deploy your application to make it available in App Management:

```bash
aio app build
aio app deploy
```

Once deployed, your app appears in App Management and can be [associated with a Commerce instance](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app){target="_blank"}.

## Update the library

When a new version of the library is available, update your project to get the latest features and fixes:

```bash
npm install @adobe/aio-commerce-lib-app@latest @adobe/aio-commerce-sdk@latest
```

If you use business configuration, also update:

```bash
npm install @adobe/aio-commerce-lib-config@latest
```

The `postinstall` hook regenerates runtime actions when you install or update the library.

Then, rebuild and redeploy your application:

```bash
aio app build
aio app deploy
```

## CLI commands

The library provides the following CLI commands:

```bash
# Initialize the project (recommended for first-time setup)
npx @adobe/aio-commerce-lib-app init

# Generate all artifacts (manifest + schema + runtime actions)
npx @adobe/aio-commerce-lib-app generate all

# Or generate individually:
npx @adobe/aio-commerce-lib-app generate manifest
npx @adobe/aio-commerce-lib-app generate actions
npx @adobe/aio-commerce-lib-app generate schema
```

## Troubleshooting

Use the following solutions to resolve common issues with runtime actions.

**Runtime actions not generated**

1. Verify `app.commerce.config` exists with valid configuration.

1. Run manually: `npx @adobe/aio-commerce-lib-app generate all`.

**Schema validation fails**

1. Check your `app.commerce.config` for syntax errors.

1. Ensure all required fields are present in your configuration.

1. Rebuild with `aio app build`.
