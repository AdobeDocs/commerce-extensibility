---
title: Create conditional events
description: Create custom Adobe Commerce conditional events using declarative configuration.
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
   | `regex`       | A regular expression that checks for matches. The specified value must be compatible with the [regular expression match](https://www.php.net/manual/en/function.preg-match.php) |
   | `in`          | Checks whether the payload value is one of multiple specified values. The value must be a comma-separated list. You do not need to provide additional escape characters. |

*  The value to compare against. When you assign the `regex` operator, you must delimit the regular expression value with valid characters, such as forward slashes (/). For example, `/^TV .*/i`, which checks whether the string starts with the string `TV`, ignoring the case of the letters.

You can create conditional events within your module's `io_events.xml` file or from the command line.

## Define conditional events in `io_events.xml`

The following example creates and registers a conditional event named `plugin.magento.catalog.model.resource_model.product.save_low_stock_event`. Its parent is `plugin.magento.catalog.model.resource_model.product.save`. It defines rules that trigger when all of the conditions are true:

*  The value of `qty` is less than 20
*  The `category_id` is either 3, 4, or 5
*  The product `name` contains `TV`

These fields are present and declared in the parent event.

```xml
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="...">
    <event name="plugin.magento.catalog.model.resource_model.product.save_low_stock_event"
           parent="plugin.magento.catalog.model.resource_model.product.save">
        <fields>
            <field name="qty"/>
            <field name="category_id"/>
            <field name="name">
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
        </rules>
    </event>
</config>
```

## Command line

The `bin/magento events:subscribe <event_code> --force --fields=<name1> --fields=<name2>` command creates and registers custom and native Commerce events. When you also specify the `--parent <event_code>` and `--rules=<field-name>|<operator>|<value>` options, you create and register a conditional event.

The following command creates and registers the same conditional event shown in the `io_events.xml` example. Running the command also updates the system `config.php` file. If you need to subsequently update or delete the event subscription, you can manually update the event there. The `bin/magento events:unsubscribe` command unsubscribes the event, but it does not remove the command from the `config.php` file.

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
