---
title: Tax use cases
description: Learn about how you can use the Adobe Commerce checkout starter kit for tax integrations.
keywords:
  - App Builder
  - Extensibility
---

# Tax use cases

This page explores different use cases and scenarios for implementing tax integrations using the Adobe Commerce checkout starter kit.

For more general use cases, refer to [use-cases](./use-cases.md).

## Collect taxes

You can calculate and apply taxes on shopping carts during checkout by using the `collectTaxes` webhook. See [webhooks](../../webhooks/index.md) to understand and setup a webhook.

To register a webhook, you need to create a `webhooks.xml` [configuration file](../../webhooks/xml-schema.md) in your module or in the root `app/etc` directory.

The following example demonstrates how to add a webhook to the `plugin.magento.out_of_process_tax_management.api.oop_tax_collection.collect_taxes` method:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_AdobeCommerceWebhooks:etc/webhooks.xsd">
    <method name="plugin.magento.out_of_process_tax_management.api.oop_tax_collection.collect_taxes" type="before">
        <hooks>
            <batch name="collect_taxes">
                <hook
                    name="collect_taxes"
                    url="https://<your_app_builder>.runtime.adobe.io/api/v1/web/commerce-checkout-starter-kit/tax-calculation"
                    method="POST" timeout="10000" softTimeout="2000"
                    priority="300" required="true" fallbackErrorMessage="Tax calculation failed. Please try again later."
                    ttl="0"
                >
                </hook>
            </batch>
        </hooks>
    </method>
</config>
```

When the quote is recalculated, such as during a cart update or at checkout, a synchronous call is dispatched to the App Builder application that handles tax calculation. The response is returned through the oopQuote object, which includes the calculated tax fields. This webhook is only triggered when a shipping destination address is set, to avoid unnecessary calls during early cart interactions.

Refer to [`actions/tax-calculation.js`](https://github.com/adobe/commerce-checkout-starter-kit/blob/main/actions/tax-calculation/index.js) for an example of how to process the request and return the tax calculation to the commerce instance. This file can serve as a template to implement custom tax calculations.

### Payload

The Appbuilder application receives the following payload as an `oopQuote` object that contains the necessary data for the tax calculation. Once the calculation is processed, the response will populate the `tax` and `tax_breakdown` fields under the `items` array and provide the response to the commerce instance.

```json
{
  "oopQuote": {
    "customer_tax_class": "string",
    "items": [
      {
        "code": "sequence-1",
        "type": "product",
        "tax_class": "tax-1",
        "unit_price": 60,
        "quantity": 2,
        "is_tax_included": false,
        "discount_amount": 0,
        "custom_attributes": [],
        "sku": "SKU-1",
        "name": "Product Name 01",
        "tax": null,
        "tax_breakdown": []
      },
      {
        "code": "shipping",
        "type": "shipping",
        "tax_class": "Shipping Tax",
        "unit_price": 60,
        "quantity": 1,
        "is_tax_included": false,
        "discount_amount": 0,
        "custom_attributes": [],
        "sku": null,
        "name": null,
        "tax": null,
        "tax_breakdown": []
      }
    ],
    "ship_from_address": {
      "street": [],
      "city": "City1",
      "region": "Alhabama",
      "region_code": "AL",
      "country": "US",
      "postcode": "12345"
    },
    "ship_to_address": {
      "street": ["address 1", "address 2"],
      "city": "City1",
      "region": "California",
      "region_code": "CA",
      "country": "US",
      "postcode": "12345"
    },
    "billing_address": {
      "street": ["address 1", "address 2"],
      "city": "City1",
      "region": "California",
      "region_code": "CA",
      "country": "US",
      "postcode": "12345"
    },
    "shipping": {
      "shipping_method": "FREE",
      "shipping_description": "FREE"
    },
    "custom_attributes": []
  }
}
```

Responses to commerce webhooks are expected to modify the original request body in various ways (see [`Webhook responses and logging`](https://developer.adobe.com/commerce/extensibility/webhooks/responses/)). The following response example uses the `replace` operation to set the tax field and the `add` operation to add different taxes to the `tax_breakdown` array.

The key points for constructing the response are:

- The `amount` in the `tax` object represents the actual tax applied to each line item.
- The `rate` in both the `tax` and `tax_breakdown` objects is included for reference to indicate which tax rate was applied.
- The `discount_compensation_amount` corresponds to the [`hidden tax`](https://experienceleague.adobe.com/en/docs/commerce-admin/stores-sales/site-store/taxes/hidden-tax-calculation), which accounts for the portion of tax adjusted by discounts.

```json
[
  {
    "op": "add",
    "path": "oopQuote/items/0/tax_breakdown",
    "value": {
      "data": {
        "code": "state_tax",
        "rate": 4.5,
        "amount": 5.4,
        "title": "State Tax",
        "tax_rate_key": "state_tax-4.5"
      }
    },
    "instance": "Magento\\OutOfProcessTaxManagement\\Api\\Data\\OopQuoteItemTaxBreakdownInterface"
  },
  {
    "op": "add",
    "path": "oopQuote/items/0/tax_breakdown",
    "value": {
      "data": {
        "code": "county_tax",
        "rate": 3.6,
        "amount": 4.32,
        "title": "County Tax",
        "tax_rate_key": "county_tax-3.6"
      }
    },
    "instance": "Magento\\OutOfProcessTaxManagement\\Api\\Data\\OopQuoteItemTaxBreakdownInterface"
  },
  {
    "op": "replace",
    "path": "oopQuote/items/0/tax",
    "value": {
      "data": {
        "rate": 8.1,
        "amount": 9.72,
        "discount_compensation_amount": 0
      }
    },
    "instance": "Magento\\OutOfProcessTaxManagement\\Api\\Data\\OopQuoteItemTaxInterface"
  }
]
```

## Update custom attributes on tax classes via Admin UI

The out-of-process tax module allows you to add custom attributes to tax classes. These attributes are useful when integrating with third-party tax systems that require standardized identifiers or additional metadata.  
For the relevant endpoints to update tax class custom attributes, see the [Tax API reference](./tax-reference.md).

To simplify management, the starter kit includes a sample Admin UI application. This single-page application, located in the [`commerce-backend-ui-1`](https://github.com/adobe/commerce-checkout-starter-kit/tree/main/commerce-backend-ui-1), connects to your Commerce instance, retrieves tax classes, and allows you to add or edit their custom attributes directly from the UI.

![Tax Management UI](../../_images/starterkit/tax-management-ui.png)

To set up the Admin UI application in your Commerce environment, see the [Admin UI SDK documentation](../../admin-ui-sdk/index.md).

Once custom attributes are assigned to tax classes, they are included in webhook requests during tax calculation.
Here's an example payload showing how the custom attributes from tax classes appear in the webhook request:

```json
{
  "oopQuote": {
    "customer_tax_class": "Retail Customer",
    "custom_attributes": {
      "tax_code": "005",
      "tax_label": "Retail"
    },
    ...
    "items": [
      {
        "tax_class": "Taxable Goods",
        "custom_attributes": {
          "tax_code": "001",
          "tax_label": "Textbook"
        },
        ...
      }
    ]
  }
}
```
## Propagation of serialized custom attributes from Tax Class entities to Quote/QuoteItem entities

This new feature populates the `custom_attributes` fields of the `Quote` and `Quote_item` entities as following:

- `Quote` - Any serialized custom attributes from the customer tax class are populated into the `custom_attributes` field of this `Quote` object.
- `Quote_item` - Any serialized custom attributes from the tax class of the product associated to an item are set as `custom_attributes` of this `Quote_item` object.

Once `custom_attributes` are populated, these are subsequently propagated to the `Order` and `Order_item` entities as per correspondance.

In the case of `Quote_item` currently only serialized custom attributes from the tax class of the `product`are being propagated but there are other types of items as well such as `shipping`or `giftwrap` which will be considered for future enhancements.

### Example

Here's an example of how this looks like in case of a `Quote_item` but it's similar for 'quote':

If the following is the tax class information where we'll mainly focus on the `custom_attributes_serializable` field for now:

```json
{
"class_id":"2","class_name":"Taxable Goods UPDATED","class_type":"PRODUCT","custom_attributes_serializable":"{\"itemProduct_code\":\"item_product_code_updated\",\"product_code_2\":\"product_quote_item_code_2\"}"
}

```
 
Any attributes from the field will be propagated to the `Quote_item` object as shows in the following simplified version of a `quote_item` object:

```json
{
"quote_id: 23 created_at: 2025-05-30 11:14:29 updated_at: 2025-06-04 09:07:24 product_id: 3 store_id: 1 parent_item_id: NULL is_virtual: 0 sku: 24-MB03 free_shipping: 0 "custom_attributes_serializable": {"itemProduct_code": "item_product_code_updated","product_code_2": "product_quote_item_code_2"}
}
```

Once an order is placed, this information will propagate to the `Order` and `Order_item` level.

