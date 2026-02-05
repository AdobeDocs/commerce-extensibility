---
title: App Builder Kit for Developers
description: A guide to get you started with App Builder development and publishing.
keywords:
  - App Builder
  - Extensibility
---

# App Builder Kit for Developers

Adobe believes that strong partnerships result in powerful results. Whether you are a **Solution Implementer (SI)**, or an **Independent Software Vendor (ISV)** who wants to build App Builder apps, Adobe is committed to supporting you at every step—from onboarding and sandbox access to app development and distribution.

Through the **Technology Partner Program (TPP)**, you receive access to the tools and resources you need for application development. Adobe is committed to helping you navigate challenges and complete your apps successfully.

Together with Adobe, you can create solutions that deliver real value to you, your customers, and the broader Adobe ecosystem.

In this page, you will find:

- A starter kit to [help you set up your account and sandboxes](#how-to-set-up-your-account).

- Guidance to [building your app](#how-to-build-an-app).

- Instructions for [submission and distribution](#distribution).

## Requirements to access App Builder

Access to App Builder requires meeting two conditions: having the required membership level and account type. These will provide access to our sandboxes, allowing you to build and publish an application.

- **Membership requirements** - To build and publish an application, you must have a [Silver tier membership or higher](https://partners.adobe.com/technologyprogram/experiencecloud/benefits.html#benefits), which gives you sandbox access and the possibility to publish on the Adobe Exchange Marketplace.

- **Account requirements** - A [TPP account](https://partners.adobe.com/technologyprogram/experiencecloud/registration.html) is required to access all sandboxes (App Builder, the Adobe Commerce as a Cloud Service SaaS sandbox, and the PaaS sandbox), whether you are an SI or ISV.

<InlineAlert variant="info" slots="text"/>

If you are a **Solution Partner Program (SPP)** partner, you will need to create a TPP account to access these environments.

## How to set up your account

Follow these steps to set up your TPP account.

### Step 1: Request a TPP account

Go to the [Register to the Adobe Technology Partner Program](https://partners.adobe.com/technologyprogram/experiencecloud/registration.html) page and create a Silver-level (or higher) TPP account. You will be asked to provide a corporate email address and company website as part of the registration process. [How to register in the Adobe Technology Partner Program](https://partners.adobe.com/technologyprogram/experiencecloud/knowledgebase/a96d596f933f8214fbe77b847aba101c.html) provides additional information about this process.

![Register to the TPP program](../_images/register-tpp-adobe.png)

Adobe Support will create an IMS org for you, either proactively or after you request sandbox access in [Step 3](app-builder-partnership-essentials.md#step-3-request-sandbox-access). Each registrant must use an Adobe ID.

After you join, Adobe will assign an ISV, a TPP organization, and an App Builder sandbox associated to that organization.

<InlineAlert variant="info" slots="text"/>

A Silver membership (or higher) within a TPP account is needed to access App Builder, or public app listing.

### Step 2: Adobe reviews your request

**Adobe will review your application and process your membership order.** Within a few days, you'll receive an email notification confirming whether your membership has been approved or rejected because additional information is required. If further details are needed, Adobe will provide guidance on next steps.

### Step 3: Request sandbox access

After your Silver membership is processed, you can request sandbox access, which will be provisioned within five days of your request.

- **App Builder Sandbox** - Newly provisioned TPP organizations are automatically associated with a TPP organization. Older organizations without the necessary permissions should request access to all three sandboxes—App Builder, PaaS, and ACCS/SaaS—through [TPP Support](https://partners.adobe.com/ec/cform/sandbox) using a single ticket.

- **Commerce PaaS Sandbox** – Account Managers should request both Composer entitlements for Adobe Commerce EE/B2B Access and PaaS sandbox through [TPP Support](https://partners.adobe.com/ec/cform/sandbox).

- **Commerce SaaS Sandbox** - File a ticket to [TPP Support](https://partners.adobe.com/ec/cform/sandbox). Once received, you can add additional users that will need sandbox access in your Admin Console. See [Step 6](#step-6-manage-your-team) to manually assign users as Admins or Developers.

<InlineAlert variant="info" slots="text"/>

You can create a ticket to check the status of your organization, or sandbox enablement, specifying the name of your assigned TPP organization.

### Step 4: Log into your Adobe IMS organization

Verify that you are logged into your IMS organization by checking the top-right corner of the [Adobe Experience Cloud](https://experience.adobe.com/#/@commercelab/home) or [Developer Console](https://developer.adobe.com/console). If it displays your organization name, you are ready to use App Builder. If it shows an email address, you are signed into a personal account instead of your IMS organization.

### Step 5: Create a project from template

1. Navigate to the Developer Console to access App Builder.

1. Select **Create Project from template**.

   ![Create project from template](../_images/developer-console-template.png)

1. Follow the steps described in the [Create your First App Builder Application](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/first-app) topic.

### Step 6: Manage your team

The Admin Console is your central hub for managing access to Adobe Experience Cloud products. It enables administrators to control services, user access, product entitlements, and roles across the organization.

As an IMS organization admin, you have full control to add users, assign roles, and manage access through the Admin Console.

To manage team members who need to submit or manage App Builder listings, ensure their Adobe ID email is added to your IMS organization.

Use the following workflow to manage your teams:

1. Access the Admin Console by signing in with your Admin credentials.

1. Add users to your IMS Organization.

1. Assign product entitlements and roles

   Ensure each user has the correct permissions for Adobe Experience Cloud products and App Builder tasks.

For detailed instructions, see [Adobe Admin Console Users](https://helpx.adobe.com/enterprise/using/users.html).

<InlineAlert variant="info" slots="text"/>

Only accounts with Developer or Admin access can manage App Builder listings.

## Integrations

After partners get sandbox access, the Adobe Commerce engineering team will ask developers to extend the integration starter kit when getting started with App Builder development.

## How to build an app

1. Get started by learning more about [building an app](https://developer.adobe.com/app-builder/docs/intro_and_overview/).

1. Install the [Adobe Commerce integration starter kit](../starter-kit/integration/create-integration.md).

1. Read the [App Submission guidelines](../app-development/app-submission-guidelines.md).

1. Review the [developer guides](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/) for [out-of-process apps](./index.md) and [app distribution](https://developer.adobe.com/developer-distribution/experience-cloud/docs/guides/discoverAndManage/app-builder-discover).

**Support resources:**

- [Common issues](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/troubleshoot).

- [Experience League forum](https://experienceleaguecommunities.adobe.com/t5/app-builder/ct-p/adobe-app-builder).

- Slack support channel in the [Magento Open Source Workspace](https://developer.adobe.com/open/magento/slack): `#app-builder-community`

## How to package your app

1. [Package and configure the app overview](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/distribution/).

1. Internal publishing: Publish within the [partner's organization](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/publish-app).

1. External publishing: Publish on the Adobe Exchange Marketplace. Read the following [distribution](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/publish-app) section.

## Distribution

Here are the distribution steps with use case for Commerce SIs and ISVs.

### Step 1: Create an App Builder listing

- Sign into [Developer Distribution (DD)](https://developer.adobe.com/distribute) and confirm that your approved IMS organization appears in the upper-right organization switcher. If the organization name looks like your email address, you are not in the TPP organization and will encounter an error when attempting to create a listing.

- Create a public profile before submitting your first App Builder listing.

- [Create an App Builder listing](https://developer.adobe.com/developer-distribution/experience-cloud/docs/guides/submission/app-builder-submission#creating-a-listing) using the zip file you created when building your App Builder app. After you create a listing, you can see it on the **Listing Overview** page.

    ![Listing types](../_images/listing-type.png)

### Step 2: Submit a listing for review

- Review the [Adobe Exchange Marketplace publishing requirements](../app-development/app-submission-guidelines.md) to ensure your submission meets the requirements and to prevent delays in the approval of your listing.

- Adobe brand and code reviewers will [review the App Builder listing](https://developer.adobe.com/developer-distribution/experience-cloud/docs/guides/submission/app-builder-submission#reviewing-a-submission) and send an email confirmation once it is approved. If your submission is incomplete, Adobe will provide feedback to help you address the issues. You can also check the status on your page, which will display an **Approved** or **Published** status.

## Variations

ISVs can publish the listing under their name, if they have an Adobe ID associated with a TPP organization.

SIs can:

- Publish the listing under their name if they have joined the **Technology Partner Program** using their Adobe ID associated with a TPP organization.

- Publish on behalf of an ISV if they have been added to the TPP organization of the ISV. To confirm approval, submit a [TPP Support](https://partners.adobe.com/ec/cform/case) ticket providing evidence that the ISV authorizes the SI to publish on their behalf. and Adobe will then share the organization name with the SI user to ensure that they sign in to the Developer Distribution (DD) under the correct organization.

<InlineAlert variant="info" slots="text, text1"/>

Any user with an Adobe ID associated with the TPP publishing organization can submit, manage, and retract an App Builder Listing in Developer Distribution.

Users updating or revising the App Builder App itself require Commerce and App Builder sandboxes in their organization.

## Resources

- [SPP](https://solutionpartners.adobe.com/solution-partners/benefits.html) Program Level Guide.

- [TPP](https://partners.adobe.com/technologyprogram/experiencecloud/benefits.html) Program Level Guide.

- [About App Builder](https://developer.adobe.com/app-builder/docs/intro_and_overview/)

- [Introduction to App Builder](https://experienceleague.adobe.com/en/docs/commerce-learn/tutorials/adobe-developer-app-builder/introduction-to-app-builder)

- [Getting started with App Builder](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/app-builder-intro)

- [Adobe Commerce checkout starter kit](../starter-kit/checkout/index.md) with its corresponding Github repository:

  - [Adobe Commerce checkout starter kit](https://github.com/adobe/commerce-checkout-starter-kit)

- [Adobe Commerce integration starter kit](../starter-kit/integration/index.md) with its corresponding Github repository:

  - [Adobe Commerce integration starter kit](https://github.com/adobe/commerce-integration-starter-kit)

- [Set up access, environment, and tools](https://developer.adobe.com/app-builder/docs/get_started/app_builder_get_started/set-up)

- [Configuration files](https://developer.adobe.com/app-builder/docs/guides/app_builder_guides/configuration/configuration#public-distribution-configuration)

- [Adobe Developer App Builder for Adobe Experience Cloud](https://business.adobe.com/products/experience-manager/developer-app-builder.html)

- [Extend and integrate with Adobe Solutions](https://developer.adobe.com/app-builder/)

- [Adobe Commerce extensibility](../index.md)
