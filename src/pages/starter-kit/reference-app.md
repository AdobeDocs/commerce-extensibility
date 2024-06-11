---
title: Reference applications
description: Review reference applications created using the Adobe Commerce integration starter kit.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# Reference Applications

This page provides developers with a basic understanding of the types of applications they can create with Adobe Commerce integration starter kit.

## Microsoft Dynamics Finance and Operations Accelerator for Adobe Commerce

Microsoft's Dynamics 365 Finance and Operations (D365 F&O) is an enterprise resource planning (ERP) tool for medium and large businesses to handle their operational processes, such as finance, sales, purchase orders, and more.

This reference application provides a base implementation for the most common data flows you can use when integrating Adobe Commerce with D365 F&O.

### Features

- **Out-of-the-Box Integration** - Leverage Adobe’s serverless extensibility architecture to integrate data between Adobe Commerce and Microsoft Dynamics Finance & Operations out-of-the-box.
- **Sync common data types for ecommerce** - Sync customer, products, prices, and stock data from Microsoft Dynamics Finance & Operations to Adobe Commerce.
- **Send orders to Microsoft Dynamics F&O** - Send orders from Adobe Commerce to Microsoft Dynamics Finance & Operations.
- **Notify customers of shipment** - Notify customers of an order shipment when an order status is updated in Microsoft Dynamics.

### Use cases

This reference application uses starter kit [data flows](./data-flows.md) for the following use cases:

- Customer data flow
  - Customer
    - Adobe Commerce synchronizes new and edits existing merchants to D365 F&O.
    - Microsoft F&O synchronizes new and edits existing merchants to Adobe Commerce.
  - Customer groups
    - Microsoft F&O synchronizes new and edits existing customer groups to Adobe Commerce.
- Products data flow
  - Customer
    - Adobe Commerce synchronizes new and edits existing products to D365 F&O
- Order data flow
  - Order & flow
    - Adobe Commerce synchronizes new orders to D365 F&O
    - Adobe Commerce synchronizes changes in order flow to Adobe Commerce
