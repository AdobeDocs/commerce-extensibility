---
title: product grid columns
description: Customize the product page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# product grid columns

The `product grid columns` extension point enables you to add columns to the grid on the **Catalog** > **Products** page in the Adobe Commerce Admin. This extension point requires an [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/gateway) for Adobe Developer App Builder instance to retrieve the data to be added to the custom columns.

You can use the [`aio api-mesh:describe` command](https://developer.adobe.com/graphql-mesh-gateway/gateway/command-reference/#aio-api-meshdescribe) to retrieve the value of the mesh ID.

## Example customization

​The following example creates custom columns labeled `First App Column` and `Second App Column`.

```javascript
product: {
    gridColumns: {
        data: {
            meshId: 'MESH_ID'
        },
        properties:[
            {
                label: 'App Column',
                columnId: 'first_column',
                type: 'string',
                align: 'left'
            }
        ]
    }
}
```

### Sample runtime action to retrieve data

The mesh configuration fule references the `get-products` sample runtime action. It defines the path to the runtime action to retrieve the data of custom columns.

It is important to add `ids={args.ids}` to the query and handle this filtering in the runtime action. As a result, the Admin UI SDK loads only the data necessary to display in the grid columns of the Adobe Commerce instance.

```javascript
export async function main(props) {

    const selectedIds = props.ids ? props.ids.split(',') : [];

    const productGridColumns = {
        "productGridColumns": {
            "product-1": {
                "first_column": "value_1",
                "second_column": 1
            },
            "product-2": {
                "first_column": 1,
                "second_column": "test"
            }
        }
    }

    if (selectedIds.length === 0) {
        return {
            statusCode: 200,
            body: productGridColumns,
        }
    }

    const filteredColumns = {
        "productGridColumns": {}
    }

    selectedIds.forEach(id => {
        if (productGridColumns.productGridColumns[id]) {
            filteredColumns.productGridColumns[id] = productGridColumns.productGridColumns[id]
        }
    })

    return {
        statusCode: 200,
        body: filteredColumns
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
                "name": "products",
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
                                "field": "products",
                                "path": "/get-products?ids={args.ids}",
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

### Sample schema file

This sample `schema.json` file is referenced in the mesh configuration file. It defines the response of the external `productGridColumns` query that fetches column data.

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "productGridColumns": {
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
      "productGridColumns"
    ]
}
```

### Create or update your mesh

Use one of the following commands to create or update your mesh. Be sure to store the mesh ID provided.

```bash
aio api-mesh:create mesh.json
```

```bash
aio api-mesh:update mesh.json  
```

### Products data matching

The Admin UI SDK expects the product SKU in Adobe Commerce to correctly match the product to the data and to fill the correct cell.

A default value can be provided to be added to unmatched IDs, or in case data doesn't match, the expected type of the column. If a value is not provided, the cell is left empty.

In case of error, check the Adobe Commerce logs.

The following example provides a default value.

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

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [product grid columns](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/product/custom-grid-columns).
