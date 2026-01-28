---
title: Add fields from the application context to an event
description: Learn how to add data from the application context to an event payload.
keywords:
  - Events
  - Extensibility
---

# Context values

import CommerceContext from '/src/_includes/commerce-context.md'

You can add to the event payload values from the application context. It allows you to include data that is not part of the event by default but is crucial for your integration.

The following contexts are supported:

<CommerceContext />

#### Checkout session context

The `context_checkout_session` context retrieves information about the current checkout session. You can use this context to access the information about the current quote.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### io_events.xml (PaaS)

```xml
<fields>
    <field name="quote.id" source="context_checkout_session.get_quote.get_id" />
    <field name="quote.sub_total" source="context_checkout_session.get_quote.get_subtotal" />
    <field name="quote.customer_group_id" source="context_checkout_session.get_quote.get_customer_group_id" />
</fields>
```

##### Admin (SaaS)

```yaml
Event Fields

Name: quote.id
Source: context_checkout_session.get_quote.get_id
Active: Yes

Name: quote.sub_total
Source: context_checkout_session.get_quote.get_subtotal
Active: Yes

Name: quote.customer_group_id
Source: context_checkout_session.get_quote.get_customer_group_id
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "quote": {
        "id": "66",
        "sub_total": "600.0000",
        "customer_group_id": "0"
    }
}
```

If the quote does not exist in the current session, the values will be set to `null`.

#### Customer session context

The `context_customer_session` retrieves information about the current customer session. You can use this context to access the information about the current customer.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### io_events.xml (PaaS)

```xml
<fields>
    <field name="customer.id" source="context_customer_session.get_customer.get_id" />
    <field name="customer.email" source="context_customer_session.get_customer.get_email" />
    <field name="customer.group_id" source="context_customer_session.get_customer.get_group_id" />
</fields>
```

##### Admin (SaaS)

```yaml
Event Fields

Name: customer.id
Source: context_customer_session.get_customer.get_id
Active: Yes

Name: customer.email
Source: context_customer_session.get_customer.get_email
Active: Yes

Name: customer.group_id
Source: context_customer_session.get_customer.get_group_id
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "customer": {
        "id": "123",
        "email": "test@example.com",
        "group_id": "2"
    }
}
```

If the customer is not logged in, the values will be set to `null`.

#### Application state context

The `context_application_state` context retrieves information about the current application state.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### io_events.xml (PaaS)

```xml
<fields>
    <field name="app_area_code" source="context_application_state.get_area_code" />
    <field name="app_mode" source="context_application_state.get_mode" />
</fields>
```

##### Admin (SaaS)

```yaml
Event Fields
Name: app_area_code
Source: context_application_state.get_area_code
Active: Yes
Name: app_mode
Source: context_application_state.get_mode
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "app_area_code": "webapi_rest",
    "app_mode": "production"
}
```

The `context_application_state.get_area_code` field returns the area code of the application where event was triggered. The possible values are `global`, `frontend`, `adminhtml`, `crontab`, `webapi_rest`, `webapi_soap`, `graphql`. This value can be used to determine the context of the request and to apply specific logic based on the area code.

The `context_application_state.get_mode` field returns the current application mode. The possible values are `default`, `developer`, and `production`.

#### Scope config context

The `context_scope_config` context retrieves information from the configuration scope. If your integration depends on a specific configuration value, you can use this context to retrieve the value from the configuration.

The following example retrieves the `general/locale/timezone` and `general/locale/code` configuration values from the default scope.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### io_events.xml (PaaS)

```xml
<fields>
    <field name="config.timezone" source="context_scope_config.get_value{general/locale/timezone:default}" />
    <field name="config.local" source="context_scope_config.get_value{general/locale/code:default}" />
</fields>
```

##### Admin (SaaS)

```yaml
Event Fields

Name: config.timezone
Source: context_scope_config.get_value{general/locale/timezone:default}
Active: Yes

Name: config.local
Source: context_scope_config.get_value{general/locale/code:default}
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "config": {
        "timezone": "America/Chicago",
        "local": "en_US"
    }
}
```

#### HTTP request context

The `context_http_request` context retrieves information about the current HTTP request.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### io_events.xml (PaaS)

```xml
<fields>
    <field name="request.path_info" source="context_http_request.get_path_info" />
    <field name="request.base_path" source="context_http_request.get_base_path" />
    <field name="request.front_name" source="context_http_request.get_front_name" />
</fields>
```

##### Admin (SaaS)

```yaml
Event Fields

Name: request.path_info
Source: context_http_request.get_path_info
Active: Yes

Name: request.base_path
Source: context_http_request.get_base_path
Active: Yes

Name: request.front_name
Source: context_http_request.get_front_name
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "request": {
        "path_info": "/rest/default/V1/guest-carts/estimate-shipping-methods",
        "base_path": "/",
        "front_name": "rest"
    }
}
```

#### Staging context

The `context_staging` context retrieves information about the current staging version.

<CodeBlock slots="heading, code" repeat="2" languages="XML, YAML" />

##### io_events.xml (PaaS)

```xml
<fields>
    <field name="staging.version" source="context_staging.get_version" />
    <field name="staging.current_version" source="context_staging.get_current_version" />
</fields>
```

##### Admin (SaaS)

```yaml
Event Fields
Name: staging.version
Source: context_staging.get_version
Active: Yes
Name: staging.current_version
Source: context_staging.get_current_version
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "staging": {
        "version": {
            "id": 1
        },
        "current_version": {
            "id": 1
        }
    }
}
```

#### Store context

The `context_store` context retrieves information about the current store.

#### io_events.xml (PaaS)

```xml
<fields>
  <field name="store.store_id" source="context_store.get_store.get_id" />
  <field name="store.store_data" source="context_store.get_store" />
  <field name="store.website_data" source="context_store.get_website" />
  <field name="store.store_group_data" source="context_store.get_group" />
</fields>
```

#### Admin (SaaS)

```yaml
Event Fields
Name: store.store_id
Source: context_store.get_store.get_id
Active: Yes
Name: store.store_data
Source: context_store.get_store
Active: Yes
Name: store.website_data
Source: context_store.get_website
Active: Yes
Name: store.store_group_data
Source: context_store.get_group
Active: Yes
```

Your event payload will contain the following data:

```json
{
    "store": {
        "store_id": "1",
        "store_data": {
          "store_id": "1",
          "code": "default",
          "website_id": "1",
          "group_id": "1",
          "name": "Default Store View",
          "sort_order": "0",
          "is_active": "1",
          "available_currency_codes": [
              "USD"
          ],
          "base_currency": {
              "currency_code": "USD"
          },
          "current_currency": {
              "currency_code": "USD"
          }
        },
        "website_data": {
          "website_id": "1",
          "code": "base",
          "name": "Main Website",
          "sort_order": "0",
          "default_group_id": "1",
          "is_default": "1"
        },
        "store_group_data": {
          "group_id": "1",
          "website_id": "1",
          "name": "Main Website Store",
          "root_category_id": "2",
          "default_store_id": "1",
          "code": "main_website_store"
        }
    }
}
```
