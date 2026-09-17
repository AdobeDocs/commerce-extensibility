---
title: invoice grid columns
description: Customize the invoices page in the Adobe Commerce Admin.
edition: paas
keywords:
  - App Builder
  - Extensibility
---

# invoice grid columns

The `invoice grid columns` extension point adds columns to the grid on the **Sales** > **Invoices** page in the Adobe Commerce Admin. It calls a `runtimeAction` in your App Builder app directly, the same as the [order](../order/grid-columns.md) and [product](../product/grid-columns.md) grid columns extension points.

## Example customization

The following example creates a custom column labeled `Warehouse Location`, backed by a `get-invoice-grid-columns` runtime action.

```typescript
adminUi: {
  invoice: {
    gridColumns: {
      label: 'Invoice grid columns',
      description: 'Adds custom columns to the invoice grid',
      runtimeAction: 'invoice-custom-grid-columns/get-invoice-grid-columns',
      columns: [
        { id: 'warehouse_location', label: 'Warehouse Location', type: 'string', align: 'left' },
      ],
    },
  },
},
```

## How it works

1. A merchant opens the invoice grid (**Sales** > **Invoices**) in the Commerce Admin.
1. Commerce sends a POST request to your runtime action with the grid type and the visible invoice IDs: `{ requestId, gridType: 'invoice', ids: ['000000001', '000000002', ...] }`.
1. Your action looks up the column values for each invoice ID and returns them.
1. Commerce renders the returned values in the corresponding columns, alongside the built-in columns.

For IDs your action does not return, Commerce falls back to the default values your action declares. If no default is provided, the cell is left empty.

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `label` | string | No | A label describing the set of columns, used when the columns are protected by an access control list (ACL). |
| `description` | string | No | A description of the columns, used when the columns are ACL-protected. |
| `runtimeAction` | string | Yes | The runtime action that returns column data, in `<package>/<action>` format from your `app.config.yaml` runtime manifest. Commerce resolves this to the full deployed action URL at installation time. |
| `columns[].id` | string | Yes | The identifier for the column. Referenced in the request sent to your runtime action and in its response. |
| `columns[].label` | string | Yes | The label of the column to display. |
| `columns[].type` | string | Yes | The data type of the values in the column. Supported values: `boolean`, `date`, `datetime`, `float`, `integer`, `string`. Date and datetime values must be ISO 8601-compliant. |
| `columns[].align` | string | Yes | The alignment of the values in the column. One of `left`, `right`, `center`. |
| `columns[].aclProtected` | boolean | No | When `true`, gates the column behind a dedicated Commerce ACL resource scoped to your app. See [ACL protection](../index.md#acl-protection). The default value is `false`. |
