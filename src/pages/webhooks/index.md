---
title: Adobe Commerce Webhooks Overview
description: An architectural overview of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Adobe Commerce Webhooks Overview

Webhooks enable developers to configure synchronous logic to execute calls to external systems when an Adobe Commerce event triggers. Synchronous calls are required when Commerce needs to immediately compute or validate something (order totals, taxes, payments) using a 3rd party endpoint and write the result back into Adobe Commerce. For example, a developer needs to implement an integration with a 3rd party shipping provider to verify shipping costs. Before a shopper can fully check out, Commerce needs to ask the external shipping system to calculate the exact shipping rate for the order.  Commerce then saves the response and is able to display/charge the shopper.
