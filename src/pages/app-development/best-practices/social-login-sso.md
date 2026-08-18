---
title: Social login storefront SSO integration
description: Learn how to use an App Builder app to bridge shopper sign-in from an external identity provider into an Adobe Commerce customer token for storefront single sign-on.
keywords:
  - App Builder
  - Extensibility
  - Authentication
  - Customer
---

# Social login storefront SSO integration

Social login lets shoppers sign in to your storefront with an external identity provider (for example, Google or Meta) instead of creating and remembering a dedicated Commerce password. An [App Builder](https://developer.adobe.com/app-builder/) app handles the provider sign-in and then bridges the shopper into Adobe Commerce by obtaining a Commerce customer token. The storefront uses that token to authenticate the shopper's subsequent GraphQL requests.

The end-to-end flow has four steps:

1. Authenticate the shopper with the external provider and retrieve their verified profile data (at minimum, a verified email address, plus first and last name).
1. Check whether a Commerce customer already exists for that email.
1. Create a customer account if one does not already exist.
1. Generate a Commerce customer token and return it to the storefront for use in future GraphQL requests.

The same approach works on both **Adobe Commerce as a Cloud Service** and **Adobe Commerce on Cloud/on-premises**, using standard REST APIs with no custom backend (PHP) code. Only the base URL, authentication, and one prerequisite differ between the two—see [Prerequisites](#prerequisites) and [Base URL and authentication](#base-url-and-authentication) below.

The following endpoints are used:

- `GET /V1/customers/search`—find an existing customer by email.
- `POST /V1/customers`—create a customer account.
- `POST /V1/customers/{customerId}/token`—generate a customer token.

The customer token endpoint is provided by the Social Login storefront compatibility module and is intended specifically to support this App Builder integration pattern.

## Overall flow

![Sequence diagram of the social login SSO flow, showing the shopper authenticating with an external provider, then App Builder bridging the session into an Adobe Commerce customer token](../../_images/app-development/social-login-sso-flow.png)

The diagram shows two phases:

1. **Authenticate with the external provider**: the shopper signs in from the storefront, and App Builder redirects them to the identity provider. The shopper authenticates directly with the provider, so their credentials never reach the storefront or App Builder. The provider returns an authorization code or ID token, which App Builder validates before reading the verified email and name. App Builder then starts a session, stores an internal token, and returns that token to the storefront.

1. **Bridge to Commerce (server-side, admin-scoped)**: the storefront exchanges the internal token for a Commerce customer token by calling App Builder. App Builder validates the internal token, loads the verified email, and searches Commerce for an existing customer with that email (`GET /V1/customers/search`). If none exists, App Builder creates one (`POST /V1/customers`). App Builder then generates a customer token (`POST /V1/customers/{customerId}/token`) and returns it to the storefront, which uses it as a bearer token on subsequent GraphQL requests.

## Where each call runs

All three endpoints are admin-scoped and must be called **server-side from your App Builder app**, never from the browser, because they require privileged credentials. The app returns only the resulting customer token to the storefront.

The token endpoint (`POST /V1/customers/{customerId}/token`) requires the `Magento_Customer::retrieve_tokens` permission (in the Admin, **Customer** > **Manage** > **Actions** > **Retrieve tokens**); the search and create endpoints require standard customer management access. Grant these to the credential your app uses, as described in [Base URL and authentication](#base-url-and-authentication).

## Prerequisites

Common to both platforms:

- **An App Builder app** that implements the OAuth/OpenID Connect flow for each external provider you support and validates the identity token the provider returns. Only trust profile data (such as the email address) after the provider's token has been verified.

Platform-specific:

- **Adobe Commerce as a Cloud Service**—the Storefront Compatibility Package (which supplies the customer token endpoint) is installed and updated automatically. No additional installation is required.
- **Adobe Commerce PaaS / on-premises**—you must install the [Storefront Compatibility Package](https://experienceleague.adobe.com/developer/commerce/storefront/setup/configuration/storefront-compatibility/install/) with Composer. The package supports Adobe Commerce only (Magento Open Source is not supported). The `POST /V1/customers/{customerId}/token` endpoint was added in Storefront Compatibility Package **version 4.7.6**, so install that version or later. Follow the official install guide for the exact package name and the version that matches your Adobe Commerce release, then run `bin/magento setup:upgrade` (on cloud infrastructure, commit and push the updated `composer.json` and `composer.lock` to trigger deployment).

## Base URL and authentication

The endpoint paths are identical on both platforms, but the base URL, request headers, and authentication token differ. In the examples further below, `<BASE_URL>` stands for the base URL for your platform, and requests use the headers described here.

### Adobe Commerce as a Cloud Service

- **Base URL**: `https://<server>.api.commerce.adobe.com/<tenant-id>`. Find the exact value in your instance details in Commerce Cloud Manager. Paths do **not** include `/rest` or a store view code.
- **Store scope**: supplied in a `Store` request header (for example, `Store: default`).
- **Authentication**: an Adobe Identity Management Service (IMS) access token. The admin and integration token methods used on PaaS are not available on ACCS. The admin identity behind the token must hold the permissions listed in [Where each call runs](#where-each-call-runs), including `Magento_Customer::retrieve_tokens` for the token endpoint.

Obtain the IMS access token with a client-credentials request, then reuse it until it expires:

```bash
curl -X POST 'https://ims-na1.adobelogin.com/ims/token/v3' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials' \
  -d 'client_id=<CLIENT_ID>' \
  -d 'client_secret=<CLIENT_SECRET>' \
  -d 'scope=<SCOPES>'
```

A typical ACCS request:

```text
POST https://<server>.api.commerce.adobe.com/<tenant-id>/V1/customers
Authorization: Bearer <IMS_ACCESS_TOKEN>
Content-Type: application/json
Store: default
```

### Adobe Commerce PaaS / on-premises

- **Base URL**: `https://<host>/rest/<store_code>`, where `<store_code>` is a store view code such as `default` (or `all` for global scope). Paths include `/rest` and the store code; there is no `Store` header.
- **Authentication**: an admin or integration bearer token. For a server-to-server integration, create an integration in the Admin (**System** > **Extensions** > **Integrations**) and grant it the `Magento_Customer::retrieve_tokens` permission (**Customer** > **Manage** > **Actions** > **Retrieve tokens**) for the token endpoint, plus customer management access for the search and create endpoints. Use its access token. Alternatively, request an admin token from `POST /V1/integration/admin/token`.

A typical PaaS request:

```text
POST https://<host>/rest/default/V1/customers
Authorization: Bearer <ADMIN_OR_INTEGRATION_TOKEN>
Content-Type: application/json
```

## REST API usage examples

Perform the calls in the order below, appending each path to your platform's `<BASE_URL>` and including the headers described above. Skip the create step when the search returns an existing customer.

### Search for an existing customer

Use the email address returned by the identity provider to look up the customer.

Request:

```bash
curl -X GET \
  -H "Authorization: Bearer <TOKEN>" \
  '<BASE_URL>/V1/customers/search?searchCriteria[filterGroups][0][filters][0][field]=email&searchCriteria[filterGroups][0][filters][0][value]=john.doe@example.com&searchCriteria[filterGroups][0][filters][0][conditionType]=eq'
```

Response (customer exists):

```json
{
  "items": [
    {
      "id": 123,
      "email": "john.doe@example.com",
      "firstname": "John",
      "lastname": "Doe"
    }
  ]
}
```

Response (customer not found):

```json
{
  "items": []
}
```

If `items` is empty, create the customer (next step). Otherwise, reuse the `id` from the first item and skip to generating the token.

### Create a customer account

Request:

```bash
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "customer": {
      "email": "john.doe@example.com",
      "firstname": "John",
      "lastname": "Doe",
      "website_id": 1,
      "group_id": 1
    },
    "password": "<strong-random-password>"
  }' \
  '<BASE_URL>/V1/customers'
```

Response:

```json
{
  "id": 123,
  "email": "john.doe@example.com",
  "firstname": "John",
  "lastname": "Doe"
}
```

The response includes the customer `id`. Use it directly in the next step. See [Security considerations](#security-considerations) for guidance on the `password` value.

### Generate a customer token

Exchange the customer ID for a customer token.

Request:

```bash
curl -X POST \
  -H "Authorization: Bearer <TOKEN>" \
  '<BASE_URL>/V1/customers/123/token'
```

Response:

```json
"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
```

Return this token to the storefront. The storefront then sends it as a bearer token in the `Authorization` header of the shopper's GraphQL requests.

## Security considerations

When your integration creates a customer account on the shopper's behalf, the shopper never chooses or sees a password. Your app generates a strong, random password only to satisfy the `POST /V1/customers` call, then discards it immediately. The plaintext password is generated in memory, used for that single request, and never stored, logged, returned to the browser, or retained anywhere in your systems.

Because shoppers always authenticate through the SSO bridge—search, create if needed, then `POST /V1/customers/{customerId}/token`—the password is never used to sign in. It has no role once the account exists; it is set only because the create-customer API requires a value. (Commerce still keeps a password hash for the account, as it does for any customer, but this flow never relies on it.)

Also consider the following when hardening this integration:

- **Internal session token lifetime**: keep the token your app issues after authenticating the shopper (see [Overall flow](#overall-flow)) short-lived and single-use—generate it only at the moment the storefront needs it, never ahead of time, and invalidate it once the exchange with Commerce completes. A long-lived or reusable internal token widens the window for token theft to result in account takeover.
- **Commerce customer token lifetime**: the token returned by `POST /V1/customers/{customerId}/token` is a standard Commerce customer token—it remains valid, and can be reused for multiple GraphQL requests, until it expires or the customer's tokens are revoked. Its lifetime is controlled by the **Customer Token Lifetime (hours)** setting under **Stores** > **Configuration** > **Services** > **OAuth** > **Access Token Expiration**. Choose a value appropriate for how long a shopper session should remain valid without re-authenticating with the provider.
- **Credential rotation**: rotate the IMS client secret (ACCS) or the integration/admin token (PaaS) periodically, and immediately if you suspect it has leaked. Because every call in this flow is admin-scoped, a leaked credential lets an attacker search, create, and issue tokens for any customer.
- **Matching by email only**: `GET /V1/customers/search` matches solely on email address. If a customer already has a password-based Commerce account using that email, this flow issues them a customer token without any additional verification beyond the identity provider's assertion. Decide upfront whether that behavior is acceptable for your storefront, or add an additional check—for example, a custom customer attribute marking SSO-provisioned accounts—if you need to distinguish or restrict them.
