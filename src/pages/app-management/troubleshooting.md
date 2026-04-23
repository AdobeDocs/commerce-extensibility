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

`app.commerce.config` is validated against its schema every time the config is loaded. This happens during the `postinstall` and `pre-app-build` hooks (for example during `aio app build`), and whenever you run an `npx aio-commerce-lib-app generate …` command manually. If validation fails, check:

1. **Required properties**. Fields must have `name`, `label`, and `type`.

1. **Type-matched defaults**. Default values must match the field type.

1. **Valid metadata**. App metadata must include `id`, `displayName`, `description`, and `version`.

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

### Runtime actions not generated

Code generation is a mandatory step for App Management to work. The `pre-app-build` hook only regenerates the manifest (for `extensibility/1`) or the configuration schema (for `configuration/1`), so runtime actions must be generated manually with the following command (idempotent):

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
