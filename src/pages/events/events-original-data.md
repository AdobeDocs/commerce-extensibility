---
title: Create event subscriptions with original data
description: Use original event data in Adobe Commerce events.
edition: paas
keywords:
  - Events
  - Extensibility
---

# Create event subscriptions with original data

Events that are based on objects that implement a specific interface in Adobe Commerce can include the original data of the object in the event payload. The original data represents the state of the object before any changes were made. This is particularly useful for events that are triggered by updates to objects, as it allows you to compare the previous state with the new state.

If the object is new (such as when a new product is created), the original data will be empty. Events that support original data also include an `_isNew` field in the payload, which indicates whether the object is new or existing.

To check if an event includes original data in its payload, you can visit **System** > Events > **Events List** page or use the following command [`bin/magento events:info <event_code>`](./commands.md#return-event-details). Keep in mind that that the returned payload for some events, especially those that are dynamically defined, might not include full details.

To include original data in the event payload, the event must be configured to include the `_origData` field even if the wildcard `*` is used to include all fields. For example, if you want to receive the whole payload including original data for the `observer.catalog_product_save_after` event, you can configure it as follows:

<InlineAlert variant="warning" slots="text" />

The `_origData` field is not included by default even when using the wildcard `*`, so you must explicitly add it to the event configuration.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.catalog_product_save_after">
        <fields>
            <field name="*"/>
            <field name="_origData"/>
        </fields>
    </event>
</config>
```

As a result, the event payload will include the `_origData` field with the original data of the product before it was saved:

```json
{
  "sku": "Simple product",
  "name": "Simple product",
  "price": "500.000000",
  "quantity_and_stock_status": {
    "is_in_stock": "1",
    "qty": "3126"
  },
  .....
  "_origData": {
    "sku": "Simple product",
    "name": "Simple product New Name",
    "price": "600.000000",
    "quantity_and_stock_status": {
      "is_in_stock": true,
      "qty": 3125
    },
    .....
  },
  "_isNew": false
}
```

For some events with a complex payload structure, the original data might not be available as a root node. In such cases, you can provide a custom path to include the original data. For example, for the `observer.checkout_cart_product_add_before` event, you can configure it as follows:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.checkout_cart_product_add_before">
        <fields>
            <field name="*"/>
            <field name="product._origData"/>
            <field name="quote_item._origData"/>
        </fields>
    </event>
</config>
```

You can select only specific fields to be included in the event payload, along with the specific fields from the original data. For example, if you want to include only the `sku` and `quantity_and_stock_status.qty` fields along with their original values, you can configure the event as follows:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module-commerce-events-client/etc/io_events.xsd">
    <event name="observer.catalog_product_save_after">
        <fields>
            <field name="sku"/>
            <field name="quantity_and_stock_status.qty"/>
            <field name="_origData.sku"/>
            <field name="_origData.quantity_and_stock_status.qty"/>
        </fields>
    </event>
</config>
```

As a result, the event payload will include only the selected fields and their original values:

```json
{
  "sku": "Simple product",
  "quantity_and_stock_status": {
    "qty": "3126"
  },
  "_origData": {
    "sku": "Simple product",
    "quantity_and_stock_status": {
      "qty": 3125
    }
  }
}
```

The original data can be used in conditional events using the `onChange` operator to trigger events only when specific fields have changed. For more information, see [Create conditional events](./conditional-events.md#trigger-events-on-specific-field-changes).
