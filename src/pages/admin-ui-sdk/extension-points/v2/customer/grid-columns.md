---
title: customer grid columns
description: Customize the customers page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# customer grid columns

The `customer grid columns` extension point adds columns to the grid on the **Customers** > **All Customers** page in the Adobe Commerce Admin. Unlike V1, which fetched column data through an API Mesh instance, V2 calls a `runtimeAction` in your App Builder app directly.

## Example customization

The following example creates custom columns labeled `First App Column`, `Second App Column`, and `Third App Column`, backed by a `get-customer-grid-columns` runtime action.

```typescript
adminUi: {
  customer: {
    gridColumns: {
      label: 'Customer grid columns',
      description: 'Adds custom columns to the customer grid',
      runtimeAction: 'customer-custom-grid-columns/get-customer-grid-columns',
      columns: [
        { id: 'first_column', label: 'First App Column', type: 'string', align: 'left' },
        { id: 'second_column', label: 'Second App Column', type: 'integer', align: 'left' },
        { id: 'third_column', label: 'Third App Column', type: 'date', align: 'left' },
      ],
    },
  },
},
```

## How it works

1. A merchant opens the customer grid in the Commerce Admin.
1. Commerce sends a POST request to your runtime action with the grid type and the visible customer IDs: `{ requestId, gridType: 'customer', ids: ['1', '2', ...] }`.
1. Your action looks up the column values for each customer ID and returns them.
1. Commerce renders the returned values in the corresponding columns, alongside the built-in columns.

For IDs your action does not return, Commerce falls back to the default values your action declares (for example, an empty string or `0`). If no default is provided, the cell is left empty.

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

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [customer grid columns](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/v2/customer/custom-grid-columns).
