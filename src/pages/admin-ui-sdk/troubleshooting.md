---
title: Troubleshooting
description: Learn how to resolve common issues related to the Admin UI SDK.
keywords:
  - App Builder
  - Extensibility
---

# Troubleshooting

In this comprehensive troubleshooting guide, we'll help you navigate through common challenges and provide solutions to get you back on track. We'll walk you through the troubleshooting process, empowering you to resolve problems efficiently and effectively.

## Eligible extensions screens is empty

*  **The `Magento_AdminAdobeIms` module has not been enabled.** Run the following command from the Adobe Commerce command line to check the status of this module.

   `bin/magento module:status Magento_AdminAdobeIms`

   If the response indicates the module has not been enabled, run the following command:

   `bin/magento admin:adobe-ims:enable`

   [Configure the Commerce Admin Integration with Adobe ID](https://experienceleague.adobe.com/docs/commerce-admin/start/admin/ims/adobe-ims-config.html#) provides additional information about setting up Adobe Identity Management Service (IMS) on Adobe Commerce.

* **The application is deployed in a different organization.** Run the following command from the Adobe Commerce command line to check the organization ID used to enable the `Magento_AdminAdobeIms` module.

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

   Alternatively, navigate to **System** > Admin UI SDK > **Admin UI SDK Logs** to check the saved logs if [**Database logging configuration**](./configuration.md#database-logging-configuration) is enabled.

* Local testing mode is enabled. Make sure you disable local testing when `Magento_AdminAdobeIms` is enabled.

## Extension point registration is missing in the Commerce Admin

* Make sure the extensions is eligible to the Commerce Admin and is selected in the [**Configure extensions**](./eligible-extensions-config.md) screen.

* Check the `system.log` file to ensure the issue related to the Admin UI SDK is detected. Run the following command to check the file:

   ```bash
   more var/log/system.log | grep -i "Admin UI SDK"
   ```

   Alternatively, navigate to **System** > Admin UI SDK > **Admin UI SDK Logs** to check the saved logs if [**Database logging configuration**](./configuration.md#database-logging-configuration) is enabled.

* Make sure the `/admin-ui-sdk/registration` runtime action is reachable.

* Make sure registrations are correctly refreshed. Click on the [**Refresh registrations**](./configuration.md#general-configuration) button in the configuration or clear the backend cache.

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

## Issues upgrading to major Admin UI SDK version

You may encounter issues upgrading the major Admin UI SDK version and see an error such as this when trying to update your `composer.json`:

``` bash
Problem 1
    - adobe-commerce/extensions-metapackage <> requires magento/commerce-backend-sdk ^<required version> -> found magento/commerce-backend-sdk[...] but it conflicts with your root composer.json require (<target major version>).
```

This issue happens when the Adobe Commerce version does not install the latest major release of Admin UI SDK by default.

Add the following line to the `composer.json` file in the `require` section to solve this issue:

`"magento/commerce-backend-sdk": "<target major version> as <required version>"`

For example, a 2.4.7 Adobe Commerce instance that installs version 1.4 by default, upgrading Admin UI SDK to 2.3.0 will fail with the following error:

``` bash
Problem 1
    - adobe-commerce/extensions-metapackage <> requires magento/commerce-backend-sdk ^1.4 -> found magento/commerce-backend-sdk[...] but it conflicts with your root composer.json require (2.x).
```

To solve the issue, add the following line to the `composer.json`:

`"magento/commerce-backend-sdk": "2.0.0 as 1.4"`
