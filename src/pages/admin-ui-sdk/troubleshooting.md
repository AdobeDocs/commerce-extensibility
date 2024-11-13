---
title: Troubleshooting
description: Learn how to resolve common issues related to the Admin UI SDK.
keywords:
  - App Builder
  - Extensibility
---

# Troubleshooting

In this comprehensive troubleshooting guide, we'll help you navigate through common challenges and provide solutions to get you back on track. We'll walk you through the troubleshooting process, empowering you to resolve problems efficiently and effectively.

## Configured extension points are not displayed in Commerce Admin

*  **The `Magento_AdminAdobeIms` module has not been enabled.** Run the following command from the Adobe Commerce command line to check the status of this module.

   `bin/magento module:status Magento_AdminAdobeIms`

   If the response indicates the module has not been enabled, run the following command:

   `bin/magento admin:adobe-ims:enable`

   [Configure the Commerce Admin Integration with Adobe ID](https://experienceleague.adobe.com/docs/commerce-admin/start/admin/ims/adobe-ims-config.html#) provides additional information about setting up Adobe Identity Management Service (IMS) on Adobe Commerce.

* **The application is published in a different organization.** Run the following command from the Adobe Commerce command line to check the organization ID used to enable the `Magento_AdminAdobeIms` module.

   `bin/magento admin:adobe-ims:info`

   The response will contain the needed info.

   ```terminal
   Client ID:
   Organization ID:
   Client Secret configured
   ```

*  **The app is not correctly published in App Builder.** Go to the App project in the developer console and check that the Production workspace has a status of Published. If this is not the case, [request an approval to publish](./publish.md) and test again once the application in Approved.

*  **The latest changes are not correctly deployed and published.** Make sure you deploy the latest changes using  the `aio app deploy` command in the correct `org/project/workspace`.

* Check the `system.log` file to ensure the issue related to the Admin UI SDK is detected. Run the following command to check the file:

   ```bash
   more var/log/system.log | grep -i "Admin UI SDK"
   ```

## App menu is missing in the Commerce Admin

It's common to have the App menu missing from the Commerce Admin menu when:

*  **The registration of the menu is not correct.** Make sure that you defined the correct `menu` method with a `getItems` function that returns an array of the menus to register.

   *  To make sure your registration is correctly deployed, navigate in your browser to `<appURL>/index.html`. You can find your application URL in your project workspace in the Adobe developer console.

   *  Check the elements in your browser developer tools and look for the script `src` in the body. It usually has the format `index.<random>.js`.

      Replace in the URL the `index.html` with this javascript to access its content. Search for `getItems` for example and make sure the registration defined in your app is the same one you see deployed.

## App page is not displayed when accessing the menu

An app page is not displayed when the `extensionId` specified doesn't match with the application or when the registration is missing mandatory methods.

*  Check the app registration and make sure it contains the following:

   *  `extension:getId` method that returns a string with the `extensionId`.
   *  `page:getTitle` method that returns a string with the page title.

*  Check the `extensionId` is the same used in the registration to identify correctly the application with a unique name.

## Timeout error

Timeout errors can occur when a process or operation takes longer than the specified time limit to complete. The retrieval of extensions from App Registry has a timeout set to 10000ms.

1. Check Network Connectivity:

   *  Ensure that your network connection is stable and not experiencing any interruptions.
   *  Verify that the server or service you are accessing is reachable from your network.

2. Refresh the page to check that the issue was not temporary.

3. Escalate to Support or Engineering:

   *  If you are unable to resolve the timeout issue, escalate the problem to the appropriate support or engineering team.
   *  Provide detailed information about the troubleshooting steps you have taken so far to expedite the resolution process.

## Failed requests for mass actions that are not sent to an iFrame

Commerce logs failed mass action requests that are not sent to an iFrame. An App Builder application can access details of the failed request using the `GET V1/adminuisdk/massaction/<requestId>` REST API. The [authentication token](https://developer.adobe.com/commerce/webapi/get-started/authentication/gs-authentication-token/) must have access to the Admin UI SDK. The call returns an error message if the request ID was not found or if it associated with a successful action. [Connection interruption failures](./extension-points/index.md#connection-interruption-failures) provides additional information.

## Issues accesing the latest Admin UI SDK version 

You may encounter issues accesing the latest Admin UI SDK version (version 2.0), and we are currently working to ensure it is installed by default on the next Adobe Commerce release. However, if you're currently facing any issues, you may add the following line to the `composer.json` file in the `require` section:

   ```bash
   "magento/commerce-backend-sdk": "2.0.0 as 1.4"
   ```