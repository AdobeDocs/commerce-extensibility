---
title: Payment API reference
description: Learn about the available API endpoints for the payment module in the Adobe Commerce checkout starter kit.
keywords:
  - App Builder
  - REST
  - Extensibility
---

# Tax API reference

The checkout module provides REST and GraphQL APIs to configure out-of-process tax integrations.

## REST

For more information on the available endpoints, refer to [tax API usage](./tax-usage.md/#create-or-modify-a-new-oope-tax-integration).

The raw Payment GraphQL schema is available [here](/tax.xml).

| **Route URL**| **Method** | **Description**|
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| `/V1/oope_tax_management/tax_integration/:code` | GET        | Retrieve an OOPE tax integration info by its code.. |
| `/V1/oope_tax_management/tax_integration`                 | GET        | List all available tax integration info.     |
| `/V1/oope_tax_management/tax_integration`         | POST       | Create or update an OOPE tax integration.     |
