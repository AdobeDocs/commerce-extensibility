---
title: customer grid columns
description: Customize the customers page in the Adobe Commerce Admin.
keywords:
  - App Builder
  - Extensibility
---

# customer grid columns

The `customer grid columns` extension point enables you to add columns to the grid on the **Customers** > **All Customers** page in the Adobe Commerce Admin. This extension point requires an [API Mesh](https://developer.adobe.com/graphql-mesh-gateway/gateway) for Adobe Developer App Builder instance to retrieve the data to be added to the custom columns.

You can use the [`aio api-mesh:describe` command](https://developer.adobe.com/graphql-mesh-gateway/gateway/command-reference/#aio-api-meshdescribe) to retrieve the values of the API key and mesh ID. The key is appended to the mesh endpoint URL.

## Example customization

​The following example creates custom columns labeled `First App Column` and `Second App Column`.

```javascript
customer: {
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

### Sample API Mesh configuration file

The following sample mesh configuration file defines the external source that contains the data to populate in the custom columns.

```json
{
    "meshConfig": {
        "sources": [
            {
                "name": "customers",
                "handler": {
                    "JsonSchema": {
                        "baseUrl": "https://www.example.com",
                        "operations": [
                            {
                                "type": "Query",
                                "field": "customers",
                                "path": "/graphql",
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

This sample `schema.json` file is referenced in the mesh configuration file. It defines the response of the external `customerGridColumns` query that fetches column data.

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
              },
              "third_column": {
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

## Parameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data.apiKey` | string | Yes | The API key assigned to the GraphQL mesh. |
| `data.meshId` | string | Yes | The ID of the mesh used to retrieve the column data.|
| `properties.align` | string | Yes | The alignment of the values in the column. One of `left`, `right`, `center`. |
| `properties.columnId` | string | Yes | The identifier used in the external dataset to identify the column. |
| `properties.label` | string | Yes | The label of the column to display. |
| `properties.type` | string | Yes | The data type of the values in the column. Supported values: `boolean`, `date`, `float`, `integer`, `string`. Date values must be ISO 8601-compliant. |
