---
title: Shipment data flow
description: Learn about the data flow for the Shipment object.
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

# `shipment` data flow

This page describes the path that data takes as it travels between Adobe Commerce and your backoffice system when using the Adobe Commerce Extensibility Starter Kit.

## Create

Adobe Commerce and backoffice integrations support the following create methods:

- An admin creates a shipment
- A carrier marks a shipment as received by a distribution center or carrier management
- A carrier marks a shipment as delivered
- The distribution center or carrier management updates a shipment with tracking information
