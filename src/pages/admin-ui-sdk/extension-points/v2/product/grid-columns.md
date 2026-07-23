---
title: product grid columns
description: Customize the products page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# product grid columns

The `product grid columns` extension point adds columns to the grid on the **Catalog** > **Products** page in the Adobe Commerce Admin. Unlike V1, which fetched column data through an API Mesh instance, V2 calls a `runtimeAction` in your App Builder app directly.

## Example customization

The following example creates a custom column labeled `App Column`, backed by a `get-product-grid-columns` runtime action.

```typescript
adminUi: {
  product: {
    gridColumns: {
      label: 'Product grid columns',
      description: 'Adds custom columns to the product grid',
      runtimeAction: 'product-custom-grid-columns/get-product-grid-columns',
      columns: [
        { id: 'first_column', label: 'App Column', type: 'string', align: 'left' },
      ],
    },
  },
},
```

## How it works

1. A merchant opens the product grid in the Commerce Admin.
1. Commerce sends a POST request to your runtime action with the grid type and the visible product IDs (SKUs): `{ requestId, gridType: 'product', ids: ['test-product-26', 'LUCKY-CAT-BLUE', ...] }`.
1. Your action looks up the column values for each product ID and returns them.
1. Commerce renders the returned values in the corresponding columns, alongside the built-in columns.

For IDs your action does not return, Commerce falls back to the default values your action declares. If no default is provided, the cell is left empty.

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | string | No | A label describing the set of columns, used when the columns are ACL-protected. |
| `description` | string | No | A description of the columns, used when the columns are ACL-protected. |
| `runtimeAction` | string | Yes | The runtime action that returns column data, in `<package>/<action>` format from your `app.config.yaml` runtime manifest. Commerce resolves this to the full deployed action URL at installation time. |
| `columns[].id` | string | Yes | The identifier for the column. Referenced in the request sent to your runtime action and in its response. |
| `columns[].label` | string | Yes | The label of the column to display. |
| `columns[].type` | string | Yes | The data type of the values in the column. Supported values: `boolean`, `date`, `datetime`, `float`, `integer`, `string`. Date and datetime values must be ISO 8601-compliant. |
| `columns[].align` | string | Yes | The alignment of the values in the column. One of `left`, `right`, `center`. |
| `columns[].aclProtected` | boolean | No | When `true`, gates the column behind a dedicated Commerce ACL resource scoped to your app. See [ACL protection](../index.md#acl-protection). The default value is `false`. |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [product grid columns](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/v2/product/custom-grid-columns).
