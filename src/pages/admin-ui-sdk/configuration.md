---
title: Admin configuration and testing
description: Learn how to configure the Admin to enable local testing of your Admin customizations.
keywords:
  - App Builder
  - Extensibility
---

# Admin configuration and testing

The Adobe Commerce Admin UI SDK allows you to use a local server to view and test your Admin customizations before you submit your app to the Adobe Marketplace.

## Configure the Admin

Navigate to **Stores** > Settings > **Configuration** > **Adobe Services** > **Admin UI SDK** and edit the **Local testing** screen. When you enable the local service, all calls are automatically redirected to the local server, instead of connecting to Adobe's App Registry. The values you specify must match the contents of your local `server.js` file.

[Test with a sample app](#test-with-a-sample-app) provides a sample `server.js` file.

![Local server configuration](../_images/sdk-config.png)

1. Select **Yes** from the **Enable Admin UI SDK** menu.

1. Select **Yes** from the **Enable Local Testing** menu.

1. Set the **Local Server Base URL** that points to your localhost, including the port.

1. The **Mock Admin IMS Module** menu determines whether to send mock or real authentication credentials for the Adobe Identity Management Service (IMS). Ensure this value is set to **Yes** for early-stage testing. Set the value to **No** when you are ready to test with real credentials.

1. Set the **Mock IMS Token**. In the sample `server.js` file, this value is set to `dummyToken`.

1. Set the **Mock IMS Org ID**. In the sample `server.js` file, this value is set to `imsOrg`.

1. Save your configuration.

1. Clear the cache.

   ```bash
   bin/magento cache:flush
   ```

## Clean the Admin UI SDK cache

The `admin_ui_sdk` cache type stores Admin customizations.  As you develop these customizations, run the following command to ensure you are seeing the latest changes:

```bash
bin/magento cache:clean admin_ui_sdk
```

## Test with a sample app

### Prerequisites

- An Adobe Commerce instance installed on the local machine.

### Configuration

You can download a sample app from the [Adobe Commerce Samples repository](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/menu/custom-menu) to gain insight on how the Admin SDK injects menus and pages into the Admin.

1. Run the following command to clone and sync the repository:

   ```bash
   git clone git@github.com:adobe/adobe-commerce-samples.git
   ```

1. Change directories to the cloned repository's root directory.

1. Create a `server.js` file in `<repoRootDir>/admin-ui-sdk` to define a local server:

   ```js
   const http = require('https');
   const fs = require('fs');
   const url = require('url');
   
   const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
    };
    
    console.log('Server will listen at :  https://localhost ');
    http.createServer(options, function (req, res) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      });
      
      console.log(url.parse(req.url,true).pathname);
      
      const json_response = [
        {
          "name": "test-extension",
          "title": "Test extension",
          "description": "No",
          "icon": "no",
          "publisher": "aQQ6300000008LEGAY",
          "endpoints": {
            "commerce/backend-ui/1": {
              "view": [{
                "href": "https://localhost:9080/index.html"
              }]
            }
          },
          "xrInfo": {
            "supportEmail": "test@adobe.com",
            "appId": "4a4c7cf8-bd64-4649-b8ed-662cd0d9c918"
          },
          "status": "PUBLISHED" 
        }
      ]
      
      res.end( JSON.stringify(json_response) );
    }).listen(9090);
    ```

1. Generate the `key.pem` certificate in the same directory.

    ```bash
    openssl genpkey -algorithm RSA -out key.pem -pkeyopt rsa_keygen_bits:2048
    ```

1. Generate the `cert.pem` certificate in the same directory.

    ```bash
    openssl req -new -x509 -key key.pem -out cert.pem -days 365
    ```

1. Run the local server:

    ```bash
    node server.js
    ```

1. Make sure you have access to the localhost server configuration by entering the following URL in your browser:

   `https://localhost:9090`

   The browser displays a JSON file similar to the following:

   ```json
    [
      {
        "name": "test-extension",
        "title": "Test extension",
        "description": "No",
        "icon": "no",
        "publisher": "aQQ6300000008LEGAY",
        "endpoints": {
          "commerce/backend-ui/1": {
            "view": [{
              "href": "https://localhost:9080/index.html"
            }]
          }
        },
        "xrInfo": {
          "supportEmail": "test@adobe.com",
          "appId": "4a4c7cf8-bd64-4649-b8ed-662cd0d9c918"
        },
        "status": "PUBLISHED"
      }
    ]
   ```

### Custom menu example

1. Change directories to `<repoRootDir>/admin-ui-sdk/menu/custom-menu`.

1. Run the following command to load dependencies.

  ```bash
  npm install
  ```

1. Select your App Builder project.

  ```bash
  aio console project select
  ```

1. Select the App Builder workspace.

  ```bash
  aio console workspace select
  ```

1. Sync the App Builder project details.

  ```bash
  aio app use
  ```

1. Build your solution.

  ```bash
  aio app build
  ```

1. Run your custom menu extension locally.

   ```bash
   aio app run
   ```

1. Confirm that the **Apps** section appears on the main menu and the **First App on App Builder** option appears in the **Apps** menu in the Admin. Click **First App on App Builder** and confirm that the **Fetched orders from Adobe Commerce** page opens.

   ![Fetched orders from Adobe Commerce page](../_images/first-app.png)

   ![First App on App Builder menu](../_images/fetched-orders.png)

### Test using project workspaces

To use a specific workspace from your project, you'll have to:

1. Deploy the app to the workspace

  ```bash
  aio app deploy
  ```

  After deploy, you will see the URL to your app workspace under: `To view your deployed application:`

1. Update the server `json_response` to point to your workspace by changing the app name and url

  ```json
  {
    "name": "app_name",
    "title": "Test extension",
    "description": "No",
    "icon": "no",
    "publisher": "aQQ6300000008LEGAY",
    "endpoints": {
      "commerce/backend-ui/1": {
        "view": [{
          "href": "https://<app_workspace_url>/index.html"
        }]
      }
    },
    "xrInfo": {
      "supportEmail": "test@adobe.com",
      "appId": "4a4c7cf8-bd64-4649-b8ed-662cd0d9c918"
    },
    "status": "PUBLISHED" 
  }
  ```

  You can add multiple workspaces to the server to test several applications at once.
