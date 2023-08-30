---
title: Prerequisites
description: Determine what software you need to install the Amazon Sales Channel app and how to configure your Amazon Seller Central account.
---

# Prerequisites

This topic describes how to set up your local development environment so that you can install the Adobe Sales Channel reference app on an Adobe Commerce 2.4.5+ instance.

To install the reference app, you must:

*  Have an Adobe Developer account with System Administrator or Developer Role permissions. [Getting started with Adobe Developer Console](https://developer.adobe.com/developer-console/docs/guides/getting-started/) describes how to enroll in the Adobe developer program.

*  Be familiar with [Adobe I/O Runtime](https://developer.adobe.com/runtime/docs/guides/getting-started/) and [Adobe IO Events](https://developer.adobe.com/runtime/docs/).

*  Install the [`aio CLI`](https://developer.adobe.com/runtime/docs/guides/getting-started/setup/)

*  Have access to an Adobe Commerce 2.4.5+ on cloud infrastructure or to an on-premises instance.

*  (Recommended) Install [Adobe Commerce Admin UI SDK](../admin-ui-sdk/index.md), which enables you to attach the App Builder application to the Adobe Commerce Admin.

*  Install [nodeJS 16.13+](https://nodejs.org/en/download) as your JavaScript runtime.

In addition to these software requirements, you must have access to the Commerce environment from an external network. You must also have the ability to add API integrations.

## Adobe Commerce configuration and setup

Before you begin the process of installing the Adobe Sales Channel reference app, you must configure I/O Events for Adobe Commerce and add custom attributes to the Admin.

### Configure I/O Events for Adobe Commerce

Follow the instructions in [Configure Adobe Commerce](../events/configure-commerce.md/) to enable communication with Adobe I/O and create an event provider. Specifically, follow these procedures:

* [Configure the Adobe I/O connection](../events/configure-commerce.md#configure-the-adobe-io-connection)

* [Create an event provider and complete the Commerce configuration](../events/configure-commerce.md#create-an-event-provider-and-complete-the-commerce-configuration)

Do not perform the **Subscribe and register events** procedure. The Amazon Sales Channel app [installation](installation.md) instructions describe the process for this app.

### Create custom attributes

To subscribe to catalog update events from Adobe Commerce, you must create the following custom attributes in **Stores** > **Attributes** > **Product** > **Add New Attribute**:

| Default label | Attribute Code | Scope | Notes |
| --- | --- | --- | --- |
| ASIN | `asin` | Global | |
| Amazon Condition | `amazon_condition` | Global | Condition of the listing item. The [Amazon docs](https://developer-docs.amazon.com/sp-api/docs/listings-items-api-v2021-08-01-reference#conditiontype) list the possible values. |

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
