---
title: customer grid columns
description: Customize the customers page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# customer grid columns

The `customer grid columns` extension point enables you to add columns to the grid on the **Customers** > **All Customers** page in the Adobe Commerce Admin. This extension point requires an [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/gateway) for Adobe Developer App Builder instance to retrieve the data to be added to the custom columns.

You can use the [`aio api-mesh:describe` command](https://developer.adobe.com/graphql-mesh-gateway/gateway/command-reference/#aio-api-meshdescribe) to retrieve the value of the mesh ID.

## Example customization

​The following example creates custom columns labeled `First App Column` and `Second App Column`.

```javascript
customer: {
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
                "name": "customers",
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
                                "field": "customers",
                                "path": "/get-customers?ids={args.ids}",
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

The `get-customers` sample runtime action is referenced in the mesh configuration file. It defines the path to the runtime action that retrieves the data of custom columns.

It is important to add the `ids={args.ids}` as part of the query and handle this filtering in the runtime action. This allows Admin UI SDK to load only the necessary data needed to display in the grid columns in the Admin.

```javascript
export async function main(props) {

    const selectedIds = props.ids ? props.ids.split(',') : [];

    const customerGridColumns = {
        "customerGridColumns": {
            "1": {
                "first_column": "value_1",
                "second_column": 1
            },
            "2": {
                "first_column": 1,
                "second_column": "test"
            }
        }
    }

    if (selectedIds.length === 0) {
        return {
            statusCode: 200,
            body: customerGridColumns,
        }
    }

    const filteredColumns = {
        "customerGridColumns": {}
    }

    selectedIds.forEach(id => {
        if (customerGridColumns.customerGridColumns[id]) {
            filteredColumns.customerGridColumns[id] = customerGridColumns.customerGridColumns[id]
        }
    })

    return {
        statusCode: 200,
        body: filteredColumns
    }
}
```

### Sample schema file

The  `schema.json` sample file, which is also referenced in the mesh configuration file, defines the response of the external `customerGridColumns` query that fetches column data.

```json
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "customerGridColumns": {
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
      "customerGridColumns"
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

### Customer data matching

The Admin UI SDK expects the customer ID in Adobe Commerce to correctly match the customer to the data and fill the correct cell.

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

The Adobe Commerce Extensibility Code Samples repository demonstrates how to customize [customer grid columns](https://github.com/adobe/adobe-commerce-samples/tree/main/admin-ui-sdk/customer/custom-grid-columns).
