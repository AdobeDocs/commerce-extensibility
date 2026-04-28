---
title: Out-of-Process Extensibility (OOPE) modules
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

Adobe Commerce has a set of modules that enable out-of-process extensibility (OOPE). They allow external services and App Builder actions to extend Commerce behavior without modifying core code. These modules cover a range of integration patterns, including REST APIs, GraphQL extensions, and webhooks.

Name | Package name | Description
--- | --- | ---
API Integration | `magento/module-oope-api-integrations` | Exposes the `GET /V1/order-statuses` REST endpoint. It returns all order statuses configured in the Commerce instance, with each status's name, label, associated state, default status, and whether it can be displayed on the storefront.
Custom Attributes | `magento/out-of-process-custom-attributes` | A metapackage that lets OOPE services attach and persist custom attributes on Commerce data models. It includes [REST](https://developer.adobe.com/commerce/webapi/rest/modules/custom-attributes/) support and [GraphQL](https://developer.adobe.com/commerce/webapi/graphql/schema/attributes/mutations/) submodules. It also includes admin UI integration for order create/view flows.
Custom Attributes for B2B | `magento/out-of-process-custom-attributes-b2b` | Extends custom attribute support to negotiable quotes and companies.
Observability | `magento/module-out-of-process-observability` | Provides [observability infrastructure](../observability/index.md) for OOPE extensions. It manages subscriptions for the location where logs, metrics, and traces are routed (OTLP endpoints). It includes a set of REST APIs and updates the Admin.
Payment Methods | `magento/module-out-of-process-payment-methods` | Provides REST endpoints to register [OOPE payment method](../starter-kit/checkout/payment-use-cases.md) definitions and GraphQL extensions to expose a backend URL and custom key/value configuration on the `available_payment_methods` type. An optional webhook can filter which methods appear at checkout.
Shipping Methods | `magento/module-out-of-process-shipping-methods` | Enables out-of-process [shipping carriers](../starter-kit/checkout/shipping-use-cases.md), where webhooks fetch rates from external services. It adds REST calls for carrier registration and GraphQL extensions to add `additional_data` (key/value pairs) to the `available_shipping_methods` and `selected_shipping_method` types on the cart.
Tax | `magento/module-out-of-process-tax-management` | Allows an [external tax service](../starter-kit/checkout/tax-use-cases.md) to drive quote tax calculation. It includes a REST registry for tax integrations (only one may be active at a time) and replaces the core `Magento\Tax\Model\Sales\Total\Quote\Tax` class using a `di.xml` preference, making it *incompatible* with 3rd-party extensions that override the same class.
Totals Collector | `magento/module-out-of-process-totals-collector` | Allows an [external service](../starter-kit/checkout/totals-collector-use-cases.md) to modify quote totals (primarily discounts) using webhooks.

These modules are available automatically on Adobe Commerce as a Cloud Service. For on-premises and cloud infrastructure projects, they can be installed with Composer.
