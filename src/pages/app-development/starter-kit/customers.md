---
title: Customers data flow
description: Learn about the data flow for the Customer object.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# `customer` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce Extensibility Starter Kit.

## Create

Adobe Commerce origination

- A new customer registers in Adobe Commerce (sign up or request)
- A new customer registers in Adobe Commerce during or after purchase (sign up and purchase)
- An admin user registers a new customer

Back office integration origination

- A new or existing customer engages the company through sales, a partner, or a CRM, when records and emails are synched into Adobe Commerce.

## Update

Adobe Commerce origination

- The customer edits information via My Account
- An admin User modifies existing customer information (including assignment to a different customer group)

Back office origination

- An existing customer engages the company through sales, a partner, or a CRM (including assignment to a different customer group)

## Create/Update (customer group)

Adobe Commerce origination

- An admin user creates or edits a customer group

Back office origination

- An admin user creates or edits a customer group
