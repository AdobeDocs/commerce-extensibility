---
title: Adobe Commerce starter kits
description: Choose the right starter kit to accelerate your App Builder development.
keywords:
  - App Builder
  - Extensibility
  - Starter Kit
---

# Adobe Commerce starter kits

Starter kits accelerate App Builder development by providing pre-built architecture, data flows, and best practices for common Commerce integration patterns. Instead of building from scratch, you can focus on your specific business logic.

<DiscoverBlock slots="link, text"/>

[Integration starter kit](./integration/index.md)

Connect Commerce to back-office systems like ERP, OMS, PIM, and CRM platforms with bidirectional data synchronization for customers, orders, products, shipments, and stock.

<DiscoverBlock slots="link, text"/>

[Checkout starter kit](./checkout/index.md)

Build custom checkout experiences by integrating external payment gateways, shipping rate calculators, and tax providers using webhooks and events.

## Choosing a starter kit

The right starter kit depends on your integration needs. Use the following guide to determine which starter kit aligns with your project requirements:

| If you need to... | Use |
|-------------------|-----|
| Connect Commerce to ERP, OMS, PIM, or CRM systems | [Integration starter kit](./integration/index.md) |
| Sync customers, orders, products, inventory, or shipments | [Integration starter kit](./integration/index.md) |
| Build custom payment gateway integrations | [Checkout starter kit](./checkout/index.md) |
| Implement custom shipping rate calculations | [Checkout starter kit](./checkout/index.md) |
| Add custom tax calculation providers | [Checkout starter kit](./checkout/index.md) |
| Process third-party events during checkout | [Checkout starter kit](./checkout/index.md) |

Some implementations benefit from both starter kits. For example, an order management integration might use the integration starter kit for syncing orders and inventory with the OMS, while using the checkout starter kit for real-time inventory validation during checkout.

Each starter kit works independently, but they share common patterns and can coexist in your architecture.

## Integration starter kit

The integration starter kit provides a scalable architecture for bidirectional data synchronization between Commerce and enterprise systems such as SAP, Oracle, Microsoft Dynamics, and Salesforce.

### Supported data flows

The integration starter kit supports the following data flows:

| Data flow | Description |
|-----------|-------------|
| Customers | Sync customer data between Commerce and external systems |
| Orders | Export orders to fulfillment or order management systems |
| Products | Import and update product information from PIM systems |
| Shipments | Receive shipment updates from fulfillment systems |
| Stock | Synchronize inventory levels with warehouse management systems |

Choose the integration starter kit when your project requires real-time or near-real-time data synchronization with back-office systems. It handles bidirectional data flows and high volumes of data changes efficiently.

## Checkout starter kit

The checkout starter kit demonstrates how to use webhooks and events to extend checkout functionality with external services.

### Supported integrations

The checkout starter kit supports the following integrations:

| Integration | Description |
|-------------|-------------|
| Payment | Custom payment gateway integrations, authorization flows, and refund handling |
| Shipping | Custom shipping rate calculations and carrier integrations |
| Tax | External tax calculation providers and tax compliance services |
| Third-party events | Processing events from external systems during checkout |

Choose the checkout starter kit when you need to integrate payment providers not available through existing Commerce modules, calculate shipping rates using custom business logic, or connect to tax compliance services like Avalara or Vertex.

## Building without a starter kit

If your use case doesn't align with either starter kit, you can build a custom App Builder application from scratch. The [learning path](../get-started/learning-path.md) provides tutorials and resources for understanding the full App Builder ecosystem.

Building from scratch is appropriate for custom Admin UI extensions that don't require back-office integration, event-driven workflows outside of checkout or data synchronization, and unique integration patterns not covered by the starter kit templates.
