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

The entire `app.commerce.config` is validated when the `pre-app-build` hook runs (for example during `aio app build`) and when you run `npx aio-commerce-lib-app generate …` manually. Schema validation is included. If validation fails, check:

1. **Required properties**. Fields must have `name`, `label`, and `type`.

1. **Type-matched defaults**. Default values must match the field type.

1. **Valid metadata**. App metadata must include `id`, `displayName`, `description`, and `version`.

## App not appearing in App Management

1. Verify app is deployed:

  ```bash
  aio app deploy --force-build --force-deploy
  ```

1. Check runtime actions are generated in `.generated` folders.

1. Confirm valid configuration schema.

1. Verify correct organization in Developer Console.

### Runtime actions not generated

1. Verify `app.commerce.config` exists with valid configuration.

1. Run a build so `pre-app-build` runs the generators:

  ```bash
  aio app build
  ```

1. If `.generated` folders are still missing or stale, run:

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

1. Validate your encryption key configuration.

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

1. Generate an encryption key (only creates one if it does not already exist).

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
