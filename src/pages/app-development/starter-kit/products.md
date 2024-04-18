---
title: Product data flow
description: Learn about the data flow for the Product object.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# `product` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce Extensibility Starter Kit.

The following sections describe when events are fired for this object.

## Create

Adobe Commerce origination

- An Adobe Commerce API creates products from external systems
- A new product is created in the Adobe Commerce Admin panel

Back office integration origination

- A new product is created in the back office system
- A bulk import from an existing Product Information Management (PIM) system creates new products

## Update

Adobe Commerce origination

- An Adobe Commerce API updates products from external systems
- An admin user modifies the existing product
- An admin user modifies the type of product (for example, simple > configurable, simple > digital)

Back office origination

- An existing product is modified in the backoffice system
- A bulk import from an existing Product Information Management (PIM) system modifies products
