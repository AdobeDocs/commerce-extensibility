---
title: Troubleshooting
description: Solutions for common App Management issues
keywords:
  - App Builder
  - App Management
  - Configuration
  - Extensibility
---

# Troubleshooting

Use the following solutions to resolve common issues with App Management.

## Commerce instance behind HTTP authentication

App Management is **not supported** when Adobe Commerce is reachable only behind HTTP authentication (for example, HTTP Basic Auth in front of the Admin or APIs that App Management must call). Traffic from Adobe App Builder runtimes **does not use a fixed set of source IP addresses** that you can publish on an allowlist; Adobe does **not** provide static IPs for proxy or runtime actions for this purpose.

Plan network and access controls so Commerce endpoints required by App Management are reachable without HTTP authentication barriers that block Adobe-hosted runtime requests, in line with your security policies.

## Scope tree synchronization issues

If new websites, stores, or store views exist in Commerce but **Manage scopes** in App Management looks stale—or scopes removed in Commerce still appear—the scope tree is almost certainly **out of date**.

Scope hierarchy in App Management is **cached**. Changes to Commerce websites, stores, or store views **do not** sync automatically.

**What to do:** For **each** associated application that uses business configuration, open **Manage scopes**, open **Quick actions**, then select **Sync commerce scopes**. Running sync again reads the current hierarchy from Commerce, which updates additions and **removes** scopes that were deleted in Commerce.

For full behavior and UI context, see [Scope tree synchronization](./configuration-schema.md#scope-tree-synchronization).

## Configuration validation errors

`app.commerce.config` is validated against its schema every time the config is loaded. This happens during the `postinstall` and `pre-app-build` hooks, and whenever you run an `npx aio-commerce-lib-app generate …` command manually. If validation fails, check:

1. **Required properties**. Fields must have `name`, `label`, and `type`.

1. **Type-matched defaults**. Default values must match the field type.

1. **Valid metadata**. In `app.commerce.config`, the `metadata` object must include `id`, `displayName`, `description`, and `version`, as required by `@adobe/aio-commerce-lib-app` when it validates the file.

If validation succeeds locally but associating the app still fails with a compatibility message in the Admin, see [Association errors](#association-errors).

## Association errors

Association errors in the Admin are not the same as schema validation failures in your local `app.commerce.config`. They usually mean the deployed app package is not set up for the App Management association flow.

### Not compatible with Adobe Commerce

When you try to **associate** an application with **App Management**, the Admin may show the following error message:

```text
The selected application is not compatible with Adobe Commerce.
```

<InlineAlert variant="info" slots="text"/>

This message refers to the **App Management** association flow, not general Adobe Commerce compatibility. You might still integrate the app using vendor documentation or manual onboarding; Adobe Exchange listings that target Commerce sometimes describe those paths rather than automation in App Management.

### Manage the Commerce instance

1. The app may still be appropriate for your project. Use the installation and configuration instructions on the Adobe Exchange listing and in the vendor’s documentation (including non-downloadable or enterprise apps that use custom onboarding).

1. If those materials do not explain Commerce integration, contact the app provider to confirm supported options.

### Develop or maintain the application

1. Adobe Commerce treats an app as compatible with the association flow when the deployed package exposes the manifest and App Management runtime actions produced from **`app.commerce.config`**—specifically including valid **`metadata`**—by **`@adobe/aio-commerce-lib-app`**. Generic App Builder projects are not sufficient without that library-driven definition and generation step.

1. Add the [SDK libraries](./index.md#sdk-libraries), maintain a root [`app.commerce.config`](./define-app.md) with [`metadata`](./app-metadata.md) (and other sections as needed), run generators so `.generated` artifacts exist, then build and deploy. See [Initialize your app](./initialize-app.md) and [Define your configuration schema](./configuration-schema.md) for more information.

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

Business configuration `password` fields rely on `AIO_COMMERCE_CONFIG_ENCRYPTION_KEY` at runtime. Errors usually mean decrypt failures after a key change, or a missing or invalid key, in `.env`. The following covers both cases.

### Failed to decrypt configuration (re-association or configuration page)

Errors when opening **Configure** in App Management after re-associating or redeploying an app that uses `password` fields. Runtime logs for `app-management/__secured_config` may report `Failed to decrypt value`.

1. App Builder runtime is using a different `AIO_COMMERCE_CONFIG_ENCRYPTION_KEY` than the key that was used when merchants originally saved those secrets.

1. Restore `AIO_COMMERCE_CONFIG_ENCRYPTION_KEY` to the default value from the first installation. Align local `.env` with whatever is configured for the deployed runtime so ciphertext and key are paired.

Changing schema fields from `password` to `text` is **not** a recommended fix for published apps. This sidesteps encryption instead of correcting the key. See [Password field encryption](./configuration-schema.md#password-field-encryption)  for more information on better handling.

### Generate an encryption key

Ensure your encryption key is present in the `.env` by running the command below. It only creates a new key if one does not already exist—so deleting `.env` or starting from an empty file typically provisions a **new** key and breaks decryption of configuration encrypted with the previous key. See [Failed to decrypt configuration](#failed-to-decrypt-configuration-re-association-or-configuration-page).

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
