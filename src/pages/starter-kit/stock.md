---
title: Stock data flow
description: Learn about the data flow for the stock object.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

import BetaNote from '/src/_includes/starter-kit-beta.md'

<BetaNote />

# `stock` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce integration starter kit.

The following sections describe when events are fired for this object.

## Create (stock hierarchy)

Adobe Commerce supports the following create methods:

- An admin or an API creates a new stock source

Backoffice integrations support the following create methods:

- An admin or an API creates a new stock source in the backoffice system

## Update (stock hierarchy)

Adobe Commerce supports the following update methods:

- Admin user modifies a stock source
- Admin user modifies the relationship between an existing stock source and a website

Backoffice integrations support the following update methods:

- An admin modifies an existing stock source
- An admin modifies an existing relationship between a stock source and a website

## Update (stock)

Adobe Commerce supports the following update methods:

- An admin modifies a stock quantity in the Admin panel
  - For example, to overwrite the quantity quickly in a flash sale where overselling situations is acceptable.

Backoffice integrations support the following update methods:

- A daily full sync triggers a **FULL** stock update for each stock source
- A change in source stock quantity triggers a **DELTA** stock update
- A stock allocation triggers a **DELTA** stock update
