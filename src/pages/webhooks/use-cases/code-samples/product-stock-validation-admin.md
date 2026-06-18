---
title: Product Stock Validation Admin Configuration
description: Admin panel configuration for the product stock validation webhook use case.
---

```yaml
Hook Settings

Webhook method: observer.sales_quote_item_save_before
Webhook type: before
Batch name: quote_item_stock
Hook name: validate_stock
URL: <Host>/validate-stock
Timeout: 5000
Soft timeout: 1000
Fallback Error Message: The product stock cannot be validated
Required: Required
Active: Yes
Method: POST

Developer Console OAuth

Client ID: The client ID for the OAuth credential.
Client Secret: The client secret for the OAuth credential.
Organization ID: The organization ID for the OAuth credential.

Hook Fields

Name: item.sku
Source: data.item.sku
Active: Yes

Name: item.qty
Source: data.item.qty
Active: Yes

Name: item.name
Source: data.item.name
Active: Yes
```
