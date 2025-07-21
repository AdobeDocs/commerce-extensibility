---
title: Extend Adobe Commerce with webhooks and App Builder
description: Learn how to set up, build, and troubleshoot Commerce Webhooks integration using App Builder.
keywords:
  - Extensibility

---

# Extend Adobe Commerce with webhooks and App Builder

With Adobe App Builder, you can build scalable, event-driven integrations using webhooks and runtime actions. These integrations allow you to extend Adobe Commerce capabilities without modifying the core codebase, making it easier to maintain and scale your applications. For example, you can use App Builder to validate data, such as product names, in real time through synchronous webhook integrations in Adobe Commerce as a Cloud Service (SaaS).

This tutorial outlines step-by-step instructions for setting up an App Builder project. It covers writing simple action code, configuring webhook subscriptions in Adobe Commerce, and debugging App Builder code using a debugger.

## How it works

This tutorial demonstrates how to extend Adobe Commerce using webhooks and Adobe App Builder. The integration allows you to validate product names in real time when products are added or updated in Adobe Commerce. Before we dive into the setup, let's understand how this integration works end-to-end:

1. Adobe Commerce triggers a webhook when specific events occur, such as when a new product is added or updated.

1. This webhook sends the relevant event payload (the product name, in this case) to an Adobe App Builder runtime action.

1. The App Builder action processes the payload and applies custom business logic. You might want to validate that the product name doesn't include restricted terms like "test" or "example". Based on the logic, the action returns either a success or an error message.

1. Adobe Commerce uses this response to determine whether to save changes to the product.

This setup allows you to offload validation and custom logic from the Commerce codebase to the scalable, serverless infrastructure of Adobe App Builder.

## Set up the Adobe Developer Console and App Builder project locally

Before you can start building your App Builder application, you need to set up your development environment and create a project in the Adobe Developer Console. This process involves installing the necessary tools, configuring your workspace, and creating a new project that will host your App Builder application.

### Prerequisites

* [Adobe Commerce as a Cloud Service](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/overview) instance
* Access to [Adobe Developer Console](https://developer.adobe.com/console)
* Access to [Adobe Developer App Builder](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/set-up#access-and-credentials)
* [AIO CLI](https://developer.adobe.com/app-builder/docs/guides/runtime_guides/tools/cli-install) (required to run commands)

### Create a new project in Adobe Developer Console

1. To add new project in developer console, Refer to the  [Adobe App Builder Getting Started guide](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/first-app) and complete Step 1: "Check your environment and tools" and Step 2: "Create a new project on Developer Console" before proceeding.
These steps are essential because the Adobe Developer Console provides the credentials and configuration required to deploy your App Builder app and access Adobe services like I/O Runtime and Commerce APIs. Without completing these steps, your app will not be able to authenticate or run within the Adobe ecosystem.

1. In your **stage** workspace, click the Add service pop-up menu and select API.
Add the following services to your workspace. Each service must be added individually. You cannot add multiple services simultaneously.

   * I/O Management API
   * I/O Events
   * Adobe I/O Events for Adobe Commerce

  Click one of these services, such as I/O Management API. Then click Next. On the Configure API page, select the OAuth Server-to-Server option and click Save configured API.

#### Set up your local App Builder environment using the CLI

After creating your project in the Adobe Developer Console, the next step is to set up your development environment using Adobe I/O CLI tools. This enables you to run your App Builder application locally and deploy it to Stage or Production workspaces configured in your Developer Console project.

**Prerequisites:**

Ensure you have the following tools installed:

* npm
* Node.js (v16.x or later)
* VS Code (or any other code editor of your choice)

**Steps**

1. Install Adobe I/O CLI

   ```bash
   npm install -g @adobe/aio-cli
   ```

1. Follow this step from the document to login via CLI. [Sign in from the CLI – Adobe App Builder Getting Started Guide](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/first_app/#3-sign-in-from-the-cli)

1. Retrieve the JSON file from the Admin Console by following the steps outlined in the provided this document [Developer with a Console Config File – Adobe App Builder Guide](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/first_app/#421-developer-with-a-console-config-file) You can ignore the remaining steps in the document. Note the location of the downloaded json file.

1. Run `aio app use [location to the downloaded json file] command to use the downloaded JSON file for your project.

```terminal
You are currently in:
1. Org: <org name>
2. Project: <project name specified in development console>
3. Workspace: Stage
```

1. Ensure you're working in the correct Organization, Project, and Workspace within the Adobe Developer Console through the below command

```bash
aio where
```

```terminal
You are currently in:
1. Org: Early Access - Adobe Commerce as a Cloud Service
2. Project: appbuilderforextensibility
3. Workspace: Stage
```

You can verify org and project details by opening the Developer Console and checking the top-right corner, where your organization name and project are displayed.

1. Run the following command to initialize your project:

```bash
aio app init < your projectname >
```

* When prompted, select the correct **Organization** and For **Project**, select the one you created earlier using the Developer Console.
* Choose a template listed under **Supported by My Org** to ensure compatibility with your environment.
* When prompted to **Select a template**, choose:
**All Templates → @adobe/generator-app-events-generic**
* When prompted to **Which Adobe I/O App features do you want to use?**, select:
**Actions: Deploy Runtime actions for I/O App features**
* When prompted to **Which type of actions do you want to generate?**, select:
**Generic**
* When prompted to **Which UI framework do you want to use?**, select:
**React Spectrum 3**
* When prompted to **Provide a name for the action**, enter your preferred action name

```terminal
? Select Org: <Select your Organization Name>
? Select a Project, or press + to create new: <Select project name created in development console>
? What templates do you want to search for? All Templates
✔ Downloaded the list of templates
? Choose the template(s) to install:
  Pressing <enter> without selection will skip templates and install a standalone application.
 (Press <space> to select, <Up and Down> to move rows)
┌──────┬─────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────┬────────────────────────────────────────┬────────────────────────────────────────┐
│      │ Template                                                    │ Description                                                 │ Extension Point                        │ Categories                             │
├──────┼─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│  ◯   │ @adobe/aem-assets-details-ext-tpl *                         │ Asset Details extension template for the AEM Assets View    │ aem/assets/details/1                   │ action, ui                             │
├──────┼─────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│  ◯   │ @adobe/workfront-ui-ext-tpl *                               │ Template for AIO CLI App Builder plug? Choose the template(s) to install:
  Pressing <enter> without selection will skip templates and install a standalone application.
 
┌──────┬─────────────────────────────────────────────────────────────┬──────────────────────────────────────
───────────────────────┬────────────────────────────────────────┬────────────────────────────────────────┐
│      │ Template                                                    │ Description                          
                       │ Extension Point                        │ Categories                             │
├──────┼─────────────────────────────────────────────────────────────┼──────────────────────────────────────
───────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│  ◯   │ @adobe/aem-assets-details-ext-tpl *                         │ Asset Details extension template for 
the AEM Assets View    │ aem/assets/details/1                   │ action, ui                             │
├──────┼─────────────────────────────────────────────────────────────┼──────────────────────────────────────
───────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│  ◯   │ @adobe/workfront-ui-ext-tpl *                               │ Template for AIO CLI App Builder plug
in that allows         │ workfront/ui/1                         │ action, ui                             │
│      │                                                             │ generating code of UI Extension for W
orkfront product       │                                        │                                        │
├──────┼─────────────────────────────────────────────────────────────┼──────────────────────────────────────
───────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│ ❯◯   │ @adobe/generator-app-events-generic *                       │ Adds event registrations and a generi
c action               │ N/A                                    │ action, events                         │
├──────┼─────────────────────────────────────────────────────────────┼──────────────────────────────────────
───────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│  ◯   │ @adobe/aem-cf-editor-ui-ext-tpl *                           │ Extensibility template for AEM Conten
t Fragment Editor      │ aem/cf-editor/1                        │ action, ui                             │
├──────┼─────────────────────────────────────────────────────────────┼──────────────────────────────────────
───────────────────────┼────────────────────────────────────────┼────────────────────────────────────────┤
│  ◯   │ @adobe/generator-app-aem-react *                            │ Template for AEM React SPA based on W
KND content.           │ N/A                                    │ ui                                     │
└──────┴─────────────────────────────────────────────────────────────┴──────────────────────────────────────
───────────────────────┴────────────────────────────────────────┴────────────────────────────────────────┘
* = recommended by Adobe; to learn more about the templates, go to https://a
Bootstrapping code in: your project directory/commappwebhook
   create package.json
   create README.md
   create jest.setup.js
   create .env
   create .gitignore
   create .eslintrc.json

Changes to package.json were detected.
Skipping package manager install.

   create .github/workflows/deploy_prod.yml
   create .github/workflows/deploy_stage.yml
   create .github/workflows/pr_test.yml
? Which Adobe I/O App features do you want to enable for this project?
Select components to include Actions: Deploy Runtime actions, Events: Publish to Adobe I/O Events, Web 
Assets: Deploy hosted static assets
? Which type of sample actions do you want to create?
Select type of actions to generate Generic
? Which type of UI do you want to add to your project?
select template to generate React Spectrum 3
? We are about to create a new sample action that showcases how to access an external API.
How would you like to name this action? testwebhook
? We are about to create a new sample action that creates messages in cloud events format and publishes to 
Adobe I/O Events.
How would you like to name this action? testwebhook
    force package.json
   create app.config.yaml
   create actions/testwebhook/index.js
   create test/testwebhook.test.js
   create actions/utils.js
   create test/utils.test.js
   create e2e/testwebhook.e2e.test.js
   create web-src/index.html
   create web-src/src/config.json
   create web-src/src/exc-runtime.js
   create web-src/src/index.css
   create web-src/src/index.js
   create web-src/src/utils.js
   create web-src/src/components/About.js
   create web-src/src/components/ActionsForm.js
   create web-src/src/components/App.js
   create web-src/src/components/Home.js
   create web-src/src/components/SideBar.js
   create .babelrc
Project initialized for Workspace Stage, you can run 'aio app use -w <workspace>' to switch workspace.
⠸ Installing packages...
```

Folder structure after `app init`:

```tree
commappwebhook/
├── README.md
├── app.config.yaml
├── dist/
├── e2e/
├── jest.setup.js
├── node_modules/
├── package-lock.json
├── package.json
├── test/
├── web-src/
└── actions/
    ├── constants.js
    ├── responses.js
    ├── testwebhook/
    │   └── index.js
    └── utils.js
```

### Implement the webhook action

1. Create a `commappwebhook/actions/testwebhook/validateProductName.js` file and add the following code. This file defines a function that runs as an action in Adobe App Builder. In App Builder, every action must have a function named main, as this is the entry point that gets called when the action is triggered. The function should accept input in JSON format and return a response in JSON as well. In this case, the action checks if the product name received from the Adobe Commerce webhook contains the word "test". If it does, the action passes validation. Otherwise, it returns an error message.

```js
const { Core, Events } = require('@adobe/aio-sdk') // Adobe I/O SDK modules
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils') // Utility functions

// Main function executed by Adobe I/O Runtime
async function main(params) {
  // Create a logger instance
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
  logger.info('Calling the main action ')

  try {
    const response = { statusCode: 200 }

    // Check if product name contains 'test'; return error response if true
    if (/test/.test(params.product.name.toLowerCase())) {
      response.body = JSON.stringify({
        op: "exception",
        message: "Invalid product name >> " + params.product.name
      })
    } else {
      // Success response
      response.body = JSON.stringify({
        op: "success"
      })
    }

    return response
  } catch (error) {
    // Log error and return a 500 server error response
    logger.error(error)
    return errorResponse(500, 'server error ' + JSON.stringify(params), logger)
  }
}

exports.main = main
```

1. Copy the contents of the utils.js file provided below into the utils.js file located under the actions/ folder.The utils.js file  provides common utility functions used by actions. One of its main functions, errorResponse, helps create a consistent error response and optionally logs the error details. This utility is useful when validating input or handling failures in actions.

```js
/* 
* <license header>
*/

/* This file exposes some common utilities for your actions */

/**
 *
 * Returns a log ready string of the action input parameters.
 * The `Authorization` header content will be replaced by '<hidden>'.
 *
 * @param {object} params action input parameters.
 *
 * @returns {string}
 *
 */
/**
 *
 * Returns an error response object and attempts to log.info the status code and error message
 *
 * @param {number} statusCode the error status code.
 *        e.g. 400
 * @param {string} message the error message.
 *        e.g. 'missing xyz parameter'
 * @param {*} [logger] an optional logger instance object with an `info` method
 *        e.g. `new require('@adobe/aio-sdk').Core.Logger('name')`
 *
 * @returns {object} the error object, ready to be returned from the action main's function.
 *
 */
function errorResponse (statusCode, message, logger) {
  if (logger && typeof logger.info === 'function') {
    logger.info(`${statusCode}: ${message}`)
  }
  return {
    error: {
      statusCode,
      body: {
        error: message
      }
    }
  }
}

module.exports = {
  errorResponse
}
```

### Configure app.config.yaml

The `app.config.yaml` file is used to configure your Adobe App Builder project. It defines project metadata, runtime actions, web assets, and settings like which file to use as the entry point for each action.This config file is available in the following location: `commappwebhook/app.config.yaml`. In `app.config.yaml`, change the `index.js` reference to `validateProductName.js`.

<InlineAlert variant="info" slots="text"/>

You must specify `web: 'yes'` in the config.

```yaml
application:
  actions: actions
  web: web-src
  runtimeManifest:
    packages:
      appbuilderforextensibility:
        license: Apache-2.0
        actions:
          webhook:
            function: actions/testwebhook/validateProductName.js
            web: 'yes'
            runtime: nodejs:22
            inputs:
              LOG_LEVEL: info
            annotations:
              require-adobe-auth: false
              final: true
  ```
  
### Deploy and test

Run the following commands in your project directory:

1. To install all project dependencies:

   ```bash
   npm install
   ```

1. To deploy the application to Adobe I/O Runtime:

   ```bash
   aio app deploy
   ```
  
   The command builds the application, deploys the action, and uploads web assets to the CDN. The output is similar to the following, showing the deployed action URL and the URL to access your application.

   ```terminal
   ✔ Built 2 action(s) for 'application'
   ✔ Building web assets for 'application'
   ✔ Deployed 1 action(s) for 'application'
   ✔ Deploying web assets for 'application'
   ✔ All static assets for the App Builder application in workspace: application were successfully deployed to the CDN. Files deployed :
   
   * 2 HTML page(s)
   * 2 Javascript file(s)
   * 3 .map file(s)
   * 1 CSS file(s)
   
   Your deployed actions:
   
   web actions:
   -> https://1244026-appbuilderforextens-stage.adobeio-static.net/api/v1/web/appbuilderforextensibility/testwebhook
   
   To view your deployed application:
   -> https://1244026-appbuilderforextens-stage.adobeio-static.net/index.html
   
   To view your deployed application in the Experience Cloud shell:
   
   -> https://experience.adobe.com/?devMode=true#/custom-apps/?localDevUrl=https://1244026-appbuilderforextens-stage.adobeio-static.net/index.html
   
   skipping publish phase...
   Successful deployment 🏄
   ```

Make a note of the Web Action URL. You will need to specify it in the next step within the Commerce configuration.

#### Configure webhooks on the Adobe Commerce instance

In the Admin panel, navigate to **System**> **Webhooks** > **Webhook Subscriptions** to open the Webhooks grid page. Click the **Add New Webhook** button.

Fill in the fields as shown in the screenshot below. You can choose any values for the Hook Name and Batch Name, but ensure **Hook Fields** match the screenshot exactly. In the URLfield, enter the Web Action URL you noted in the previous step.Save the Webhook.

![WebHook Configuration](../../_images/webhooks/tutorial/webhook-config.png)

Below, you'll find the hook fields section. Here, you can specify the payload fields you want to send to App Builder.

![WebHook Configuration](../../_images/webhooks/tutorial/hookfields-config.png)

#### Testing the integration using webhooks

You now have App Builder code set up to validate the product name received from Commerce. Whenever a new product is added in Commerce, the webhook triggers and synchronously invokes the App Builder code to perform the validation.

From the Commerce Admin panel, navigate to **Catalog** > **Add New Product**. Enter the product details such as name, SKU, and price. Set the name as "testproduct", then click **Save**.

Upon saving, the webhook triggers the App Builder code, which validates the product name and returns an error message. The error **Invalid product name >>** will be displayed in the Commerce UI, confirming that the integration is working as expected.

As per the App Builder code logic, if the product name does not contain the word "test", the product should save successfully without triggering an error.
