---
title: Out-of-process Extensibility Modules
description: Learn about the family of OOPE modules that enable external services to extend Adobe Commerce behavior without modifying core code.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Kit
 - Tools
---

# Out-of-process extensibility modules

Adobe Commerce has a set of modules that enable out-of-process extensibility (OOPE). They allow external services and App Builder actions to extend Commerce behavior without modifying core code. These modules cover a range of integration patterns, including REST APIs, GraphQL extensions, and webhooks.

Name | Description
--- | ---
[API Integration](./api-integration.md) | Exposes the `GET /V1/order-statuses` REST endpoint. It returns all order statuses configured in the Commerce instance, with each status's name, label, associated state, default status, and whether it can be displayed on the storefront.
[Custom Attributes](./custom-attributes.md) | Two separate metapackages that lets OOPE services attach and persist custom attributes on Commerce data models. The base metapackage adds coverage for Adobe Commerce. The B2B metapackage adds support for negotiable quotes and companies.
[Observability](../observability/index.md) | Provides observability infrastructure for OOPE extensions. It manages subscriptions for the location where logs, metrics, and traces are routed (OTLP endpoints). It includes a set of REST APIs and updates the Admin.
[Payment Methods](../starter-kit/checkout/payment-use-cases.md)| Provides REST endpoints to register OOPE payment method definitions and GraphQL extensions to expose a backend URL and custom key/value configuration on the `available_payment_methods` type. An optional webhook can filter which methods appear at checkout.
[Shipping Methods](../starter-kit/checkout/shipping-use-cases.md) | Enables out-of-process shipping carriers, where webhooks fetch rates from external services. It adds REST calls for carrier registration and GraphQL extensions to add `additional_data` (key/value pairs) to the `available_shipping_methods` and `selected_shipping_method` types on the cart.
[Tax](../starter-kit/checkout/tax-use-cases.md)| Allows an external tax service to drive quote tax calculation. It includes a REST registry for tax integrations (only one may be active at a time) and replaces the core `Magento\Tax\Model\Sales\Total\Quote\Tax` class using a `di.xml` preference, making it *incompatible* with 3rd-party extensions that override the same class.
[Totals Collector](../starter-kit/checkout/totals-collector-use-cases.md) | Allows an external service to modify quote totals (primarily discounts) using webhooks.

These modules are included by default on Adobe Commerce as a Cloud Service. For Adobe Commerce on cloud infrastructure and on-premises, refer to the installation instructions for each module.
