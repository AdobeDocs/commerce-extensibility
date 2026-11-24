---
title: Custom Attributes Modules
description: Describes the OOPE modules that enable custom attributes.
keywords:
 - Extensibility
 - App Builder
 - API Mesh
 - Events
 - REST
 - Starter Kit
 - Tools
---

# Custom attributes modules

The custom attributes modules allow out-of-process services to add and persist custom attributes on Commerce data models. They include REST and GraphQL support, as well as admin UI integration for order create/view flows. The B2B module extends this support to negotiable quotes and companies.

The base module is available on all platforms, but the B2B module is available only on Adobe Commerce as a Cloud Service.

For details on how to use these modules, see the following documentation:

* [REST](https://developer.adobe.com/commerce/webapi/rest/modules/custom-attributes)
* [GraphQL](https://developer.adobe.com/commerce/webapi/graphql/schema/attributes/mutations/)

## Set a return address for an individual return

In Adobe Commerce as a Cloud Service, `return_address` is a reserved custom attribute on a return merchandise authorization (RMA). Set it when a return should go to a different address than the one configured for its store. The override applies only to that return and does not change the store configuration.

To set the override through REST, include `return_address` in `rmaDataObject.custom_attributes` when you create a return with `POST /V1/returns` or update one with `PUT /V1/returns/{id}`. Set it on the return itself, not on a return item. In this example, `value` is a JSON-encoded address object. Include the other fields required by the endpoint in your request.

```json
{
  "rmaDataObject": {
    "custom_attributes": [
      {
        "attribute_code": "return_address",
        "value": "{\"contact_name\":\"Returns Department\",\"street\":[\"100 Example Avenue\",\"Dock 2\"],\"city\":\"Austin\",\"region_code\":\"TX\",\"postcode\":\"78701\",\"country_id\":\"US\",\"telephone\":\"512-555-0142\"}"
      }
    ]
  }
}
```

| Field | Required | Description |
|---|---|---|
| `street` | Yes | Street address as a string or an array of address lines. |
| `city` | Yes | City or locality. |
| `postcode` | Yes | Postal code as a string. |
| `country_id` | Yes | Country code recognized by Commerce, such as `US`. |
| `region_id`, `region_code`, or `region` | No | State or province as a Commerce region ID, a code such as `TX`, or a name such as `Texas`. |
| `contact_name` | No | Name of the return recipient. |
| `telephone` | No | Phone number of the return recipient. |

When the attribute contains a complete address, Commerce uses it in:

* The **Return Address** section on the existing return's Admin page.
* New and authorized return emails and the printed return.
* The GraphQL `Return.shipping.address` field.
* Return shipping rate requests and the recipient address on return shipping labels created in the Admin.

If the attribute is missing, cannot be parsed, or lacks a required field or a recognized country code, Commerce uses the store's configured return address instead. The **New Return** page in the Admin still shows the configured address. You cannot edit the per-return address directly in the Admin.
