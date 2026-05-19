---
title: Install the totals collector module
description: Learn about the Adobe Commerce out-of-process totals collector for the checkout starter kit and how you can get started.
keywords:
  - App Builder
  - Extensibility
---

# Install the totals collector module

To begin using the totals collector module with the checkout starter kit, ensure that you have completed the [getting started](getting-started.md) and [configuration](configure.md) steps.

For more ideas on how you can use the totals collector module, refer to [totals collector use cases](totals-collector-use-cases.md).

## Prerequisites

* Adobe Commerce on cloud infrastructure or on-premises: 2.4.5+
* PHP 8.1+
* The [magento/module-adobe-commerce-webhooks](https://developer.adobe.com/commerce/extensibility/webhooks/) module (required by the totals collector).

## Installation

<InlineAlert variant="info" slots="text"/>

Adobe Commerce as a Cloud Service is preconfigured with all the required modules for the checkout starter kit. Cloud Service users can proceed by [configuring an App Builder project](./getting-started.md#initial-configuration) or [configuring Commerce](./configure.md).

<Edition slots="text" backgroundcolor="blue" />

PaaS Only

Before installing Commerce modules, ensure that you have the required credentials in `auth.json` with [access to the Adobe Commerce repository](https://experienceleague.adobe.com/en/docs/commerce-operations/installation-guide/prerequisites/authentication-keys).

To enable out-of-process discount totals collection (from an external service) in Adobe Commerce, install the `magento/module-out-of-process-totals-collector` module using the following command:

```bash
composer require magento/module-out-of-process-totals-collector --with-dependencies
```

## Configuration

<InlineAlert variant="info" slots="text"/>

This step requires the [Adobe Commerce HTTP Client](./connect.md#connect-to-adobe-commerce) to authenticate the Commerce instance.

After installation, register a webhook so that Adobe Commerce can call your App Builder application when quote totals are collected. The webhook runs after the core discount totals collector; your endpoint returns a JSON Patch response that is applied to the quote totals and items.

<InlineAlert variant="info" slots="text"/>

The totals collector currently supports discount modifications only. Other total types are not supported.

For webhook registration details and payload/response format, see [totals collector use cases](totals-collector-use-cases.md#totals-collector-webhook).
