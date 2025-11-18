---
title: Install Adobe Commerce observability modules
description: Learn how to install the Commerce modules needed to implement webhooks.
edition: paas
keywords:
  - Extensibility
---

# Install Adobe Commerce Observability

This functionality is automatically available on [Adobe Commerce as a Cloud Service](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/overview) (SaaS) projects. Adobe Commerce on-premises and Cloud infrastructure (PaaS) projects can install separate modules to provide this functionality.

## Prerequisites

- Adobe Commerce on Cloud Infrastructure or on-premises: 2.4.5+
- PHP 8.1+
- Magento Open Source is not supported.

## Installation

To install the observability module in Adobe Commerce:

1. Install the module:

   ```bash
   composer require magento/module-out-of-process-observability=^1.1.0 --with-dependencies
   ```

1. Enable the installed module:

   ```bash
   bin/magento module:enable Magento_OutOfProcessObservability
   ```

1. For on-premises installations, run the following command to upgrade Adobe Commerce and clear the cache.

   ```bash
   bin/magento setup:upgrade && bin/magento cache:clean
   ```

## Set up the message queue

The message queue must be configured and running to use observability. The message queue is used to send observability data asynchronously, ensuring that the main application flow is not blocked by observability operations. Consumers can be configured to run by cron jobs or as workers.

You cOr it will be starter automatically by the cron job. Run the following command to trigger the cron job manually:

bin/magento cron:run

You can start the consumer to process logs by running the following command:

```bash
bin/magento queue:consumers:start commerce.observability.log --single-thread
```

Or for metrics:

```bash
bin/magento queue:consumers:start commerce.observability.metrics --single-thread
```

Or it will be starter automatically by the cron job. Run the following command to trigger the cron job manually:

bin/magento cron:run
