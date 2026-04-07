---
title: Use cases for AI Commerce coding tools
description: Common extension patterns and use cases you can build with the AI coding tools, App Builder starter kits, and Adobe Commerce as a Cloud Service.
keywords:
  - App Builder
  - Cloud
  - Extensibility
  - Tools
---

# Use cases

The AI developer tools for Adobe Commerce extensibility support a range of Adobe Commerce extension patterns. The following use cases describe a category of extension you can build with the tools, the starter kits, and an AI-assisted IDE.

>[!TIP]
>
>These use cases are examples and not exhaustive. You can build a wide range of extensions with the AI Commerce coding tools.

## Custom REST APIs for storefronts

Build headless API endpoints that serve custom data to an Edge Delivery Services storefront. The AI tools scaffold the App Builder runtime action, handle deployment, and generate a service contract you can hand off to a storefront agent or team.

**Example — Product ratings API:** Create a REST endpoint that returns average ratings and review counts for a given product SKU. The storefront calls the API directly — no authentication, events, or webhooks required. After deployment, integrate the ratings into the product detail page using drop-in slots or a standalone block.

See the [Ratings extension tutorial](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/tutorials/ratings-extension).

## Checkout extensions with external services

Extend the Commerce checkout flow by connecting to external service providers through webhooks. The checkout starter kit provides the foundation for shipping, payment, and tax extensions, and the AI tools generate the webhook handler, Admin UI configuration, and carrier registration.

**Example — Custom shipping method:** Add a configurable shipping method that fetches rates from an external API at checkout. A merchant-facing Admin UI screen (built with the Admin UI SDK) stores the service URL, API key, and warehouse address. At checkout, the extension calls the external rates service and returns the available shipping options to the customer.

See the [Shipping method extension tutorial](https://experienceleague.adobe.com/en/docs/commerce/cloud-service/tutorials/shipping-method-extension).

## Storefront UI components

Create new UI blocks or customize existing drop-in component slots on Edge Delivery Services storefronts. The AI tools research your codebase and Commerce documentation, propose architecture options, and generate accessible, responsive components with scoped styles and loading states.

**Example — Star ratings on PDP:** Render a star-rating display with review count on the product detail page by customizing a drop-in slot or creating a standalone block that fetches data from your ratings API.

## Event-driven back-office integrations

Use the integration starter kit to react to Commerce events (order placed, customer created, product updated) and synchronize data with external systems such as ERPs, CRMs, or PIMs. The AI tools generate event-handler runtime actions, configure event subscriptions, and manage payload transformation.

**Example — ERP order notification:** Send order details (ID, total, customer email, payment type) to an ERP endpoint whenever a customer places an order.

## Admin UI extensions

Add merchant-facing configuration screens to the Commerce Admin using the [Admin UI SDK](../admin-ui-sdk/index.md). The AI tools generate the App Builder front-end registration, form layout, and a backing runtime action that stores and retrieves configuration securely in Adobe I/O Runtime State.

**Example — Shipping service configuration:** Provide fields for service URL, masked API key, and warehouse address so merchants can manage external service settings without redeployment.

## Product content and user-generated content APIs

Build CRUD APIs backed by `aio-lib-state` for managing user-generated or editorial content such as product reviews, Q&A, and curated lists. The AI tools handle validation, pagination, and persistence.

**Example — Product reviews and Q&A:** Expose GET and POST endpoints for shoppers to view and submit reviews and questions, then display the content on the product detail page with forms for submission.

## Notification and subscription systems

Create event-driven workflows that monitor Commerce state changes and notify customers when conditions are met. These extensions combine REST APIs for subscription management with event listeners or scheduled actions for state detection.

**Example — In-stock notifications:** Let shoppers subscribe to out-of-stock products and receive a notification when inventory is replenished.

## Delivery and fulfillment enrichment

Wrap external logistics APIs behind a backend-for-frontend (BFF) action and inject enriched data into the checkout flow and storefront pages. The AI tools generate the BFF action, a checkout webhook for shipping-method enrichment, and an Admin UI configuration page.

**Example — Delivery date estimates:** Fetch estimated delivery dates from an external API and display them on the product detail page, cart, and checkout alongside each shipping option.
