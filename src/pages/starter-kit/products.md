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

Adobe Commerce supports the following create methods:

- An Adobe Commerce API creates products from external systems
- An admin creates a new product in the Adobe Commerce Admin panel

Backoffice integrations support the following create methods:

- An admin creates a new product in the backoffice system
- A bulk import from an existing Product Information Management (PIM) system creates new products

## Update

Adobe Commerce supports the following update methods:

- An Adobe Commerce API updates products from external systems
- An admin user modifies the existing product
- An admin user modifies the type of product (for example, from simple to configurable or virtual)

Backoffice integrations support the following update methods:

- An admin modifies an existing product in the backoffice system
- A bulk import from an existing Product Information Management (PIM) system modifies products
