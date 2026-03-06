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

## Runtime actions not generated

1. Verify `app.commerce.config` exists with valid configuration.

1. Run manually: `npx @adobe/aio-commerce-lib-app generate all`.

## App not appearing in App Management

1. Verify app is deployed: `aio app deploy`

1. Check runtime actions are generated in `.generated` folders

1. Confirm valid configuration schema

1. Verify correct organization in Developer Console

## Configuration not saving

1. Check for validation errors in the Admin UI

1. Verify runtime actions are deployed

1. Check browser console for errors

## Encryption key errors

**"AIO_COMMERCE_CONFIG_ENCRYPTION_KEY not found"**

The environment variable is not set at runtime. Ensure the encryption key is in your `.env` file:

```bash
AIO_COMMERCE_CONFIG_ENCRYPTION_KEY=your_64_character_hex_key
```

**"AIO_COMMERCE_CONFIG_ENCRYPTION_KEY is not a valid hex string"**

The key format is incorrect. Generate a new key:

```bash
npx @adobe/aio-commerce-lib-config encryption setup
```

Ensure the key is a 64-character hexadecimal string.
