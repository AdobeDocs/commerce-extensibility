---
title: order
description: Customize the orders page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# order

The `order` extension point enables you to add columns to the grid on the **Sales** > **Orders** page in the Adobe Commerce Admin. This extension point requires a GraphQL Mesh instance to retrieve the data to be added to the custom columns.

You can use the [`aio api-mesh:describe` command](https://developer.adobe.com/graphql-mesh-gateway/gateway/command-reference/#aio-api-meshdescribe) to retrieve the values of the API key and mesh ID. The key is appended to the mesh endpoint URL.

## Example customization

​The following example creates custom columns labeled `First App Column` and `Second App Column`.

```javascript
order: {
    getGridColumns() {
        return {
            data:{
                meshId:'MESH_ID',
                apiKey: 'API_KEY'
            },
            properties:[
                {
                    label: 'First App Column',
                    columnId: 'first_column',
                    type: 'string',
                    align: 'left'
                },
                {
                    label: 'Second App Column',
                    columnId: 'second_column',
                    type: 'integer',
                    align: 'left'
                }
            ]
        }
    }
}
```

## Parameters

​| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data.apiKey` | string | Yes | The API key assigned to the GraphQL mesh. |
| `data.meshId` | string | Yes | The ID of the mesh used to retrieve the column data.|
| `properties.align` | string | Yes | The alignment of the values in the column. One of `left`, `right`, `center`. |
| `properties.columnId` | string | Yes | The identifier used in the external dataset to identify the column. |
| `properties.label` | string | Yes | The label of the column to display. |
| `properties.type` | string | Yes | The data type of the values in the column. Supported values: `boolean`, `date`, `float`, `integer`, `string`. Date values must be ISO 8601-compliant. |
