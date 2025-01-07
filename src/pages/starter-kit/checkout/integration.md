---
title: Integrating the checkout starter kit with Adobe Commerce
description: Learn about the checkout starter kit and how to integrate it with Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
---

## Adobe Commerce HTTP Client

`adobe-commerce.js` provides a set of methods to interact with the Adobe Commerce instance. The client is built using the Adobe Commerce HTTP Client, which is a wrapper around the Adobe Commerce REST API.

To utilize the Adobe Commerce HTTP Client, update `COMMERCE_BASE_URL=<commerce_instance_url>` in the `.env` file, and complete the authentication setup.

### Authentication

Depending on your Adobe Commerce setup, there are 2 options to authenticate and communicate with the App Builder:

1. [Configure Adobe Identity Management Service (IMS)](#option-1-configure-adobe-identity-management-service-ims)
2. [Configure Commerce Integration](#option-2-configure-commerce-integration)

It's important to know that if commerce integration is detected, it will have precedence over IMS Auth. However, if none of them is detected or configured, than client instantiation will directly fail.

#### Option 1. Configure Adobe Identity Management Service (IMS)

To proceed with this authentication, some previous setup needs to be done.

1. Configure IMS for Commerce following the steps in [Configure the Commerce Admin Integration with Adobe ID](https://experienceleague.adobe.com/en/docs/commerce-admin/start/admin/ims/adobe-ims-config).

2. Create new IMS credentials through the [Adobe Developer Console](https://developer.adobe.com/console). To do so, add a new service of type `API` in the workspace. From the list of API's, select `I/O Management API` and follow the steps shown by the wizard. On completion, all credentials will be generated.

3. Add Technical Account to Commerce Admin

   1. Ensure that the technical account associated with the server-to-server credentials is added to the Commerce Admin with the appropriate permissions. If not, you can add it using [Admin User Creation Guide](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/user-accounts/permissions-users-all#create-a-user).
   2. When associating the user, make sure to find your actual `Technical Account email` as a part of generated IMS credentials with following pattern: <technical-account>@techacct.adobe.com and use that value in the `Email` field shown in the following image:
      ![img.png](userCreation.png)

   3. When selecting the user role from the `User Role`tab shown in the previous image, make sure to select the `Administrators` to have all the necessary permissions.

Finally, copy the generated credentials (client id, client secret, technical account id, technical account email) to the `.env` file in the root of the project as following:

```text
OAUTH_CLIENT_ID=<client id>
OAUTH_CLIENT_SECRETS=<client secret>
OAUTH_TECHNICAL_ACCOUNT_ID=<technical account id>
OAUTH_TECHNICAL_ACCOUNT_EMAIL=<technical account email>
OAUTH_SCOPES=<scope>
OAUTH_IMS_ORG_ID=<img org>
```

#### Option 2. Configure Commerce Integration

This option also enables us to communicate with the platform. It requires some setup as following:

1. Create a new Adobe Commerce Integration by following [this](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/integrations) guide.
2. Copy the integration details (consumer key, consumer secret, access token, and access token secret) to the `.env` file in the root of the project.
   ```text
   COMMERCE_CONSUMER_KEY=<key>
   COMMERCE_CONSUMER_SECRET=<secret>
   COMMERCE_ACCESS_TOKEN=<access token>
   COMMERCE_ACCESS_TOKEN_SECRET=<access token secret>
   ```

### Debugging of requests

From now, you can also debug and see some customized logs using the `LOG_LEVEL` environment variable. If this variable is set, logs from different phases of the commerce client instantiation will be shown with detailed information.