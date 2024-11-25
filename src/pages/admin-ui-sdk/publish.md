---
title: Prepare your app for production
description: Learn how to prepare your app for non-local testing and for production.
keywords:
  - App Builder
  - Extensibility
---

# Prepare your app for production

After you have tested your app locally, you are ready to submit your app for approval. Once the app has been approved, it will be available in the Adobe App Registry. The Admin UI SDK can then be able to fetch the information it needs to create the app UI in Adobe Commerce.

## Publish the application

During the testing phase, an administrator of your enterprise organization performs the approvals. At this point, your app is not public.

[Publishing Your First App Builder Application](https://developer.adobe.com/app-builder/docs/getting_started/publish_app/) in the _App Builder Getting Started_ guide describes how to publish your app. Deploy your app to your Production workspace, then use the following steps:

1. Perform all testing. If any changes need to be made to your app, update your code and redeploy. Repeat these steps until you have completed all testing.

1. Submit for publishing approval on your Adobe Developer Console.

1. Your app must be approved by an enterprise organization administrator. Your administrator uses the [Adobe Exchange Manage panel](https://exchange.adobe.com/manage) to perform this task. Upon approval, the app is published and available for use by employees within your enterprise organization. Adobe Commerce can now find the app in the App Registry.

1. Perform additional testing if needed.

## Update an already published application

To deploy code changes to an already published application, you can perform a force deploy:

```bash
aio app deploy --force-deploy
```

To update the credentials or services used by an already published application, you must revoke it and go through the approval process again.

1. Ask an enterprise organization administrator to revoke your published application in the [Adobe Exchange Manage panel](https://exchange.adobe.com/manage). Note that once revoked, your application will no longer be public.

1. Deploy new changes to your application in the Production workspace and follow the same steps to publish the application.
