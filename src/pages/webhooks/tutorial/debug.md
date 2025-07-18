---
title: Debugging your project
description: Learn best practices for debugging your Adobe Commerce App Builder project, including webhooks and actions.
keywords:
  - Extensibility
---

# Debugging your project best practices

This section provides best practices for debugging your Adobe Commerce App Builder project, focusing on webhooks and actions. It covers debugging from the Commerce instance, local development environment, and using ngrok for real-time testing.

## Debug from the Commerce instance

To view logs from the Admin, log into your Commerce instance and navigate to **System** > **Webhook Logs**.
The logs will appear as shown in the screenshot below.

![WebHook Logs](../../_images/webhooks/tutorial/webhook-logs-adminui-accs.png)

## Debug from App Builder Code locally

Follow these steps to effectively debug your Adobe I/O app on your local environment.
Note that debugging web actions via ACCS or a deployed instance is not supported; they can only be simulated locally.

### Prerequisites

Ensure the following before you start debugging:

**require-adobe-auth** is set to **false** in your app-config.yaml file under webhook action.

### Step 1: Configuring Debugger

Create or edit `launch.json` in the root project folder, navigate to the `.vscode` folder. If it doesn't exist, create `.vscode` folder. Inside this folder, create or edit the `launch.json` file.
To configure it quickly, copy and paste the recommended content from the App Builder documentation:

[Debugging with VS Code – Adobe App Builder Guide](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/development#debugging-with-vs-code)

This configuration sets up the VS Code debugger to work seamlessly with Adobe I/O App Builder projects.

### Step 2: Enable source maps

In the root folder of your project , create a file called `webpack-config.js` with the following content:

```js
module.exports = {
    devtool: 'inline-source-map'
  }
```

### Step 3: Rebuild the project

After configuring the debugger, use the following command to rebuild your project to apply the changes.

```bash
aio app build
```

### Step 4: Start Debugging

Go to the **Run and Debug** tab in VS Code (🪲 icon on the left sidebar).
From the dropdown at the top, select the launch profile App Builder:
Debug Actions (or a similar option), then click the Run button (▶️) or press F5 to start debugging.

![Debug Action in VS](../../_images/webhooks/tutorial/debug-actions-option.png)

Starting the debugger using the App Builder: Debug Action profile should automatically run the app using the `aio app dev` command. You will see output in the terminal similar to the following:

```terminal
Debugger attached.
Building the app...
To view your local application:
  -> https://localhost:9080
To view your deployed application in the Experience Cloud shell:
  -> https://experience.adobe.com/?devMode=true#/custom-apps/?localDevUrl=https://localhost:9080
 
Your actions:
web actions:
  -> https://localhost:9080/api/v1/web/commappwebhook/webhook
  
non-web actions:
 
press CTRL+C to terminate the dev environment
2025-05-22T06:41:55.969Z [watcher] info: watching action files at /Users/prutech/Documents/projects/devadvocate/appbuilderforextensibility/actions...
```

### Step 5: Web action with a sample payload

Now that your local debugger is running, you can test your web action by sending a request to the local endpoint.
Use tools like Postman or any other API client to send a POST request to the above URL with the sample JSON payload.
https://localhost:9080/api/v1/web/commappwebhook/webhook

```json
{
  "product": {
    "_edit_mode": true,
    "store_id": 0,
    "entity_id": "1",
    "attribute_set_id": "16",
    "type_id": "simple",
    "sku": "Pr-1",
    "name": "abc1test",
    "tax_class_id": "0",
    "description": "<p>Product 1 description</p>",
    "price": "10.00"
  }
}
```

The request should trigger the web action and hit the breakpoint you set earlier in your code, allowing you to inspect the incoming payload and debug the action logic.

**Test using curl**

```bash
your-project-directory  % sudo curl --insecure --request POST \
  --url https://localhost:9080/api/v1/web/appbuilderforextensibility/webhook \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/10.1.1-adobe' \
  --data '{
          "product": {
              "_edit_mode": true,
              "store_id": 0,
              "entity_id": "1",
              "attribute_set_id": "16",
              "type_id": "simple",
              "sku": "Pr-1",
              "name": "abc1test",
              "tax_class_id": "0",
              "description": "<p>Product 1 description</p>",
              "price": "10.00"
          }
}
'
{"op":"exception","message":"Invalid product name >> abc1test"}%
```

## Debug using ngrok

You can test real webhook triggers from your Adobe Commerce instance and debug them locally using ngrok. This setup allows requests from Adobe Commerce to be forwarded securely to your local App Builder environment.

Why Use ngrok?

* Test and debug live webhooks from Adobe Commerce.
* Inspect real payloads in your local aio app runtime.
* Troubleshoot and validate your code before deploying to the cloud.

To set and use ngrok:

1. Modify your action code to log incoming payloads. Open the file `validateProductName.js` and ensure it includes the following line to print the incoming webhook payload.`logger.info('Calling main with params: ' + JSON.stringify(params, null, 2));`.

   The updated `validateProductName.js` below:
  
   ```js
   const { Core, Events } = require('@adobe/aio-sdk') // Adobe I/O SDK modules
   const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils') // Utility functions

   // Main function executed by Adobe I/O Runtime
   async function main(params) {
     // Create a logger instance
     const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
     //Call to print payload
     logger.info('Calling main with params: ' + JSON.stringify(params, null, 2));

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

1. Then build your AppBuilder project. From your project root, run:

   ```bash
   aio app build
   ```

1. Start your App Builder app locally. From your project root, run:

   ```bash
   aio app dev
   ```

1. Install ngrok. Follow the instructions on the official ngrok documentation to install it for your operating system.

1. Start ngrok to expose your local endpoint. In a new terminal window, Run the command `ngrok http https://localhost:9080`.This will start a secure tunnel to your local app running on https://localhost:9080. You will see output similar to the following:

  ```terminal
   Session Status            online
   Account                   Rekha (Plan: Free)
   Version                   3.23.
   Region                    India (in)
   Latency                   79ms
   Web Interface             http://127.0.0.1:4040
   Forwarding                https://6d3c-130-248-127-xx.ngrok-free.app -> https://localhost:9080

  Connections                ttl     opn     rt1     rt5     p50     p90
                             25      0       0.00    0.00    11.45   64.75
  ```

  The forwarding URL in this example is `https://6d3c-130-248-127-xx.ngrok-free.app`. This is your public URL that exposes your local AppBuilder app to the internet.

1. Go to your Adobe Commerce admin panel and update the webhook configuration with this ngrok forwarding URL. The final URL should look like this:

  `https://6d3c-130-248-127-xx.ngrok-free.app/api/v1/web/appbuilderforextensibility/webhook`

1. When the webhook is triggered from the live Adobe Commerce instance(in this case when a product is newly added or modified from Admin), the request will hit your local code, allowing you to inspect the payload in the terminal where `aio app dev` was issued.
