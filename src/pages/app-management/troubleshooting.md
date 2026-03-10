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

The entire `app.commerce.config` is validated each time you run a generate command. Schema validation is included as part of this validation. If validation fails, check:

1. **Required properties**. Fields must have `name`, `label`, and `type`.

1. **Type-matched defaults**. Default values must match the field type.

1. **Valid metadata**. App metadata must include `id`, `displayName`, `description`, and `version`.

## Runtime actions not generated

1. Verify `app.commerce.config` exists with valid configuration.

1. Manually run:

  ```bash
  npx aio-commerce-lib-app generate all
  ```

## App not appearing in App Management

1. Verify app is deployed:

  ```bash
  aio app deploy
  ```

1. Check runtime actions are generated in `.generated` folders.

1. Confirm valid configuration schema.

1. Verify correct organization in Developer Console.

## Configuration not saving

1. Check for validation errors in the Admin UI.

1. Verify that runtime actions are deployed.

1. Check your browser console for errors.

## Encryption key errors

1. Validate your encryption key configuration.

  ```bash
  npx aio-commerce-lib-config encryption validate
  ```

1. Generate an encryption key (only creates one if it does not already exist).

  ```bash
  npx aio-commerce-lib-config encryption setup
  ```
