---
title: Connect to Adobe Commerce
description: Learn about the checkout starter kit and how to integrate it with Adobe Commerce.
keywords:
  - App Builder
  - App Management
  - Extensibility
---

# Connect to Adobe Commerce

This guide explains how a checkout starter kit app connects to Adobe Commerce.

## Association

Each app connects to a specific Commerce instance through App Management's association step: an app manager associates the deployed app with their Commerce instance from **Apps** > **App Management** in the Commerce Admin. See [manage your app](https://experienceleague.adobe.com/en/docs/commerce/app-management/manage-app/manage-app) for the association, installation, and other lifecycle steps.

Once associated, `getCommerceClient` (from [`@adobe/aio-commerce-lib-app`](https://github.com/adobe/aio-commerce-lib-app)) resolves the Commerce instance's base URL and environment (PaaS or SaaS) from the stored association data, so there's no `COMMERCE_BASE_URL` to configure manually for actions that go through association:

```javascript
import { getCommerceClient } from "@adobe/aio-commerce-lib-app";
import { resolveImsAuthParams } from "@adobe/aio-commerce-sdk/auth";

export async function main(params) {
  const commerceClient = await getCommerceClient(resolveImsAuthParams(params));
  const products = await commerceClient.get("products").json();
}
```

`getCommerceClient` throws an `AppNotAssociatedError` if the app isn't associated with a Commerce instance yet — re-associating the app resolves this.

## Authentication

`getCommerceClient` only accepts [IMS](#adobe-identity-management-service-ims) authentication. If you're calling Commerce directly instead of going through App Management association, use `resolveCommerceHttpClientParams` and `AdobeCommerceHttpClient` from [`@adobe/aio-commerce-sdk/api`](https://github.com/adobe/aio-commerce-sdk) — these support both IMS and [Commerce Integration](#create-a-commerce-integration) (OAuth1) authentication, picked automatically based on which credentials are present.

### Adobe Identity Management Service (IMS)

[SaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) IMS authentication is used and Commerce Integration authentication is not available.

Use `resolveImsAuthParams(params)` to resolve the app's own IMS credentials, populated automatically at association time. Use `forwardImsAuthProvider(params)` instead to forward the caller's own IMS token — for example, when an Admin UI action needs to act as the logged-in admin rather than as the app itself.

### Create a Commerce integration

[PaaS Only](https://experienceleague.adobe.com/en/docs/commerce/user-guides/product-solutions) Commerce Integration (OAuth1) is a supported alternative to IMS for calling Commerce directly, outside of App Management association.

1. Create a new Adobe Commerce Integration by following the [systems integration](https://experienceleague.adobe.com/en/docs/commerce-admin/systems/integrations) guide.

1. Make sure your API integration has the necessary permissions to access the Commerce REST API.

   To confirm that you have access, in the Commerce Admin, navigate to **System** > **Extensions** > **Integrations**. Under the Basic Settings menu, click **API** to view the Available APIs. Then select **All** in the **Resource Access** field.

1. Provide the integration details, along with the Commerce base URL, as action inputs:

   ```env
   AIO_COMMERCE_API_BASE_URL=<your commerce base url>
   AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_KEY=<key>
   AIO_COMMERCE_AUTH_INTEGRATION_CONSUMER_SECRET=<secret>
   AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN=<access token>
   AIO_COMMERCE_AUTH_INTEGRATION_ACCESS_TOKEN_SECRET=<access token secret>
   ```

1. Build the client:

   ```javascript
   import { AdobeCommerceHttpClient, resolveCommerceHttpClientParams } from "@adobe/aio-commerce-sdk/api";

   export async function main(params) {
     const commerceClient = new AdobeCommerceHttpClient(resolveCommerceHttpClientParams(params));
     const products = await commerceClient.get("products").json();
   }
   ```

## Debugging requests

You can debug your application and access customized logs using the `LOG_LEVEL` environment variable. If this variable is set, logs from different phases of the commerce client display with detailed information.
