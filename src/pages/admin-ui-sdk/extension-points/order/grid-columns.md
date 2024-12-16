---
title: order grid columns
description: Customize the orders page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# order grid columns

The `order grid columns` extension point enables you to add columns to the grid on the **Sales** > **Orders** page in the Adobe Commerce Admin. This extension point requires an [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/gateway) for Adobe Developer App Builder instance to retrieve the data to be added to the custom columns.

You can use the [`aio api-mesh:describe` command](https://developer.adobe.com/graphql-mesh-gateway/gateway/command-reference/#aio-api-meshdescribe) to retrieve the value of the mesh ID.

## Example customization

​The following example creates custom columns labeled `First App Column` and `Second App Column`.

```javascript
order: {
    gridColumns: {
        data: {
            meshId: 'MESH_ID'
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
            },
            {
                label: 'Third App Column',
                columnId: 'third_column',
                type: 'date',
                align: 'left'
            }
        ]
    }
}
```

### Sample API Mesh configuration file

The following sample mesh configuration file defines the external source that contains the data to populate in the custom columns.
It leverages API Mesh [JSON Schemas handler](https://developer.adobe.com/graphql-mesh-gateway/mesh/basic/handlers/json-schema/).

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "orders",
                "handler": {
                    "JsonSchema": {
                        "baseUrl": "https://www.example.com",
                        "operationHeaders": {
                          "Authorization": "Bearer {context.headers['x-ims-token']}",
                          "x-gw-ims-org-id": "{context.headers['x-gw-ims-org-id']}"
                        },
                        "operations": [
                            {
                                "type": "Query",
                                "field": "orders",
                                "path": "/get-orders?ids={args.ids}",
                                "method": "GET",
                                "responseSchema": "./schema.json"
                            }
                        ]
                    }
                }
            }
        ]
    }
} 
```

### Sample runtime action to retrieve data

This sample `get-orders` runtime action is referenced in the mesh configuration file. It defines the path to the runtime action to retrieve the data of custom columns.

It is important to add `ids={args.ids}` to the query and handle this filtering in the runtime action. As a result, the Admin UI SDK loads only the data necessary to display in the grid columns of the Admin.

```javascript
export async function main(props) {

    const selectedIds = props.ids ? props.ids.split(',') : [];

    const orderGridColumns = {
        "orderGridColumns": {
            "000000001": {
                "first_column": "value_1",
                "second_column": 1
            },
            "000000002": {
                "first_column": 1,
                "second_column": "test"
            }
        }
    }

    if (selectedIds.length === 0) {
        return {
            statusCode: 200,
            body: orderGridColumns,
        }
    }

    const filteredColumns = {
        "orderGridColumns": {}
    }

    selectedIds.forEach(id => {
        if (orderGridColumns.orderGridColumns[id]) {
            filteredColumns.orderGridColumns[id] = orderGridColumns.orderGridColumns[id]
        }
    })

    return {
        statusCode: 200,
        body: filteredColumns
    }
}
```

### Sample schema file

This sample `schema.json` file is referenced in the mesh configuration file. It defines the response of the external `orderGridColumns` query that fetches column data.

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "orderGridColumns": {
        "type": "object",
        "patternProperties": {
          "^0": {
            "type": "object",
            "properties": {
              "first_column": {
                "type": "string"
              },
              "second_column": {
                "type": "integer"
              }
            }
          }
        }
      }
    },
    "required": [
      "orderGridColumns"
    ]
}
```

### Create or Update your mesh

Make sure to create or update your mesh, and to keep the mesh id provided.

```bash
aio api-mesh:create mesh.json
```

```bash
aio api-mesh:update mesh.json  
```

### Order data matching

#### Id matching

The Admin UI SDK expects the order id in Adobe Commerce to correctly match the order to the data and fill the correct cell.

#### Default value

A default value can be provided to be added to unmatched ids, or in case data doesn't match the expected type of the column. If not provided, the cell is left empty.

In case of error, more info can be found in the Adobe Commerce logs.

##### Example of default value

```javascript
"*": {
    "first_column": "Default value",
    "second_column": 0
}
```

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data.meshId` | string | Yes | The ID of the mesh used to retrieve the column data.|
| `properties.align` | string | Yes | The alignment of the values in the column. One of `left`, `right`, `center`. |
| `properties.columnId` | string | Yes | The identifier used in the external dataset to identify the column. |
| `properties.label` | string | Yes | The label of the column to display. |
| `properties.type` | string | Yes | The data type of the values in the column. Supported values: `boolean`, `date`, `float`, `integer`, `string`. Date values must be ISO 8601-compliant. |

## Sample code

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [order grid columns](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/order/custom-grid-columns).
