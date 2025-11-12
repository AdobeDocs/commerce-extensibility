---
title: Credential migration guide
description: Learn about credential updates and how to migrate your Adobe Commerce checkout starter kit application.
keywords:
  - App Builder
  - Extensibility
---

# Credential migration

The checkout starter kit has integrated the `@adobe/aio-commerce-lib-config` library to provide unified business configuration management. As part of this integration, several credential environment variables have been renamed to follow a standardized naming convention.

- The Commerce base URL environment variable was changed from `COMMERCE_BASE_URL` to `AIO_COMMERCE_API_BASE_URL`.
- The IMS authorization credentials prefix was changed from `OAUTH_*` to `AIO_COMMERCE_AUTH_IMS_*`.
- The Commerce integration credentials prefix was changed from `COMMERCE_*` to `AIO_COMMERCE_AUTH_INTEGRATION_*`.

## Environment variable changes

The following table displays the mapping between the previous variable names and the new variable names:

### Commerce base URL

| Original variable name | New variable name
|---|---
| `COMMERCE_BASE_URL` | `AIO_COMMERCE_API_BASE_URL`

### IMS authorization credentials

| Original variable name | New variable name
|---|---
| `OAUTH_CLIENT_ID` | `AIO_COMMERCE_AUTH_IMS_CLIENT_ID`
| `OAUTH_CLIENT_SECRETS` | `AIO_COMMERCE_AUTH_IMS_CLIENT_SECRETS`
| `OAUTH_TECHNICAL_ACCOUNT_ID` | `AIO_COMMERCE_AUTH_IMS_TECHNICAL_ACCOUNT_ID`
| `OAUTH_TECHNICAL_ACCOUNT_EMAIL` | `AIO_COMMERCE_AUTH_IMS_TECHNICAL_ACCOUNT_EMAIL`
| `OAUTH_SCOPES` | `AIO_COMMERCE_AUTH_IMS_SCOPES`
| `OAUTH_IMS_ORG_ID` | `AIO_COMMERCE_AUTH_IMS_ORG_ID`

### Commerce integration credentials

| Original variable name | New variable name
|---|---
| `COMMERCE_CONSUMER_KEY` | `AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_KEY`
| `COMMERCE_CONSUMER_SECRET` | `AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_SECRET`
| `COMMERCE_ACCESS_TOKEN` | `AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN`
| `COMMERCE_ACCESS_TOKEN_SECRET` | `AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN_SECRET`

## Authorization credential migration

Follow these steps to migrate your existing project:

1. Backup your current `.env` file:

   ```bash
   cp .env .env.backup
   ```

1. Open your `.env` file and update the following variables:

   - Update `COMMERCE_BASE_URL` to `AIO_COMMERCE_API_BASE_URL` in your `.env` file.

   - Depending on your authentication method, you must either update the [IMS authorization](./connect.md#adobe-identity-management-service-ims) environment variables or the [Commerce integration](./connect.md#create-a-commerce-integration) environment variables:

      - IMS environment variables:

         ```bash
         AIO_COMMERCE_AUTH_IMS_CLIENT_ID=your_client_id
         AIO_COMMERCE_AUTH_IMS_CLIENT_SECRETS=["secret1", "secret2", "secret3"]
         AIO_COMMERCE_AUTH_IMS_TECHNICAL_ACCOUNT_ID=your_technical_account_id
         AIO_COMMERCE_AUTH_IMS_TECHNICAL_ACCOUNT_EMAIL=your_technical_account_email
         AIO_COMMERCE_AUTH_IMS_SCOPES=["scope1","scope2","scope3"]
         AIO_COMMERCE_AUTH_IMS_ORG_ID=your_ims_org_id
         ```

      - Commerce integration environment variables:

         ```bash
         AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_KEY=your_consumer_key
         AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_SECRET=your_consumer_secret
         AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN=your_access_token
         AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN_SECRET=your_access_token_secret
         ```

1. If you have created any custom scripts or actions that reference the old variable names, update them to use the new naming convention.

1. Test your application locally to ensure everything works correctly:

   ```bash
   aio app dev
   ```

1. To sync your local changes with the App Builder project, run the following command:

   ```bash
   aio app use --merge
   ```

1. Once you have verified that your application works locally, deploy the updated version:

   ```bash
   aio app deploy
   ```
