---
title: Troubleshooting
description: Solutions for common App Management issues
keywords:
  - App Builder
  - Extensibility
  - App Management
---

# Troubleshooting

Use the following solutions to resolve common issues with App Management.

## Configuration validation errors

`app.commerce.config` is validated against its schema every time the config is loaded. This happens during the `postinstall` and `pre-app-build` hooks, and whenever you run an `npx aio-commerce-lib-app generate …` command manually. If validation fails, check:

1. **Required properties**. Fields must have `name`, `label`, and `type`.

1. **Type-matched defaults**. Default values must match the field type.

1. **Valid metadata**. App metadata must include `id`, `displayName`, `description`, and `version`.

## Association errors

Association errors in the Admin are not the same as an invalid `app.commerce.config` in your repository. They mean that the deployed app package is not properly set up for the App Management association flow.

### Not compatible with Adobe Commerce

When you try to **associate** an application from Adobe Exchange (or from your organization in the app registry) with **App Management**, the Admin may show the following error message:

```text
The selected application is not compatible with Adobe Commerce.
```

This message describes a compatibility issue with the App Management installation, but it does not mean the app cannot work with Adobe Commerce. Exchange listings marked for Commerce may still require manual setup, credentials, and steps documented by the vendor rather than this automated path.

### Manage the Commerce instance

1. The app may still be appropriate for your project. Use the installation and configuration instructions on the Adobe Exchange listing and in the vendor’s documentation (including non-downloadable or enterprise apps that use custom onboarding).

1. If those materials do not explain Commerce integration, contact the app provider to confirm supported options.

### Develop or maintain the application

1. Association through App Management requires an app that follows the [Adobe Commerce SDK](https://github.com/adobe/aio-commerce-sdk) pattern used with App Management:

   * a root [`app.commerce.config`](./configuration-schema.md) file
   * generated runtime actions
   * libraries listed in the [App Management overview](./index.md#sdk-libraries).

1. To support App Management, add or migrate to that configuration and generate the commerce actions. See [Initialize your app](./initialize-app.md) and [Define your configuration schema](./configuration-schema.md) for more information.

## App not appearing in App Management

1. Verify app is deployed:

  ```bash
  aio app get-url

  # Only if you don't see listed the `app-management` actions
  aio app deploy --force-build --force-deploy
  ```

1. Check runtime actions are generated in `.generated` folders.

1. Ensure your commerce app configuration is valid.

1. Verify correct organization in Developer Console.

### Runtime actions

Code generation is a mandatory step for App Management to work. The `pre-app-build` hook only regenerates the commerce app manifest (a snapshot of your config), and the configuration schema, so runtime actions must be generated manually with the following command (idempotent):

<CodeBlock slots="heading, code" repeat="4" languages="BASH, BASH, BASH, BASH" />

#### npm

```bash
npx aio-commerce-lib-app generate all
```

#### yarn

```bash
yarn exec aio-commerce-lib-app generate all
```

#### pnpm

```bash
pnpm exec aio-commerce-lib-app generate all
```

#### bun

```bash
bun x aio-commerce-lib-app generate all
```

## Encryption key errors

### Generate an encryption key

Ensure your encryption key is present in the `.env` by running the command below. It only creates a new key if one does not already exist.

<CodeBlock slots="heading, code" repeat="4" languages="BASH, BASH, BASH, BASH" />

#### npm

```bash
npx aio-commerce-lib-config encryption setup
```

#### yarn

```bash
yarn exec aio-commerce-lib-config encryption setup
```

#### pnpm

```bash
pnpm exec aio-commerce-lib-config encryption setup
```

#### bun

```bash
bun x aio-commerce-lib-config encryption setup
```

### Validate your encryption key configuration.

If it's already there, validate it has the expected format:

<CodeBlock slots="heading, code" repeat="4" languages="BASH, BASH, BASH, BASH" />

#### npm

```bash
npx aio-commerce-lib-config encryption validate
```

#### yarn

```bash
yarn exec aio-commerce-lib-config encryption validate
```

#### pnpm

```bash
pnpm exec aio-commerce-lib-config encryption validate
```

#### bun

```bash
bun x aio-commerce-lib-config encryption validate
```
