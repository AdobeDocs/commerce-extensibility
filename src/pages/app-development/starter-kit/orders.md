---
title: Order data flow
description: Learn about the data flow for the Orders object.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# `order` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce Extensibility Starter Kit.

## Create

Adobe Commerce supports the following create methods:

- A customer or guest makes a purchase

## Update (order status change)

Adobe Commerce supports the following update methods:

- An admin user changes an order status manually

Backoffice integrations support the following update methods:

- An order flow changes the order status due to specific business logic
  - The order status updates in Adobe Commerce
