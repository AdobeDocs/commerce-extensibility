---
title: Starter Kit installation and onboarding
description: Learn how to install, configure, and deploy your Adobe Commerce Starter Kit project.
keywords:
  - App Builder
  - Extensibility
---

import BetaNote from '/src/_includes/starter-kit-beta.md';

<BetaNote />

# Starter Kit installation and onboarding

You are now ready to download the Adobe Commerce Starter Kit and set up your development.

## Download and configure the project

In the Beta phase of the Starter Kit project, an Adobe Commerce representative will send you a ZIP file containing the Starter Kit repo. For GA, the Starter Kit will be available in the Adobe Commerce Marketplace.

1. Download and unzip the Starter Kit repo.

1. Change directories to the downloaded repo and copy the `env.dist` file.

   ```bash
   cd <download-directory> && cp env.dist .env
   ```

1. Fill in the values in the `.env` file. The file describes where you can find the values for each environment variable.

## Configure the project

1. Install npm dependencies:

   ```bash
   npm install
   ```

1. Run the following Adobe I/O commands to connect your Starter Kit project to the App Builder project you created earlier:

   ```bash
   aio login
   aio console org select
   aio console project select
   aio console workspace select
   ```

1. Sync your local application with the App Builder project using the following command:

   ```bash
   aio app use --merge
   ```

1. The `app.config.yaml` in the repo's root directory defines which packages to deploy. The Starter Kit provides packages for Commerce products, customers, orders, and stocks and their external back office counterparts. Comment out any packages that you do not need to deploy. In the following example, the `ingestion` package has been disabled:

   ```yaml
   application:
   runtimeManifest:
    packages:
    #  ingestion:
    #    license: Apache-2.0
    #    actions:
    #      $include: ./actions/ingestion/actions.config.yaml
      webhook:
        license: Apache-2.0
        actions:
          $include: ./actions/webhook/actions.config.yaml
      product-commerce:
        license: Apache-2.0
        actions:
          $include: ./actions/product/commerce/actions.config.yaml
      product-backoffice:
        license: Apache-2.0
        actions:
          $include: ./actions/product/external/actions.config.yaml
      customer-commerce:
        license: Apache-2.0
        actions:
          $include: ./actions/customer/commerce/actions.config.yaml
      customer-backoffice:
        license: Apache-2.0
        actions:
          $include: ./actions/customer/external/actions.config.yaml
      order-commerce:
        license: Apache-2.0
        actions:
          $include: ./actions/order/commerce/actions.config.yaml
      order-backoffice:
        license: Apache-2.0
        actions:
          $include: ./actions/order/external/actions.config.yaml
      stock-commerce:
        license: Apache-2.0
        actions:
          $include: ./actions/stock/commerce/actions.config.yaml
      stock-backoffice:
        license: Apache-2.0
        actions:
          $include: ./actions/stock/external/actions.config.yaml
   ```

## Deploy the project

Run the following command to deploy the project. The command deploys the runtime actions needed for the onboarding step:

```bash
aio app deploy
```

You can confirm the success of the deployment in the Adobe Developer Console by navigating to the Runtime section on your workspace.

![Adobe I/O Runtime actions](../../_images/starterkit/runtime-actions.png)

## Onboarding

The onboarding process configures event registrations and completes the eventing configuration in Adobe Commerce.

### Configure the event registrations

By default, the `./onboarding/custom/starter-kit-registrations.json` config file creates all the registrations for all entities that are present in the repo's `app.config.yaml` file. You can edit this file to remove any unnecessary Commerce or back office registrations. For example, the YAML file shown in the [Configure the project](#configure-the-project) section comments out the `product-backoffice` package. In this case, you must remove backoffice from the product entity:

```json
{
  "product": ["commerce"],
  "customer": ["commerce", "backoffice"],
  "order": ["commerce", "backoffice"],
  "stock": ["commerce", "backoffice"],
  "shipment": ["commerce", "backoffice"]
}
```

### Execute the onboarding

Run the following command to generate the IO Event providers and the registrations for your Starter Kit project.

```bash
npm run onboard
```

The console displays the provider's IDs. The commerce instance and provider IDs will be used to configure your Commerce instance. You will need the backoffice provider ID to send the events to the App builder project.

```terminal
Process of On-Boarding done successfully: [
  {
    key: 'commerce',
    id: '<Commerce Provider ID>',
    instanceId: '<Instance ID of Commerce Provider',
    label: 'Commerce Provider'
  },
  {
    key: 'backoffice',
    id: '<Backoffice Provider ID>',
    instanceId: '<Instance ID of backoffice provider',
    label: 'Backoffice Provider'
  }
]
```

Check your App in the Developer Console to confirm the registrations were created.

![Event registrations](../../_images/starterkit/registrations.png)

### Complete the Adobe Commerce eventing configuration

You must configure Commerce to communicate with your project. Configuration includes copying and pasting the contents of the workspace configuration file that you downloaded from the Adobe Developer Console.

1. In the Commerce Admin, navigate to **Stores** > Settings > **Configuration** > **Adobe Services** > **Adobe I/O Events** > **General configuration**. The following screen displays.

   ![General configuration](../../_images/events/general-configuration.png)

1. Select the server-to-server authorization method you implemented from the **Adobe I/O Authorization Type** menu. Adobe recommends using OAuth. JWT has been deprecated.

1. Copy the contents of the `<workspace-name>.json` file into the **Adobe I/O Workspace Configuration** field.

1. Enter a unique identifier in the **Adobe Commerce Instance ID** field. This value must contain English alphanumeric characters, underscores (_), and hyphens (-) only.

1. Click **Save Config**, but do not leave the page. The next section creates an event provider, which is necessary to complete the configuration.

1. Enable Commerce Eventing by setting **Enabled** to `Yes`.

   **Note**: You must enable cron so that Commerce can send events to the endpoint.

1. Enter the merchant's company name in the **Merchant ID** field. You must use alphanumeric and underscores only.

1. In the **Environment ID** field, enter a temporary name for your workspaces while in development mode. When you are ready for production, change this value to a permanent value, such as Production.

1. (Optional) By default, if an error occurs when Adobe Commerce attempts to send an event to Adobe I/O, Commerce retries a maximum of seven times. To change this value, uncheck the **Use system value** checkbox and set a new value in the **Maximum retries to send events** field.

1. (Optional) By default, Adobe Commerce runs a cron job (clean_event_data) every 24 hours that deletes event data three days old. To change the number of days to retain event data, uncheck the **Use system value** checkbox and set a new value in the **Event retention time (in days)** field.

1. Click **Save Config**.

### Subscribe to events in Adobe Commerce

Use the `bin/magento events:subscribe` command to subscribe to events, as described in [Subscribe and register events](../../events/configure-commerce.md#subscribe-and-register-events). The following table defines the events for each supported entity that you must subscribe to and lists the required fields, if applicable.

Entity | Event | Required fields
--- | --- | ---
Product | `observer.catalog_product_delete_commit_after` | `sku`
Product | `observer.catalog_product_save_commit_after`   | `sku`, `created_at`, `updated_at`
Customer | `observer.customer_save_commit_after` | `created_at`, `updated_at`
Customer | `observer.customer_delete_commit_after` | `entity_id`
Customer group | `observer.customer_group_save_commit_after` | `customer_group_code`
Customer group | `observer.customer_group_delete_commit_after` | `customer_group_code`
Order | `observer.sales_order_save_commit_after` | `created_at`, `updated_at`
Stock | `observer.cataloginventory_stock_item_save_commit_after` | `product_id`
