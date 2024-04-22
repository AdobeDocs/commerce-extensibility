---
title: Stock data flow
description: Learn about the data flow for the Stock object.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Tools
---

# `stock` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce Extensibility Starter Kit.

The following sections describe when events are fired for this object.

## Create (stock hierarchy)

Adobe Commerce origination

- A new Stock Source is created in the Admin panel

Back office integration origination

- A new Stock source is created in the backoffice system

## Update (stock hierarchy)

Adobe Commerce origination

- Admin user modifies a stock source
- Admin user modifies the relationship between an existing Stock source and a website

Back office integration origination

- An existing Stock source is modified
- An existing relationship between a Stock source and a website is modified

## Update (stock)

Adobe Commerce origination

- A stock quantity is modified in the Admin panel (to overwrite it quickly in a flash sale, accepting overselling situations)

Back office origination

- A daily full sync triggers a **FULL** stock update for each Stock source
- A change in source stock quantity triggers a **DELTA** stock update
- A stock allocation triggers a **DELTA** stock update
