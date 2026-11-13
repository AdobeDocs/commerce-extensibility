---
title: credit memo custom attribute grid columns
description: Display stored credit memo custom attributes in the Adobe Commerce Admin grid with optional boolean and text filters.
keywords:
  - App Builder
  - Extensibility
---

# credit memo custom attribute grid columns

The `credit memo custom attribute grid columns` extension point displays existing stored custom attributes on the **Sales** > **Credit Memos** grid. Starting with Admin UI SDK 5.2.0, declare these columns under `adminUi.creditMemo.customAttributeGridColumns.columns`.

The Admin UI SDK controls their presentation; it does not create or write the attributes. Only the Credit Memo grid supports this extension point in this release. No runtime action is required.

## Example customization

The following configuration adds a boolean-filtered **Appeasement** column and a text-filtered **Tracking ID** column:

```json
{
  "adminUi": {
    "creditMemo": {
      "customAttributeGridColumns": {
        "label": "Credit memo custom attributes",
        "description": "Adds custom attribute columns to the credit memo grid",
        "columns": [
          {
            "id": "appeasement",
            "label": "Appeasement",
            "align": "left",
            "attribute_code": "is_appeasement",
            "filter": {"type": "boolean"}
          },
          {
            "id": "tracking_id",
            "label": "Tracking ID",
            "align": "left",
            "attribute_code": "tracking_id",
            "filter": {"type": "text", "conditions": ["eq", "neq", "contains"]}
          }
        ]
      }
    }
  }
}
```

To display an attribute without a filter, omit its `filter` object.

## Parameters

The `customAttributeGridColumns` object's `label` and `description` identify the set of columns in App Management during installation and upgrades. They are separate from each column's display label.

Declare these fields on each entry in `customAttributeGridColumns.columns`:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | Yes | Display column identifier. It is independent of the stored attribute code. |
| `label` | string | Yes | Column header displayed in the grid. |
| `align` | string | Yes | One of `left`, `center`, or `right`. |
| `attribute_code` | string | Yes | Exact stored custom attribute code. No field prefix is added implicitly. |
| `filter` | object | No | Omit for a display-only column. |
| `filter.type` | string | Yes, when `filter` is present | Either `boolean` or `text`. This is a filter type, not a top-level column `type`. |
| `filter.conditions` | array of strings | For text filters | Supported operators: `eq`, `neq`, and `contains`. Operators retain their configured order. `contains` matches literal text, not a wildcard expression. |

Attribute columns do not accept `source`, `override`, a top-level `type`, or runtime bindings.

## Combine with runtime-action columns

This extension point can be used independently or alongside [credit memo grid columns](grid-columns.md). Keep runtime-action columns under `adminUi.creditMemo.gridColumns.columns` and attribute columns under `adminUi.creditMemo.customAttributeGridColumns.columns`:

```json
{
  "adminUi": {
    "creditMemo": {
      "gridColumns": {
        "runtimeAction": "creditmemos/data",
        "columns": [
          {"id": "external", "label": "External", "align": "left", "type": "string"}
        ]
      },
      "customAttributeGridColumns": {
        "label": "Credit memo custom attributes",
        "description": "Adds custom attribute columns to the credit memo grid",
        "columns": [
          {
            "id": "appeasement",
            "label": "Appeasement",
            "align": "left",
            "attribute_code": "is_appeasement",
            "filter": {"type": "boolean"}
          }
        ]
      }
    }
  }
}
```

For an attribute-only registration, omit `gridColumns` entirely.

## Reading and filtering

Commerce reads original attribute values for the visible page in one batch through `CreditmemoRepositoryInterface` and `CustomAttributesDataInterface`, shared by the attribute columns. The SDK does not query attribute storage directly or depend on its serialized format.

When filters are configured, Commerce applies typed predicates through OOPE Search's public `ApplyCustomAttributeFiltersInterface` and `CustomAttributeFilterInterface` before loading the collection, calculating totals, or applying pagination. Native grid filters and third-party filter appliers continue to work alongside these filters.

## Required modules and availability

The Custom Attributes read module must be available for attribute columns. Declaring filters also requires compatible public OOPE Search contracts. These are optional capabilities; the SDK adds no Composer dependency for them.

App association and explicit registration refresh reject attribute-column declarations when their required modules are unavailable. Incompatible repository results or missing public Search contracts produce actionable errors.

If the read module is disabled after registration, Commerce skips attribute columns and their filters and logs a warning. Registrations are preserved, and native and runtime-action columns remain available. Re-enabling the module restores the attribute columns.

## Migrate existing attribute-column registrations

Move attribute columns out of `adminUi.creditMemo.gridColumns.columns` into `adminUi.creditMemo.customAttributeGridColumns.columns`. Flatten each declaration so `attribute_code` and optional `filter` appear directly on the column, as shown above.

Remove the former nested override format, obsolete top-level attribute fields, and runtime bindings from attribute columns; these formats are rejected. Keep runtime-action columns in `gridColumns.columns`. Configuration diagnostics identify the relevant configuration path.
