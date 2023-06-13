---
title: Prerequisites
description: Determine what software you need to install the Amazon Sales Channel app and how to configure your Amazon Seller Central account.
---

# Prerequisites

This topic describes how to set up your local development environment so that you can install the Adobe Sales Channel reference app.

You must install [nodeJS 16.13+](https://nodejs.org/en/download) as your JavaScript runtime.

## Adobe Commerce

*  (Required) Adobe Commerce 2.4.5+
*  (Optional) [Adobe Commerce Admin UI SDK](https://developer.adobe.com/commerce/extensibility/admin-ui-sdk/) enables you to attach the App Builder application to the Adobe Commerce Admin.

In addition to these software requirements, you must have access to the Commerce environment from an external network. You must also have the ability to add API integrations.

### Create custom attributes

To subscribe to catalog update events from Adobe Commerce, you must create the following custom attributes in **Stores** > **Attributes** > **Product** > **Add New Attribute**:

| Default label | Attribute Code | Scope | Notes |
| --- | --- | --- | --- |
| ASIN | `asin` | Global | |
| Amazon Condition | `amazon_condition` | Global | Condition of the listing item. The [Amazon docs](https://developer-docs.amazon.com/sp-api/docs/listings-items-api-v2021-08-01-reference#conditiontype) list the possible values. |

### Subscribe to catalog update events

Use the following steps to configure Commerce and subscribe to catalog update events. The [_Getting started with Adobe I/O Events for Adobe Commerce_](https://developer.adobe.com/commerce/events/get-started/configure-commerce/) guide provides additional context.

1. Register your Commerce instance as an event provider. See [Configure Adobe Commerce](https://developer.adobe.com/commerce/events/get-started/configure-commerce/) for details.

1. After you have configured your instance is configured and the event provider is created, use the following command to subscribe to the `observer.catalog_product_save_after` event:

   ```bash
   bin/magento events:subscribe observer.catalog_product_save_after --fields=sku --fields=price --fields=stock_data.qty --fields=asin --fields=amazon_condition --fields=name
   ```

## Adobe Developer Console

The [Adobe Developer Console](https://developer.adobe.com/developer-console/docs/guides/getting-started/) allows you to create projects and begin your development journey. Create a project and make sure that you have access to the following:

*  [Adobe IO Runtime](https://developer.adobe.com/runtime/docs/)
*  [Adobe IO Events](https://developer.adobe.com/runtime/docs/)

### Adobe I/O CLI

The [Adobe I/O CLI](https://developer.adobe.com/runtime/docs/guides/tools/cli_install) allows you to manage your projects and workspaces. Install this essential tool by following these steps:

1. Run `npm install -g @adobe/aio-cli` to install Adobe I/O Extensible CLI.

1. Run `aio login` to authenticate to the developer console.

1. Run `aio console org select` to select your organization.

1. Run `aio console project select` to select your project.

1. Run `aio console workspace select` and select "Stage" as your workspace.

For more information, refer to [Adobe I/O CLI documentation](https://github.com/adobe/aio-cli/blob/master/README.md).

### Adobe Developer App Builder

[Adobe Developer App Builder](https://developer.adobe.com/app-builder/docs/overview/) is a complete framework that enables enterprise developers to build and deploy custom web applications that extend Adobe Commerce and other Experience Cloud solutions and run on Adobe infrastructure.

The following package needs to be installed locally to properly register events:

*  [aio-cli-plugin-extension](https://github.com/adobe/aio-cli-plugin-extension)

The following packages need to be installed locally to properly run your `aio` with `--local` flag enabled:

*  [Java 11 or higher](https://www.oracle.com/es/java/technologies/javase/jdk11-archive-downloads.html)
*  [Maven](https://maven.apache.org/)
*  [Docker](https://docs.docker.com/desktop/)

## Amazon SP API

Amazon Sales Channel uses [Amazon SP API](https://github.com/amz-tools/amazon-sp-api) to communicate with Amazon Seller Central.

To properly configure Amazon SP API, you must have:

*  Admin access to [Amazon Seller Central](https://sellercentral.amazon.com/)
*  Permissions to add Developer Applications

You must perform configuration tasks for Amazon Web Services and Amazon Seller Central.

### Amazon Web Services

Create an IAM policy per [Amazon SPI Guide](https://developer-docs.amazon.com/sp-api/docs/creating-and-configuring-iam-policies-and-entities).

### Amazon Seller Central

The app type of Amazon Sales Channel is **Private Seller**. Specify this integration type when you configure your instance. See [Determine app type](https://developer-docs.amazon.com/sp-api/docs/determine-app-type) for more information.

1. [Register yourself as a private developer](https://developer-docs.amazon.com/sp-api/docs/registering-as-a-developer#to-register-as-a-private-developer-for-private-seller-applications).

1. [Registering your Application](https://developer-docs.amazon.com/sp-api/docs/registering-your-application).

1. [Self authorize](https://developer-docs.amazon.com/sp-api/docs/self-authorization) your application to generate access keys.

When you create an account from the App Builder application UI, you will need the following set of Amazon credentials:

| Field | Where to get |
| --- | --- |
| Client ID             | In [Developer Central](https://sellercentral.amazon.com/marketplacedeveloper/applications) |
| Client secret         | In [Developer Central](https://sellercentral.amazon.com/marketplacedeveloper/applications) |
| Client refresh token  | In [Developer Central](https://sellercentral.amazon.com/marketplacedeveloper/applications) > **Authorize** |
| AWS access key        | In [AWS](https://aws.amazon.com/) > **IAM** > **User with access to IAM role**  |
| AWS secret access key | In [AWS](https://aws.amazon.com/) > **IAM** > **User with access to IAM role** |
| AWS Role ARN          | Create [AWS](https://aws.amazon.com/) IAM role |
| Target marketplace    | [ASC Marketplace IDs](https://developer-docs.amazon.com/sp-api/docs/marketplace-ids) |
| Unique Seller ID      | [Amazon Seller Central](https://sellercentral.amazon.com) > **Account Info** > **Merchant Token** |
