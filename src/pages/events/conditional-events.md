---
title: Create conditional events
description: Create custom Adobe Commerce conditional events using declarative configuration.
edition: paas
keywords:
  - Events
  - Extensibility
---

import ConditionalEvents from '/src/_includes/conditional-event.md'
import ConditionalEventExample from '/src/_includes/conditional-event-example.md'

# Create conditional events

<ConditionalEvents />

You can create conditional events within your module's or root `io_events.xml` file or from the command line.

## Define conditional events in `io_events.xml`

<ConditionalEventExample />

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
        </rules>
    </event>
</config>
```

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
