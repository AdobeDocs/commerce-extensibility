---
title: Customer data flow
description: Learn about the data flow for the Customer object.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Kit
 - Tools
---

# `customer` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce integration starter kit.

## Customer create

Adobe Commerce supports the following create methods:

- A shopper registers on the Create an Account page
- A shopper registers during or after purchase (sign up and purchase)
- An admin or an API creates a new customer

Backoffice integrations support the following create methods:

- A new or existing customer engages the company through sales, a partner, or a CRM, when records and emails are synched into Adobe Commerce.

## Customer update

Adobe Commerce supports the following update methods:

- The customer edits information via My Account
- An admin user or process modifies existing customer information (including assignment to a different customer group)

Backoffice integrations support the following update methods:

- An existing customer engages the company through sales, a partner, or a CRM (including assignment to a different customer group)

## Customer group create/update

Adobe Commerce supports the following create/update methods:

- An admin user creates or edits a customer group

Backoffice integrations support the following create/update methods:

- An admin user creates or edits a customer group
