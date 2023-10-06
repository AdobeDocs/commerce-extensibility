---
title: Adobe Commerce Webhooks Overview
description: An architectural overview of Adobe Commerce Webhooks.
keywords:
  - Extensibility
---

# Adobe Commerce Webhooks Overview

Webhooks enable developers to configure synchronous logic to execute calls to external systems when an Adobe Commerce event triggers. Synchronous calls are required when Commerce needs to immediately compute or validate something (order totals, taxes, payments) using a 3rd-party endpoint and write the result back into Adobe Commerce.

This process is illustrated in the following diagram.

![Webhooks architecture](../_images/webhooks.png)

1. Webhook execution always starts with an event occurring in Adobe Commerce. This event can be initiated by any type of user. For example, an event fires when a shopper adds a product to their shopping cart or creates an account. An administrator creates an event when performing tasks such as adding products to the catalog and issuing a refund.

1. The event triggers a real-time call from Commerce to a URL endpoint, such as an Order Management System. This call contains relevant data, such as the Commerce product SKU and requests information from that external system. As an example, the call could request a product's stock status to make sure it is available to be purchased.

1. Execution completes by resolving the response from the external system back into the Commerce application. For example, if the external system responds that the product is available, Commerce completes the shopper's action and adds the product to the shopping cart. If the product is not available, the flow is interrupted and an exception is thrown. ("Exception: Product is not in stock"). The shopper cannot add the product to the cart.
