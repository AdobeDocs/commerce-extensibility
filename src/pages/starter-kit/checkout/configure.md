---
title: Configure Commerce
description: Learn about how to configure Adobe Commerce to use it with the checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

# Configure Commerce

This section provides an overview on configuring Adobe Commerce for developing an app using the checkout starter kit and provides an overview of the scripts available.

All the configurations in your app must align with the [App Builder Configuration file guidelines](https://developer.adobe.com/app-builder/docs/guides/configuration/). In addition to the App Builder configuration, this starter kit requires the following additional configurations:

## events.config.yaml

The [`events.config.yaml`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/events.config.yaml) file defines the event providers and their metadata.

| Field             | Description|
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`             | Label of the event provider.|
| `provider_metadata` | Metadata of the event provider (For example, `dx_commerce_events` for the Commerce event provider).|
| `description`       | Description of the event provider.|
| `docs_url`          | Documentation URL for the event provider.|
| `events_metadata`   | List of event metadata to register. (This is not required for the Commerce event provider, since it uses event subscriptions.)|
| `subscription`      | Only required for the Commerce event provider. List of Commerce events to subscribe to. For payload specifications, refer to [Subscribe to events](../../events/api.md#subscribe-to-events).|

## Scripts

The starter kit provides set of [scripts](https://github.com/adobe/commerce-checkout-starter-kit/tree/main/scripts) to help you get started with your project. Run these scripts by using the following format: `npm run <script-name>`.

### configure-events

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

The script does not support deleting event providers. If you need to delete an event provider, you can do
it through AIO CLI with the following command:

```bash
`aio event provider delete <provider-id>`.
```

### configure-commerce-events

The [`configure-commerce-events`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/configure-commerce-events.js) script configures the Commerce event provider for your Commerce instance.

It reads the `dx_commerce_events` event provider specification from the [events.config.yaml](#eventsconfigyaml) and `.env` files, and performs the following actions:

1. Configures Commerce eventing in the Commerce instance.

  If the Commerce instance is already configured with a different provider, the script will return an error to prevent overriding another project's configuration.

1. Subscribes to the required commerce events.

#### Prerequisites

To run the script, ensure you have completed the following steps:

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

<InlineAlert variant="info" slots="text"/>

To run the following scripts, you must configure the [Adobe Commerce HTTP Client](./connect.md#connect-to-adobe-commerce).

### create-payment-methods

The [`create-payment-methods`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-payment-methods.js) script creates payment methods in Adobe Commerce.

It reads the payment methods configuration from the `payment-methods.yaml` file and creates the payment methods in Adobe Commerce.

### create-shipping-carriers

To add shipping methods to the Adobe Commerce instance using webhooks, you must first create shipping carriers.

The [`create-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-shipping-carriers.js) script creates shipping carriers in Adobe Commerce, by reading the shipping carriers configuration from `shipping-carriers.yaml`.

### get-shipping-carriers

To retrieve shipping carriers from Commerce, use the [`get-shipping-carriers`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/get-shipping-carriers.js) script.

### create-tax-integrations

To create tax integrations in Adobe Commerce, use the [`create-tax-integrations`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/scripts/create-tax-integrations.js) script.

The script reads the tax integrations configuration from the `tax-integrations.yaml` file and creates tax integrations in Adobe Commerce.
