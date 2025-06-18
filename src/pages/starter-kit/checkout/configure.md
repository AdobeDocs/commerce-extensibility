---
title: Configure Commerce
description: Learn about how to configure Adobe Commerce to use it with the checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

import Configuration from '/src/_includes/checkout-configuration.md'

# Configure Commerce

This section provides an overview of configuring out-of-process extensibility on Adobe Commerce for developing an app using the checkout starter kit.

All the configurations in your app must align with the [App Builder Configuration file guidelines](https://developer.adobe.com/app-builder/docs/guides/configuration/). In addition, the starter kit provides a set of [scripts](https://github.com/adobe/commerce-checkout-starter-kit/tree/main/scripts) to help you get started with your project.

## Configure Payment, Shipping, or Tax modules

Select one of the following modules to learn about the available scripts:

- [Payment](./payment-install.md#configuration)
- [Shipping](./shipping-install.md#configuration)
- [Tax](./tax-install.md#configuration)

## Configure OAuth Server-to-Server Credential

<InlineAlert variant="info" slots="text"/>

The OAuth credentials are available after completing the [initial configuration](./getting-started.md#initial-configuration).

The [`sync-oauth-credentials`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/sync-oauth-credentials.js) script ensures that the OAuth credentials are available for interacting with AIO, such as creating an event provider. This script synchronizes the OAuth credentials from Adobe Developer Console with your local App Builder project configuration, located in `.env`:

 ```js
 OAUTH_CLIENT_ID=<client id>
 OAUTH_CLIENT_SECRETS=<client secret>
 OAUTH_TECHNICAL_ACCOUNT_ID=<technical account id>
 OAUTH_TECHNICAL_ACCOUNT_EMAIL=<technical account email>
 OAUTH_SCOPES=<scope>
 OAUTH_IMS_ORG_ID=<img org>

This script is included as part of the `pre-app-build` hook in [app.config.yaml](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/app.config.yaml). When the app build is triggered, the script runs automatically to synchronize the OAuth credentials with the Commerce instance.

   ```yaml
   application:
     hooks:
       pre-app-build: ./hooks/pre-app-build.js
   ```

## Configure Eventing

To configure eventing, follow these steps:

1. Install the [Commerce eventing module](./getting-started.md) in your Commerce instance.

1. Set up the [Adobe Commerce HTTP Client](./connect.md#connect-to-adobe-commerce) to authenticate the Commerce instance.

1. Configure your [events.config.yaml](#eventsconfigyaml) and `.env` files with the commerce event provider specification.

    - Create the event provider in advance, by running the [configure-events](#configure-events) script.

    - If you already have a Commerce event provider, ensure that:

        - The `events.config.yaml` file matches the existing provider metadata.

        - The environment variable `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING` contains the Commerce event provider ID.

1. The script requires the following environment variables, which update the values in **Stores > Configuration > Adobe Services > Adobe I/O Events > Commerce events**:

    - `COMMERCE_ADOBE_IO_EVENTS_MERCHANT_ID`: The merchant ID of the Commerce instance.
    - `COMMERCE_ADOBE_IO_EVENTS_ENVIRONMENT_ID`: The environment ID of the Commerce instance.

This script must finish running before you deploy the application for event registration.

### events.config.yaml

The [`events.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/events.config.yaml) file defines the event providers and their metadata.

| Field             | Description|
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`             | Label of the event provider.|
| `provider_metadata` | Metadata of the event provider (For example, `dx_commerce_events` for the Commerce event provider).|
| `description`       | Description of the event provider.|
| `docs_url`          | Documentation URL for the event provider.|
| `events_metadata`   | List of event metadata to register. (This is not required for the Commerce event provider, since it uses event subscriptions.)|
| `subscription`      | Only required for the Commerce event provider. List of Commerce events to subscribe to. For payload specifications, refer to [Subscribe to events](../../events/api.md#subscribe-to-events).|

### configure-events

<InlineAlert variant="info" slots="text"/>

This script requires [OAuth Server-to-Server credential](#configure-oauth-server-to-server-credential) to create the event provider.

The [`configure-events`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/configure-events.js) script configures the Adobe I/O Events integration for your project with a single command.

The script performs the following actions:

1. It reads the event providers specification from the [events.config.yaml](#eventsconfigyaml) file and synchronizes the event providers and their metadata.

   - The labels of the event providers defined in the specification are suffixed with the Adobe I/O Runtime namespace to ensure uniqueness across the projects of the organization.

1. The script updates the `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING` environment variable with the latest provider metadata.

To run the `configure-events` script, ensure that your project configuration (`.aio` file) includes the following:

- **Organization ID**: `project.org.id`
- **IMS Organization ID**: `project.org.ims_org_id`
- **Project ID**: `project.id`
- **Workspace ID**: `project.workspace.id`

The script uses the following environment variables:

- `AIO_runtime_namespace`: The Adobe I/O Runtime namespace is used as the suffix for the Adobe I/O Events provider label.
- `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING`: (Optional) Existing provider metadata to provider mapping.

To run this script, use the following command:

```bash
npm run configure-events
```

The script does not support deleting event providers. If you need to delete an event provider, you can do it through AIO CLI with the following command:

```bash
aio event provider delete <provider-id>
```

### configure-commerce-events

<Configuration />

The [`configure-commerce-events`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/configure-commerce-events.js) script configures the Commerce event provider for your Commerce instance.

It reads the `dx_commerce_events` event provider specification from the [events.config.yaml](#eventsconfigyaml) and `.env` files, and performs the following actions:

1. Configures Commerce eventing in the Commerce instance.

  If the Commerce instance is already configured with a different provider, the script will return an error to prevent overriding another project's configuration.

1. Subscribes to the required commerce events.

To run this script, use the following command:

```bash
npm run configure-commerce-events
```
