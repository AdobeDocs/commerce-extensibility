---
title: Adobe Commerce starter kits
description: Choose the right starter kit to accelerate your App Builder development.
keywords:
  - App Builder
  - Extensibility
  - Starter Kit
---

# Adobe Commerce starter kits

Starter kits accelerate App Builder development by providing pre-built architecture, data flows, and best practices for common Commerce integration patterns. These starter kits handle the foundational architecture and common patterns, allowing you to concentrate on implementing your unique business requirements.

Extend checkout with custom payment gateways, shipping calculators, and tax providers.

## Choosing a starter kit

The right starter kit depends on your integration needs:

**Use the [Integration starter kit](./integration/index.md) if you need to:**

- Connect Commerce to ERP, OMS, PIM, or CRM systems
- Sync customers, orders, products, inventory, or shipments

**Use the [Checkout starter kit](./checkout/index.md) if you need to:**

- Integrate custom payment gateways
- Calculate custom shipping rates
- Add custom tax calculation providers
- Process third-party events during checkout

Some implementations benefit from both starter kits. For example, you might use the integration starter kit for syncing orders with your OMS while using the checkout starter kit for real-time inventory validation during checkout. Each starter kit works independently but shares common patterns.

## Integration starter kit

The integration starter kit provides scalable architecture for bidirectional data synchronization between Commerce and enterprise systems such as SAP, Oracle, Microsoft Dynamics, and Salesforce.

**Supported data flows:**

Data flow | Description
--- | ---
**Customers** | Sync customer data between Commerce and external systems
**Orders** | Export orders to fulfillment or order management systems
**Products** | Import and update product information from PIM systems
**Shipments** | Receive shipment updates from fulfillment systems
**Stock** | Synchronize inventory levels with warehouse management systems

Use this starter kit when your project requires real-time or near-real-time data synchronization with back-office systems.

## Checkout starter kit

The checkout starter kit demonstrates how to use webhooks and events to extend checkout functionality with external services.

**Supported integrations:**

Integration type | Description
--- | ---
**Payment** | Custom payment gateway integrations, authorization flows, and refund handling
**Shipping** | Custom shipping rate calculations and carrier integrations
**Tax** | External tax calculation providers and compliance services like Avalara or Vertex
**Third-party events** | Processing events from external systems during checkout

Use this starter kit when you need payment providers not available through existing Commerce modules, custom shipping rate logic, or external tax calculation services.

## Building without a starter kit

If your use case doesn't align with either starter kit, you can build a custom App Builder application. The [learning path](../get-started/learning-path.md) provides tutorials and resources for understanding the full App Builder ecosystem.

Building without a starter kit may be appropriate for:

- Custom Admin UI extensions that don't require back-office integration
- Event-driven workflows outside of checkout or data synchronization
- Unique integration patterns not covered by the starter kit templates
