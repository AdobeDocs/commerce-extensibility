---
title: Extension Compatibility
description: Learn about how to develop and configure App Builder extensions to work seamlessly with both SaaS and PaaS versions of Adobe Commerce.
keywords:
  - App Builder
  - Extensibility
---

# App Builder Extension Compatibility

When developing and configuring App Builder extensions, it is important to ensure that they work seamlessly with both SaaS and PaaS versions of Adobe Commerce. The following guide describes how to ensure that extensions are fully compatible, deployable, and functional across both environments.

A key difference between SaaS and PaaS is how modules are installed on a Commerce instance. PaaS modules require installation, while SaaS modules are pre-installed.

For a better understanding of the differences between SaaS and PaaS, refer to the [Feature Comparison](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/feature-comparison).

## IMS authentication

You should use IMS authentication to connect to Commerce.

- &#8203;<Edition name="paas" /> IMS is necessary to utilize the Admin UI SDK. Adobe encourages adopting IMS authentication to ease migration to SaaS.
- &#8203;<Edition name="saas" /> IMS authentication is used and Commerce integration authentication is not available.

For more information on enabling IMS authentication for your actions, see [IMS Authentication](../starter-kit/checkout/connect.md#adobe-identity-management-service-ims).

## API integration

Verify that your Commerce APIs are compatible with both environments by checking the following specifications.

**GraphQL API**

- &#8203;<Edition name="paas" /> For PaaS, there are separate core and catalog services GraphQL endpoints.
- &#8203;<Edition name="saas" /> For SaaS, a single GraphQL URL is used, see the [GraphQL API specification](https://developer.adobe.com/commerce/services/reference/cloud/graphql/).

**REST API**

- &#8203;<Edition name="paas" /> [PaaS REST API specification](https://developer.adobe.com/commerce/webapi/rest/quick-reference/).
- &#8203;<Edition name="saas" /> [SaaS REST API specification](https://developer.adobe.com/commerce/services/reference/cloud/rest/).

**Adapt REST endpoint for older starter kit versions**

For older versions of the starter kit, check if your code is adapted as follows:

- To support both PaaS and SaaS, modify the `COMMERCE_BASE_URL` environment variable according to the [Commerce integration guide](https://developer.adobe.com/commerce/extensibility/starter-kit/checkout/connect/).
- Ensure that your [adobe-commerce](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/lib/adobe-commerce.js) HTTP client removes the `rest/all` prefix for compatibility with both deployment flavors. For example:

    ```javascript
    - commerceGot(`rest/all/V1/oope_payment_method/`, {
    + commerceGot(`V1/oope_payment_method/`, {
    ```

- Ensure that store view codes are no longer included URLs. Instead, you need to specify the store views in the `Store` header of the request.

<InlineAlert variant="info" slots="text" />

Refer to [URL structure](https://developer.adobe.com/commerce/webapi/rest/#url-structure-1) for more information.

## Commerce webhook

- &#8203;<Edition name="paas" /> Webhooks are created with [XML files](../webhooks/create-webhooks.md).
- &#8203;<Edition name="saas" /> SaaS supports a predefined list of webhooks that you can configure in the [Admin interface](../webhooks/create-webhooks.md#define-webhook-properties) or create through [REST endpoints](../webhooks/api.md).

## Commerce eventing

- &#8203;<Edition name="paas" /> You can register events through [XML files](../events/module-development.md#register-events) or [REST endpoints](../events/api.md). However, for plugin-type events, you may need to redeploy to generate plugins.
- &#8203;<Edition name="saas" /> SaaS supports a predefined list of events. You can manage events through the [Admin interface](../events/create-events.md) or [REST endpoints](../events/api.md).

## Admin UI SDK

- &#8203;<Edition name="paas" /> Use the Admin UI SDK version `3.0` or higher to enable IMS authentication tokens from [the shared context](../admin-ui-sdk/extension-points/index.md#shared-contexts). Refer to [troubleshooting](../admin-ui-sdk/troubleshooting.md#issues-upgrading-to-major-admin-ui-sdk-version) if you encounter version restrictions:

    ```json
    "magento/commerce-backend-sdk": "3.0.0 as 2.0.0"
    ```

- &#8203;<Edition name="saas" /> The Admin UI SDK and IMS modules are already configured. The [Admin interface](../admin-ui-sdk/configuration.md) works the same as it does in PaaS.
- To enable Adobe authentication for actions called by the SPA, you can obtain IMS tokens that work in both PaaS and SaaS by using the following:

    ```javascript
    if (props.ims?.token) {
        // When running inside Experience Cloud Shell, IMS token and orgId can be accessed via props.ims.
        setImsToken(props.ims.token);
        setImsOrgId(props.ims.org);
    } else {
        // Commerce PaaS & SaaS retrieves IMS token via sharedContext from Admin UI SDK v3.0+
        // See https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/extension-points/#shared-contexts
        const guestConnection = await attach({ id: extensionId });
        const context = guestConnection?.sharedContext;
        setImsToken(context?.get('imsToken'));
        setImsOrgId(context?.get('imsOrgId'));
    }
    ```

    For more information, see the [full example](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/commerce-backend-ui-1/web-src/src/components/MainPage.js).

## Out-of-process extensibility modules

- &#8203;<Edition name="paas" /> Requires composer installation.
- &#8203;<Edition name="saas" /> Modules are pre-installed.
- APIs function the same way in both environments:
  - [custom attributes](https://developer.adobe.com/commerce/services/cloud/guides/custom-attributes/)
  - [payment](../starter-kit/checkout/payment-reference.md)
  - [shipping](../starter-kit/checkout/shipping-reference.md)
  - [tax](../starter-kit/checkout/tax-reference.md)

## Storefront integration and testing

- &#8203;<Edition name="paas" /> EDS Storefronts require additional configuration, such as the Catalog and [Storefront Compatibility Package](https://experienceleague.adobe.com/developer/commerce/storefront/setup/configuration/storefront-compatibility/install/). PaaS also provides the [Luma Storefront](https://experienceleague.adobe.com/docs/commerce/frontend/guide/storefront/luma.html), which is not available in SaaS.
- &#8203;<Edition name="saas" /> You can use the [EDS Storefront to connect to your Commerce instance](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/storefront) without installing any modules. SaaS environments do not have access to the Luma Storefront.
