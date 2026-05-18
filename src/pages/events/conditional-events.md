---
title: Create conditional events
description: Create custom Adobe Commerce conditional events using declarative configuration.
keywords:
  - Events
  - Extensibility
---

# Create conditional events

You may decide that you want Adobe I/O Events for Adobe Commerce to notify the client application when certain conditions occur. For example, by default, if you register an event that tracks the remaining quantity of a product, the eventing service sends that information to your client application each time Commerce emits the event. However, you might be interested in the remaining quantity only when it reaches a specific threshold, such as 20 units. Conditional events allow you to define exactly when to send events to your application. Otherwise, the client application must include code to filter out the unimportant and unnecessary data.

A conditional event acts as an extension of a custom or native Commerce event. You must specify the source, or parent, event and define one or more rules that evaluate the data that is present in the parent event payload. If all the individual rules defined in a conditional event evaluate as true, then the eventing service sends the conditional event to the application. If one or more rules evaluate as false, the service sends neither the parent event nor the conditional event, unless the parent has been subscribed separately, without any rules.

All conditional events contain the following information:

*  A unique name for the conditional event.

*  The name of the parent event. You must attach a conditional event to a specific registered event.

*  One or more rules.

Each rule contains the following:

*  A field that is defined in the parent event.

*  An operator, which is represented as a comparison statement between the value supplied in the parent event's payload and the threshold value.

   The operator must be one of the following:

   | Operator      | Description |
   | -----------   | ----------- |
   | `greaterThan` | Checks whether the value supplied in the payload of the event is greater than a specified value. Applicable for integer and float data types. |
   | `lessThan`    | Checks whether the payload value is less than a specified value. Applicable for integer and float data types. |
   | `equal`       | Checks whether the payload value matches the specified value. For Boolean data types, use `1` to compare to `true` and `0` to compare to `false`. |
   | `regex`       | A regular expression that checks for matches. The specified value must be compatible with the [regular expression match](https://www.php.net/manual/en/function.preg-match.php). |
   | `in`          | Checks whether the payload value is one of multiple specified values. The value must be a comma-separated list. You do not need to provide additional escape characters. |
   | `onChange`    | Checks whether the provided field's value has changed compared to its previous value. The value attribute is optional. If provided, the operator checks whether the field's new value is equal to the specified value field. |

*  The value to compare against. When you assign the `regex` operator, you must delimit the regular expression value with valid characters, such as forward slashes (/). For example, `/^TV .*/i`, which checks whether the string starts with the string `TV`, ignoring the case of the letters.

*  The value in the `onChange` operator is a path to a field to compare against. By default, comparison is done against `field` and `_origData.field` values. In cases where the event payload has a different structure, you can provide a custom path to compare against.

You can create conditional events within your module's or root `io_events.xml` file or from the command line.

These conditional events can include [context fields](context-fields.md) in conditional event rules. These fields allow you to access additional data about the event, such as the application state or the store ID. Context fields are prefixed with `context_` and can be used in any rule, just like regular payload fields.

## Define conditional events in `io_events.xml`

The following example creates and registers a conditional event named `plugin.magento.catalog.model.resource_model.product.save_low_stock_event`. Its parent is `plugin.magento.catalog.model.resource_model.product.save`. It defines rules that trigger when all of the conditions are true:

*  The value of `qty` is less than `20`
*  The `category_id` is either `3`, `4`, or `5`
*  The product `name` contains `TV`
*  The `store_id` of product category is either `1` or `2`
*  The application area is `adminhtml`
*  The `quantity_and_stock_status.qty` value has changed

These fields are present and declared in the parent event.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="...">
    <event name="plugin.magento.catalog.model.resource_model.product.save_low_stock_event"
           parent="plugin.magento.catalog.model.resource_model.product.save">
        <fields>
            <field name="qty"/>
            <field name="category_id"/>
            <field name="name"/>
        </fields>
        <rules>
            <rule>
                <field>qty</field>
                <operator>lessThan</operator>
                <value>20</value>
            </rule>
            <rule>
                <field>category_id</field>
                <operator>in</operator>
                <value>3,4,5</value>
            </rule>
            <rule>
                <field>name</field>
                <operator>regex</operator>
                <value>/^TV .*/i</value>
            </rule>
           <rule>
              <field>category.store_id</field>
              <operator>in</operator>
              <value>1,2</value>
           </rule>
           <rule>
               <field>context_application_state.get_area_code</field>
               <operator>equal</operator>
               <value>adminhtml</value>
           </rule>
           <rule>
               <field>quantity_and_stock_status.qty</field>
               <operator>onChange</operator>
               <value />
           </rule>
        </rules>
    </event>
</config>
```

## Trigger events on specific field changes

<InlineAlert variant="warning" slots="text"/>

This rule is possible only for events that include original data [`_origData`](events-original-data.md) in the payload. If an event does not include original data, the `onChange` operator cannot be used, and such an event will not be triggered.

For events that contain original data [`_origData`](events-original-data.md) within the payload, you can create conditional events that trigger only when specific fields change. It can reduce the number of events sent to your application when only specific field changes are relevant.

To check if the event payload contains original data, you can visit **System** > Events > **Events List** page or use the [`bin/magento events:info <event_code>`](commands.md#return-event-details) command.

For example, you want to trigger an event only when the product stock quantity changes:

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="...">
    <event name="plugin.magento.catalog.model.resource_model.product.on_stock_change_event"
           parent="plugin.magento.catalog.model.resource_model.product.save">
        <fields>
            <field name="qty"/>
            <field name="category_id"/>
            <field name="name"/>
        </fields>
        <rules>
            <rule>
                <field>quantity_and_stock_status.qty</field>
                <operator>onChange</operator>
                <value />
            </rule>
        </rules>
    </event>
</config>
```

In this example the payload value of `quantity_and_stock_status.qty` is compared to its previous value stored in `_origData.quantity_and_stock_status.qty`. The event is triggered only when the quantity value has changed.

For some events the payload structure may differ and the original data [`_origData`](events-original-data.md) may not be available as a root node. In such cases you can provide a custom path to compare against in the `value` element:

```xml
<event name="observer.checkout_cart_product_add_before">
    <fields>
        <field name="*"/>
        <field name="_origData"/>
    </fields>
    <rules>
        <rule>
            <field>product.quantity_and_stock_status.qty</field>
            <operator>onChange</operator>
            <value>product._origData.quantity_and_stock_status.qty</value>
        </rule>
    </rules>
</event>
```

In this example the payload value of `product.quantity_and_stock_status.qty` is compared to the value stored in `product._origData.quantity_and_stock_status.qty`.

## Command line

The `bin/magento events:subscribe <event_code> --force --fields=<name1> --fields=<name2>` command creates and registers custom and native Commerce events. When you also specify the `--parent <event_code>` and `--rules=<field-name>|<operator>|<value>` options, you create and register a conditional event.

The following command creates and registers the same conditional event shown in the `io_events.xml` example. Running the command also updates the system `env.php` file. If you need to subsequently update or delete the event subscription, you can manually update the event there. The `bin/magento events:unsubscribe` command unsubscribes the event, but it does not remove the subscription from the `env.php` file.

```bash
bin/magento events:subscribe plugin.magento.catalog.model.resource_model.product.save_low_stock_event \
--parent plugin.magento.catalog.model.resource_model.product.save \
--fields=qty --fields=category_id --fields=name \
--rules="qty|lessThan|20" --rules="category_id|in|3,4,5" --rules="name|regex|/^TV .*/i"
```

You can use the `bin/magento events:list -v` command to display the contents of your subscribed events.

## Known limitations

*  Registering a plugin-type event rule causes the system to generate a plugin for the parent rule. No additional generation is required for observer-type events.

*  Conditional events that evaluate as false are not stored in the database or sent to the eventing service.
