---
title: Install the Amazon Sales Channel app
description: Learn how to install the reference App Builder app for Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
---

# Install the Amazon Sales Channel app

<InlineAlert variant="info" slots="text" />

Review the [Prerequisites](prerequisites.md) before you attempt to install the Amazon Sales Channel app.

## Clone application source code

Clone the [`amazon-sales-channel-app-builder` repo](https://github.com/adobe/amazon-sales-channel-app-builder) to your working directory:

```bash
git clone git@github.com:adobe/amazon-sales-channel-app-builder.git <custom-directory>
```

## Setup project dependencies

Change directories to the cloned repo and run the following commands:

1. Download dependencies and prepare the project.

   ```bash
   npm install
   ```

1. Build the project.

   ```bash
   npm run build
   ```

   The command cleans, compiles, and runs the `aio app build` command.

## Configure your application

### Add services

In your App Builder project:

1. In your workspace, click the **Add service** pop-up menu and select **API**.

1. On the **Add an API** page, filter on **Adobe Services** and select **I/O Management API**. Then click **Next**.

1. On the **Configure API** page, select the **Service Account (JWT)** option and click **Save configured API**.

1. Select **Generate key pair**.  

1. Click **Save configured API**.

1. Repeat this process and create an `Adobe I/O Events for Adobe Commerce` service.

### Set up your environment

1. From the root of the cloned repo, make a copy of the `.env.dist` file.

   ```bash
   cp .env.dist .env
   ```

1. Run the `aio app use` command to define your workspace.

   ```bash
   aio app use
   ```

   The following menu displays in the terminal:

   ```terminal
   You are currently in:
   1. Org: <no org selected>
   2. Project: <no project selected>
   3. Workspace: <no workspace selected>

   ? Switch to a new Adobe Developer Console configuration: A. Use the global Org / Project / Workspace configuration:
   1. Org: <your org>
   2. Project: <your project>
   3. Workspace: <your workspace>

   ? The file /<project_path>/.env already exists: Merge
   
   ✔ Successfully imported configuration for:
   1. Org: <your org>
   2. Project: <your project>
   3. Workspace: <your workspace>
   ```

At this point, the `.env` and `.aio` files should be populated. You can remove any leftover property, such as `AIO_ims_contexts_<App_Builder_Reference>` from the `.env` file.

Test your configuration by running `npm run deploy` to deploy your application into App Builder.

#### Add your encryption keys

The credentials stored in the application are encrypted using an AES-256 algorithm. You must generate a set of custom encryption keys and provide them to the `.env` file to secure authentication data.

| Key            | Description                      |
|----------------|----------------------------------|
| ENCRYPTION_KEY | 32 character long encryption key |
| ENCRYPTION_IV  | Initialization vector            |

#### Add your Adobe Commerce credentials

The application needs to connect to an Adobe Commerce instance to retrieve the product catalog updates and to ingest Amazon orders. Define the following variables inside the `.env` file:

| Key | Description |
| --- | --- |
| ADOBE_COMMERCE_BASE_URL | The base URL of your Adobe Commerce instance |
| ADOBE_COMMERCE_CONSUMER_KEY | The consumer key of the integration created in Adobe Commerce |
| ADOBE_COMMERCE_CONSUMER_SECRET | The consumer secret of the integration created in Adobe Commerce |
| ADOBE_COMMERCE_ACCESS_TOKEN | The access token of the integration created in Adobe Commerce |
| ADOBE_COMMERCE_ACCESS_TOKEN_SECRET | The access token secret of the integration created in Adobe Commerce |

### Configure Required Events in Commerce

Amazon Sales Channel on App Builder requires using I/O Events to automatically detect and respond to changes in your Commerce product catalog. The `observer.catalog_product_save_after event` is emitted when products are updated, such as when a product's name or price changes. You must configure this event and the fields that the event payload contains as part of setup. This event will be sent from Commerce to your App Builder application. By subscribing to the event published by Commerce, Amazon Sales Channel knows when your Commerce product catalog changes and can automatically make the relevant updates to your Amazon Marketplace product listings.

Create the `etc/io_events.xml` file in the root directory of your module, if it has not already been created. Register the `observer.catalog_product_save_after` event using the following code. If this event is already registered, ensure that it has all of the required fields.

```xml
<event name="catalog_product_save_after">
   <fields>
      <field name="sku" />
      <field name="price" />
      <field name="stock_data.qty" />
      <field name="asin" />
      <field name="amazon_condition" />
      <field name="name" />
   </fields>
</event>
```

See [I/O Events for Adobe Commerce](../events/module-development.md#io_eventsxml) for more details. Adobe recommends using the `io_events.xml` method to configure events, but you can also configure events by modifying the `app.config` file or by using the CLI. The same event and fields are required, regardless of the method implemented.

### Subscribe to Adobe Commerce events

1. Ensure that your Adobe Commerce instance is registered as an event provider as described in [Subscribe and register events](../events/configure-commerce.md#subscribe-and-register-events).

1. Register the `observer.catalog_product_save_after` event in your project in [developer console](https://developer.adobe.com/console/).

   * Add a new service of type `Event`.
   * Select your event provider.
   * Choose the `observer.catalog_product_save_after` event subscription.
   * Select the JWT credential.
   * Set a name for your event registration.
   * Select your Runtime action, which should be similar to `amazon-app/__secured_catalog-product-save-after-listener - <your project>-<your workspace>`, then save the event.

At this point, if you go to the `Debug tracing` area in your new event created inside the [developer console](https://developer.adobe.com/console/), you should be able to see any incoming events from your Adobe Commerce instance.

## Local Dev environment

1. Compile the TypeScript files in the `actions-src` directory into `actions`.

   ```bash
   npm run compile
   ```

1. Start your local dev server.

   ```bash
   aio app run
   ```
  
  By default, the app runs on `localhost:9080`. If the port is not available,check the console logs for the updated port.
  
  The UI is served locally, but actions are deployed and served from Adobe I/O Runtime. To start a local serverless stack and also run your actions locally, use the `aio app run --local` option.

## Admin UI SDK

The Amazon Sales Channel on App Builder is securely injected into the Commerce Admin experience using the [Admin UI SDK](../admin-ui-sdk/index.md). This UI extensibility functionality enables merchant administrators to use a seamless app UI experience in the Commerce Admin. This sample app is just one example of how App Builder integrations can extend Commerce Admin with their own apps' UI.

[Admin configuration and testing](../admin-ui-sdk/configuration.md) describes how to test functionality locally. For testing in production, push the Amazon Sales Channel app to production and have an administrator approve the app.

## Test the app

Use the following commands to run unit tests:

```bash
aio app test #runs UI and actions tests
```

```bash
aio app test --e2e #runs end-to-end tests
```

### Adding additional action dependencies

You have two options to resolve your action's dependencies:

* **Packaged action file**: Add your actions dependencies to the root `package.json` and install them using `npm install`. Then set the `function` field in `ext.config.yaml` to point to the **entry file** of your action folder. `webpack` is used to package your code and dependencies into a single minified `js` file. The action will then be deployed as a single file. Use this method if you want to reduce the size of your actions.

* **Zipped action folder**: In the folder containing the action code, add a `package.json` with the action dependencies. Then set the `function` field in `ext.config.yaml` to point to the **folder** of that action. The required dependencies are installed within that directory. In addition, the process zips the folder before deploying it as a zipped action. Use this method if you want to keep your action's dependencies separated.

### Debugging in VS Code

Both UI and actions can be debugged while your local server is running. To start debugging, open the VS Code debugger and select the `WebAndActions` debugging configuration. Other debug configurations are also available for the UI and each separate action.

## Deploy the app

Run the following command to compile, build, and deploy all TypeScript actions on Runtime and static files to CDN.

```bash
npm run deploy
```

The `aio app undeploy` command undeploys the app.

## Typescript support for UI

Use the `.tsx` extension to designate TypeScript for React components. Also, create a `tsconfig.json` file that defines the following configuration:

```json
{
  "compilerOptions": {
    "jsx": "react"
   }
} 
```
