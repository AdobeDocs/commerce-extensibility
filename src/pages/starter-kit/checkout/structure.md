---
title: Explore the stucture
description: Learn about the file structure used in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - Extensibility
---

## How to use this repo

- See [DEVELOPMENT.md](DEVELOPMENT.md) for information about the prerequisites and how to set up and run the project
  locally.
- See [CICD.md](CICD.md) for information about the CI/CD setup.
- See [EDS.md](EDS.md) for information about the Edge Delivery Service(EDS) Storefront integration.




## Project structure

### Configurations

All configurations align with the guidelines found on the [App Builder Configuration Files page](https://developer.adobe.com/app-builder/docs/guides/configuration/).
In addition to the configurations mentioned there, this starter kit requires the following additional configurations:

#### events.config.yaml

The `events.config.yaml` file is used to define the event providers and their metadata.

| Field             | Description                                                                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label             | Label of the event provider.                                                                                                                                                                                                 |
| provider_metadata | Metadata of the event provider (e.g., `dx_commerce_events` for the commerce event provider).                                                                                                                                 |
| description       | Description of the event provider.                                                                                                                                                                                           |
| docs_url          | Documentation URL for the event provider.                                                                                                                                                                                    |
| events_metadata   | List of event metadata to register. Not required for Commerce event provider as it will be done by event subscription.                                                                                                       |
| subscription      | Required only for the commerce event provider. List of commerce events to subscribe to. <br/>Payload specifications can be found [here](https://developer.adobe.com/commerce/extensibility/events/api/#subscribe-to-events). |

### Scripts

A set of scripts has been provided to help you get started with the project. You can find them in the `scripts/` and they
can be run using `npm run <script-name>`.

#### configure-events

The `configure-events` script configures the Adobe I/O Events integration for your project with a single command.

It performs the following actions:

1. It reads the event providers specification from the [events.config.yaml](#eventsconfigyaml) file and synchronizes the event providers and their metadata.
   - Note that the labels of the event providers defined in the specification are suffixed with the Adobe I/O Runtime namespace to ensure uniqueness across the projects of the organization.
2. The script also updates the `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING` environment variable with the latest provider metadata.

To run the `configure-events` script, ensure that your project configuration (`.aio` file) includes the following:

- **Organization ID**: `project.org.id`
- **IMS Organization ID**: `project.org.ims_org_id`
- **Project ID**: `project.id`
- **Workspace ID**: `project.workspace.id`

Additionally, the script uses the following environment variables:

- `SERVICE_API_KEY`: The API key for the service.
- `AIO_runtime_namespace`: The Adobe I/O Runtime namespace used as suffix for the Adobe I/O Events provider label.
- `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING`: (Optional) Existing provider metadata to provider mapping.

Note that event providers deletion is not supported by the script. If you need to delete an event provider, you can do
it through AIO cli with the following command `aio event provider delete <provider-id>`.

#### configure-commerce-events

The `configure-commerce-events` script configures the commerce event provider for your Commerce instance.

It reads `dx_commerce_events` event provider specification from the [events.config.yaml](#eventsconfigyaml) and `.env` files, and performs the following actions:

1. It configures commerce eventing in the Commerce instance.
   - If the Commerce instance has already been configured with a different provider, the script will return an error to prevent overriding another project's configuration.
2. It subscribes to the required commerce events.

To run the script, ensure you have set the followings up:

1. You have the [commerce eventing module](#install-commerce-eventing-module-in-adobe-commerce) installed in your commerce instance.
2. Make sure you have already set up the [Adobe Commerce HTTP Client](#adobe-commerce-http-client) to authenticate with the commerce instance.
3. Ensure that your [events.config.yaml](#eventsconfigyaml) and `.env` files are correctly configured with the commerce event provider specification.
   - The event provider needs to be created in advance, which you can do by running the [configure-events](#configure-events) script.
   - If you already have a commerce event provider, please ensure that
     - `events.config.yaml` file matches the existing provider metadata.
     - The environment variable `AIO_EVENTS_PROVIDERMETADATA_TO_PROVIDER_MAPPING` contains the commerce event provider id.
4. Additionally, the script requires the following environment variables, which will be used to update the values in Stores > Configuration > Adobe Services > Adobe I/O Events > Commerce events:
   - `COMMERCE_ADOBE_IO_EVENTS_MERCHANT_ID`: The merchant ID of the commerce instance.
   - `COMMERCE_ADOBE_IO_EVENTS_ENVIRONMENT_ID`: The environment ID of the commerce instance.

Note that this script must be completed before deploying the application for event registration.

#### create-payment-methods

The `create-payment-methods` script is used to create payment methods in Adobe Commerce.
It reads the payment methods configuration from the `payment-methods.yaml` file and creates the payment methods in Adobe Commerce.

To run the `create-payment-methods` script, ensure that the [Adobe Commerce HTTP Client](#adobe-commerce-http-client) is configured.